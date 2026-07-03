import { useRef, useState } from "react";
import { ElephantMascot } from "./ElephantMascot";
import somersaultImg from "../assets/somersault-elephant.png";

type Props = {
    onElephantLand: () => void;
};

const PromoIntro = ({ onElephantLand }: Props) => {
    const [phase, setPhase] = useState<"idle" | "flying" | "gone">("idle");
    const elephantRef = useRef<HTMLDivElement>(null);
    const flyRef = useRef<HTMLImageElement>(null);

    const handleClick = () => {
        if (phase !== "idle") return;

        new Audio("/elephant.mp3").play().catch(() => {});

        const elephantEl = elephantRef.current;
        const baobabEl = document.querySelector<HTMLElement>('[data-baobab="right"]');
        if (!elephantEl || !baobabEl) return;

        const eRect = elephantEl.getBoundingClientRect();
        const bRect = baobabEl.getBoundingClientRect();

        const targetX = bRect.left + bRect.width * 0.15;
        const targetY = bRect.top + bRect.height * 0.38;

        const startX = eRect.left + eRect.width / 2 - 55;
        const startY = eRect.top + eRect.height / 2 - 55;

        setPhase("flying");

        requestAnimationFrame(() => {
            const el = flyRef.current;
            if (!el) return;

            const dx = targetX - 55 - startX;
            const dy = targetY - 55 - startY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const duration = Math.min(1600, Math.max(900, dist * 1.1));

            el.animate(
                [
                    { transform: `translate(${startX}px, ${startY}px) rotate(0deg)`, opacity: 1 },
                    { transform: `translate(${startX + dx * 0.35}px, ${startY + dy * 0.15 - 100}px) rotate(240deg)`, opacity: 1, offset: 0.4 },
                    { transform: `translate(${startX + dx * 0.72}px, ${startY + dy * 0.6 - 50}px) rotate(540deg)`, opacity: 1, offset: 0.75 },
                    { transform: `translate(${targetX - 55}px, ${targetY - 55}px) rotate(720deg)`, opacity: 1 },
                ],
                { duration, easing: "cubic-bezier(.4,0,.2,1)", fill: "forwards" }
            ).onfinish = () => {
                setPhase("gone");
                onElephantLand();
            };
        });
    };

    return (
        <div className="relative w-full" style={{ minHeight: "180px" }}>
            <img
                src="/pink-cloude.png"
                alt=""
                className="absolute -top-12 left-0 w-full pointer-events-none select-none z-0"
                style={{ height: "55%", objectFit: "fill", transform: "scaleX(-1)" }}
            />
            <img
                src="/pink-cloude.png"
                alt=""
                className="absolute top-0 left-0 w-full pointer-events-none select-none z-0"
                style={{ height: "60%", transform: "scaleY(-1)", objectFit: "fill" }}
            />
            <img
                src="/pink-cloude.png"
                alt=""
                className="absolute bottom-0 left-0 w-full pointer-events-none select-none z-0"
                style={{ height: "60%", objectFit: "fill" }}
            />
            <img
                src="/pink-cloude.png"
                alt=""
                className="absolute -bottom-8 left-0 w-full pointer-events-none select-none z-20"
                style={{ transform: "scaleY(-1)", height: "80px", objectFit: "fill" }}
            />

            <div className="relative z-10 flex items-center max-w-5xl mx-auto px-4 sm:px-10 py-6 sm:py-8">
                <div
                    ref={elephantRef}
                    className="shrink-0 flex items-end self-end z-10"
                    style={{
                        marginBottom: "-8px",
                        cursor: phase === "idle" ? "pointer" : "default",
                        opacity: phase === "gone" ? 0 : 1,
                        transition: "opacity 0.1s",
                    }}
                    onClick={handleClick}
                    title={phase === "idle" ? "Натисни на мене!" : undefined}
                >
                    <ElephantMascot emotion="default" width={110} className="sm:w-[140px]" />
                </div>

                <div className="relative flex-1 ml-4 sm:ml-6">
                    <svg
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full"
                        width="22" height="30" viewBox="0 0 22 30" fill="none"
                    >
                        <path d="M22 8 Q0 15 22 24Z" fill="white" stroke="#f0c0d8" strokeWidth="1.2" strokeLinejoin="round" />
                    </svg>
                    <div
                        className="w-full rounded-2xl sm:rounded-3xl px-5 py-4 sm:px-8 sm:py-5"
                        style={{
                            background: "white",
                            border: "1.5px solid #f0c0d8",
                            boxShadow: "0 4px 20px rgba(200,100,150,0.12)",
                        }}
                    >
                        <p className="font-caveat text-[clamp(16px,3.5vw,26px)] leading-snug text-gray-700">
                            З Днем народження, Юліаночко! 🎉 Я Слонік і я так довго
                            чекав цього дня! Мені доручено передати тобі{" "}
                            <span className="text-primary font-bold">листа від твого Назарка</span>
                            . Та перед цим давай разом згадаємо{" "}
                            <span className="text-primary font-bold">ваші найтепліші моменти!</span>
                            &nbsp;💕
                        </p>
                    </div>
                </div>
            </div>

            {phase === "flying" && (
                <img
                    ref={flyRef}
                    src={somersaultImg}
                    alt=""
                    draggable={false}
                    className="pointer-events-none select-none"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: 110,
                        height: "auto",
                        zIndex: 9999,
                        mixBlendMode: "multiply",
                        transformOrigin: "center center",
                    }}
                />
            )}
        </div>
    );
};

export default PromoIntro;
