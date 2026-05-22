import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

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

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [withFinish, setWithFinish] = useState(true);
  const [count, setCount] = useState(0);
  const [countStarted, setCountStarted] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastHide, setToastHide] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [cardsVisible, setCardsVisible] = useState(false);

  const counterRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countStarted) {
          setCountStarted(true);
          const target = 1247;
          const duration = 1500;
          const step = 16;
          const increment = (target / duration) * step;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, step);
        }
      },
      { threshold: 0.5 }
    );
    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, [countStarted]);

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

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePhone = (val: string) => {
    let digits = val.replace(/\D/g, "");
    if (digits.startsWith("8")) digits = "7" + digits.slice(1);
    if (!digits.startsWith("7") && digits.length > 0) digits = "7" + digits;
    let formatted = "+7";
    if (digits.length > 1) formatted += " (" + digits.slice(1, 4);
    if (digits.length >= 4) formatted += ") " + digits.slice(4, 7);
    if (digits.length >= 7) formatted += "-" + digits.slice(7, 9);
    if (digits.length >= 9) formatted += "-" + digits.slice(9, 11);
    setForm((f) => ({ ...f, phone: formatted }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToast(true);
    setToastHide(false);
    setForm({ name: "", phone: "", email: "" });
    setTimeout(() => {
      setToastHide(true);
      setTimeout(() => setToast(false), 350);
    }, 3000);
  };

  const projects = withFinish ? projectsData.finish : projectsData.noFinish;

  return (
    <div className="min-h-screen" style={{ background: "var(--brand-bg)", fontFamily: "'Golos Text', sans-serif" }}>

      {/* ── HEADER ── */}
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
              onClick={scrollToForm}
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

      {/* ── HERO ── */}
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
            onClick={scrollToForm}
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

      {/* ── CARDS + TOGGLE ── */}
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
                      onClick={scrollToForm}
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

      {/* ── COUNTER ── */}
      <section
        ref={counterRef}
        className="py-20 px-6"
        style={{ background: "linear-gradient(135deg, #0B3B4A 0%, #1A5F7A 100%)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(4rem, 10vw, 7rem)",
              fontWeight: 600,
              color: "var(--brand-gold-light)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              marginBottom: "1rem",
            }}
          >
            {count.toLocaleString("ru-RU")}
          </div>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem" }}>
            квартир уже куплено в новостройках Москвы с нашими клиентами
          </p>
          <div className="flex items-center justify-center gap-8 mt-10 flex-wrap">
            {[
              { label: "лет на рынке", value: "8+" },
              { label: "партнёрских ЖК", value: "120+" },
              { label: "экономия клиентов", value: "до 7%" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2.2rem",
                    fontWeight: 600,
                    color: "white",
                    lineHeight: 1.2,
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginTop: "4px" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM ── */}
      <section ref={formRef} id="form" className="py-24 px-6" style={{ background: "var(--brand-bg)" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--brand-primary)" }}>
              Бесплатная консультация
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 600,
                color: "var(--brand-deep)",
                lineHeight: 1.2,
                marginBottom: "0.75rem",
              }}
            >
              Оставьте заявку — подберём
              <br />
              <span style={{ color: "var(--brand-primary)", fontStyle: "italic" }}>новостройку за 1 час</span>
            </h2>
            <p style={{ color: "var(--brand-text-muted)", fontSize: "1rem" }}>
              Расскажите о себе — свяжемся и подберём варианты лично под вас
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl p-8 md:p-10"
            style={{ background: "white", boxShadow: "0 4px 40px rgba(11,59,74,0.09)" }}
          >
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--brand-text)" }}>
                  Ваше имя
                </label>
                <input
                  type="text"
                  placeholder="Александр"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                  className="form-field w-full px-4 py-3.5 rounded-xl border text-base"
                  style={{ borderColor: "#E2E8EE", color: "var(--brand-text)", background: "#FAFBFC" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--brand-text)" }}>
                  Телефон
                </label>
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={form.phone}
                  onChange={(e) => handlePhone(e.target.value)}
                  required
                  className="form-field w-full px-4 py-3.5 rounded-xl border text-base"
                  style={{ borderColor: "#E2E8EE", color: "var(--brand-text)", background: "#FAFBFC" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--brand-text)" }}>
                  Email{" "}
                  <span style={{ color: "var(--brand-text-muted)", fontWeight: 400 }}>(необязательно)</span>
                </label>
                <input
                  type="email"
                  placeholder="example@mail.ru"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="form-field w-full px-4 py-3.5 rounded-xl border text-base"
                  style={{ borderColor: "#E2E8EE", color: "var(--brand-text)", background: "#FAFBFC" }}
                />
              </div>

              <button
                type="submit"
                className="btn-ripple w-full py-4 rounded-xl font-semibold text-base mt-2 transition-all duration-200 hover:scale-[1.01]"
                style={{
                  background: "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-deep) 100%)",
                  color: "white",
                  boxShadow: "0 6px 24px rgba(26,95,122,0.3)",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.01em",
                }}
              >
                Отправить заявку →
              </button>

              <p className="text-center text-xs" style={{ color: "var(--brand-text-muted)" }}>
                Нажимая кнопку, вы соглашаетесь с{" "}
                <button
                  type="button"
                  onClick={() => setPrivacyOpen(true)}
                  style={{ color: "var(--brand-primary)", background: "none", border: "none", cursor: "pointer", padding: 0, textDecoration: "underline" }}
                >
                  политикой конфиденциальности
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 border-t" style={{ borderColor: "#E8EDF2", background: "white" }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{ background: "var(--brand-primary)" }}
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L3 8v10h5v-6h4v6h5V8L10 2z" fill="white" />
              </svg>
            </div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--brand-deep)", fontWeight: 600 }}>
              МетрКлаб
            </span>
            <span style={{ color: "var(--brand-text-muted)", fontSize: "0.85rem", marginLeft: "8px" }}>
              © 2025
            </span>
          </div>
          <button
            onClick={() => setPrivacyOpen(true)}
            style={{ color: "var(--brand-text-muted)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontSize: "0.875rem" }}
          >
            Политика конфиденциальности
          </button>
        </div>
      </footer>

      {/* ── TOAST ── */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-[100] flex items-start gap-3 p-4 rounded-2xl toast-notify ${toastHide ? "hide" : ""}`}
          style={{
            background: "white",
            border: "1px solid #E8EDF2",
            maxWidth: "320px",
            boxShadow: "0 8px 40px rgba(11,59,74,0.18)",
          }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(27,123,94,0.12)" }}
          >
            <Icon name="Check" size={18} color="#1B7B5E" />
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: "var(--brand-text)" }}>Заявка отправлена!</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--brand-text-muted)" }}>Свяжемся в течение 15 минут</p>
          </div>
        </div>
      )}

      {/* ── PRIVACY MODAL ── */}
      {privacyOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 modal-overlay"
          onClick={() => setPrivacyOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            style={{ boxShadow: "0 24px 80px rgba(11,59,74,0.25)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "var(--brand-deep)", fontWeight: 600, margin: 0 }}>
                Политика конфиденциальности
              </h3>
              <button
                onClick={() => setPrivacyOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "#F0F3F6", border: "none", cursor: "pointer" }}
              >
                <Icon name="X" size={16} color="var(--brand-text-muted)" />
              </button>
            </div>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--brand-text-muted)" }}>
              <p>Настоящая политика определяет порядок обработки и защиты персональных данных пользователей, которые передают свои данные через формы на данном сайте.</p>
              <p><strong style={{ color: "var(--brand-text)" }}>Какие данные мы собираем:</strong> имя, номер телефона, адрес электронной почты, переданные вами добровольно.</p>
              <p><strong style={{ color: "var(--brand-text)" }}>Цель сбора:</strong> обработка обращений, подбор объектов недвижимости и связь с вами по вашему запросу.</p>
              <p><strong style={{ color: "var(--brand-text)" }}>Хранение данных:</strong> данные хранятся в защищённой базе и не передаются третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством РФ.</p>
              <p>Вы вправе в любой момент отозвать своё согласие на обработку персональных данных, направив запрос на наш контактный email.</p>
            </div>
            <button
              onClick={() => setPrivacyOpen(false)}
              className="w-full mt-6 py-3 rounded-xl font-medium text-sm"
              style={{ background: "var(--brand-primary)", color: "white", border: "none", cursor: "pointer" }}
            >
              Понятно
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
