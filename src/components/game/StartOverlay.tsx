import { Play } from "lucide-react";

type Props = {
    photosReady: boolean;
    photosCount: number;
    onStart: () => void;
    onAddPhotos: () => void;
};

export function StartOverlay({
    photosReady,
    photosCount,
    onStart,
    onAddPhotos,
}: Props) {
    return (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="py-9 px-6 md:px-14 flex flex-col items-center gap-4 bg-white rounded-2xl text-center s">
                {photosReady ? (
                    <>
                        <span className="text-5xl animate-bounce">🎴</span>
                        <p className="font-bold text-lg text-primary leading-relaxed">
                            24 картки · 12 пар спогадів
                            <br />
                            не більше{" "}
                            <span className="text-primary">30 ходів</span> · 2
                            хвилини
                        </p>
                        <button
                            onClick={onStart}
                            className="flex items-center gap-2.5 bg-linear-to-r from-primary to-pink-600 text-white
                         font-bold text-lg px-10 py-4 rounded-full shadow-lg cursor-pointer
                         hover:scale-105 active:scale-95 transition-transform"
                        >
                            Почати гру
                            <Play fill="white" />
                        </button>
                    </>
                ) : (
                    <>
                        <span className="text-5xl animate-bounce">📷</span>
                        <p className="font-bold text-xl text-primary leading-relaxed">
                            Спочатку додай свої фото вище ↑
                        </p>
                        <p className="text-lgleading-relaxed">
                            Гра відкриється, коли всі{" "}
                            <span className="font-bold">6 фотографій</span>{" "}
                            будуть додані
                        </p>
                        <p className="text-primary">
                            Додано:{" "}
                            <span className="font-bold text-pink-500">
                                {photosCount} / 6
                            </span>
                        </p>
                        <button
                            onClick={onAddPhotos}
                            className="bg-linear-to-r from-primary to-pink-600 text-white
                         font-bold px-8 py-3 rounded-full shadow-md cursor-pointer
                         hover:scale-105 transition-transform"
                        >
                            ＋ Додати фото
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
