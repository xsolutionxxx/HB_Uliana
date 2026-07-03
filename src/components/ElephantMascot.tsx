import defaultImg from "../assets/default-elephant.png";
import happyImg from "../assets/happy-elephant.png";
import sadImg from "../assets/sad-elephant.png";
import brokenImg from "../assets/broken-elephant.png";
import inairImg from "../assets/inair-elephant.png";
import upHeartImg from "../assets/up-heart-elephant.png";
import downHeartImg from "../assets/down-heart-elephant.png";
import somersaultImg from "../assets/somersault-elephant.png";

const IMGS = {
    default: defaultImg,
    happy: happyImg,
    sad: sadImg,
    broken: brokenImg,
    inair: inairImg,
    "up-heart": upHeartImg,
    "down-heart": downHeartImg,
    somersault: somersaultImg,
} as const;

export type ElephantEmotion = keyof typeof IMGS;

type Props = {
    emotion: ElephantEmotion;
    speech?: string;
    width?: number;
    className?: string;
    animateIn?: boolean;
};

export function ElephantMascot({
    emotion,
    speech,
    width = 280,
    className = "",
    animateIn = false,
}: Props) {
    return (
        <div
            className={`flex flex-col items-center ${animateIn ? "animate-elephant-bounce" : ""} ${className}`}
            style={{ width }}
        >
            {speech && (
                <div
                    className="animate-speech-pop relative mb-5 rounded-2xl bg-white px-5 py-3 shadow-lg text-center"
                    style={{
                        border: "2px solid #f0b9cb",
                        maxWidth: Math.max(width + 40, 260),
                    }}
                >
                    <p className="font-caveat text-[22px] leading-snug text-pink-700">
                        {speech}
                    </p>
                    {/* бульбашка хвіст — обведення */}
                    <span
                        className="absolute -bottom-[14px] left-1/2 -translate-x-1/2 block"
                        style={{
                            width: 0,
                            height: 0,
                            borderLeft: "12px solid transparent",
                            borderRight: "12px solid transparent",
                            borderTop: "14px solid #f0b9cb",
                        }}
                    />
                    {/* бульбашка хвіст — заливка */}
                    <span
                        className="absolute -bottom-[11px] left-1/2 -translate-x-1/2 block"
                        style={{
                            width: 0,
                            height: 0,
                            borderLeft: "10px solid transparent",
                            borderRight: "10px solid transparent",
                            borderTop: "12px solid white",
                        }}
                    />
                </div>
            )}

            <img
                src={IMGS[emotion]}
                alt="elephant"
                draggable={false}
                style={{
                    width,
                    maxWidth: "80vw",
                    height: "auto",
                    objectFit: "contain",
                    mixBlendMode: "multiply",
                }}
            />
        </div>
    );
}
