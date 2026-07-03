import { useState, useEffect, useCallback } from "react";
import Petals from "./ui/Petals";
import useHeroDecor from "../hooks/useHeroDecor";

const BIRTHDAY = new Date("2026-07-04T03:00:00+03:00");

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
} | null;

function calcTimeLeft(): TimeLeft {
    const diff = BIRTHDAY.getTime() - Date.now();
    if (diff <= 0) return null;
    return {
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff / 3_600_000) % 24),
        minutes: Math.floor((diff / 60_000) % 60),
        seconds: Math.floor((diff / 1_000) % 60),
    };
}

function pad(n: number) {
    return String(n).padStart(2, "0");
}

type Props = {
    onUnlock: () => void;
};

export default function CountdownOverlay({ onUnlock }: Props) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft);
    const [celebrating, setCelebrating] = useState(false);
    const { layers, orbs } = useHeroDecor();

    useEffect(() => {
        const id = setInterval(() => {
            const t = calcTimeLeft();
            setTimeLeft(t);
            if (t === null && !celebrating) {
                setCelebrating(true);
            }
        }, 1000);
        return () => clearInterval(id);
    }, [celebrating]);

    const handleUnlock = useCallback(() => {
        onUnlock();
    }, [onUnlock]);

    const isCountingDown = timeLeft !== null;

    return (
        <div
            className="fixed inset-0 z-100 flex flex-col items-center justify-center overflow-hidden select-none"
            style={{
                background:
                    "radial-gradient(120% 90% at 50% 0%, #ffe6ee, #fff2f6 42%, #fff6f8)",
            }}
        >
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <Petals />

                <div
                    className="absolute left-1/2 top-1/2 h-[min(82vw,820px)] w-[min(82vw,820px)]
                        animate-glowPulse rounded-full blur-[10px]
                        [background:radial-gradient(circle,rgba(250,200,217,.42),rgba(250,200,217,.14)_46%,transparent_72%)]"
                    style={{ transform: "translate(-50%,-50%)" }}
                />

                {orbs.map((o, i) => (
                    <div
                        key={i}
                        className="absolute animate-orbFloat rounded-full blur-[0.5px]
                           shadow-[0_12px_26px_rgba(226,109,146,.1)]
                           [background:radial-gradient(circle_at_32%_30%,rgba(255,255,255,.6),rgba(250,200,217,.4)_45%,rgba(238,170,193,.16))]"
                        style={{
                            left: o.left,
                            top: o.top,
                            width: o.size,
                            height: o.size,
                            animationDuration: o.duration,
                            animationDelay: o.delay,
                        }}
                    />
                ))}

                <div className="absolute inset-0 top-[-20%] flex items-center justify-center perspective-distant">
                    <div className="relative animate-wobble blur-[3px] transform-3d">
                        {layers.map((l, i) => (
                            <span
                                key={i}
                                className="absolute left-1/2 top-1/2 m-0 select-none whitespace-nowrap
                                   font-playfair font-extrabold leading-[0.8] tracking-[-.04em]
                                   text-[clamp(200px,40vw,680px)]"
                                style={{
                                    color: l.color,
                                    transform: `translate(-50%,-50%) translateZ(${l.z}px)`,
                                }}
                            >
                                20
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 px-6 text-center">
                <span className="text-5xl sm:text-6xl animate-bounce">
                    {celebrating ? "🎂" : "🎀"}
                </span>

                <p className="font-bold text-xs sm:text-sm tracking-[0.28em] uppercase text-primary">
                    {celebrating ? "З днем народження" : "Ще трішечки"}
                </p>

                <h1 className="font-caveat font-black text-[clamp(60px,18vw,160px)] text-primary leading-none">
                    Юліаночка
                </h1>

                {celebrating ? (
                    <div className="flex flex-col items-center gap-5 sm:gap-7">
                        <p className="font-caveat text-[clamp(20px,4vw,34px)] text-title max-w-sm leading-snug">
                            Твій подарунок готовий, сонечко! 🌸
                        </p>
                        <button
                            onClick={handleUnlock}
                            className="bg-primary text-white font-bold text-lg sm:text-xl
                                       px-10 py-4 rounded-full shadow-xl
                                       hover:scale-105 active:scale-95 transition-transform animate-pulse"
                        >
                            Відкрити подарунок 🎁
                        </button>
                    </div>
                ) : (
                    <>
                        <p className="font-caveat text-[clamp(16px,3.5vw,36px)] text-title">
                            До твого дня народження залишилось
                        </p>

                        {timeLeft && (
                            <div className="flex gap-2 sm:gap-3">
                                {[
                                    { value: timeLeft.days, label: "Днів" },
                                    { value: timeLeft.hours, label: "Годин" },
                                    {
                                        value: timeLeft.minutes,
                                        label: "Хвилин",
                                    },
                                    {
                                        value: timeLeft.seconds,
                                        label: "Секунд",
                                    },
                                ].map(({ value, label }) => (
                                    <div
                                        key={label}
                                        className="flex flex-col items-center bg-white/80 backdrop-blur-sm
                                                   rounded-2xl px-3 sm:px-5 py-3 sm:py-4 shadow-md
                                                   min-w-[60px] sm:min-w-[80px]"
                                    >
                                        <span className="font-playfair font-black text-[clamp(28px,7vw,52px)] text-primary leading-none tabular-nums">
                                            {label === "Секунд"
                                                ? pad(value)
                                                : value}
                                        </span>
                                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary mt-1">
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <p className="text-sm sm:text-base text-text mt-1">
                            Цей подарунок відкриється у твій ювілей
                        </p>
                    </>
                )}
            </div>

            {/* Підказка внизу */}
            {isCountingDown && (
                <p className="absolute bottom-8 sm:bottom-10 text-xs sm:text-sm text-primary/60 z-10 text-center px-6">
                    Готуй спогади — скоро ти все побачиш ✨
                </p>
            )}

        </div>
    );
}
