import { useGameStore } from '../store/gameStore';
import { Card } from '../components/ui/Card';
import { TOPICS } from '../config/topics';
import { motion } from 'framer-motion';

export function TopicSelection() {
    const { selectTopicAndStart } = useGameStore();

    return (
        <div className="flex flex-col h-full gap-6 relative z-20">
            <div className="text-center space-y-2 pt-8">
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Elige un Tema
                </h2>
                <p className="text-gray-400">¿Dónde quieres jugar?</p>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 pr-2 pb-4 grid grid-cols-1 gap-4">
                {TOPICS.map((topic, index) => (
                    <motion.div
                        key={topic.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card
                            onClick={() => selectTopicAndStart(topic.id)}
                            className="bg-white/5 border border-white/5 hover:bg-white/10 hover:border-blue-500/50 hover:scale-[1.02] transition-all cursor-pointer group active:scale-95"
                        >
                            <div className="flex items-center gap-4 p-2">
                                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                                    {topic.emoji}
                                </div>
                                <div className="flex-1 text-left">
                                    <h3 className="font-bold text-lg text-white group-hover:text-blue-300 transition-colors">
                                        {topic.name}
                                    </h3>
                                    <p className="text-sm text-gray-400 group-hover:text-gray-300">
                                        {topic.description}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
