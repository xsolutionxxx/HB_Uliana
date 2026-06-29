import { useMemo, type CSSProperties } from "react";

interface Petal {
    char: string;
    style: CSSProperties;
}

export default function usePetals(count = 16): Petal[] {
    return useMemo(() => {
        const chars = ["🌸", "❀", "✿", "🌷", "💗", "🤍"];
        return Array.from({ length: count }, () => {
            const size = 14 + Math.random() * 22;
            const dur = 9 + Math.random() * 9;
            return {
                char: chars[Math.floor(Math.random() * chars.length)],
                style: {
                    left: `${(Math.random() * 100).toFixed(1)}%`,
                    fontSize: `${size.toFixed(0)}px`,
                    opacity: 0.55 + Math.random() * 0.4,
                    animationDuration: `${dur.toFixed(1)}s`,
                    animationDelay: `${(-Math.random() * dur).toFixed(1)}s`,
                },
            };
        });
    }, [count]);
}
