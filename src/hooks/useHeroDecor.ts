import { useMemo } from "react";

interface Layer {
    z: number;
    color: string;
}
interface Orb {
    left: string;
    top: string;
    size: number;
    duration: string;
    delay: string;
}

export default function useHeroDecor() {
    const layers = useMemo<Layer[]>(() => {
        const N = 6;
        return Array.from({ length: N }, (_, i) => {
            const t = i / (N - 1);
            const op = 0.03 + 0.075 * (1 - Math.abs(t - 0.5) * 2);
            return {
                z: (i - (N - 1) / 2) * 30,
                color: `rgba(238,170,193,${op})`,
            };
        });
    }, []);

    const orbs = useMemo<Orb[]>(() => {
        const spots: [number, number, number][] = [
            [14, 26, 70],
            [82, 20, 52],
            [20, 74, 90],
            [78, 70, 64],
            [50, 14, 40],
            [62, 84, 48],
        ];
        return spots.map(([left, top, size], i) => ({
            left: `${left}%`,
            top: `${top}%`,
            size,
            duration: `${10 + (i % 4) * 2.2}s`,
            delay: `${-i * 1.3}s`,
        }));
    }, []);

    return { layers, orbs };
}
