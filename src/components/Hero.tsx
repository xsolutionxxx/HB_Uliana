const POLAROIDS = [
    { src: "/hero-photo-1.jpg", rot: -8,  delay: "0s",    anim: "sway-a" },
    { src: "/hero-photo-2.jpg", rot:  5,  delay: "0.4s",  anim: "sway-b" },
    { src: "/hero-photo-3.jpg", rot: -4,  delay: "0.8s",  anim: "sway-a" },
    { src: "/hero-photo-4.jpg", rot:  9,  delay: "0.2s",  anim: "sway-b" },
    { src: "/hero-photo-5.jpg", rot: -6,  delay: "0.6s",  anim: "sway-a" },
    { src: "/hero-photo-6.jpg", rot:  3,  delay: "1.0s",  anim: "sway-b" },
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
        <div className="flex flex-col items-center gap-2 sm:gap-4 mb-8 sm:mb-14">
            <h2 className="self-end font-bold text-[16px] sm:text-[24px] md:text-[34px] text-primary tracking-[0.2em] sm:tracking-[0.25em] uppercase">
                З Днем Народження
            </h2>
            <h1 className="font-caveat font-black text-[clamp(64px,22vw,210px)] text-primary leading-[0.6]">
                Юліаночка
            </h1>
            <p className="mt-3 sm:mt-6 font-caveat font-medium text-[clamp(20px,5vw,46px)] text-center">
                відколи зустрів тебе — кожен рік найкращий
            </p>
        </div>

        {/* Поляроїди */}
        <div className="flex items-end justify-center gap-3 sm:gap-5 md:gap-7 w-full max-w-5xl px-2">
            {POLAROIDS.map((p, i) => (
                <div
                    key={i}
                    className={`${SHOW_CLASS[i]} shrink-0`}
                    style={{
                        width: "clamp(110px, 17vw, 210px)",
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
