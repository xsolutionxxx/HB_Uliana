import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";

const PLAYLIST = [
    { src: "/djo-end-of-beginning.mp3", name: "Djo — End Of Beginning" },
];

function formatTime(s: number) {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);
    const [started, setStarted] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [trackIdx] = useState(0);

    const track = PLAYLIST[trackIdx];

    // Start on first user interaction
    useEffect(() => {
        const start = () => {
            if (started) return;
            audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
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
            audioRef.current.volume = volume;
            audioRef.current.muted = muted;
        }
    }, [volume, muted]);

    const togglePlay = useCallback(() => {
        const a = audioRef.current;
        if (!a) return;
        if (playing) {
            a.pause();
            setPlaying(false);
        } else {
            a.play().catch(() => {});
            setPlaying(true);
        }
    }, [playing]);

    const handleTimeUpdate = useCallback(() => {
        setCurrentTime(audioRef.current?.currentTime ?? 0);
    }, []);

    const handleLoadedMetadata = useCallback(() => {
        setDuration(audioRef.current?.duration ?? 0);
    }, []);

    const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const t = parseFloat(e.target.value);
        if (audioRef.current) audioRef.current.currentTime = t;
        setCurrentTime(t);
    }, []);

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <>
            <audio
                ref={audioRef}
                src={track.src}
                loop
                preload="auto"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                style={{ display: "none" }}
            />

            <div
                className="fixed top-4 right-4 z-50 flex items-center justify-end"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* Розгорнута панель — видно при наведенні */}
                <div
                    className={`flex items-center gap-2 bg-white/85 backdrop-blur-md
                                rounded-full px-3 py-2 shadow-md border border-primary/20
                                transition-all duration-300 overflow-hidden
                                ${hovered ? "opacity-100 max-w-xs mr-2" : "opacity-0 max-w-0 mr-0 pointer-events-none"}`}
                >
                    {/* Play/Pause */}
                    <button
                        onClick={togglePlay}
                        className="text-primary/80 hover:text-primary cursor-pointer shrink-0 transition-colors"
                    >
                        {playing ? <Pause size={15} /> : <Play size={15} />}
                    </button>

                    {/* Назва пісні + прогрес */}
                    <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-[10px] font-semibold text-primary truncate max-w-[130px]">
                            {track.name}
                        </span>
                        <div className="flex items-center gap-1.5">
                            <span className="text-[9px] text-primary/50 shrink-0 tabular-nums">
                                {formatTime(currentTime)}
                            </span>
                            <input
                                type="range"
                                min={0}
                                max={duration || 1}
                                step={0.1}
                                value={currentTime}
                                onChange={handleSeek}
                                className="w-20 accent-primary cursor-pointer"
                                style={{ height: "3px" }}
                            />
                            <span className="text-[9px] text-primary/50 shrink-0 tabular-nums">
                                {formatTime(duration)}
                            </span>
                        </div>
                    </div>

                    {/* Volume */}
                    <button
                        onClick={() => setMuted((m) => !m)}
                        className="text-primary/60 hover:text-primary cursor-pointer shrink-0 transition-colors"
                    >
                        {muted || volume === 0 ? <VolumeX size={13} /> : <Volume2 size={13} />}
                    </button>
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
                        className="w-14 accent-primary cursor-pointer shrink-0"
                        style={{ height: "3px" }}
                    />
                </div>

                {/* Іконка-кнопка завжди видна */}
                <button
                    onClick={togglePlay}
                    title={playing ? "Пауза" : "Грати"}
                    className="flex items-center justify-center w-9 h-9 rounded-full
                               bg-white/80 backdrop-blur-sm shadow-md border border-primary/20
                               text-primary/70 hover:text-primary hover:bg-white
                               cursor-pointer transition-all active:scale-90 shrink-0"
                >
                    {playing ? <Pause size={15} /> : <Music size={15} />}
                </button>
            </div>
        </>
    );
}
