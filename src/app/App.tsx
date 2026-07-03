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

    const [locked, setLocked] = useState(() => {
        const BIRTHDAY = new Date("2026-07-04T00:00:00+03:00");
        return Date.now() < BIRTHDAY.getTime();
    });

    const [gameWon, setGameWon] = useState(false);
    const [showCongrats, setShowCongrats] = useState(false);

    return (
        <>
            <BackgroundMusic />

            {locked && (
                <CountdownOverlay onUnlock={() => setLocked(false)} />
            )}

            {!locked && (
                <>
                    <Header
                        gameWon={gameWon}
                        onCongrats={() => setShowCongrats(true)}
                    />
                    <div className="lg:max-w-360 lg:mx-auto lg:px-20">
                        <MomentsSection
                            myPhotos={myPhotos}
                            herSlots={herSlots}
                            onAddPhotos={addPhotos}
                            onRemovePhoto={removePhoto}
                            photosCount={photosCount}
                        />
                    </div>
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
                        className="relative w-full pointer-events-none select-none z-10 -mb-[4vw] -mt-[4vw]"
                        style={{
                            mixBlendMode: "multiply",
                            filter: "sepia(1) hue-rotate(300deg) saturate(1.4) brightness(1.1)",
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
