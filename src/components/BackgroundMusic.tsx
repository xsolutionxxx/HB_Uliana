import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [started, setStarted] = useState(false);
    const [showSlider, setShowSlider] = useState(false);

    useEffect(() => {
        const start = () => {
            if (started) return;
            audioRef.current?.play().catch(() => {});
            setStarted(true);
        };
        window.addEventListener("pointerdown", start, { once: true });
        window.addEventListener("keydown", start, { once: true });
        return () => {
            window.removeEventListener("pointerdown", start);
            window.removeEventListener("keydown", start);
        };
    }, [started]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = muted;
            audioRef.current.volume = volume;
        }
    }, [muted, volume]);

    return (
        <>
            <audio
                ref={audioRef}
                src="/djo-end-of-beginning.mp3"
                loop
                preload="auto"
                style={{ display: "none" }}
            />

            <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
                {/* Повзунок гучності */}
                {showSlider && (
                    <div className="flex items-center bg-white/80 backdrop-blur-sm
                                    rounded-full px-3 py-1.5 shadow-md border border-primary/20">
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={muted ? 0 : volume}
                            onChange={(e) => {
                                const v = parseFloat(e.target.value);
                                setVolume(v);
                                if (v > 0) setMuted(false);
                            }}
                            className="w-24 sm:w-32 accent-primary cursor-pointer"
                        />
                    </div>
                )}

                {/* Кнопка mute/unmute */}
                <button
                    onClick={() => {
                        setMuted((m) => !m);
                        setShowSlider((s) => !s);
                    }}
                    title={muted ? "Увімкнути музику" : "Вимкнути музику"}
                    className="flex items-center justify-center w-9 h-9 rounded-full
                               bg-white/80 backdrop-blur-sm shadow-md border border-primary/20
                               text-primary/70 hover:text-primary hover:bg-white
                               cursor-pointer transition-all active:scale-90"
                >
                    {muted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
            </div>
        </>
    );
}
