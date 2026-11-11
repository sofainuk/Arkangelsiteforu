export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg className="logo-mark" width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="lg-shield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14B8A6" />
          <stop offset="1" stopColor="#1D6FB8" />
        </linearGradient>
      </defs>
      <ellipse cx="24" cy="6.5" rx="8" ry="2.6" fill="none" stroke="#E9A23B" strokeWidth="2.2" />
      <path d="M24 12 9 17.5v9.2C9 35.4 15.4 41.8 24 44c8.6-2.2 15-8.6 15-17.3v-9.2Z" fill="url(#lg-shield)" />
      <path d="M21 21h6v5h5v6h-5v5h-6v-5h-5v-6h5Z" fill="#fff" />
    </svg>
  );
}
