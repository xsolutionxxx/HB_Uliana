import { useRef, useState, useCallback } from "react";
import { Gift, ArrowRight } from "lucide-react";
import HeartBurst from "./ui/HeartBurst";
import { ElephantMascot } from "./ElephantMascot";

const SOUNDS = ["/elephant.mp3", "/iloveu.mp3"];

function playElephantTrumpet() {
    const src = SOUNDS[Math.floor(Math.random() * SOUNDS.length)];
    const audio = new Audio(src);
    audio.volume = 0.4;
    audio.play().catch(() => {});
}

const Footer = () => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const [happy, setHappy] = useState(false);

    const handleClick = useCallback(() => {
        playElephantTrumpet();
        setHappy(true);
        setTimeout(() => setHappy(false), 1000);
    }, []);

    return (
        <footer
            id="footer-section"
            className="relative py-30 sm:py-40 flex flex-col items-center select-none px-4"
        >
            <HeartBurst sourceRef={btnRef} />

            <button
                ref={btnRef}
                onClick={handleClick}
                className="relative flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
            >
                <div className="absolute -top-12 sm:-top-16 -right-8 sm:-right-12 -rotate-18 sm:-rotate-10">
                    <div className="relative">
                        <img
                            src="/arrow-heart.png"
                            alt=""
                            className="absolute top-4.5 sm:top-7 -left-13 sm:-left-22 w-14 h-14 sm:w-24 sm:h-24 scale-x-[-1] -rotate-65"
                            style={{
                                filter: "brightness(0) saturate(100%) invert(42%) sepia(20%) saturate(800%) hue-rotate(290deg) brightness(85%)",
                            }}
                        />
                        <span className="flex flex-col gap-2 font-caveat font-medium text-[28px] sm:text-[46px] leading-[0.8] animate-pulse">
                            жмякай
                            <br />
                            слоніка
                        </span>
                    </div>
                </div>

                <ElephantMascot
                    emotion={happy ? "up-heart" : "down-heart"}
                    width={220}
                    className="animate-bounce"
                />

                <h3 className="font-caveat font-black text-[clamp(48px,14vw,120px)] text-primary leading-none">
                    Я люблю тебе
                </h3>
            </button>

            <h4 className="font-caveat font-medium text-[clamp(22px,5vw,46px)] text-center">
                З ювілеєм, сонечко! До нових спільних спогадів!
            </h4>

            <span className="absolute bottom-6 sm:bottom-8 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-xl text-center px-4">
                Нажмякалась? Мершій відкривай свій подаруночок
                <ArrowRight strokeWidth={1.5} size={18} />
                <Gift strokeWidth={1.5} size={18} />
            </span>
        </footer>
    );
};

export default Footer;
