import Icon from "@/components/ui/icon";

const mapDots = [
  { top: "28%", left: "42%" },
  { top: "45%", left: "58%" },
  { top: "35%", left: "30%" },
  { top: "60%", left: "48%" },
  { top: "22%", left: "65%" },
  { top: "50%", left: "72%" },
  { top: "38%", left: "20%" },
  { top: "68%", left: "35%" },
];

const mapLines = [
  { top: "18%", opacity: 0.6 },
  { top: "30%", opacity: 0.4 },
  { top: "44%", opacity: 0.7 },
  { top: "58%", opacity: 0.3 },
  { top: "70%", opacity: 0.5 },
  { top: "82%", opacity: 0.4 },
];

interface HeroSectionProps {
  onCtaClick: () => void;
}

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0B3B4A 0%, #1A5F7A 55%, #0d4d61 100%)" }}
    >
      <div className="hero-map">
        {mapLines.map((line, i) => (
          <div
            key={i}
            className="map-line"
            style={{ top: line.top, opacity: line.opacity, animationDelay: `${i * 1.3}s`, animationDuration: `${7 + i}s` }}
          />
        ))}
        {[15, 30, 50, 68, 82].map((left, i) => (
          <div
            key={`v${i}`}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: 0,
              bottom: 0,
              width: "1px",
              background: "linear-gradient(180deg, transparent, rgba(26,95,122,0.18), transparent)",
            }}
          />
        ))}
        {mapDots.map((dot, i) => (
          <div
            key={`d${i}`}
            className="map-dot"
            style={{ top: dot.top, left: dot.left, animationDelay: `${i * 0.3}s`, boxShadow: "0 0 8px rgba(201,168,76,0.6)" }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8 animate-fade-in"
          style={{
            background: "rgba(201,168,76,0.15)",
            border: "1px solid rgba(201,168,76,0.35)",
            color: "var(--brand-gold-light)",
            letterSpacing: "0.08em",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--brand-gold)" }} />
          РИЕЛТОРСКИЙ СЕРВИС · МОСКВА
        </div>

        <h1
          className="animate-fade-in-up delay-100"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.6rem, 6vw, 5rem)",
            fontWeight: 600,
            lineHeight: 1.1,
            color: "white",
            marginBottom: "1.5rem",
            letterSpacing: "-0.01em",
          }}
        >
          Подбор новостроек
          <br />
          <span style={{ color: "var(--brand-gold-light)", fontStyle: "italic" }}>
            в Москве без переплат
          </span>
        </h1>

        <p
          className="animate-fade-in-up delay-200"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "rgba(255,255,255,0.72)",
            maxWidth: "560px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          Индивидуальный подбор ЖК под ваш бюджет,
          <br className="hidden sm:block" />
          нужную станцию метро и дату сдачи
        </p>

        <button
          onClick={onCtaClick}
          className="btn-ripple animate-fade-in-up delay-300 inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base transition-all duration-200 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, var(--brand-gold) 0%, var(--brand-gold-light) 100%)",
            color: "var(--brand-deep)",
            boxShadow: "0 8px 32px rgba(201,168,76,0.35)",
            border: "none",
            cursor: "pointer",
          }}
        >
          Подобрать квартиру
          <Icon name="ArrowRight" size={18} />
        </button>

        <p
          className="animate-fade-in delay-500"
          style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginTop: "1.5rem" }}
        >
          Бесплатно · Без обязательств · Ответим за 15 минут
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 scroll-indicator">
        <div
          className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2"
          style={{ borderColor: "rgba(255,255,255,0.3)" }}
        >
          <div className="w-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.5)" }} />
        </div>
      </div>
    </section>
  );
}
