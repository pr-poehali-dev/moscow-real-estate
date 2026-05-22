import { useState, useEffect, useRef } from "react";

const IMG1 = "https://cdn.poehali.dev/projects/819261f1-3fe5-47c9-b76f-0b067fa23f98/files/4388a446-fa53-4480-a8a5-1a332d27a593.jpg";
const IMG2 = "https://cdn.poehali.dev/projects/819261f1-3fe5-47c9-b76f-0b067fa23f98/files/f8eb47dc-11f5-46c2-8e40-1e1036d79829.jpg";
const IMG3 = "https://cdn.poehali.dev/projects/819261f1-3fe5-47c9-b76f-0b067fa23f98/files/ae194654-3783-44bc-b6d0-35dfb7b05ac7.jpg";

const projectsData = {
  finish: [
    {
      name: "LIFE Варшавская",
      metro: "Варшавская",
      metroColor: "#E4572E",
      price: "от 9,2 млн ₽",
      area: "ЮАО · сдача Q2 2026",
      img: IMG1,
      tag: "С отделкой",
    },
    {
      name: "Headliner",
      metro: "Шелепиха",
      metroColor: "#793D8B",
      price: "от 15,8 млн ₽",
      area: "СЗАО · сдача Q4 2025",
      img: IMG2,
      tag: "Ключи сейчас",
    },
    {
      name: "Береговой",
      metro: "Фили",
      metroColor: "#0066FF",
      price: "от 18,1 млн ₽",
      area: "ЗАО · набережная",
      img: IMG3,
      tag: "Панорамы",
    },
  ],
  noFinish: [
    {
      name: "Cityzen",
      metro: "Технопарк",
      metroColor: "#E4572E",
      price: "от 7,9 млн ₽",
      area: "ЮАО · сдача Q1 2027",
      img: IMG2,
      tag: "Без отделки",
    },
    {
      name: "Skysoul Park",
      metro: "Нагатинская",
      metroColor: "#E4572E",
      price: "от 11,3 млн ₽",
      area: "ЮАО · сдача Q3 2026",
      img: IMG3,
      tag: "Бизнес-класс",
    },
    {
      name: "Символ",
      metro: "Авиамоторная",
      metroColor: "#FFD600",
      price: "от 10,5 млн ₽",
      area: "ВАО · реновация квартала",
      img: IMG1,
      tag: "Закрытый двор",
    },
  ],
};

interface ProjectsSectionProps {
  onCardClick: () => void;
}

export default function ProjectsSection({ onCardClick }: ProjectsSectionProps) {
  const [withFinish, setWithFinish] = useState(true);
  const [cardsVisible, setCardsVisible] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setCardsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (cardsRef.current) observer.observe(cardsRef.current);
    return () => observer.disconnect();
  }, []);

  const projects = withFinish ? projectsData.finish : projectsData.noFinish;

  return (
    <section className="py-24 px-6" style={{ background: "var(--brand-bg)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--brand-primary)" }}>
              Популярные направления
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 600,
                color: "var(--brand-deep)",
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Актуальные ЖК
            </h2>
          </div>

          <div
            className="flex rounded-xl p-1 self-start sm:self-auto"
            style={{ background: "#EDF0F3" }}
          >
            {["С отделкой", "Без отделки"].map((label, i) => {
              const active = i === 0 ? withFinish : !withFinish;
              return (
                <button
                  key={label}
                  onClick={() => setWithFinish(i === 0)}
                  className="toggle-btn px-5 py-2 rounded-lg text-sm font-medium"
                  style={{
                    background: active ? "white" : "transparent",
                    color: active ? "var(--brand-primary)" : "var(--brand-text-muted)",
                    boxShadow: active ? "0 1px 6px rgba(11,59,74,0.1)" : "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div
              key={`${p.name}-${withFinish}`}
              className="project-card rounded-2xl overflow-hidden group cursor-pointer"
              style={{
                background: "white",
                boxShadow: "0 2px 16px rgba(11,59,74,0.07)",
                transform: cardsVisible ? "translateY(0)" : "translateY(32px)",
                opacity: cardsVisible ? 1 : 0,
                transition: `transform 0.5s ease ${i * 0.12}s, opacity 0.5s ease ${i * 0.12}s, box-shadow 0.3s ease, outline 0.2s ease`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-8px)";
                el.style.boxShadow = "0 16px 48px rgba(11,59,74,0.15)";
                el.style.outline = "1.5px solid var(--brand-primary)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 2px 16px rgba(11,59,74,0.07)";
                el.style.outline = "none";
              }}
            >
              <div className="card-img-wrapper h-48 relative">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, transparent 40%, rgba(11,59,74,0.45) 100%)" }}
                />
                <span
                  className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "rgba(201,168,76,0.9)", color: "var(--brand-deep)" }}
                >
                  {p.tag}
                </span>
              </div>

              <div className="p-5">
                <h3
                  className="font-semibold mb-1"
                  style={{ color: "var(--brand-deep)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem" }}
                >
                  {p.name}
                </h3>

                <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                  <span
                    className="inline-flex items-center justify-center w-4 h-4 rounded-full text-white font-bold"
                    style={{ background: p.metroColor, fontSize: "10px", flexShrink: 0 }}
                  >
                    М
                  </span>
                  <span className="text-sm" style={{ color: "var(--brand-text-muted)" }}>{p.metro}</span>
                  <span style={{ color: "var(--brand-text-muted)", fontSize: "12px" }}>·</span>
                  <span className="text-xs" style={{ color: "var(--brand-text-muted)" }}>{p.area}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold" style={{ color: "var(--brand-primary)", fontSize: "1.05rem" }}>
                    {p.price}
                  </span>
                  <button
                    onClick={onCardClick}
                    className="text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200"
                    style={{
                      background: "rgba(26,95,122,0.08)",
                      color: "var(--brand-primary)",
                      border: "1px solid rgba(26,95,122,0.15)",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      const btn = e.target as HTMLButtonElement;
                      btn.style.background = "var(--brand-primary)";
                      btn.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      const btn = e.target as HTMLButtonElement;
                      btn.style.background = "rgba(26,95,122,0.08)";
                      btn.style.color = "var(--brand-primary)";
                    }}
                  >
                    Выбрать
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
