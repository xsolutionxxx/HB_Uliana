import { useEffect, useRef } from "react";

type Heart = {
    el: HTMLSpanElement;
    x: number;
    y: number;
    vx: number;
    vy: number;
    rot: number;
    vr: number;
};

const EMOJIS = ["💖", "💕", "💗", "❤️", "💞", "🌸"];

function HeartBurst({
    sourceRef,
}: {
    sourceRef: React.RefObject<HTMLElement | null>;
}) {
    const layerRef = useRef<HTMLDivElement>(null);
    const hearts = useRef<Heart[]>([]);
    const rafRef = useRef<number | null>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    function spawnHearts(
        ox: number,
        oy: number,
        count: number,
        { up = 3, spread = 1.0, sMin = 7, sMax = 15 } = {},
    ) {
        const layer = layerRef.current;
        if (!layer) return;
        for (let i = 0; i < count; i++) {
            const el = document.createElement("span");
            el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
            el.style.cssText = `position:absolute;left:0;top:0;font-size:${(18 + Math.random() * 22) | 0}px;pointer-events:none;will-change:transform,opacity;`;
            layer.appendChild(el);
            const ang = -Math.PI / 2 + (Math.random() * 2 - 1) * spread;
            const speed = sMin + Math.random() * (sMax - sMin);
            hearts.current.push({
                el,
                x: ox,
                y: oy,
                vx: Math.cos(ang) * speed,
                vy: Math.sin(ang) * speed - up,
                rot: (Math.random() * 2 - 1) * 40,
                vr: (Math.random() * 2 - 1) * 7,
            });
        }
        if (!rafRef.current) runLoop();
    }

    function runLoop() {
        const g = 0.34,
            drag = 0.992;
        const step = () => {
            const layer = layerRef.current;
            const H = layer?.clientHeight ?? 800;
            const arr = hearts.current;
            for (let i = arr.length - 1; i >= 0; i--) {
                const h = arr[i];
                h.vy += g;
                h.vx *= drag;
                h.x += h.vx;
                h.y += h.vy;
                h.rot += h.vr;
                const op =
                    h.y > H * 0.66
                        ? Math.max(0, 1 - (h.y - H * 0.66) / (H * 0.5))
                        : 1;
                h.el.style.transform = `translate(${h.x.toFixed(1)}px,${h.y.toFixed(1)}px) translate(-50%,-50%) rotate(${h.rot | 0}deg)`;
                h.el.style.opacity = String(op.toFixed(2));
                if (h.y > H + 80 || op <= 0) {
                    h.el.remove();
                    arr.splice(i, 1);
                }
            }
            rafRef.current = arr.length ? requestAnimationFrame(step) : null;
        };
        rafRef.current = requestAnimationFrame(step);
    }

    /* useEffect(() => {
        timerRef.current = setInterval(() => {
            const layer = layerRef.current;
            const btn = sourceRef.current;
            if (!layer || !btn) return;
            const lr = layer.getBoundingClientRect(),
                br = btn.getBoundingClientRect();
            spawnHearts(
                br.left + br.width / 2 - lr.left,
                br.top + br.height * 0.42 - lr.top,
                2,
                { up: 5, spread: 1.25, sMin: 8, sMax: 18 },
            );
        }, 280);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []); */

    useEffect(() => {
        const btn = sourceRef.current;
        if (!btn) return;

        const handleClick = () => {
            const layer = layerRef.current;
            if (!layer) return;
            const lr = layer.getBoundingClientRect();
            const br = btn.getBoundingClientRect();
            spawnHearts(
                br.left + br.width / 2 - lr.left,
                br.top + br.height * 0.42 - lr.top,
                20, // більше серць на клік
                { up: 8, spread: Math.PI, sMin: 10, sMax: 25 },
            );
        };

        btn.addEventListener("click", handleClick);
        return () => btn.removeEventListener("click", handleClick);
    }, []);

    return (
        <div
            ref={layerRef}
            className="fixed inset-0 z-10 pointer-events-none overflow-hidden"
        />
    );
}

export default HeartBurst;
