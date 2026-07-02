import { X } from "lucide-react";
import type { PolaroidItem } from "../../types/moments.ts";

type Props = {
    item: PolaroidItem;
    onRemove?: () => void;
};

export function Polaroid({ item, onRemove }: Props) {
    const W = 168;

    return (
        <div
            data-polaroid
            data-base={item.baseRot}
            data-k={item.stiffness}
            data-cx={item.cx}
            style={{
                position: "absolute",
                left: item.cx - W / 2,
                top: 0,
                width: W,
                transformOrigin: "top center",
                transform: `rotate(${item.baseRot}deg)`,
                willChange: "transform",
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
                    background: "linear-gradient(180deg, #f3d9b0, #d6a468)",
                    boxShadow: "0 2px 4px rgba(0,0,0,.22)",
                    zIndex: 4,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 9,
                        left: 1,
                        right: 1,
                        height: 3,
                        background: "rgba(120,80,40,.45)",
                        borderRadius: 2,
                    }}
                />
            </div>

            <div
                className="relative"
                style={{
                    background: "#fffdfb",
                    padding: "9px 9px 0",
                    boxShadow: "0 16px 28px rgba(150,90,110,.24)",
                    marginTop: Math.max(4, item.stringLen - 8),
                }}
            >
                {item.src && onRemove && (
                    <button
                        onClick={onRemove}
                        className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full
                       bg-rose-900/60 text-white text-xs flex items-center justify-center"
                    >
                        <X />
                    </button>
                )}

                <div className="w-full aspect-square rounded-sm overflow-hidden">
                    {item.src ? (
                        <img
                            src={item.src}
                            alt=""
                            draggable={false}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div
                            className="w-full h-full flex items-center justify-center
                            border-2 border-dashed border-pink-200 bg-pink-50"
                        >
                            <span className="text-3xl">💌</span>
                        </div>
                    )}
                </div>

                <p
                    className="text-center py-1.5 text-pink-400"
                    style={{ fontFamily: "Caveat, cursive", fontSize: 22 }}
                >
                    {item.caption}
                </p>
            </div>
        </div>
    );
}
