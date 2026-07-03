import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

function VinylDisc({ spinning }: { spinning: boolean }) {
    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            style={{
                animation: spinning ? "vinyl-spin 2.4s linear infinite" : "none",
                filter: "drop-shadow(0 2px 6px rgba(180,90,130,0.35))",
            }}
        >
            <style>{`
                @keyframes vinyl-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
            {/* Outer disc */}
            <circle cx="20" cy="20" r="19" fill="#e8749a" />
            {/* Groove rings */}
            <circle cx="20" cy="20" r="16" fill="none" stroke="#c95882" strokeWidth="0.7" opacity="0.6" />
            <circle cx="20" cy="20" r="13" fill="none" stroke="#c95882" strokeWidth="0.7" opacity="0.6" />
            <circle cx="20" cy="20" r="10" fill="none" stroke="#c95882" strokeWidth="0.7" opacity="0.6" />
            <circle cx="20" cy="20" r="7"  fill="none" stroke="#c95882" strokeWidth="0.7" opacity="0.6" />
            {/* Label area */}
            <circle cx="20" cy="20" r="5.5" fill="#fff0f5" />
            <circle cx="20" cy="20" r="5.5" fill="none" stroke="#f0b0c8" strokeWidth="0.5" />
            {/* Center hole */}
            <circle cx="20" cy="20" r="1.4" fill="#c95882" />
            {/* Shine */}
            <ellipse cx="13" cy="13" rx="3.5" ry="2" fill="white" opacity="0.15" transform="rotate(-30 13 13)" />
        </svg>
    );
}

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

            {/* ── Мобільний плеєр (< sm) ── */}
            <div className="sm:hidden">
                {expanded ? (
                    /* Розгорнута панель — повна ширина */
                    <div className="fixed top-0 left-0 right-0 z-50
                                    flex items-center gap-3 px-4 py-3
                                    bg-white/95 backdrop-blur-md shadow-lg border-b border-primary/20">
                        {/* Пластинка — тап закриває */}
                        <button
                            onClick={() => setExpanded(false)}
                            className="cursor-pointer active:scale-90 transition-transform shrink-0"
                        >
                            <VinylDisc spinning={playing} />
                        </button>

                        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-[11px] font-semibold text-primary truncate">
                                    {track.name}
                                </span>
                                <button onClick={togglePlay} className="text-primary cursor-pointer shrink-0">
                                    {playing ? <Pause size={16} /> : <Play size={16} />}
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] text-primary/50 tabular-nums w-7 shrink-0">{formatTime(currentTime)}</span>
                                <input type="range" min={0} max={duration || 1} step={0.1} value={currentTime}
                                    onChange={handleSeek} className="flex-1 accent-primary cursor-pointer" style={{ height: "3px" }} />
                                <span className="text-[9px] text-primary/50 tabular-nums w-7 shrink-0 text-right">{formatTime(duration)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setMuted((m) => !m)} className="text-primary/60 cursor-pointer shrink-0">
                                    {muted || volume === 0 ? <VolumeX size={13} /> : <Volume2 size={13} />}
                                </button>
                                <input type="range" min={0} max={1} step={0.01} value={muted ? 0 : volume}
                                    onChange={(e) => { const v = parseFloat(e.target.value); setVolume(v); if (v > 0) setMuted(false); }}
                                    className="flex-1 accent-primary cursor-pointer" style={{ height: "3px" }} />
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Згорнута — пластинка вгорі зліва */
                    <button
                        onClick={() => setExpanded(true)}
                        className="fixed top-4 left-4 z-50 cursor-pointer active:scale-90 transition-transform"
                    >
                        <VinylDisc spinning={playing} />
                    </button>
                )}
            </div>

            {/* ── Десктоп плеєр (sm+) ── */}
            <div ref={panelRef} className="hidden sm:flex fixed top-4 right-4 z-50 items-center gap-2">
                <div className={`flex items-center gap-2 bg-white/90 backdrop-blur-md
                                rounded-2xl px-3 py-2 shadow-lg border border-primary/20
                                transition-all duration-300 overflow-hidden
                                ${expanded ? "opacity-100 max-w-[300px] pointer-events-auto" : "opacity-0 max-w-0 px-0 pointer-events-none"}`}>
                    <button onClick={togglePlay} className="text-primary/80 hover:text-primary cursor-pointer shrink-0 transition-colors">
                        {playing ? <Pause size={15} /> : <Play size={15} />}
                    </button>
                    <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-[10px] font-semibold text-primary truncate max-w-[150px]">{track.name}</span>
                        <div className="flex items-center gap-1">
                            <span className="text-[9px] text-primary/50 shrink-0 tabular-nums w-7">{formatTime(currentTime)}</span>
                            <input type="range" min={0} max={duration || 1} step={0.1} value={currentTime}
                                onChange={handleSeek} className="w-28 accent-primary cursor-pointer" style={{ height: "3px" }} />
                            <span className="text-[9px] text-primary/50 shrink-0 tabular-nums w-7">{formatTime(duration)}</span>
                        </div>
                    </div>
                    <button onClick={() => setMuted((m) => !m)} className="text-primary/60 hover:text-primary cursor-pointer shrink-0 transition-colors">
                        {muted || volume === 0 ? <VolumeX size={13} /> : <Volume2 size={13} />}
                    </button>
                    <input type="range" min={0} max={1} step={0.01} value={muted ? 0 : volume}
                        onChange={(e) => { const v = parseFloat(e.target.value); setVolume(v); if (v > 0) setMuted(false); }}
                        className="w-14 accent-primary cursor-pointer shrink-0" style={{ height: "3px" }} />
                </div>
                <button onClick={() => setExpanded((s) => !s)}
                    className="cursor-pointer active:scale-90 transition-transform shrink-0">
                    <VinylDisc spinning={playing} />
                </button>
            </div>
        </>
    );
}
