import { useState } from "react";

import { Clothesline } from "./Clothesline";

import SectionTitle from "./ui/SectionTitle";
import { resizeImage } from "../utils/resizeImage";

const MY_PHOTOS = [
    "https://picsum.photos/seed/a/400/400",
    "https://picsum.photos/seed/b/400/400",
    "https://picsum.photos/seed/a/400/400",
    "https://picsum.photos/seed/b/400/400",
    "https://picsum.photos/seed/a/400/400",
    "https://picsum.photos/seed/b/400/400",
];

const Moments = () => {
    const [herSlots, setHerSlots] = useState<(string | null)[]>(() => {
        const saved = localStorage.getItem("her_photos");
        const arr = saved ? JSON.parse(saved) : [];
        const slots = new Array(6).fill(null);
        arr.forEach((v: string, i: number) => {
            if (i < 6 && v) slots[i] = v;
        });
        return slots;
    });

    const addHerPhoto = async (file: File) => {
        const src = await resizeImage(file, 900);
        setHerSlots((prev) => {
            const next = [...prev];
            const idx = next.findIndex((s) => !s);
            if (idx !== -1) next[idx] = src;
            localStorage.setItem("her_photos", JSON.stringify(next));
            return next;
        });
    };

    const removeHer = (i: number) => {
        setHerSlots((prev) => {
            const next = [...prev];
            next[i] = null;
            localStorage.setItem("her_photos", JSON.stringify(next));
            return next;
        });
    };

    return (
        <section className="flex flex-col items-center gap-20 py-40 overflow-x-hidden w-full">
            <SectionTitle
                title="Незабутні спогади"
                subtitle="Увічнені моменти"
                description="Я обрав 6 найяскравіших моментів нашого життя, які я хотів би зберегти назавжди. Твоїм завданням буде додати ще 6 наших спільних спогадів, які гріють тобі душу, навіть коли ми не разом."
            />
            <Clothesline
                myPhotos={MY_PHOTOS}
                herSlots={herSlots}
                onRemoveHer={removeHer}
            />
            <button
                onClick={() => {
                    const inp = document.createElement("input");
                    inp.type = "file";
                    inp.accept = "image/*";
                    inp.onchange = (e) => {
                        const f = (e.target as HTMLInputElement).files?.[0];
                        if (f) addHerPhoto(f);
                    };
                    inp.click();
                }}
            >
                Додати фото
            </button>
        </section>
    );
};

export default Moments;
