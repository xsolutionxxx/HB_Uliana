const Hero = () => {
    return (
        <div className="relative flex flex-col items-center gap-2 sm:gap-4 select-none px-4">
            <h2 className="self-end font-bold text-[16px] sm:text-[24px] md:text-[34px] text-primary tracking-[0.2em] sm:tracking-[0.25em] uppercase">
                З Днем Народження
            </h2>
            <h1 className="font-caveat font-black text-[clamp(64px,22vw,210px)] text-primary leading-[0.6]">
                Юліаночка
            </h1>
            <p className="mt-3 sm:mt-6 font-caveat font-medium text-[clamp(20px,5vw,46px)] text-center">
                відколи зустрів тебе - кожен рік найкращий
            </p>
        </div>
    );
};

export default Hero;
