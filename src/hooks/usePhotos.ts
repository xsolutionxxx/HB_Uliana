import { useState, useEffect } from "react";
import moment_1 from "../assets/moments/memento_1.jpg";
import moment_2 from "../assets/moments/memento_2.jpg";
import moment_3 from "../assets/moments/memento_3.jpg";
import moment_4 from "../assets/moments/memento_4.jpg";
import moment_5 from "../assets/moments/memento_5.jpg";
import moment_6 from "../assets/moments/memento_6.jpg";

const STORAGE_KEY = "game_photos_v1";
const TOTAL_SLOTS = 6;

export const DEFAULT_PHOTOS: string[] = [
  moment_1,
  moment_2,
  moment_3,
  moment_4,
  moment_5,
  moment_6,
];

function downscale(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const MAX = 900;
      const scale = Math.min(1, MAX / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });
}

function save(slots: (string | null)[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
  } catch {
    alert("Не вдалося зберегти.");
  }
}

export function usePhotos() {
  const [herSlots, setHerSlots] = useState<(string | null)[]>(
    Array(TOTAL_SLOTS).fill(null),
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed: (string | null)[] = JSON.parse(raw);
      const slots: (string | null)[] = Array(TOTAL_SLOTS).fill(null);
      parsed.forEach((v, i) => {
        if (i < TOTAL_SLOTS && v) slots[i] = v;
      });
      setHerSlots(slots);
    } catch {}
  }, []);

  async function addPhotos() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.style.cssText =
      "position:fixed;left:-9999px;top:-9999px;opacity:0;pointer-events:none;";
    document.body.appendChild(input);
    input.onchange = async (e) => {
      const files = Array.from((e.target as HTMLInputElement).files ?? []);
      const dataUrls: string[] = [];
      for (const file of files) {
        const d = await downscale(file);
        if (d) dataUrls.push(d);
      }
      document.body.removeChild(input);
      setHerSlots((prev) => {
        const next = [...prev];
        let ai = 0;
        for (let i = 0; i < next.length && ai < dataUrls.length; i++) {
          if (!next[i]) next[i] = dataUrls[ai++];
        }
        save(next);
        return next;
      });
    };
    input.click();
  }

  function removePhoto(index: number) {
    setHerSlots((prev) => {
      const next = [...prev];
      next[index] = null;
      save(next);
      return next;
    });
  }

  // комбінований масив для гри: [DEFAULT×6, herSlots×6] = 12
  const photos = [...DEFAULT_PHOTOS, ...herSlots];
  const photosReady = herSlots.every((p) => p !== null);
  const photosCount = herSlots.filter(Boolean).length;

  return {
    myPhotos: DEFAULT_PHOTOS, // для Clothesline — string[]
    herSlots, // для Clothesline — (string|null)[]
    photos, // для гри — 12 елементів
    addPhotos,
    removePhoto,
    photosReady,
    photosCount,
  };
}
