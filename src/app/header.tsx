export default function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-center gap-3">
      <svg
        data-testid="geist-icon"
        fill="none"
        height="24"
        shape-rendering="geometricPrecision"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        width="24"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
      </svg>
      <svg
        data-testid="geist-icon"
        fill="none"
        height="24"
        shape-rendering="geometricPrecision"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z" />
        <path d="M16 16l4.5 4.5" />
      </svg>
      <svg
        data-testid="geist-icon"
        fill="none"
        height="24"
        shape-rendering="geometricPrecision"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M15 18H3M21 6H3M17 12H3" />
      </svg>
    </header>
  );
}
