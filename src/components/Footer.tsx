import { useRef } from "react";
import { Gift, ArrowRight } from "lucide-react";

import HeartBurst from "./ui/HeartBurst";

const Footer = () => {
    const btnRef = useRef<HTMLButtonElement>(null);

    return (
        <footer className="relative py-40 flex flex-col items-center select-none">
            <HeartBurst sourceRef={btnRef} />

            <button
                ref={btnRef}
                className="relative flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
            >
                <div className="absolute -top-12 -right-26">
                    <div className="relative">
                        <img
                            src="/arrow-heart.png"
                            alt="arrow"
                            className="absolute top-8 -left-16 w-24 h-24 scale-x-[-1] -rotate-65"
                            style={{
                                filter: "brightness(0) saturate(100%) invert(42%) sepia(20%) saturate(800%) hue-rotate(290deg) brightness(85%)",
                            }}
                        />
                        <span className="font-caveat font-medium text-[46px] animate-pulse">
                            жмякай
                        </span>
                    </div>
                </div>
                <img
                    src="/heart.png"
                    alt="heart"
                    className="w-40 h-40 animate-bounce"
                    /* style={{
                        filter: "brightness(0) saturate(100%) invert(55%) sepia(40%) saturate(600%) hue-rotate(295deg) brightness(105%)",
                    }} */
                />
                <h3 className="font-caveat font-black text-[120px] text-primary leading-none">
                    Я люблю тебе
                </h3>
            </button>
            <h4 className="font-caveat font-medium text-[46px] text-center">
                З ювілеєм, сонечко. До нових спільних спогадів.
            </h4>

            <span className="absolute bottom-8 flex items-center gap-2 text-xl">
                Нажмякалась? Тепер мершій відкривай свій подаруночок
                <ArrowRight strokeWidth={1.5} size={22} />
                <Gift strokeWidth={1.5} size={22} />
            </span>
        </footer>
    );
};

export default Footer;
