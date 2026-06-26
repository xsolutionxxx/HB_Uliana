import usePetals from "../hooks/usePetals";

export default function Petals() {
    const petals = usePetals();
    return (
        <div className="pointer-events-none absolute inset-0 z-1 overflow-hidden">
            {petals.map((p, i) => (
                <span
                    key={i}
                    className="absolute top-[-12vh] animate-petal will-change:transform
                     motion-reduce:hidden"
                    style={p.style}
                >
                    {p.char}
                </span>
            ))}
        </div>
    );
}
