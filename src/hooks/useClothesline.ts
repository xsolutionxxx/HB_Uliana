import { useEffect, useRef } from "react";

type Pendulum = { ang: number; vel: number };

export function useClothesline(itemCount: number, trackW: number) {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        const track = trackRef.current;
        if (!el || !track) return;

        const p: Pendulum[] = Array.from({ length: itemCount }, () => ({
            ang: 0,
            vel: 0,
        }));
        let off = 0,
            offVel = 0,
            lastVel = 0,
            started = false;

        let dragging = false,
            startX = 0,
            startOff = 0,
            targetOff = 0;

        const getX = (e: PointerEvent | MouseEvent | TouchEvent) =>
            "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;

        const onDown = (e: PointerEvent) => {
            dragging = true;
            el.style.cursor = "grabbing";
            startX = getX(e);
            startOff = off;
            offVel = 0;
        };

        const onMove = (e: PointerEvent) => {
            if (!dragging) return;
            targetOff = startOff + (getX(e) - startX);
        };

        const onUp = () => {
            dragging = false;
            el.style.cursor = "grab";
        };

        el.addEventListener("pointerdown", onDown);
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);

        const arcY = (sx: number, vw: number) => {
            const t = Math.max(0, Math.min(1, sx / vw));
            return (1 - t) * (1 - t) * 18 + 2 * (1 - t) * t * 150 + t * t * 18;
        };

        let rafId: number;

        const loop = () => {
            const vw = el.clientWidth;
            const min = Math.min(0, vw - trackW);
            const prev = off;

            if (!started && vw > 0 && trackW > 0) {
                off = targetOff = min / 2;
                started = true;
            }

            if (dragging) {
                off += (targetOff - off) * 0.55;
            } else {
                off += offVel;
                offVel *= 0.93;
            }
            off = Math.max(min, Math.min(0, off));
            if (dragging) offVel = off - prev;

            const vel = off - prev;
            const accel = vel - lastVel;
            lastVel = vel;

            track.style.transform = `translateX(${off.toFixed(2)}px)`;

            track
                .querySelectorAll<HTMLElement>("[data-polaroid]")
                .forEach((pin, i) => {
                    const pd = p[i];
                    if (!pd) return;
                    const k = parseFloat(pin.dataset.k ?? "0.025");
                    const base = parseFloat(pin.dataset.base ?? "0");
                    const cx = parseFloat(pin.dataset.cx ?? "0");

                    pd.vel += -k * pd.ang + -accel * 0.28;
                    pd.vel *= 0.96;
                    pd.ang = Math.max(-12, Math.min(12, pd.ang + pd.vel));

                    const ty = arcY(off + cx, vw);
                    pin.style.transform = `translateY(${ty.toFixed(1)}px) rotate(${(base + pd.ang).toFixed(2)}deg)`;
                });

            rafId = requestAnimationFrame(loop);
        };

        rafId = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(rafId);
            el.removeEventListener("pointerdown", onDown);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
        };
    }, [itemCount, trackW]);

    return { containerRef, trackRef };
}
