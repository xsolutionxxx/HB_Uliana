import { useGameLogic } from "../../hooks/useGameLogic";
import { GameStats } from "./GameStats";
import { GameBoard } from "./GameBoard";
import { WinOverlay } from "./WinOverlay";
import { GameOverOverlay } from "./GameOverOverlay";
import { useState, useEffect } from "react";
import SectionTitle from "../ui/SectionTitle";

type Props = {
  photos: (string | null)[];
  photosReady: boolean;
  photosCount: number;
  onAddPhotos: () => void;
  onWin: () => void;
};

const GameSection = ({
  photos,
  photosReady,
  photosCount,
  onAddPhotos,
  onWin,
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

  useEffect(() => {
    if (status === "won") {
      setShowWin(true);
      onWin();
    }
  }, [status]);

  function handleRestart() {
    setShowWin(false);
    restart();
  }

  return (
    <section id="game-section" className="py-20 sm:px-6">
      <div className="max-w-190 mx-auto text-center">
        <SectionTitle
          title="Хто ти?"
          subtitle="Згадай спогад"
          description="Ой, здається Слонік переборщив з сальто і сильно вдарився, та так, що все перемішалося в його голові. Допоможи відновити спогади Слоніку, щоб згадав хто ти і вернув тобі лист від Назара — перевертай картки й знаходь однакові пари. Але будь обережна: не більше 30 ходів і 2 хвилини, інакше він так і не пригадає!"
        />

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
