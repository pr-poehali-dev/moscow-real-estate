import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

interface ContactFormProps {
  formRef: React.RefObject<HTMLElement>;
}

export default function ContactForm({ formRef }: ContactFormProps) {
  const [count, setCount] = useState(0);
  const [countStarted, setCountStarted] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastHide, setToastHide] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  const counterRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
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
    </>
  );
}
