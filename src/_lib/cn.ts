import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

export const rangeClasses = (prefix: string, max: number) =>
  Array.from({ length: max + 1 }, (_, i) => `${prefix}-${i}`);

export const RANGES = {
  fontSize: 100,
  borderRadius: 100,
  borderWidth: 10,
  spacing: 600,
} as const;

// 커스텀 tailwind-merge 설정
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // 어떤 클래스들이 같은 CSS 속성을 제어하는지 tailwind-merge에게 알려준다.
      // tailwind-merge는 기본적으로 표준 tailwind CSS클래스만 알고있기때문에
      // tailwind.config.ts에서 font-size를 커스텀해 폰트 사이즈를 모르기때문에 따로 알려줘야한다.
      "font-size": rangeClasses("text", RANGES.fontSize),
    },
  },
});

// twMerge는 충돌하는 Tailwind 클래스를 자동으로 병합/덮어씀
// 예: "px-4 px-6" -> "px-6"만 남김
export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
