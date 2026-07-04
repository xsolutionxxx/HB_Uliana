import { ElephantMascot } from "./ElephantMascot";

type Props = {
  onClose: () => void;
};

export default function CongratsModal({ onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-md overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative my-auto max-w-2xl w-full">
        {/* декоративне сяйво позаду картки */}
        <div
          className="pointer-events-none absolute -inset-6 sm:-inset-10 -z-10 animate-glow-pulse rounded-[3rem] blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(250,200,217,.55), rgba(250,200,217,.18) 55%, transparent 75%)",
          }}
        />

        <div className="animate-elephant-bounce flex flex-col md:flex-row items-center gap-4 sm:gap-8 bg-white rounded-3xl p-5 sm:p-8 shadow-2xl ring-1 ring-pink-200/70 w-full">
          <div className="shrink-0">
            <ElephantMascot
              emotion="down-heart"
              speech="Я все згадав! Це ти — Юліаночка! Тримай, це для тебе! 💝"
              width={200}
            />
          </div>

          <div className="animate-letter-unfold relative flex-1 w-full rounded-2xl border-2 border-pink-200 bg-[#fff9fb] p-4 sm:p-6 text-left shadow-inner">
            <span className="absolute -top-3.5 left-6 bg-transparent px-2 text-lg leading-none">
              💌
            </span>

            <p className="font-caveat text-[26px] font-bold text-pink-800 mb-4">
              Юліаночко,
            </p>
            <p className="font-caveat text-[19px] text-pink-700 leading-relaxed mb-3">
              Я так радий, що слоник все пригадав і ти читаєш це зараз! Бо без
              тебе моє серденько, як і слонік, заблукало б…
            </p>
            <p className="font-caveat text-[19px] text-pink-700 leading-relaxed mb-3">
              З Днем народження, моє сонечко! 🎂 Ти — найкраще, що зі мною
              сталося. Твоя посмішка робить кожен день насиченим, живим, а твій
              сміх є найкращою піснею для мене.
            </p>
            <p className="font-caveat text-[19px] text-pink-700 leading-relaxed mb-5">
              Дякую за кожен момент, за тепло, за любов і красу яку ти даруєш.
              Ти фантастична!💕
            </p>
            <p className="font-caveat text-[21px] font-bold text-pink-800">
              З любов'ю, <span className="text-pink-800">твій Слонік</span> 🐘
            </p>

            <div className="mt-5 flex justify-end">
              <button
                onClick={onClose}
                className="bg-primary text-white font-bold px-7 py-2.5 rounded-full
                           shadow-md cursor-pointer hover:scale-105 active:scale-95
                           transition-transform text-sm"
              >
                Закрити
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
