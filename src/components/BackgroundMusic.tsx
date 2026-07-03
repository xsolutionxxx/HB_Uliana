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
    const [expanded, setExpanded] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);
    const trackIdx = 0;
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

    // Close on outside click
    useEffect(() => {
        if (!expanded) return;
        const handler = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                setExpanded(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [expanded]);

    const togglePlay = useCallback(() => {
        const a = audioRef.current;
        if (!a) return;
        if (playing) { a.pause(); setPlaying(false); }
        else { a.play().catch(() => {}); setPlaying(true); }
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
                ref={panelRef}
                className="fixed top-4 right-4 z-50 flex items-center gap-2"
            >
                {/* Панель керування */}
                <div
                    className={`flex items-center gap-2 bg-white/90 backdrop-blur-md
                                rounded-2xl px-3 py-2 shadow-lg border border-primary/20
                                transition-all duration-300 overflow-hidden
                                ${expanded
                                    ? "opacity-100 max-w-[300px] pointer-events-auto"
                                    : "opacity-0 max-w-0 px-0 pointer-events-none"
                                }`}
                >
                    {/* Play/Pause */}
                    <button
                        onClick={togglePlay}
                        className="text-primary/80 hover:text-primary cursor-pointer shrink-0 transition-colors"
                    >
                        {playing ? <Pause size={15} /> : <Play size={15} />}
                    </button>

                    {/* Назва + прогрес */}
                    <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-[10px] font-semibold text-primary truncate max-w-[120px] sm:max-w-[150px]">
                            {track.name}
                        </span>
                        <div className="flex items-center gap-1">
                            <span className="text-[9px] text-primary/50 shrink-0 tabular-nums w-7">
                                {formatTime(currentTime)}
                            </span>
                            <input
                                type="range"
                                min={0}
                                max={duration || 1}
                                step={0.1}
                                value={currentTime}
                                onChange={handleSeek}
                                className="w-20 sm:w-28 accent-primary cursor-pointer"
                                style={{ height: "3px" }}
                            />
                            <span className="text-[9px] text-primary/50 shrink-0 tabular-nums w-7">
                                {formatTime(duration)}
                            </span>
                        </div>
                    </div>

                    {/* Гучність */}
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

                {/* Головна кнопка — клік відкриває/закриває */}
                <button
                    onClick={() => setExpanded((s) => !s)}
                    title={expanded ? "Сховати плеєр" : "Відкрити плеєр"}
                    className="flex items-center justify-center w-10 h-10 rounded-full
                               bg-white/85 backdrop-blur-sm shadow-md border border-primary/20
                               text-primary/70 hover:text-primary hover:bg-white
                               cursor-pointer transition-all active:scale-90 shrink-0"
                >
                    {playing ? <Pause size={16} /> : <Music size={16} />}
                </button>
            </div>
        </>
    );
}
