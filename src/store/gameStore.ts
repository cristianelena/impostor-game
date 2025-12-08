import { create } from 'zustand';
import { TOPICS } from '../config/topics';

export type GamePhase = 'LOBBY' | 'TOPIC_SELECTION' | 'REVEAL' | 'PLAYING' | 'VOTING' | 'RESULTS';

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

export const useGameStore = create<GameState>((set, get) => ({
    phase: 'LOBBY',
    players: [],
    location: null,
    impostorId: null,
    roundDuration: 300, // 5 mins default
    usedLocations: {}, // topicId -> list of used locations
    currentRevealIndex: 0,

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
        const availableLocations = topic.locations.filter(loc => !topicUsed.includes(loc));

        if (availableLocations.length === 0) return; // Should not happen if UI handles it

        // Pick random location from available
        const location = availableLocations[Math.floor(Math.random() * availableLocations.length)];

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
            usedLocations: newUsedLocations
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
            // All revealed, start game
            set({ phase: 'PLAYING' });
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
        phase: 'TOPIC_SELECTION',
        location: null,
        impostorId: null,
        currentRevealIndex: 0,
        players: get().players.map(p => ({ ...p, role: null, hasSeenRole: false }))
    })
}));
