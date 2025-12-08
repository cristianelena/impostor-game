import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Trash2, UserPlus, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEXTS } from '../config/texts';

export function Lobby() {
    const [name, setName] = useState('');
    const { players, addPlayer, removePlayer, startGame } = useGameStore();

    const handleAdd = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (name.trim()) {
            addPlayer(name.trim());
            setName('');
        }
    };

    return (
        <div className="flex flex-col gap-6 h-full">
            <div className="text-center space-y-2 pt-8">
                <h1 className="text-5xl font-black bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text tracking-tighter">
                    {TEXTS.lobby.title}
                </h1>
                <p className="text-gray-400 font-medium">{TEXTS.lobby.subtitle}</p>
            </div>

            <Card className="flex-1 flex flex-col gap-4 overflow-hidden shadow-2xl shadow-purple-900/20">
                <form onSubmit={handleAdd} className="flex gap-2">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={TEXTS.lobby.inputPlaceholder}
                        className="flex-1 bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:bg-zinc-800/80 transition-colors"
                    />
                    <Button type="submit" size="sm" variant="secondary" disabled={!name.trim()} className="aspect-square px-0 w-12">
                        <UserPlus size={20} />
                    </Button>
                </form>

                <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <AnimatePresence mode="popLayout">
                        {players.map((p) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                layout
                                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group"
                            >
                                <span className="font-semibold text-lg">{p.name}</span>
                                <button
                                    onClick={() => removePlayer(p.id)}
                                    className="text-white/30 hover:text-red-400 p-2 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {players.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50 space-y-2">
                            <UserPlus size={48} />
                            <p>{TEXTS.lobby.emptyState}</p>
                        </div>
                    )}
                </div>
            </Card>

            <div className="flex-1 min-h-4" /> {/* Spacer */}

            <div className="pb-4 mt-auto">
                <Button
                    size="lg"
                    onClick={startGame}
                    disabled={players.length < 3}
                    className="w-full shadow-lg shadow-blue-500/20 py-6 text-xl"
                >
                    <Play size={24} className={players.length >= 3 ? "fill-white" : ""} /> {TEXTS.lobby.startGame}
                </Button>
            </div>
        </div>
    );
}
