import type { CardType } from "../types/game";

const EMOJIS = [
    "🌷",
    "💖",
    "🌸",
    "💌",
    "🐘",
    "⭐",
    "🌙",
    "🦋",
    "🍓",
    "🌻",
    "🐣",
    "🦄",
];
const TOTAL_PAIRS = 12;

export function buildDeck(photos: string[]): CardType[] {
    const pairs: Omit<CardType, "id">[] = [];

    // заповнюємо фотографіями
    const photoCount = Math.min(photos.length, TOTAL_PAIRS);
    for (let i = 0; i < photoCount; i++) {
        pairs.push({ pairId: `p${i}`, type: "photo", src: photos[i] });
    }

    // якщо фото менше 12 — добиваємо емодзі
    for (let i = photoCount; i < TOTAL_PAIRS; i++) {
        pairs.push({
            pairId: `e${i}`,
            type: "emoji",
            emoji: EMOJIS[i % EMOJIS.length],
        });
    }

    // кожну пару дублюємо: картка "a" і картка "b"
    const deck: CardType[] = [];
    pairs.forEach((pair, i) => {
        deck.push({ ...pair, id: `${i}-a` });
        deck.push({ ...pair, id: `${i}-b` });
    });

    // перемішуємо (Fisher-Yates)
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
}
