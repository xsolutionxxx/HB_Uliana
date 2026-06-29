import Container from "../components/ui/Container";

import Header from "../components/Header";
import Moments from "../components/Moments";
import Game from "../components/Game";
import Footer from "../components/Footer";

function App() {
    return (
        <>
            <Header />
            <Container>
                <Moments />
                <Game />
                <Footer />
            </Container>
        </>
    );
}

export default App;
