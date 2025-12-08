import { create } from 'zustand';

export type GamePhase = 'LOBBY' | 'REVEAL' | 'PLAYING' | 'VOTING' | 'RESULTS';

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

    // Actions
    addPlayer: (name: string) => void;
    removePlayer: (id: string) => void;
    setDuration: (seconds: number) => void;
    startGame: () => void;
    nextReveal: () => void; // Move to next player to reveal
    markRoleSeen: () => void; // Current player saw role
    startTimer: () => void;
    startVoting: () => void;
    endGame: () => void;
    resetGame: () => void;
}

import { TEXTS } from '../config/texts';

export const useGameStore = create<GameState>((set, get) => ({
    phase: 'LOBBY',
    players: [],
    location: null,
    impostorId: null,
    roundDuration: 300, // 5 mins default
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

        // Pick random location
        const location = TEXTS.locations[Math.floor(Math.random() * TEXTS.locations.length)];

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
            currentRevealIndex: 0
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
        // Just a placeholder if we need specific start logic, 
        // but switching to PLAYING usually implies timer start in the UI.
        set({ phase: 'PLAYING' });
    },

    startVoting: () => {
        set({ phase: 'VOTING' });
    },

    endGame: () => {
        set({ phase: 'RESULTS' });
    },

    resetGame: () => set({
        phase: 'LOBBY',
        location: null,
        impostorId: null,
        currentRevealIndex: 0,
        players: get().players.map(p => ({ ...p, role: null, hasSeenRole: false }))
    })
}));
