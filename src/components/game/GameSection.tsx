import { useGameLogic } from "../../hooks/useGameLogic";
import { GameStats } from "./GameStats";
import { GameBoard } from "./GameBoard";
import { WinOverlay } from "./WinOverlay";
import { GameOverOverlay } from "./GameOverOverlay";
import { useState } from "react";
import SectionTitle from "../ui/SectionTitle";

type Props = {
    photos: (string | null)[];
    photosReady: boolean;
    photosCount: number;
    onAddPhotos: () => void;
};

const GameSection = ({
    photos,
    photosReady,
    photosCount,
    onAddPhotos,
}: Props) => {
    const [showWin, setShowWin] = useState(false);

    const {
        deck,
        flipped,
        matched,
        moves,
        timeLeft,
        status,
        flipCard,
        startGame,
        restart,
    } = useGameLogic(photos);

    function handleRestart() {
        setShowWin(true);
        restart();
    }

    return (
        <section id="game-section" className="py-10 sm:py-20 px-3 sm:px-6">
            <div className="max-w-190 mx-auto text-center">
                <div className="flex flex-col items-center gap-8 sm:gap-12">
                    {/* <ElephantMascot
                        emotion="broken"
                        speech="Ой-ой-ой… я впав і все-все забув 😵 Хто ти? Яким кому я мав щось вручити? Допоможи мені згадати — перевертай картки!"
                        width={300}
                        animateIn
                    /> */}
                    <SectionTitle
                        title="Хто ти?"
                        subtitle="Згадай спогад"
                        description="Від сильного падіння у слоніка перемішалися всі спогади. Допоможи їх відновити — перевертай картки й знаходь однакові пари. Але будь обережна: не більше 30 ходів і 2 хвилини, інакше він так і не пригадає!"
                    />
                </div>

                <GameStats
                    moves={moves}
                    matched={matched.length}
                    timeLeft={timeLeft}
                    onRestart={handleRestart}
                />

                <GameBoard
                    deck={deck}
                    flipped={flipped}
                    matched={matched}
                    status={status}
                    photosReady={photosReady}
                    photosCount={photosCount}
                    onFlip={flipCard}
                    onStart={startGame}
                    onAddPhotos={onAddPhotos}
                />
            </div>

            {status === "won" && showWin && (
                <WinOverlay
                    moves={moves}
                    timeLeft={timeLeft}
                    onRestart={handleRestart}
                    onClose={() => setShowWin(false)}
                />
            )}

            {(status === "lost_time" || status === "lost_moves") && (
                <GameOverOverlay
                    reason={status}
                    moves={moves}
                    matched={matched.length}
                    onRestart={handleRestart}
                />
            )}
        </section>
    );
};

export default GameSection;
