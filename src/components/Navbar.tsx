type Props = {
  gameWon: boolean;
  onCongrats: () => void;
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const Navbar = ({ gameWon, onCongrats }: Props) => {
  return (
    <nav className="absolute top-6 sm:top-14 left-0 w-full flex items-center justify-center py-3 sm:py-6 px-4">
      <ul className="text-sm sm:text-xl md:text-2xl flex gap-4 sm:gap-8 md:gap-16">
        <li>
          <button
            onClick={() => scrollTo("moments-section")}
            className="cursor-pointer glow-hover transition-colors"
          >
            Спогади
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollTo("game-section")}
            className="cursor-pointer glow-hover transition-colors"
          >
            Хто ти?
          </button>
        </li>
        <li>
          {gameWon ? (
            <button
              onClick={onCongrats}
              className="cursor-pointer glow-hover transition-colors text-primary animate-pulse"
            >
              Вітання
            </button>
          ) : (
            <span
              className="opacity-30 cursor-not-allowed select-none"
              title="Пройди гру, щоб відкрити"
            >
              Вітання
            </span>
          )}
        </li>
        <li>
          <button
            onClick={() => scrollTo("footer-section")}
            className="cursor-pointer glow-hover transition-colors"
          >
            Люблю тебе &#9829;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
