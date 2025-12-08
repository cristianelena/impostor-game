import { useGameStore } from '../store/gameStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { TEXTS } from '../config/texts';

export function Results() {
    const { impostorId, players, location, resetGame } = useGameStore();
    const impostor = players.find(p => p.id === impostorId);

    return (
        <div className="flex flex-col h-full items-center justify-center p-4 space-y-8 relative z-20">
            <div className="text-center">
                <h2 className="text-gray-400 uppercase tracking-widest mb-8 text-sm font-semibold">{TEXTS.results.impostorWas}</h2>
                <motion.div
                    initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-orange-500 mb-6 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]"
                >
                    {impostor?.name || TEXTS.results.unknown}
                </motion.div>
            </div>

            <Card className="w-full text-center space-y-2 py-8 bg-blue-500/10 border-blue-500/20">
                <p className="text-gray-400 text-sm uppercase tracking-widest">{TEXTS.results.location}</p>
                <div className="text-4xl font-bold text-blue-300">{location}</div>
            </Card>

            <Button size="lg" onClick={resetGame} variant="outline" className="w-full py-4 mt-8">
                <RotateCcw size={20} /> {TEXTS.results.playAgain}
            </Button>
        </div>
    );
}
