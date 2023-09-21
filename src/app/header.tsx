export default function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-center gap-3">
      <button className="flex gap-1.5 rounded-sm transition-all duration-300 hover:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 active:text-gray-400">
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
        Add new car
      </button>
    </header>
  );
}
