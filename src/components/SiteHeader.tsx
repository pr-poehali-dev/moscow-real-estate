import Icon from "@/components/ui/icon";

interface SiteHeaderProps {
  scrolled: boolean;
  onCallClick: () => void;
}

export default function SiteHeader({ scrolled, onCallClick }: SiteHeaderProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        boxShadow: scrolled ? "0 1px 24px rgba(11,59,74,0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: "var(--brand-primary)" }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L3 8v10h5v-6h4v6h5V8L10 2z" fill="white" fillOpacity="0.95" />
            </svg>
          </div>
          <span
            className="text-xl font-semibold"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--brand-deep)", letterSpacing: "0.04em" }}
          >
            МетрКлаб
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="tel:+74950000000"
            className="hidden sm:flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: "var(--brand-text-muted)" }}
          >
            <Icon name="Phone" size={15} />
            +7 (495) 000-00-00
          </a>
          <button
            onClick={onCallClick}
            className="px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 hover:scale-105"
            style={{
              borderColor: scrolled ? "var(--brand-primary)" : "rgba(255,255,255,0.5)",
              color: scrolled ? "var(--brand-primary)" : "white",
              background: "transparent",
            }}
          >
            Позвонить
          </button>
        </div>
      </div>
    </header>
  );
}
