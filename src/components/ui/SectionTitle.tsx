interface SectionTitleProps {
    subtitle: string;
    title: string;
    description?: string;
}

function SectionTitle({ title, subtitle, description }: SectionTitleProps) {
    return (
        <div className="flex flex-col items-center text-center">
            <h3 className="font-extrabold text-sm sm:text-lg text-primary tracking-[0.2em] sm:tracking-[0.28em] uppercase">
                {title}
            </h3>
            {subtitle && (
                <h2 className="mt-2 sm:mt-2.5 font-playfair text-[clamp(28px,7vw,52px)] text-title leading-tight">
                    {subtitle}
                </h2>
            )}
            {description && (
                <p className="mt-2 w-full text-base sm:text-xl md:text-2xl">{description}</p>
            )}
        </div>
    );
}

export default SectionTitle;
