import { useGameStore } from '../store/gameStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Users } from 'lucide-react';
import { TEXTS } from '../config/texts';

export function Voting() {
    const { endGame } = useGameStore();

    return (
        <div className="flex flex-col h-full items-center justify-center p-4 space-y-8 relative z-20">
            <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto bg-yellow-500/20 rounded-full flex items-center justify-center animate-bounce">
                    <Users size={48} className="text-yellow-400" />
                </div>
                <h2 className="text-5xl font-black text-white drop-shadow-lg">{TEXTS.voting.timesUp}</h2>
                <p className="text-xl text-gray-300">{TEXTS.voting.discuss}</p>
            </div>

            <Card className="w-full text-center p-8 bg-yellow-500/10 border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                <p className="text-2xl font-bold text-yellow-100">{TEXTS.voting.whoIsImpostor}</p>
            </Card>

            <Button
                size="lg"
                onClick={endGame}
                className="w-full py-6 text-xl bg-yellow-600 hover:bg-yellow-500 text-black border-yellow-400/50 shadow-[0_0_20px_rgba(234,179,8,0.3)] font-black"
            >
                {TEXTS.voting.revealTruth}
            </Button>
        </div>
    );
}
