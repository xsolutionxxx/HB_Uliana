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
            className="relative flex flex-col items-center gap-10 sm:gap-20 py-16 sm:py-40 w-full"
        >
            <SectionTitle
                title="Незабутні спогади"
                subtitle="Увічнені моменти"
                description="Я обрав 6 найяскравіших моментів нашого життя. Твоїм завданням буде додати ще 6 наших спільних спогадів."
            />

            <img
                src="/baobab.png"
                alt="baobab"
                className="absolute bottom-0 -left-4 sm:-left-10 md:-left-20 lg:left-0 -translate-x-1/2 h-[140%] z-1000"
            />

            <Clothesline
                myPhotos={myPhotos}
                herSlots={herSlots}
                onRemoveHer={onRemovePhoto}
            />

            <div className="flex flex-col items-center gap-4">
                {photosCount < 6 && (
                    <button
                        onClick={onAddPhotos}
                        className="bg-primary hover:bg-primary text-white font-bold
                                   px-7 py-3 rounded-full shadow-md cursor-pointer transition-colors"
                    >
                        ＋ Додати спогад
                    </button>
                )}
                <span className="text-sm text-primary font-semibold">
                    Додано: {photosCount} / 6
                </span>
            </div>
        </section>
    );
};

export default MomentsSection;
