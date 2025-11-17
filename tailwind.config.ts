import type { Config } from "tailwindcss";

const rangePx = (max: number) =>
  Object.fromEntries(
    Array.from({ length: max + 1 }, (_, i) => [String(i), `${i}px`])
  );

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderWidth: rangePx(10),
      borderRadius: rangePx(100),
      fontSize: rangePx(100),
      lineHeight: { ...rangePx(100), normal: "normal" },
      minWidth: rangePx(1000),
      minHeight: rangePx(1000),
      spacing: rangePx(600),
      maxWidth: rangePx(2000),
      maxHeight: rangePx(2000),
      width: rangePx(2000),
      height: rangePx(2000),
    },
    screens: {
      pc: "1024px",
    },
  },
};

export default config;
