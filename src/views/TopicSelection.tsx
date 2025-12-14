import { useGameStore } from '../store/gameStore';
import { Card } from '../components/ui/Card';
import { TOPICS } from '../config/topics';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export function TopicSelection() {
    const { selectTopicAndStart, usedLocations } = useGameStore();

    return (
        <div className="flex flex-col h-full gap-6 relative z-20">
            <button
                onClick={() => window.history.back()}
                className="absolute top-4 right-4 z-50 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Volver al lobby"
            >
                <X size={24} className="text-white/70" />
            </button>
            <div className="text-center space-y-2 pt-8">
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Elige un Tema
                </h2>
                <p className="text-gray-400">¿Dónde quieres jugar?</p>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 pr-2 pb-4 grid grid-cols-1 gap-4">
                {TOPICS.map((topic, index) => {
                    const isExhausted = (usedLocations[topic.id]?.length || 0) >= topic.locations.length;

                    return (
                        <motion.div
                            key={topic.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card
                                onClick={() => !isExhausted && selectTopicAndStart(topic.id)}
                                className={`
                                    border transition-all cursor-pointer group
                                    ${isExhausted
                                        ? 'bg-red-900/10 border-red-500/10 opacity-50 cursor-not-allowed'
                                        : 'bg-white/5 border-white/5 active:bg-white/10 active:border-blue-500/50 active:scale-95'
                                    }
                                `}
                            >
                                <div className="flex items-center gap-4 p-2">
                                    <div className="text-4xl">
                                        {topic.emoji}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className={`font-bold text-lg transition-colors ${isExhausted ? 'text-gray-500' : 'text-white group-hover:text-blue-300'}`}>
                                            {topic.name} {isExhausted && '(Agotado)'}
                                        </h3>
                                        <p className={`text-sm ${isExhausted ? 'text-red-900/50' : 'text-gray-400 group-hover:text-gray-300'}`}>
                                            {topic.description}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
