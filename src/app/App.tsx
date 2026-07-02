import { useState } from "react";
import Header from "../components/Header";
import Container from "../components/ui/Container";
import MomentsSection from "../components/moments/MomentsSection";
import GameSection from "../components/game/GameSection";
import Footer from "../components/Footer";
import CountdownOverlay from "../components/CountdownOverlay";
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

    // true = таймер ще йде / false = вміст відкрито
    const [locked, setLocked] = useState(() => {
        const BIRTHDAY = new Date("2026-07-04T00:00:00+03:00");
        return Date.now() < BIRTHDAY.getTime();
    });

    return (
        <>
            {locked && (
                <CountdownOverlay onUnlock={() => setLocked(false)} />
            )}

            {/* Основний контент — прихований поки заблокований */}
            {!locked && (
                <>
                    <Header />
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
                        />
                        <Footer />
                    </Container>
                </>
            )}
        </>
    );
}

export default App;
