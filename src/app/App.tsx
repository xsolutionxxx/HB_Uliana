import { useState } from "react";
import Header from "../components/Header";
import BackgroundMusic from "../components/BackgroundMusic";
import Container from "../components/ui/Container";
import MomentsSection from "../components/moments/MomentsSection";
import GameSection from "../components/game/GameSection";
import Footer from "../components/Footer";
import CountdownOverlay from "../components/CountdownOverlay";
import CongratsModal from "../components/CongratsModal";
import { usePhotos } from "../hooks/usePhotos";
import PromoIntro from "../components/PromoIntro";
import BrokenIntro from "../components/BrokenIntro";

function App() {
  const {
    myPhotos,
    herSlots,
    photos,
    addPhotos,
    removePhoto,
    photosReady,
    photosCount,
  } = usePhotos();

  // Сторінка з таймером показується завжди при завантаженні — навіть якщо
  // дата дня народження вже минула, CountdownOverlay сам покаже привітання
  // з кнопкою переходу замість чисел зворотного відліку.
  const [locked, setLocked] = useState(true);

  const [gameWon, setGameWon] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [elephantOnBaobab, setElephantOnBaobab] = useState(false);

  return (
    <>
      <BackgroundMusic active={!locked} />

      {locked && <CountdownOverlay onUnlock={() => setLocked(false)} />}

      {!locked && (
        <>
          <Header gameWon={gameWon} onCongrats={() => setShowCongrats(true)} />
          <Container>
            <PromoIntro onElephantLand={() => setElephantOnBaobab(true)} />
          </Container>
          <div className="lg:max-w-360 lg:mx-auto lg:px-20">
            <MomentsSection
              myPhotos={myPhotos}
              herSlots={herSlots}
              onAddPhotos={addPhotos}
              onRemovePhoto={removePhoto}
              photosCount={photosCount}
              elephantOnBaobab={elephantOnBaobab}
            />
          </div>
          <Container>
            <BrokenIntro />
          </Container>
          <Container>
            <GameSection
              photos={photos}
              photosReady={photosReady}
              photosCount={photosCount}
              onAddPhotos={addPhotos}
              onWin={() => setGameWon(true)}
            />
          </Container>
          <img
            src="/cardio_heart.png"
            alt=""
            className="relative w-full pointer-events-none select-none z-10 -mb-[6vw] -mt-[14vw] opacity-95"
            style={{
              filter:
                "sepia(1) hue-rotate(310deg) saturate(2.8) brightness(1.05) contrast(1.1)",
            }}
          />
          <Footer />

          {showCongrats && (
            <CongratsModal onClose={() => setShowCongrats(false)} />
          )}
        </>
      )}
    </>
  );
}

export default App;
