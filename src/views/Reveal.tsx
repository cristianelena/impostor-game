import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEXTS } from '../config/texts';

import { synth } from '../utils/synth';

export function Reveal() {
    const { players, currentRevealIndex, location, markRoleSeen, nextReveal } = useGameStore();
    const [isRevealed, setIsRevealed] = useState(false);

    const currentPlayer = players[currentRevealIndex];

    const handleReveal = () => {
        setIsRevealed(true);
        markRoleSeen();
        // Dramatic reveal sound
        synth.playTone(100, 0.5, 'square');
        setTimeout(() => synth.playTone(50, 1.0, 'sine'), 100);
    };

    const handleNext = () => {
        setIsRevealed(false);
        nextReveal();
    };

    if (!currentPlayer) return null;

    return (
        <div className="flex flex-col h-full items-center justify-center p-4 relative z-20">
            <AnimatePresence mode="wait">
                {!isRevealed ? (
                    <motion.div
                        key="pass"
                        initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.9, rotateX: -20 }}
                        transition={{ type: "spring", bounce: 0.4 }}
                        className="text-center space-y-8 w-full h-full flex flex-col"
                    >
                        <div>
                            <h2 className="text-2xl font-bold text-gray-400 uppercase tracking-widest mb-2">{TEXTS.reveal.passDeviceTo}</h2>
                            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 py-4">
                                {currentPlayer.name}
                            </div>
                        </div>

                        <div className="w-full flex-1 flex flex-col">
                            <div className="mx-auto w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mb-8 animate-pulse">
                                <Eye size={40} className="text-blue-400" />
                            </div>

                            <div className="flex-1" />

                            <Button size="lg" onClick={handleReveal} className="w-full py-6 text-xl mt-auto">
                                {TEXTS.reveal.revealRole}
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="role"
                        initial={{ opacity: 0, scale: 1.1, rotateY: 180 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 0.9, rotateY: -180 }}
                        className="text-center space-y-6 w-full perspective-1000 h-full flex flex-col"
                    >
                        <Card gradient className="py-16 border-2 border-white/20 shadow-2xl shadow-purple-500/20 flex flex-col items-center justify-center min-h-[400px]">
                            {currentPlayer.role === 'impostor' ? (
                                <div className="space-y-6 animate-in zoom-in duration-300">
                                    <div className="w-32 h-32 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
                                        <EyeOff size={64} className="text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-red-400 uppercase tracking-widest font-bold mb-2">{TEXTS.reveal.yourRole}</h3>
                                        <div className="text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">{TEXTS.reveal.impostor}</div>
                                    </div>
                                    <p className="text-gray-300 max-w-[200px] mx-auto">{TEXTS.reveal.impostorInstruction}</p>
                                </div>
                            ) : (
                                <div className="space-y-6 animate-in zoom-in duration-300">
                                    <div className="w-32 h-32 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center">
                                        <Eye size={64} className="text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-blue-400 uppercase tracking-widest font-bold mb-2">{TEXTS.results.location}</h3>
                                        <div className="text-4xl font-black text-white">{location}</div>
                                    </div>
                                    <p className="text-gray-300 max-w-[200px] mx-auto">{TEXTS.reveal.civilianInstruction}</p>
                                </div>
                            )}
                        </Card>

                        <div className="flex-1" />

                        <Button size="lg" variant="secondary" onClick={handleNext} className="w-full py-6 text-xl mt-auto">
                            {TEXTS.reveal.hideRole}
                        </Button>
                    </motion.div>
                )
                }
            </AnimatePresence >
        </div >
    );
}
