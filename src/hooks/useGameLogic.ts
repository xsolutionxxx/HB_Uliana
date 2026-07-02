import { useState, useRef, useEffect, useCallback } from "react";
import type { CardType, GameStatus } from "../types/game";
import { buildDeck } from "../utils/buildDeck";

const TOTAL_PAIRS = 12;
const MAX_MOVES = 30;
export const GAME_TIME = 120;

export function useGameLogic(photos: (string | null)[]) {
    const [deck, setDeck] = useState<CardType[]>([]);
    const [flipped, setFlipped] = useState<string[]>([]);
    const [matched, setMatched] = useState<string[]>([]);
    const [moves, setMoves] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_TIME);
    const [status, setStatus] = useState<GameStatus>("idle");
    const [busy, setBusy] = useState(false);

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // запускає таймер коли status стає "playing", зупиняє через cleanup
    useEffect(() => {
        if (status !== "playing") return;

        timerRef.current = setInterval(() => {
            setTimeLeft((t) => {
                if (t <= 1) {
                    clearInterval(timerRef.current!);
                    timerRef.current = null;
                    setStatus("lost_time");
                    return 0;
                }
                return t - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [status]);

    // перевіряє перемогу після кожного оновлення matched
    useEffect(() => {
        if (status !== "playing") return;
        if (matched.length >= TOTAL_PAIRS) {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            setStatus("won");
        }
    }, [matched, status]);

    // перевіряє поразку по ходах після кожного оновлення moves
    useEffect(() => {
        if (status !== "playing") return;
        if (moves >= MAX_MOVES && matched.length < TOTAL_PAIRS) {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            setStatus("lost_moves");
        }
    }, [moves, matched, status]);

    function startGame() {
        // photos = [...DEFAULT_PHOTOS(6), ...userPhotos(6)]
        // фільтруємо null (незаповнені слоти користувача)
        const realPhotos = photos.filter((p): p is string => p !== null);
        setDeck(buildDeck(realPhotos));
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setTimeLeft(GAME_TIME);
        setBusy(false);
        setStatus("playing");
    }

    function restart() {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setDeck([]);
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setTimeLeft(GAME_TIME);
        setBusy(false);
        setStatus("idle");
    }

    const flipCard = useCallback(
        (cardId: string) => {
            if (status !== "playing" || busy) return;

            const card = deck.find((c) => c.id === cardId);
            if (!card) return;
            if (flipped.includes(cardId)) return;
            if (matched.includes(card.pairId)) return;

            // перша картка — просто показуємо
            if (flipped.length === 0) {
                setFlipped([cardId]);
                return;
            }

            // друга картка — перевіряємо збіг
            const firstCard = deck.find((c) => c.id === flipped[0])!;
            const isMatch = firstCard.pairId === card.pairId;

            setFlipped([flipped[0], cardId]);
            setMoves((m) => m + 1);
            setBusy(true);

            setTimeout(() => {
                if (isMatch) {
                    setMatched((prev) => [...prev, firstCard.pairId]);
                }
                setFlipped([]);
                setBusy(false);
            }, 700);
        },
        [status, busy, deck, flipped, matched],
    );

    return {
        deck,
        flipped,
        matched,
        moves,
        timeLeft,
        status,
        flipCard,
        startGame,
        restart,
    };
}
