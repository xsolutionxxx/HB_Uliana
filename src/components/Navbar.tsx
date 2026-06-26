const Navbar = () => {
    return (
        <nav className="absolute top-14 left-0 w-full flex items-center justify-center py-6">
            <ul className="text-2xl flex gap-16">
                <li>
                    <a
                        href="#"
                        className="cursor-pointer hover:text-primary transition-colors"
                    >
                        Привітання
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="cursor-pointer hover:text-primary transition-colors"
                    >
                        Спогади
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="cursor-pointer hover:text-primary transition-colors"
                    >
                        Чи добре ти знаєш нас?
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="cursor-pointer hover:text-primary transition-colors"
                    >
                        Люблю тебе &#9829;
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
