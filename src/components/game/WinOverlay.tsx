import { GAME_TIME } from "../../hooks/useGameLogic";
import { ElephantMascot } from "../ElephantMascot";

type Props = {
    moves: number;
    timeLeft: number;
    onRestart: () => void;
    onClose: () => void;
};

export function WinOverlay({ moves, timeLeft, onRestart, onClose }: Props) {
    const timeUsed = GAME_TIME - timeLeft;
    const minutes = Math.floor(timeUsed / 60);
    const seconds = timeUsed % 60;
    const timeStr =
        minutes > 0
            ? `${minutes} хв ${String(seconds).padStart(2, "0")} с`
            : `${timeUsed} с`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-md overflow-y-auto">
            <div className="relative my-auto max-w-2xl w-full">
                {/* декоративне сяйво позаду картки */}
                <div
                    className="pointer-events-none absolute -inset-6 sm:-inset-10 -z-10 animate-glow-pulse rounded-[3rem] blur-2xl"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(250,200,217,.55), rgba(250,200,217,.18) 55%, transparent 75%)",
                    }}
                />

                <div className="animate-elephant-bounce flex flex-col md:flex-row items-center gap-4 sm:gap-8 bg-white rounded-3xl p-5 sm:p-8 shadow-2xl ring-1 ring-pink-200/70 w-full">
                    <div className="shrink-0">
                        <ElephantMascot
                            emotion="down-heart"
                            speech="Я все згадав! Це ти — Юліаночка! Тримай, це для тебе! 💝"
                            width={220}
                        />
                    </div>

                    <div className="animate-letter-unfold relative flex-1 w-full rounded-2xl border-2 border-pink-200 bg-[#fff9fb] p-4 sm:p-6 text-left shadow-inner">
                        <span className="absolute -top-3.5 left-6 bg-white px-2 text-lg leading-none">
                            💌
                        </span>

                        <p className="font-caveat text-[28px] font-bold text-pink-800 mb-4">
                            Юліаночко,
                        </p>
                        <p className="font-caveat text-[20px] text-pink-700 leading-relaxed mb-3">
                            Я так радий, що пригадав! Бо без тебе моє серце б заблукало…
                        </p>
                        <p className="font-caveat text-[20px] text-pink-700 leading-relaxed mb-3">
                            З Днем народження, моє сонечко! 🎂 Ти — найкраще, що зі мною сталося.
                            Твоя посмішка робить кожен день яскравішим, а твій сміх є найкращою
                            музикою у світі.
                        </p>
                        <p className="font-caveat text-[20px] text-pink-700 leading-relaxed mb-5">
                            Дякую за кожен момент, за тепло, яке ти даруєш. Вперед — до нових
                            спільних спогадів! 💕
                        </p>
                        <p className="font-caveat text-[22px] font-bold text-pink-800">
                            З любов'ю, твій слонік 🐘
                        </p>

                        <p className="mt-4 text-xs text-pink-300 text-right">
                            {moves} ходів · {timeStr}
                        </p>

                        <div className="mt-5 flex flex-wrap justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="border border-pink-200 text-pink-500 font-bold
                                           px-6 py-2.5 rounded-full hover:bg-pink-50 cursor-pointer
                                           transition-colors text-sm"
                            >
                                Закрити
                            </button>
                            <button
                                onClick={onRestart}
                                className="bg-primary text-white font-bold px-7 py-2.5 rounded-full
                                           shadow-md cursor-pointer hover:scale-105 active:scale-95
                                           transition-transform text-sm"
                            >
                                Зіграти ще
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
