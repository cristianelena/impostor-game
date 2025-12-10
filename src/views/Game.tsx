import { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { RotateCcw } from 'lucide-react';
import { TEXTS } from '../config/texts';

import { TOPICS } from '../config/topics';

import { synth } from '../utils/synth';
import { useWakeLock } from '../hooks/useWakeLock';

export function Game() {
    const { roundDuration, resetGame, startVoting, currentTopicId } = useGameStore();
    const [timeLeft, setTimeLeft] = useState(roundDuration);

    // Prevent screen from sleeping during game
    useWakeLock();

    const topicName = TOPICS.find(t => t.id === currentTopicId)?.name || 'Desconocido';

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Sound Effect Logic
    useEffect(() => {
        if (timeLeft === 0) {
            // Alarm
            synth.playTone(880, 0.2, 'square');
            setTimeout(() => synth.playTone(880, 0.2, 'square'), 300);
            setTimeout(() => synth.playTone(880, 0.2, 'square'), 600);
        } else if (timeLeft <= 10) {
            // Tick
            synth.playClick('soft');
        }
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const progress = (timeLeft / roundDuration) * 100;

    return (
        <div className="flex flex-col h-full items-center justify-between py-8 relative z-20">
            <div className="text-center w-full space-y-8">
                <div>
                    <h2 className="text-gray-400 uppercase tracking-widest text-sm mb-2">{TEXTS.game.timeRemaining}</h2>
                    <div className="text-8xl font-black font-mono tabular-nums tracking-tighter">
                        {formatTime(timeLeft)}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Topic Info */}
                <Card className="mt-8 bg-zinc-800/30">
                    <p className="text-gray-400 text-sm mb-2">{TEXTS.game.topicLocation}</p>
                    <p className="text-xl font-bold text-white">
                        {topicName}
                    </p>
                </Card>
            </div>

            <div className="flex-1" />

            <div className="w-full grid gap-4 mt-auto">
                <Button variant="ghost" onClick={resetGame} className="text-white/30">
                    <RotateCcw size={16} /> {TEXTS.game.reset}
                </Button>
                {timeLeft === 0 ? (
                    <Button size="lg" variant="primary" onClick={startVoting} className="w-full py-6 text-xl">
                        {TEXTS.game.voteNow}
                    </Button>
                ) : (
                    <Button size="lg" variant="danger" onClick={startVoting} className="w-full py-6 text-xl">
                        {TEXTS.game.endGameEarly}
                    </Button>
                )}
            </div>
        </div>
    );
}
