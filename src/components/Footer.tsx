import { useRef } from "react";
import { Gift, ArrowRight } from "lucide-react";

import HeartBurst from "./ui/HeartBurst";

const Footer = () => {
    const btnRef = useRef<HTMLButtonElement>(null);

    return (
        <footer id="footer-section" className="relative py-16 sm:py-40 flex flex-col items-center select-none px-4">
            <HeartBurst sourceRef={btnRef} />

            <button
                ref={btnRef}
                className="relative flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
            >
                <div className="absolute -top-8 sm:-top-12 -right-14 sm:-right-26">
                    <div className="relative">
                        <img
                            src="/arrow-heart.png"
                            alt="arrow"
                            className="absolute top-5 sm:top-8 -left-10 sm:-left-16 w-14 h-14 sm:w-24 sm:h-24 scale-x-[-1] -rotate-65"
                            style={{
                                filter: "brightness(0) saturate(100%) invert(42%) sepia(20%) saturate(800%) hue-rotate(290deg) brightness(85%)",
                            }}
                        />
                        <span className="font-caveat font-medium text-[28px] sm:text-[46px] animate-pulse">
                            жмякай
                        </span>
                    </div>
                </div>
                <img
                    src="/heart-box.png"
                    alt="heart box"
                    className="w-24 h-24 sm:w-40 sm:h-40 animate-bounce"
                />
                <h3 className="font-caveat font-black text-[clamp(48px,14vw,120px)] text-primary leading-none">
                    Я люблю тебе
                </h3>
            </button>
            <h4 className="font-caveat font-medium text-[clamp(22px,5vw,46px)] text-center">
                З ювілеєм, сонечко. До нових спільних спогадів.
            </h4>

            <span className="absolute bottom-4 sm:bottom-8 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-xl text-center px-4">
                Нажмякалась? Тепер мершій відкривай свій подаруночок
                <ArrowRight strokeWidth={1.5} size={18} />
                <Gift strokeWidth={1.5} size={18} />
            </span>
        </footer>
    );
};

export default Footer;
