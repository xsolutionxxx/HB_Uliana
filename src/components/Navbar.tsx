const Navbar = () => {
    return (
        <nav className="absolute top-6 sm:top-14 left-0 w-full flex items-center justify-center py-3 sm:py-6 px-4">
            <ul className="text-sm sm:text-xl md:text-2xl flex gap-4 sm:gap-8 md:gap-16">
                <li>
                    <a
                        href="#"
                        className="cursor-pointer glow-hover transition-colors"
                    >
                        Спогади
                    </a>
                </li>

                <li>
                    <a
                        href="#"
                        className="cursor-pointer glow-hover transition-colors"
                    >
                        Хто ти?
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="cursor-pointer glow-hover transition-colors"
                    >
                        Вітання
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="cursor-pointer glow-hover transition-colors"
                    >
                        Люблю тебе &#9829;
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
