import { useState } from "react";
import { ElephantMascot } from "./ElephantMascot";

const BUBBLE_SIZE = "clamp(360px, 69vw, 480px)";

const BrokenIntro = () => {
  const [phase, setPhase] = useState<"idle" | "dialog" | "gone">("idle");

  const handleClick = () => {
    if (phase === "idle") {
      new Audio("/elephant.mp3").play().catch(() => {});
      setPhase("dialog");
      return;
    }
    if (phase === "dialog") {
      setPhase("gone");
    }
  };

  return (
    <div
      className="relative w-full broken-intro-wrap"
      style={{
        // Той самий патерн, що й в PromoIntro: секція розгортається лише
        // поки видно діалог (фіксовано ~300px), і плавно згортається назад
        paddingTop: phase === "dialog" ? "140px" : "24px",
        paddingBottom: "16px",
        transition: "padding-top 0.4s ease",
      }}
    >
      <div className="relative z-10 flex items-center justify-end max-w-5xl mx-auto px-4 sm:px-10">
        <div
          className="relative shrink-0 flex items-end z-10"
          style={{
            marginTop: "12px",
            cursor:
              phase === "idle" || phase === "dialog" ? "pointer" : "default",
            opacity: phase === "gone" ? 0 : 1,
            transition: "opacity 0.3s ease",
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
            emotion={phase === "idle" ? "broken" : "sad"}
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

        {phase === "dialog" && (
          <div
            className="absolute z-30"
            style={{
              right: "20%",
              bottom: "calc(20%)",
              width: BUBBLE_SIZE,
            }}
          >
            <img
              src="/dialog.png"
              alt=""
              draggable={false}
              className="w-full h-auto pointer-events-none select-none"
              style={{ transform: "scaleX(-1)" }}
            />
            <div
              className="absolute flex items-center justify-center text-center"
              style={{
                left: "23%",
                right: "22%",
                top: "39%",
                bottom: "37%",
              }}
            >
              <p className="font-caveat text-[clamp(12px,2.4vw,18px)] leading-[1.1] text-gray-700">
                Де я? Що сталося?{" "}
                <span className="text-primary font-bold">Ти хто?</span> Я так
                чекав цього дня, але не можу пригадати чому...
                <span className="text-primary font-bold">
                  {" "}
                  Може ти мені допоможеш?
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrokenIntro;
