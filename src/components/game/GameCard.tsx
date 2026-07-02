import type { CardType } from "../../types/game";

type Props = {
    card: CardType;
    isFlipped: boolean;
    isMatched: boolean;
    onClick: () => void;
};

export function GameCard({ card, isFlipped, isMatched, onClick }: Props) {
    const isRevealed = isFlipped || isMatched;

    return (
        <button
            onClick={onClick}
            className={[
                "aspect-square rounded-2xl flex items-center justify-center",
                "transition-all duration-200 select-none overflow-hidden",
                isMatched
                    ? "bg-white ring-2 ring-primary cursor-default"
                    : isFlipped
                      ? "bg-white shadow-lg cursor-pointer"
                      : "bg-linear-to-br from-pink-600 to-primary shadow-md cursor-pointer hover:scale-105 active:scale-95",
            ].join(" ")}
        >
            {isRevealed ? (
                card.type === "photo" && card.src ? (
                    <img
                        src={card.src}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-3xl">{card.emoji}</span>
                )
            ) : (
                <span className="text-white text-xl opacity-80">♡</span>
            )}
        </button>
    );
}
