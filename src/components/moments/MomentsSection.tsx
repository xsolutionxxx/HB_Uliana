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
        >
            <div className="pt-70 lg:pt-30 w-90 md:w-110 lg:w-150">
                <SectionTitle
                    title="Незабутні спогади"
                    subtitle="Увічнені моменти"
                    description="Я обрав 6 найяскравіших моментів нашого життя. Твоїм завданням буде додати ще 6 наших спільних спогадів."
                />
            </div>

            <img
                src="/baobab.png"
                alt="baobab"
                className="absolute bottom-0 left-0 -translate-x-1/2 h-full sm:h-[110%] z-10 pointer-events-none select-none"
            />
            <img
                src="/baobab.png"
                alt="baobab"
                className="absolute bottom-0 right-0 translate-x-1/2 h-[96%] sm:h-[105%] z-10 pointer-events-none select-none scale-x-[-1]"
            />

            <Clothesline
                myPhotos={myPhotos}
                herSlots={herSlots}
                onRemoveHer={onRemovePhoto}
            />

            <div
                className="relative z-20 bg-white flex flex-col w-64 sm:w-72 mt-4 sm:mt-0"
                style={{
                    boxShadow: "0 12px 40px rgba(180,90,130,0.22), 0 3px 10px rgba(0,0,0,0.1)",
                    padding: "10px 10px 0 10px",
                    borderRadius: "2px",
                    transform: "rotate(-1.5deg)",
                }}
            >
                <div
                    className="w-full flex flex-col items-center justify-center gap-3 py-8"
                    style={{
                        background:
                            "linear-gradient(135deg, #ffe0ec 0%, #ffd6e8 40%, #fce4f0 100%)",
                        minHeight: "180px",
                    }}
                >
                    <span className="text-5xl">
                        {photosCount < 6 ? "📎" : "🌸"}
                    </span>
                    <span className="font-caveat font-bold text-2xl text-primary text-center leading-tight px-4">
                        {photosCount < 6
                            ? "Додай свій спогад"
                            : "Всі спогади\nдодано!"}
                    </span>

                    {photosCount < 6 && (
                        <button
                            onClick={onAddPhotos}
                            className="bg-primary text-white font-bold px-6 py-2.5 rounded-full
                                       shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform text-sm mt-1"
                        >
                            ＋ Додати спогад
                        </button>
                    )}
                </div>

                <div className="flex items-center justify-center py-4">
                    <span className="font-caveat text-xl text-primary/60 tracking-wide">
                        {photosCount} / 6
                    </span>
                </div>
            </div>
        </section>
    );
};

export default MomentsSection;
