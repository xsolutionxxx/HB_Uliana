import gen1 from "../assets/general/Gen_1.jpg";
import gen2 from "../assets/general/Gen_2.jpg";
import gen3 from "../assets/general/Gen_3.jpg";
import gen4 from "../assets/general/Gen_4.jpg";
import gen5 from "../assets/general/Gen_5.jpg";
import gen6 from "../assets/general/Gen_6.jpg";

const POLAROIDS = [
    { src: gen1, rot: -8,  delay: "0s",    anim: "sway-a" },
    { src: gen2, rot:  5,  delay: "0.4s",  anim: "sway-b" },
    { src: gen3, rot: -4,  delay: "0.8s",  anim: "sway-a" },
    { src: gen4, rot:  9,  delay: "0.2s",  anim: "sway-b" },
    { src: gen5, rot: -6,  delay: "0.6s",  anim: "sway-a" },
    { src: gen6, rot:  3,  delay: "1.0s",  anim: "sway-b" },
];

// mobile(≤sm): 2 | sm→md: 4 | md→lg: 5 | lg+: 6
const SHOW_CLASS = [
    "block",
    "block",
    "hidden sm:block",
    "hidden sm:block",
    "hidden md:block",
    "hidden lg:block",
];

const Hero = () => (
    <div className="relative flex flex-col items-center select-none px-4 pt-6 sm:pt-10">
        <style>{`
            @keyframes sway-a {
                0%,100% { translate: 0 0px;  }
                50%      { translate: 0 -7px; }
            }
            @keyframes sway-b {
                0%,100% { translate: 0 0px;  }
                50%      { translate: 0 -5px; }
            }
        `}</style>

        {/* Заголовки */}
        <div className="flex flex-col items-center gap-2 sm:gap-4 mb-8 sm:mb-14 [@media(max-height:1000px)_and_(min-width:900px)]:mb-6">
            <h2 className="self-end font-bold text-[16px] sm:text-[24px] md:text-[34px] text-primary tracking-[0.2em] sm:tracking-[0.25em] uppercase">
                З Днем Народження
            </h2>
            <h1 className="font-caveat font-black text-[clamp(64px,22vw,210px)] [@media(max-height:1000px)_and_(min-width:900px)]:text-[160px] [@media(max-height:760px)_and_(min-width:900px)]:text-[120px] text-primary leading-[0.6]">
                Юліаночка
            </h1>
            <p className="mt-3 sm:mt-6 font-caveat font-medium text-[clamp(20px,5vw,46px)] [@media(max-height:1000px)_and_(min-width:900px)]:text-[32px] [@media(max-height:760px)_and_(min-width:900px)]:text-[26px] text-center">
                відколи зустрів тебе — кожен рік найкращий
            </p>
        </div>

        {/* Поляроїди */}
        <div className="flex items-end justify-center gap-3 sm:gap-5 md:gap-7 w-full max-w-5xl px-2">
            {POLAROIDS.map((p, i) => (
                <div
                    key={i}
                    className={`${SHOW_CLASS[i]} shrink-0 w-[clamp(110px,17vw,210px)] [@media(max-height:1000px)_and_(min-width:900px)]:w-[150px] [@media(max-height:760px)_and_(min-width:900px)]:w-[115px]`}
                    style={{
                        background: "#fff",
                        padding: "8px 8px 30px",
                        borderRadius: 2,
                        boxShadow: "0 8px 24px rgba(180,90,130,0.18), 0 2px 8px rgba(0,0,0,0.09)",
                        rotate: `${p.rot}deg`,
                        animation: `${p.anim} ${3.8 + i * 0.25}s ease-in-out infinite`,
                        animationDelay: p.delay,
                    }}
                >
                    {/* Фото-зона */}
                    <div className="w-full aspect-square bg-pink-50 overflow-hidden" style={{ borderRadius: 1 }}>
                        <img
                            src={p.src}
                            alt=""
                            draggable={false}
                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default Hero;
