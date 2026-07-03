import { useRef, useEffect, useMemo } from "react";

type Props = {
    myPhotos: string[];
    herSlots: (string | null)[];
    onRemoveHer: (i: number) => void;
};

const PAD = 64;
const SP = 214;
const W = 168;

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
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const rafRef = useRef<number>(0);
    const phRef = useRef({
        off: 0,
        targetOff: 0,
        offVel: 0,
        lastVel: 0,
        ang: {} as Record<number, number>,
        vel: {} as Record<number, number>,
        dragging: false,
        started: false,
        startX: 0,
        startOff: 0,
    });

    const items = useMemo(() => {
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
            const canRemove = it.pool === "her" && it.src !== null;
            return {
                id: `${it.pool}-${i}`,
                src: it.src,
                pool: it.pool,
                localIdx: it.localIdx,
                canRemove,
                caption: it.src
                    ? `${word} ${emoji}`
                    : `Новий спогад ${PLACEHOLDER_EMOJIS[it.localIdx % PLACEHOLDER_EMOJIS.length]}`,
                baseRot: +baseRot.toFixed(1),
                cx: +cx.toFixed(0),
                left: +(cx - W / 2).toFixed(0),
                k,
                strLen: +strLen.toFixed(0),
            };
        });
    }, [myPhotos, herSlots]);

    const trackW = PAD * 2 + items.length * SP;
    const itemsRef = useRef(items);
    useEffect(() => {
        itemsRef.current = items;
    });

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ph = phRef.current;

        const px = (e: PointerEvent) => e.clientX;
        const onDown = (e: PointerEvent) => {
            ph.dragging = true;
            ph.startX = px(e);
            ph.startOff = ph.off;
            ph.targetOff = ph.off;
            ph.offVel = 0;
            el.style.cursor = "grabbing";
        };
        const onMove = (e: PointerEvent) => {
            if (!ph.dragging) return;
            ph.targetOff = ph.startOff + (px(e) - ph.startX);
        };
        const onUp = () => {
            ph.dragging = false;
            el.style.cursor = "grab";
        };

        el.addEventListener("pointerdown", onDown);
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerup", onUp);

        const loop = () => {
            const track = trackRef.current;
            if (!track) {
                rafRef.current = requestAnimationFrame(loop);
                return;
            }

            const vw = el.clientWidth;
            const min = Math.min(0, vw - trackW);
            const max = 0;

            if (!ph.started) {
                ph.off = ph.targetOff = min / 2;
                ph.started = true;
            }

            const prev = ph.off;

            if (ph.dragging) {
                ph.off += (ph.targetOff - ph.off) * 0.22;
            } else {
                ph.off += ph.offVel;
                ph.offVel *= 0.975;
            }
            if (ph.off > max) {
                ph.off = max;
                ph.offVel = 0;
            }
            if (ph.off < min) {
                ph.off = min;
                ph.offVel = 0;
            }

            const vel = ph.off - prev;
            if (ph.dragging) ph.offVel = vel;
            const accel = vel - ph.lastVel;
            ph.lastVel = vel;

            track.style.transform = `translateX(${ph.off.toFixed(2)}px)`;

            const arcY = (sx: number) => {
                const t = Math.max(0, Math.min(1, vw > 0 ? sx / vw : 0));
                // matches SVG rope: M 0,55 Q 500,160 1000,55
                return (
                    (1 - t) * (1 - t) * 55 + 2 * (1 - t) * t * 160 + t * t * 55
                );
            };

            cardRefs.current.forEach((card, i) => {
                if (!card) return;
                const data = itemsRef.current[i];
                if (!data) return;

                let a = ph.ang[i] || 0;
                let v = ph.vel[i] || 0;

                v += -data.k * a + -accel * 0.28;
                v *= 0.96;
                a += v;
                if (a > 12) a = 12;
                if (a < -12) a = -12;

                ph.ang[i] = a;
                ph.vel[i] = v;

                const ty = arcY(ph.off + data.cx);
                card.style.transform = `translateY(${ty.toFixed(1)}px) rotate(${(data.baseRot + a).toFixed(2)}deg)`;
            });

            rafRef.current = requestAnimationFrame(loop);
        };

        rafRef.current = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(rafRef.current);
            el.removeEventListener("pointerdown", onDown);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
        };
    }, [trackW]);

    return (
        <div
            ref={containerRef}
            id="clothesline"
            style={{
                position: "relative",
                height: "clamp(360px, 50vh, 400px)",
                width: "100%",
                overflow: "hidden",
                cursor: "grab",
                touchAction: "pan-y",
                userSelect: "none",
                WebkitUserSelect: "none",
                WebkitTapHighlightColor: "transparent",
            }}
        >
            <style>{`
                .cl-card .cl-remove { opacity: 0; transition: opacity 0.15s; }
                .cl-card:hover .cl-remove { opacity: 1; }
            `}</style>

            <svg
                width="100%"
                height="190"
                viewBox="0 0 1000 190"
                preserveAspectRatio="none"
                style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
            >
                <path
                    d="M 0,55 Q 500,160 1000,55"
                    stroke="#caa07d"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
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
                    <div
                        key={item.id}
                        ref={(el) => {
                            cardRefs.current[i] = el;
                        }}
                        className="cl-card"
                        style={{
                            position: "absolute",
                            left: item.left,
                            top: 0,
                            width: W,
                            transformOrigin: "top center",
                            willChange: "transform",
                            zIndex: 10 + (i % 5),
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: -12,
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: 13,
                                height: 30,
                                borderRadius: 4,
                                background:
                                    "linear-gradient(180deg,#f3d9b0,#d6a468)",
                                boxShadow: "0 2px 4px rgba(0,0,0,.2)",
                                zIndex: 4,
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    top: 8,
                                    left: 1,
                                    right: 1,
                                    height: 3,
                                    background: "rgba(120,80,40,.4)",
                                    borderRadius: 2,
                                }}
                            />
                        </div>

                        <div
                            style={{
                                position: "relative",
                                background: "#fffdfb",
                                padding: "9px 9px 0",
                                borderRadius: 3,
                                boxShadow: "0 16px 28px rgba(150,90,110,.24)",
                                marginTop: item.strLen,
                            }}
                        >
                            {item.canRemove && (
                                <button
                                    className="cl-remove"
                                    onClick={() => onRemoveHer(item.localIdx)}
                                    style={{
                                        position: "absolute",
                                        top: -9,
                                        right: -9,
                                        zIndex: 5,
                                        width: 24,
                                        height: 24,
                                        border: "none",
                                        borderRadius: "50%",
                                        background: "rgba(109,75,88,.6)",
                                        color: "#fff",
                                        fontSize: 13,
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    ×
                                </button>
                            )}

                            <div
                                style={
                                    item.src
                                        ? {
                                              width: "100%",
                                              aspectRatio: "1",
                                              borderRadius: 2,
                                              background: "#f3dde4",
                                              overflow: "hidden",
                                              boxShadow:
                                                  "inset 0 0 0 1px rgba(0,0,0,.03)",
                                          }
                                        : {
                                              width: "100%",
                                              aspectRatio: "1",
                                              border: "2px dashed #f0b9cb",
                                              borderRadius: 2,
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "center",
                                              background:
                                                  "linear-gradient(135deg,#fff8fb,#ffe8f2)",
                                              overflow: "hidden",
                                          }
                                }
                            >
                                {item.src ? (
                                    <img
                                        src={item.src}
                                        alt=""
                                        draggable={false}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            display: "block",
                                            pointerEvents: "none",
                                        }}
                                    />
                                ) : (
                                    <span style={{ fontSize: 30 }}>
                                        {
                                            PLACEHOLDER_EMOJIS[
                                                item.localIdx %
                                                    PLACEHOLDER_EMOJIS.length
                                            ]
                                        }
                                    </span>
                                )}
                            </div>

                            <div
                                style={{
                                    fontFamily: "'Caveat', cursive",
                                    fontWeight: 600,
                                    fontSize: 22,
                                    color: "#b06f86",
                                    padding: "7px 6px 3px",
                                    lineHeight: 1,
                                    minHeight: 24,
                                    textAlign: "center",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {item.caption}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
