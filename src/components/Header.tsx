import { MoveDown } from "lucide-react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import useHeroDecor from "../hooks/useHeroDecor";
import Petals from "./ui/Petals";

type Props = {
    gameWon: boolean;
    onCongrats: () => void;
};

const Header = ({ gameWon, onCongrats }: Props) => {
    const { layers, orbs } = useHeroDecor();

    return (
        <section
            className="relative min-h-svh flex flex-col items-center justify-center overflow-hidden"
            style={{
                background:
                    "radial-gradient(120% 90% at 50% 0%, #ffe6ee, #fff2f6 42%, #fff6f8)",
            }}
        >
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <Petals />

                <div
                    className="absolute left-1/2 top-1/2 h-[min(82vw,820px)] w-[min(82vw,820px)]
                        animate-glowPulse rounded-full blur-[10px]
                        [background:radial-gradient(circle,rgba(250,200,217,.42),rgba(250,200,217,.14)_46%,transparent_72%)]"
                />

                {orbs.map((o, i) => (
                    <div
                        key={i}
                        className="absolute animate-orbFloat rounded-full blur-[0.5px]
                       shadow-[0_12px_26px_rgba(226,109,146,.1)]
                       [background:radial-gradient(circle_at_32%_30%,rgba(255,255,255,.6),rgba(250,200,217,.4)_45%,rgba(238,170,193,.16))]"
                        style={{
                            left: o.left,
                            top: o.top,
                            width: o.size,
                            height: o.size,
                            animationDuration: o.duration,
                            animationDelay: o.delay,
                        }}
                    />
                ))}

                <div className="absolute inset-0 top-[-20%] flex items-center justify-center perspective-distant">
                    <div className="relative animate-wobble blur-[3px] transform-3d">
                        {layers.map((l, i) => (
                            <span
                                key={i}
                                className="absolute left-1/2 top-1/2 m-0 select-none whitespace-nowrap
                           font-playfair font-extrabold leading-[0.8] tracking-[-.04em]
                           text-[clamp(300px,58vw,680px)]"
                                style={{
                                    color: l.color,
                                    transform: `translate(-50%,-50%) translateZ(${l.z}px)`,
                                }}
                            >
                                20
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <Navbar gameWon={gameWon} onCongrats={onCongrats} />
            <Hero />
            <div className="absolute bottom-6 sm:bottom-10 flex flex-col items-center gap-3 sm:gap-5 select-none">
                <span className="font-medium text-[18px] sm:text-[28px] text-[#C98AA0] tracking-widest">
                    гортай вниз, бешкетниця
                </span>
                <MoveDown className="text-[#C98AA0] animate-bounce" />
            </div>
        </section>
    );
};

export default Header;
