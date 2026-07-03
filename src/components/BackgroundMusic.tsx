import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [muted, setMuted] = useState(false);
    const [started, setStarted] = useState(false);

    // Start on first user interaction
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
        }
    }, [muted]);

    return (
        <>
            <audio
                ref={audioRef}
                src="/djo-end-of-beginning.mp3"
                loop
                preload="auto"
                style={{ display: "none" }}
            />
            <button
                onClick={() => setMuted((m) => !m)}
                title={muted ? "Увімкнути музику" : "Вимкнути музику"}
                className="fixed top-3 right-3 z-50 flex items-center justify-center
                           w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm
                           shadow-md border border-primary/20
                           text-primary/70 hover:text-primary hover:bg-white
                           transition-all active:scale-90"
            >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
        </>
    );
}
