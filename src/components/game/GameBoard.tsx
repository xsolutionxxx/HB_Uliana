import type { CardType, GameStatus } from "../../types/game";
import { GameCard } from "./GameCard";
import { StartOverlay } from "./StartOverlay";

type Props = {
    deck: CardType[];
    flipped: string[];
    matched: string[];
    status: GameStatus;
    photosReady: boolean;
    photosCount: number;
    onFlip: (id: string) => void;
    onStart: () => void;
    onAddPhotos: () => void;
};

export function GameBoard({
    deck,
    flipped,
    matched,
    status,
    photosReady,
    photosCount,
    onFlip,
    onStart,
    onAddPhotos,
}: Props) {
    const placeholders = deck.length === 0 ? Array.from({ length: 24 }) : [];

    return (
        <div className="relative">
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 sm:gap-2 max-w-175 mx-auto px-2 sm:px-0">
                {deck.map((card) => (
                    <GameCard
                        key={card.id}
                        card={card}
                        isFlipped={flipped.includes(card.id)}
                        isMatched={matched.includes(card.pairId)}
                        onClick={() => onFlip(card.id)}
                    />
                ))}
                {placeholders.map((_, i) => (
                    <div
                        key={i}
                        className="aspect-square rounded-2xl bg-pink-200/75 opacity-40"
                    />
                ))}
            </div>

            {status === "idle" && (
                <StartOverlay
                    photosReady={photosReady}
                    photosCount={photosCount}
                    onStart={onStart}
                    onAddPhotos={onAddPhotos}
                />
            )}
        </div>
    );
}
