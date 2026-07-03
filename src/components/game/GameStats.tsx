import { Repeat2 } from "lucide-react";

type Props = {
    moves: number;
    matched: number;
    timeLeft: number;
    onRestart: () => void;
};

export function GameStats({ moves, matched, timeLeft, onRestart }: Props) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const timerColor =
        timeLeft > 60
            ? "text-green-600"
            : timeLeft > 20
              ? "text-orange-500"
              : "text-red-500";

    return (
        <div className="flex gap-3 justify-center flex-wrap mt-20 mb-10 px-4">
            <div className="flex flex-col items-center px-4 py-2 bg-white rounded-2xl shadow-sm min-w-17">
                <span className="font-bold text-2xl text-primary tabular-nums">
                    {moves}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    ходів
                </span>
            </div>

            <div className="flex flex-col items-center px-4 py-2 bg-white rounded-2xl shadow-sm min-w-20">
                <span className="font-bold text-2xl text-primary">
                    {matched} / 12
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    пар знайдено
                </span>
            </div>

            <div className="flex flex-col items-center px-4 py-2 bg-white rounded-2xl shadow-sm min-w-20">
                <span
                    className={`font-bold text-2xl tabular-nums transition-colors duration-500 ${timerColor}`}
                >
                    {String(minutes).padStart(2, "0")}:
                    {String(seconds).padStart(2, "0")}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    залишилось
                </span>
            </div>

            <button
                onClick={onRestart}
                className="px-4 py-2 flex items-center gap-2 border border-primary text-primary font-bold
                   rounded-full cursor-pointer hover:bg-primary hover:text-white transition-colors"
            >
                <Repeat2 />
                Заново
            </button>
        </div>
    );
}
