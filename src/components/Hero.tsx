const Hero = () => {
    return (
        <div className="relative flex flex-col items-center gap-4">
            <h2 className="self-end font-bold text-[34px] text-primary tracking-[0.25em] uppercase">
                З Днем Народження
            </h2>
            <h1 className="font-caveat font-black text-[210px] text-primary leading-[0.6] ">
                Юліаночка
            </h1>
            <p className="mt-6 font-caveat font-medium text-[46px] text-center text-[#8A5F6E]">
                відколи зустрів тебе - кожен рік найкращий
            </p>
        </div>
    );
};

export default Hero;
