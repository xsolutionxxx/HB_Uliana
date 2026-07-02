import type { GameStatus } from "../../types/game";

type Props = {
    reason: Extract<GameStatus, "lost_time" | "lost_moves">;
    moves: number;
    matched: number;
    onRestart: () => void;
};

export function GameOverOverlay({ reason, moves, matched, onRestart }: Props) {
    const isTime = reason === "lost_time";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6
                    bg-black/50 backdrop-blur-md"
        >
            <div className="bg-white rounded-3xl p-10 text-center max-w-md w-full shadow-2xl">
                <div className="text-5xl mb-3">{isTime ? "⏰" : "🎴"}</div>
                <h3 className="text-2xl font-bold text-primary mb-2">
                    {isTime ? "Час вийшов!" : "Ходи скінчились!"}
                </h3>
                <p className="text-lg mb-6 leading-relaxed">
                    {isTime
                        ? "Ти не встигла знайти всі 12 пар вчасно. Але ти так близько!"
                        : "Ти використала всі 30 ходів, а пари ще лишились :( Спробуй ще раз, і ти обов'язково переможеш!"}
                </p>

                <div className="flex gap-4 justify-center mb-7">
                    <div className="bg-pink-50 rounded-xl px-5 py-2">
                        <div className="text-xl font-bold text-primary">
                            {matched} / 12
                        </div>
                        <div className="text-xs font-bold uppercase tracking-wider text-primary">
                            пар
                        </div>
                    </div>
                    <div className="bg-pink-50 rounded-xl px-5 py-2">
                        <div className="text-xl font-bold text-primary">
                            {moves}
                        </div>
                        <div className="text-xs font-bold uppercase tracking-wider text-primary">
                            ходів
                        </div>
                    </div>
                </div>

                <button
                    onClick={onRestart}
                    className="bg-linear-to-r from-primary to-pink-600 text-white
                     font-bold text-lg px-10 py-4 rounded-full shadow-lg cursor-pointer
                     hover:scale-105 transition-transform"
                >
                    Спробувати ще раз
                </button>
            </div>
        </div>
    );
}
