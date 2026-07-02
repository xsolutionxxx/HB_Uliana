import { ElephantMascot } from "./ElephantMascot";

type Props = {
    onClose: () => void;
};

export default function CongratsModal({ onClose }: Props) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-md overflow-y-auto"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-8 bg-white rounded-3xl p-5 sm:p-8 max-w-2xl w-full shadow-2xl my-auto">

                <div className="shrink-0">
                    <ElephantMascot
                        emotion="down-heart"
                        speech="Я все згадав! Це ти — Юліаночка! Тримай, це для тебе! 💝"
                        width={200}
                        animateIn
                    />
                </div>

                <div className="animate-letter-unfold flex-1 rounded-2xl border-2 border-pink-200 bg-[#fff9fb] p-4 sm:p-6 text-left shadow-inner">
                    <p className="font-caveat text-[26px] font-bold text-pink-800 mb-4">
                        Юліаночко,
                    </p>
                    <p className="font-caveat text-[19px] text-pink-700 leading-relaxed mb-3">
                        Я так радий, що пригадав! Бо без тебе моє серце б заблукало…
                    </p>
                    <p className="font-caveat text-[19px] text-pink-700 leading-relaxed mb-3">
                        З Днем народження, моє сонечко! 🎂 Ти — найкраще, що зі мною сталося.
                        Твоя посмішка робить кожен день яскравішим, а твій сміх є найкращою
                        музикою у світі.
                    </p>
                    <p className="font-caveat text-[19px] text-pink-700 leading-relaxed mb-5">
                        Дякую за кожен момент, за тепло, яке ти даруєш. Вперед — до нових
                        спільних спогадів! 💕
                    </p>
                    <p className="font-caveat text-[21px] font-bold text-pink-800">
                        З любов'ю, твій слонік 🐘
                    </p>

                    <div className="mt-5 flex justify-end">
                        <button
                            onClick={onClose}
                            className="border border-pink-200 text-pink-500 font-bold
                                       px-6 py-2.5 rounded-full hover:bg-pink-50 transition-colors text-sm"
                        >
                            Закрити
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
