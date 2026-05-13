export function IconPlant({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M12 22V12" strokeLinecap="round" />
      <path d="M12 12c-2-4-6-5-8-2 2 1 5 0 8 2Z" />
      <path d="M12 12c2-4 6-5 8-2-2 1-5 0-8 2Z" />
      <path d="M12 8V4" strokeLinecap="round" />
    </svg>
  );
}

export function IconHands({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M8 11V7a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4" />
      <path d="M10 11V9" />
      <path d="M14 10V6a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v6" />
      <path d="M6 11c0 4 2 7 6 7s6-3 6-7" strokeLinecap="round" />
    </svg>
  );
}

export function IconHeart({ className = "w-5 h-5", filled }: { className?: string; filled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.25">
      <path d="M12 21s-7-4.35-7-10a4.5 4.5 0 0 1 8-2.7A4.5 4.5 0 0 1 19 11c0 5.65-7 10-7 10Z" strokeLinejoin="round" />
    </svg>
  );
}

export function IconEarth({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c3 3 3 15 0 18" />
      <path d="M12 3c-3 3-3 15 0 18" />
    </svg>
  );
}

export function IconSearch({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-3-3" strokeLinecap="round" />
    </svg>
  );
}

export function IconCart({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 6h15l-2 9H8L6 6Z" strokeLinejoin="round" />
      <path d="M6 6 5 3H2" strokeLinecap="round" />
      <circle cx="9" cy="20" r="1" fill="currentColor" stroke="none" />
      <circle cx="18" cy="20" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconMenu({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

export function IconClose({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

export function IconWhatsApp({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2a9.94 9.94 0 0 0-8.48 15.1L2 22l5.08-1.5A9.94 9.94 0 1 0 12.04 2Zm5.6 14.2c-.24.68-1.38 1.28-1.9 1.36-.48.08-1.1.1-1.78-.1-.41-.1-.94-.28-1.62-.56-2.86-1.24-4.7-4.14-4.84-4.34-.14-.18-1.16-1.54-1.16-2.94s.74-2.1 1-2.38c.26-.3.56-.36.74-.36h.54c.18 0 .42-.06.64.48.24.52.82 1.9.9 2.04.08.14.12.3.02.48-.1.18-.16.3-.3.46-.14.16-.3.36-.42.48-.14.14-.28.3-.12.58.16.28.72 1.18 1.54 1.9 1.06.94 1.94 1.24 2.22 1.38.28.14.44.12.6-.08.18-.2.68-.8.86-1.08.18-.28.36-.22.6-.14.24.1 1.52.72 1.78.86.26.14.44.22.5.34.06.12.06.7-.18 1.38Z" />
    </svg>
  );
}

export function IconChevronDown({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" />
    </svg>
  );
}

export function IconArrowRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconStar({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.9 7.3L22 9.3l-5.5 4.5L18.2 22 12 18.1 5.8 22l1.7-8.2L2 9.3l7.1-.1L12 2Z" />
    </svg>
  );
}
