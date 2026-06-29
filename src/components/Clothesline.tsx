import { useMemo } from "react";
import { useClothesline } from "../hooks/useClothesline";
import { Polaroid } from "./Polaroid";
import type { PolaroidItem } from "../types";

type Props = {
    myPhotos: string[];
    herSlots: (string | null)[];
    onRemoveHer: (i: number) => void;
};

const WORDS = [
    "чарівно",
    "незабутньо",
    "ніжно",
    "сяйливо",
    "тепло",
    "лагідно",
    "розкішно",
    "щиро",
    "легко",
    "сонячно",
    "магічно",
    "безцінно",
];

const EMOJIS_CAP = [
    "🌸",
    "💫",
    "✨",
    "🌷",
    "💕",
    "🌼",
    "💞",
    "🌟",
    "🦋",
    "🌙",
    "💐",
    "🎀",
];

const PLACEHOLDER_EMOJIS = ["💝", "🌺", "🫶", "💌", "🌙", "⭐"];

const rnd = (i: number, s: number) => {
    const x = Math.sin(i * 99.7 + s * 41.3) * 43758.5453;
    return x - Math.floor(x);
};

export function Clothesline({ myPhotos, herSlots, onRemoveHer }: Props) {
    const PAD = 64,
        SP = 214,
        W = 168;

    const items = useMemo<PolaroidItem[]>(() => {
        const all = [
            ...myPhotos.map((src, i) => ({
                src,
                pool: "me" as const,
                localIdx: i,
            })),
            ...herSlots.map((src, i) => ({
                src: src ?? null,
                pool: "her" as const,
                localIdx: i,
            })),
        ];
        return all.map((it, i) => {
            const jitter = (rnd(i, 1) * 2 - 1) * 16;
            const cx = PAD + i * SP + SP / 2 + jitter;
            const baseRot = (rnd(i, 4) * 2 - 1) * 9;
            const strLen = 4 + rnd(i, 3) * 12;
            const k = +(0.03 - ((strLen - 4) / 12) * 0.012).toFixed(4);

            const word = WORDS[i % WORDS.length];
            const emoji = EMOJIS_CAP[i % EMOJIS_CAP.length];

            return {
                id: `${it.pool}-${i}`,
                src: it.src,
                caption: it.src
                    ? `${word} ${emoji}`
                    : `Новий спогад ${PLACEHOLDER_EMOJIS[it.localIdx % PLACEHOLDER_EMOJIS.length]}`,
                baseRot: +baseRot.toFixed(1),
                cx: +cx.toFixed(0),
                stiffness: k,
                stringLen: +strLen.toFixed(0),
            };
        });
    }, [myPhotos, herSlots]);

    const trackW = PAD * 2 + items.length * SP;
    const { containerRef, trackRef } = useClothesline(items.length, trackW);

    console.log("items:", items);
    console.log("trackW:", trackW);

    return (
        <div
            ref={containerRef}
            id="clothesline"
            className="relative overflow-hidden cursor-grab"
            style={{
                height: "clamp(360px, 52vw, 470px)",
                width: "100%",
                touchAction: "none",
                userSelect: "none",
                WebkitUserSelect: "none",
            }}
        >
            <svg
                width="100%"
                height="190"
                viewBox="0 0 1000 190"
                preserveAspectRatio="none"
                className="absolute top-0 left-0 z-1"
            >
                <path
                    d="M 0,18 Q 500,150 1000,18"
                    stroke="#caa07d"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>

            <div
                ref={trackRef}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: trackW,
                    willChange: "transform",
                    zIndex: 2,
                }}
            >
                {items.map((item, i) => (
                    <Polaroid
                        key={item.id}
                        item={item}
                        onRemove={
                            item.src &&
                            herSlots[i - myPhotos.length] !== undefined
                                ? () => onRemoveHer(i - myPhotos.length)
                                : undefined
                        }
                    />
                ))}
            </div>
        </div>
    );
}
