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
            className="relative flex flex-col items-center gap-2 sm:gap-10 py-16 sm:py-40 w-full"
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
                className="absolute bottom-0 right-0 translate-x-1/2 h-full sm:h-[110%] z-10 pointer-events-none select-none scale-x-[-1]"
            />

            <Clothesline
                myPhotos={myPhotos}
                herSlots={herSlots}
                onRemoveHer={onRemovePhoto}
            />

            {/* Поляроїд-блок */}
            <div className="relative z-20 bg-white shadow-xl rounded-sm px-6 pt-5 pb-8 flex flex-col items-center gap-4"
                style={{ boxShadow: "0 8px 32px rgba(180,90,130,0.18), 0 2px 8px rgba(0,0,0,0.08)" }}>
                {/* Поляроїд "верхня смуга" */}
                <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-sm bg-gradient-to-r from-pink-200 via-primary/40 to-pink-200" />

                <span className="font-caveat text-2xl text-primary font-bold">
                    {photosCount < 6 ? "Додай свій спогад 📎" : "Всі спогади додано! 🌸"}
                </span>

                {photosCount < 6 && (
                    <button
                        onClick={onAddPhotos}
                        className="bg-primary text-white font-bold px-8 py-3 rounded-full
                                   shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                    >
                        ＋ Додати спогад
                    </button>
                )}

                {/* Лічильник у стилі підпису поляроїда */}
                <span className="font-caveat text-lg text-primary/70">
                    {photosCount} / 6
                </span>
            </div>
        </section>
    );
};

export default MomentsSection;
