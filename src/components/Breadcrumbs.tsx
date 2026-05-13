import { Link } from "react-router-dom";

type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-lr-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-2">
              {i > 0 && <span className="text-lr-terracotta">/</span>}
              {c.to && !last ? (
                <Link to={c.to} className="text-lr-textSecondary transition-colors hover:text-lr-terracotta">
                  {c.label}
                </Link>
              ) : (
                <span className={last ? "text-lr-muted" : "text-lr-textSecondary"}>{c.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
