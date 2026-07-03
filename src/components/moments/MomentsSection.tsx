import { Clothesline } from "./Clothesline";
import SectionTitle from "../ui/SectionTitle";

type Props = {
    myPhotos: string[];
    herSlots: (string | null)[];
    onAddPhotos: () => void;
    onRemovePhoto: (index: number) => void;
    photosCount: number;
};

const MomentsSection = ({
    myPhotos,
    herSlots,
    onAddPhotos,
    onRemovePhoto,
    photosCount,
}: Props) => {
    return (
        <section
            id="moments-section"
            className="relative flex flex-col items-center sm:gap-10 py-16 sm:py-40 w-full"
            style={{ minHeight: "clamp(700px, 130vw, 1000px)" }}
        >
            <div className="pt-70 lg:pt-30 w-full max-w-[80vw] md:w-110 lg:w-150 px-4">
                <SectionTitle
                    title="Незабутні спогади"
                    subtitle="Увічнені моменти"
                    description="Я обрав 6 найяскравіших моментів нашого життя. Твоїм завданням буде додати ще 6 наших спільних спогадів."
                />
            </div>

            {/* SVG-фільтр: зелень → рожевий, коричневий ствол залишається */}
            <svg width="0" height="0" style={{ position: "absolute" }}>
                <defs>
                    <filter id="baobab-pink" colorInterpolationFilters="sRGB">
                        <feColorMatrix type="matrix" values="
                             0.18  0.64  0  0  0.17
                             0.54  0.85  0  0 -0.39
                             0.10  1.44  0  0 -0.54
                             0     0     0  1  0
                        " />
                    </filter>
                </defs>
            </svg>

            <img
                src="/baobab.png"
                alt="baobab"
                className="absolute bottom-0 left-0 -translate-x-1/2 h-full sm:h-[110%] z-10 pointer-events-none select-none"
                style={{ filter: "url(#baobab-pink)" }}
            />
            <img
                src="/baobab.png"
                alt="baobab"
                className="absolute bottom-0 right-0 translate-x-1/2 h-[96%] sm:h-[105%] z-10 pointer-events-none select-none scale-x-[-1]"
                style={{ filter: "url(#baobab-pink)" }}
            />

            <Clothesline
                myPhotos={myPhotos}
                herSlots={herSlots}
                onRemoveHer={onRemovePhoto}
            />

            <div
                className="relative z-20 bg-white flex flex-col w-60 sm:w-72"
                style={{
                    boxShadow:
                        "0 12px 40px rgba(180,90,130,0.22), 0 3px 10px rgba(0,0,0,0.1)",
                    padding: "10px 10px 0 10px",
                    borderRadius: "2px",
                    transform: "rotate(-1.5deg)",
                }}
            >
                <div
                    className="w-full flex flex-col items-center justify-center gap-2 py-6"
                    style={{
                        background:
                            "linear-gradient(135deg, #ffe0ec 0%, #ffd6e8 40%, #fce4f0 100%)",
                        minHeight: "160px",
                    }}
                >
                    <span className="text-4xl">
                        {photosCount < 6 ? "📎" : "🌸"}
                    </span>
                    <span className="font-caveat font-bold text-xl text-primary text-center leading-tight px-4">
                        {photosCount < 6
                            ? "Додай свій спогад"
                            : "Всі спогади додано!"}
                    </span>
                    {photosCount < 6 && (
                        <button
                            onClick={onAddPhotos}
                            className="bg-primary text-white font-bold px-5 py-2 rounded-full
                                       shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform text-sm"
                        >
                            ＋ Додати спогад
                        </button>
                    )}
                </div>
                <div className="flex items-center justify-center py-3">
                    <span className="font-caveat text-lg text-primary/60">
                        {photosCount} / 6
                    </span>
                </div>
            </div>
        </section>
    );
};

export default MomentsSection;
