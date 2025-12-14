import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TOPICS } from '../config/topics';

export type GamePhase = 'LOBBY' | 'TOPIC_SELECTION' | 'REVEAL' | 'SORTING' | 'PLAYING' | 'VOTING' | 'RESULTS';

export interface Player {
    id: string;
    name: string;
    role: 'impostor' | 'citizen' | null;
    hasSeenRole: boolean;
}

interface GameState {
    phase: GamePhase;
    players: Player[];
    location: string | null;
    impostorId: string | null;
    roundDuration: number; // in seconds

    // For Reveal Phase
    currentRevealIndex: number;
    usedLocations: Record<string, string[]>;
    currentTopicId: string | null;

    // Actions
    addPlayer: (name: string) => void;
    removePlayer: (id: string) => void;
    setDuration: (seconds: number) => void;
    startGame: () => void; // Moves to Topic Selection
    selectTopicAndStart: (topicId: string) => void; // Actually starts the game logic
    nextReveal: () => void; // Move to next player to reveal
    markRoleSeen: () => void; // Current player saw role
    startTimer: () => void;
    startVoting: () => void;
    endGame: () => void;
    resetGame: () => void;
}

export const useGameStore = create<GameState>()(
    persist(
        (set, get) => ({
            phase: 'LOBBY',
            players: [],
            location: null,
            impostorId: null,
            roundDuration: 300, // 5 mins default
            usedLocations: {}, // topicId -> list of used locations
            currentRevealIndex: 0,
            currentTopicId: null,

            addPlayer: (name) => set((state) => ({
                players: [
                    ...state.players,
                    {
                        id: Math.random().toString(36).substring(2, 9),
                        name,
                        role: null,
                        hasSeenRole: false
                    }
                ]
            })),

            removePlayer: (id) => set((state) => ({
                players: state.players.filter(p => p.id !== id)
            })),

            setDuration: (seconds) => set({ roundDuration: seconds }),

            startGame: () => {
                const { players } = get();
                if (players.length < 3) return; // Minimum 3 players
                set({ phase: 'TOPIC_SELECTION' });
            },

            selectTopicAndStart: (topicId) => {
                const { players, usedLocations } = get();
                const topic = TOPICS.find(t => t.id === topicId);

                if (!topic) return;

                // Filter out used locations
                const topicUsed = usedLocations[topicId] || [];
                const availableLocations = topic.locations.filter(loc => !topicUsed.includes(loc.name));

                // Reset used locations if all used
                if (availableLocations.length === 0) {
                    // Optionally reset just for this topic or handle differently
                    // For now let's reset this topic's history to allow replay
                    // But strictly following the logic, let's keep it simple:
                    // If we are here, it means we exhausted locations. 
                    // We should probably allow re-playing locations or reset the list.
                    // The previous logic had a return which blocked the game. 
                    // Let's reset the list for this topic so they can play again.
                }

                // Re-calculate available after potential reset or just pick random if empty?
                // Actually the UI handles the 'disabled' state. If we are here, we might want to be safe.
                // Let's fallback to full list if empty to avoid crash/stuck.
                const finalAvailable = availableLocations.length > 0 ? availableLocations : topic.locations;

                // Pick random location from available
                const locationObj = finalAvailable[Math.floor(Math.random() * finalAvailable.length)];
                const location = locationObj.name;

                // Update used locations
                const newUsedLocations = {
                    ...usedLocations,
                    [topicId]: [...topicUsed, location]
                };

                // Pick random impostor
                const impostorIndex = Math.floor(Math.random() * players.length);
                const impostorId = players[impostorIndex].id;

                // Assign roles
                const newPlayers = players.map((p, i) => ({
                    ...p,
                    role: (i === impostorIndex ? 'impostor' : 'citizen') as 'impostor' | 'citizen',
                    hasSeenRole: false
                }));

                set({
                    phase: 'REVEAL',
                    players: newPlayers,
                    location,
                    impostorId,
                    currentRevealIndex: 0,
                    usedLocations: newUsedLocations,
                    currentTopicId: topicId,
                    roundDuration: players.length * 60 // 1 minute per player
                });
            },

            markRoleSeen: () => {
                const { players, currentRevealIndex } = get();
                const newPlayers = [...players];
                newPlayers[currentRevealIndex].hasSeenRole = true;
                set({ players: newPlayers });
            },

            nextReveal: () => {
                const { currentRevealIndex, players } = get();
                if (currentRevealIndex + 1 >= players.length) {
                    // All revealed, start sorting lottery
                    set({ phase: 'SORTING' });
                } else {
                    set({ currentRevealIndex: currentRevealIndex + 1 });
                }
            },

            startTimer: () => {
                set({ phase: 'PLAYING' });
            },

            startVoting: () => {
                set({ phase: 'VOTING' });
            },

            endGame: () => {
                set({ phase: 'RESULTS' });
            },

            resetGame: () => set({
                phase: 'TOPIC_SELECTION'
                // We don't clear data here to allow 'Results' view to show info during exit animation.
                // All game data is overwritten in 'selectTopicAndStart' before the next game starts.
            })
        }),
        {
            name: 'impostor-game-storage', // name of the item in the storage (must be unique)
            partialize: (state) => ({ players: state.players, usedLocations: state.usedLocations }), // Persist only players and used locations history
        }
    )
);
