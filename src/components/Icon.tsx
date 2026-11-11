import type { IconName } from "@/i18n/dictionaries";

type ExtraIcon = "arrow" | "chevron" | "plus" | "menu" | "close" | "translate" | "up" | "phone" | "pin" | "whatsapp" | "spark";

const paths: Record<IconName | ExtraIcon, string> = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  chevron: "m6 9 6 6 6-6",
  plus: "M12 5v14M5 12h14",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  up: "M12 19V5M6 11l6-6 6 6",
  translate: "M4 5h8M8 3v2M6 5c0 4 3 7 6 8M10 5c0 3-2.5 6.5-6 8M13 21l4-9 4 9M14.5 18h5",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  pin: "M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12ZM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  whatsapp: "M3.5 20.5 5 16a8.5 8.5 0 1 1 3.2 3.1ZM9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-2-1-1 .9a4 4 0 0 1-2.2-2.2l.9-1-1-2Z",
  spark: "M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.5 2.5M16.5 16.5 19 19M5 19l2.5-2.5M16.5 7.5 19 5",
  stethoscope: "M6 3v6a4 4 0 0 0 8 0V3M10 13v2a5 5 0 0 0 10 0v-2M18 11a2 2 0 1 0 4 0 2 2 0 1 0-4 0",
  hospital: "M3 21h18M5 21V8l7-4 7 4v13M12 10v5M9.5 12.5h5M10 21v-3h4v3",
  calendar: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2ZM3 10h18M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2",
  clipboard: "M7 4h10a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM9 4V3h6v1M9 13l2 2 4-4",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8ZM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8Z",
  shield: "M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6ZM9 12l2 2 4-4",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0",
  users: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM2 21a7 7 0 0 1 14 0M16 3.5a4 4 0 0 1 0 7.5M18 14a6 6 0 0 1 4 7",
  building: "M6 3h12a2 2 0 0 1 2 2v16H4V5a2 2 0 0 1 2-2ZM9 21v-4h6v4M12 7v4M10 9h4",
  pulse: "M3 12h4l2-5 4 10 2-5h6",
  monitor: "M5 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM8 20h8M12 16v4M7 10h2l1.5-2 2 4 1.5-2H17",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z",
  mail: "M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2ZM3 7l9 6 9-6",
  plane: "M10.5 13.5 3 11l1.5-1.5 7 1L16 6a2.1 2.1 0 0 1 3 3l-4.5 4.5 1 7L14 22l-2.5-7.5M6 18l-2 2",
  check: "M20 6 9 17l-5-5",
  award: "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM8.5 13.5 7 22l5-3 5 3-1.5-8.5",
  map: "M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2ZM9 4v14M15 6v14",
};

export type AnyIcon = IconName | ExtraIcon;

export function Icon({ name, size = 22, className = "", strokeWidth = 1.7 }: { name: AnyIcon; size?: number; className?: string; strokeWidth?: number }) {
  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}
