export type CardType = {
    id: string; // унікальний — "0-a", "0-b"
    pairId: string; // спільний для пари — "p0", "e0"
    type: "photo" | "emoji";
    src?: string;
    emoji?: string;
};

export type GameStatus =
    | "idle" // до старту
    | "playing" // гра йде
    | "won" // перемога
    | "lost_time" // час вийшов
    | "lost_moves"; // ходи скінчились
