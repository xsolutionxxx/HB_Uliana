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
                    <Container>
                        <MomentsSection
                            myPhotos={myPhotos}
                            herSlots={herSlots}
                            onAddPhotos={addPhotos}
                            onRemovePhoto={removePhoto}
                            photosCount={photosCount}
                        />
                        <GameSection
                            photos={photos}
                            photosReady={photosReady}
                            photosCount={photosCount}
                            onAddPhotos={addPhotos}
                            onWin={() => setGameWon(true)}
                        />
                        <Footer />
                    </Container>

                    {showCongrats && (
                        <CongratsModal onClose={() => setShowCongrats(false)} />
                    )}
                </>
            )}
        </>
    );
}

export default App;
