import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { ElephantMascot } from "./ElephantMascot";
import somersaultImg from "../assets/somersault-elephant.png";

type Props = {
  onElephantLand: () => void;
};

type FlightParams = {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
};

const BUBBLE_SIZE = "clamp(360px, 69vw, 480px)";

const PromoIntro = ({ onElephantLand }: Props) => {
  const [phase, setPhase] = useState<"idle" | "dialog" | "flying" | "gone">(
    "idle",
  );
  const elephantRef = useRef<HTMLDivElement>(null);
  const flyRef = useRef<HTMLImageElement>(null);
  const flightParams = useRef<FlightParams | null>(null);

  const handleClick = () => {
    if (phase === "idle") {
      setPhase("dialog");
      return;
    }
    if (phase !== "dialog") return;

    new Audio("/elephant.mp3").play().catch(() => {});

    const elephantEl = elephantRef.current;
    const baobabEl = document.querySelector<HTMLElement>(
      '[data-baobab="right"]',
    );
    if (!elephantEl || !baobabEl) return;

    const eRect = elephantEl.getBoundingClientRect();
    const bRect = baobabEl.getBoundingClientRect();

    flightParams.current = {
      targetX: bRect.left + bRect.width * 0.15,
      targetY: bRect.top + bRect.height * 0.38,
      startX: eRect.left + eRect.width / 2 - 55,
      startY: eRect.top + eRect.height / 2 - 55,
    };

    setPhase("flying");
  };

  // Стартує анімацію польоту синхронно після коміту DOM (надійніше за
  // requestAnimationFrame, який браузер може притримати для неактивної вкладки).
  useLayoutEffect(() => {
    if (phase !== "flying") return;
    const el = flyRef.current;
    const params = flightParams.current;
    if (!el || !params) return;

    const { startX, startY, targetX, targetY } = params;
    const dx = targetX - 55 - startX;
    const dy = targetY - 55 - startY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const duration = Math.min(1600, Math.max(900, dist * 1.1));

    const animation = el.animate(
      [
        {
          transform: `translate(${startX}px, ${startY}px) rotate(0deg)`,
          opacity: 1,
        },
        {
          transform: `translate(${startX + dx * 0.35}px, ${startY + dy * 0.15 - 100}px) rotate(240deg)`,
          opacity: 1,
          offset: 0.4,
        },
        {
          transform: `translate(${startX + dx * 0.72}px, ${startY + dy * 0.6 - 50}px) rotate(540deg)`,
          opacity: 1,
          offset: 0.75,
        },
        {
          transform: `translate(${targetX - 55}px, ${targetY - 55}px) rotate(720deg)`,
          opacity: 1,
        },
      ],
      { duration, easing: "cubic-bezier(.4,0,.2,1)", fill: "forwards" },
    );

    animation.onfinish = () => {
      setPhase("gone");
      onElephantLand();
    };

    return () => animation.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  return (
    <div
      className="relative w-full promo-intro-wrap"
      style={
        {
          "--pad-mobile":
            phase === "dialog" || phase === "flying"
              ? `calc(${BUBBLE_SIZE} + 28px)`
              : "24px",
          "--pad-desktop":
            phase === "dialog" || phase === "flying"
              ? `calc(${BUBBLE_SIZE} - 53px)`
              : "24px",
          paddingTop: "var(--pad-mobile)",
          paddingBottom: "16px",
          transition: "padding-top 0.3s ease",
        } as CSSProperties
      }
    >
      <style>{`
        @media (min-width: 640px) {
          .promo-intro-wrap { padding-top: var(--pad-desktop) !important; }
        }
      `}</style>
      <div className="relative z-10 flex items-center max-w-5xl mx-auto px-4 sm:px-10">
        <div
          ref={elephantRef}
          className="relative shrink-0 flex items-end z-10"
          style={{
            marginTop: "12px",
            cursor:
              phase === "idle" || phase === "dialog" ? "pointer" : "default",
            opacity: phase === "flying" || phase === "gone" ? 0 : 1,
            transition: "opacity 0.1s",
          }}
          onClick={handleClick}
          title={
            phase === "idle"
              ? "Натисни на мене!"
              : phase === "dialog"
                ? "Натисни ще раз!"
                : undefined
          }
        >
          <img
            src="/pink-cloude.png"
            alt=""
            className="absolute left-1/2 pointer-events-none select-none"
            style={{
              bottom: "-36px",
              width: "220%",
              maxWidth: "none",
              height: "auto",
              transform: "translateX(-50%)",
              zIndex: 0,
            }}
          />

          <ElephantMascot
            emotion="default"
            width={110}
            className="sm:w-[140px] relative z-10"
          />

          <img
            src="/pink-cloude.png"
            alt=""
            className="absolute left-1/2 pointer-events-none select-none z-20"
            style={{
              bottom: "-42px",
              width: "100%",
              maxWidth: "none",
              height: "auto",
              transform: "translateX(-50%)",
            }}
          />
        </div>

        {/* Бульбашка — сусід слоника (а не дитина): на мобільному центрована
            відносно широкого центрованого ряду (щоб не вилазити за екран),
            на sm+ — по діагоналі справа-зверху від слоника фіксованим
            офсетом (ElephantMascot завжди рендериться 110px завширшки) */}
        {(phase === "dialog" || phase === "flying") && (
          <div
            className="absolute left-1/2 z-30"
            style={{
              bottom: "calc(20%)", // Змінено з 14px на 2px, щоб опустити вікно ближче до слоника
              width: BUBBLE_SIZE,
              transform:
                phase === "dialog"
                  ? "translateX(20%)"
                  : "translateX(20%) scale(0.92)",
              opacity: phase === "dialog" ? 1 : 0,
              // Рядок transition повністю видалено, щоб вікно з'являлось миттєво
            }}
          >
            <img
              src="/dialog.png"
              alt=""
              draggable={false}
              className="w-full h-auto pointer-events-none select-none"
            />
            <div
              className="absolute flex items-center justify-center text-center"
              style={{
                left: "22%",
                right: "23%",
                top: "39%",
                bottom: "37%",
              }}
            >
              <p className="font-caveat text-[clamp(12px,2.4vw,18px)] leading-[1.1] text-gray-700">
                З Днем народження, Юліаночко! 🎉 Я Слонік і я так довго чекав
                цього дня! Мені доручено передати тобі{" "}
                <span className="text-primary font-bold">
                  листа від твого Назарка
                </span>
                . Та перед цим давай разом згадаємо{" "}
                <span className="text-primary font-bold">
                  ваші найтепліші моменти!
                </span>
                &nbsp;💕
              </p>
            </div>
          </div>
        )}
      </div>

      {phase === "flying" && (
        <img
          ref={flyRef}
          src={somersaultImg}
          alt=""
          draggable={false}
          className="pointer-events-none select-none"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 110,
            height: "auto",
            zIndex: 9999,
            mixBlendMode: "multiply",
            transformOrigin: "center center",
          }}
        />
      )}
    </div>
  );
};

export default PromoIntro;
