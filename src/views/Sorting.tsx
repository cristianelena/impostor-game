import { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { motion } from 'framer-motion';

export function Sorting() {
    const { players, startTimer } = useGameStore();
    const [displayPlayer, setDisplayPlayer] = useState('...');
    const [finalPlayer, setFinalPlayer] = useState<string | null>(null);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        let timeout: ReturnType<typeof setTimeout>;
        const duration = 4000; // Duration of shuffling

        // Shuffle animation
        interval = setInterval(() => {
            const randomPlayer = players[Math.floor(Math.random() * players.length)];
            setDisplayPlayer(randomPlayer.name);
        }, 100);

        // Pick winner and stop
        timeout = setTimeout(() => {
            clearInterval(interval);
            const winner = players[Math.floor(Math.random() * players.length)];
            setFinalPlayer(winner.name);
            setDisplayPlayer(winner.name);

            // Move to game after showing winner
            setTimeout(() => {
                startTimer();
            }, 3000);
        }, duration);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className="flex flex-col h-full items-center justify-center p-4 relative z-20 space-y-8">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-gray-400 uppercase tracking-widest">¿Quién comienza?</h2>

                <motion.div
                    key={displayPlayer}
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: finalPlayer ? 1.2 : 1, opacity: 1 }}
                    className={`text-5xl font-black ${finalPlayer ? 'text-green-400' : 'text-white'} transition-colors duration-300`}
                >
                    {displayPlayer}
                </motion.div>
            </div>

            {finalPlayer && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <p className="text-xl text-gray-300">¡Tú empiezas la ronda!</p>
                </motion.div>
            )}
        </div>
    );
}
