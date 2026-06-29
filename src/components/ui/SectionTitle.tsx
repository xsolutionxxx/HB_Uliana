interface SectionTitleProps {
    subtitle: string;
    title: string;
    description?: string;
}

function SectionTitle({ title, subtitle, description }: SectionTitleProps) {
    return (
        <div className="flex flex-col items-center text-center">
            <h3 className="font-extrabold text-lg text-primary tracking-[0.28em] uppercase">
                {title}
            </h3>
            {subtitle && (
                <h2 className="mt-2.5 font-playfair text-[52px] text-title leading-0.9">
                    {subtitle}
                </h2>
            )}
            {description && <p className="w-full text-2xl">{description}</p>}
        </div>
    );
}

export default SectionTitle;
