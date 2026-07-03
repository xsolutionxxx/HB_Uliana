import { useRef, useState, useCallback } from "react";
import { Gift, ArrowRight } from "lucide-react";
import HeartBurst from "./ui/HeartBurst";
import { ElephantMascot } from "./ElephantMascot";

function playElephantTrumpet() {
    const ctx = new AudioContext();

    // Основний тон — спадаючий зі sweep
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const distortion = ctx.createWaveShaper();

    // Crunch curve для "brass" звуку
    const curve = new Float32Array(256);
    for (let i = 0; i < 256; i++) {
        const x = (i * 2) / 256 - 1;
        curve[i] = (Math.PI + 200) * x / (Math.PI + 200 * Math.abs(x));
    }
    distortion.curve = curve;

    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(520, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.9);

    osc2.type = "sawtooth";
    osc2.frequency.setValueAtTime(780, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(270, ctx.currentTime + 0.9);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.35, ctx.currentTime + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.1);

    osc1.connect(distortion);
    osc2.connect(distortion);
    distortion.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(ctx.currentTime);
    osc2.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 1.1);
    osc2.stop(ctx.currentTime + 1.1);
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
        <footer id="footer-section" className="relative py-16 sm:py-40 flex flex-col items-center select-none px-4">
            <HeartBurst sourceRef={btnRef} />

            <button
                ref={btnRef}
                onClick={handleClick}
                className="relative flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
            >
                {/* Підказка "жмякай" */}
                <div className="absolute -top-8 sm:-top-12 -right-14 sm:-right-26">
                    <div className="relative">
                        <img
                            src="/arrow-heart.png"
                            alt=""
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

                {/* Слонік */}
                <ElephantMascot
                    emotion={happy ? "up-heart" : "down-heart"}
                    width={220}
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
