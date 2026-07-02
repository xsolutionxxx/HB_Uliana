import { ElephantMascot } from "./ElephantMascot";

const ElephantIntroSection = () => {
    return (
        <section className="flex flex-col items-center gap-6 py-32 select-none">
            <ElephantMascot
                emotion="happy"
                speech="З Днем народження, Юліаночко! 🎉 Я так довго чекав цього дня! Давай разом згадаємо наші найтепліші моменти!"
                width={300}
                animateIn
            />
        </section>
    );
};

export default ElephantIntroSection;
