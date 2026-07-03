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
        <section id="moments-section" className="flex flex-col items-center gap-10 sm:gap-20 py-16 sm:py-40 overflow-x-hidden w-full">
            <SectionTitle
                title="Незабутні спогади"
                subtitle="Увічнені моменти"
                description="Я обрав 6 найяскравіших моментів нашого життя. Твоїм завданням буде додати ще 6 наших спільних спогадів."
            />

            <div className="-mx-4 sm:mx-0 w-[calc(100%+2rem)] sm:w-full">
                <Clothesline
                    myPhotos={myPhotos}
                    herSlots={herSlots}
                    onRemoveHer={onRemovePhoto}
                />
            </div>

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
