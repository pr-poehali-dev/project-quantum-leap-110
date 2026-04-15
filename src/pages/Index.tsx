import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const PHONE = "+7 (800) 000-00-00";
const WHATSAPP_LINK = "https://wa.me/78000000000";
const TELEGRAM_LINK = "https://t.me/transfer_novorossiysk";

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({ hero: true });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState<"home" | "directions" | "fleet" | "contacts">("home");

  useEffect(() => {
    const sectionIds = ["hero", "features", "compare", "fleet", "how", "trust", "cta"];
    const observers: Record<string, IntersectionObserver> = {};

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      observers[id] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
            observers[id].unobserve(element);
          }
        },
        { threshold: 0.1 }
      );
      observers[id].observe(element);
    });

    return () => {
      Object.values(observers).forEach((o) => o.disconnect());
    };
  }, [activePage]);

  const scrollTo = (id: string) => {
    setActivePage("home");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans relative">

      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center gap-4">
          {/* Phone left */}
          <a
            href={`tel:${PHONE}`}
            className="flex items-center gap-2 text-blue-600 font-bold text-sm md:text-base hover:text-blue-700 transition-colors"
          >
            <Icon name="Phone" size={16} />
            <span className="hidden sm:inline">{PHONE}</span>
            <span className="sm:hidden">Позвонить</span>
          </a>

          {/* Nav center */}
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            {[
              { label: "Главная", id: "home" },
              { label: "Направления", id: "directions" },
              { label: "Автопарк", id: "fleet-page" },
              { label: "Контакты", id: "contacts" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "home") { setActivePage("home"); scrollTo("hero"); }
                  else if (item.id === "fleet-page") setActivePage("fleet");
                  else if (item.id === "directions") setActivePage("directions");
                  else if (item.id === "contacts") setActivePage("contacts");
                }}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* WhatsApp right */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-4 py-2 rounded-full transition-all shadow-md hover:shadow-green-200"
          >
            <Icon name="MessageCircle" size={16} />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Mobile burger */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 flex flex-col gap-3 text-sm font-medium">
            {[
              { label: "Главная", action: () => { setActivePage("home"); scrollTo("hero"); } },
              { label: "Направления", action: () => { setActivePage("directions"); setMobileMenuOpen(false); } },
              { label: "Автопарк", action: () => { setActivePage("fleet"); setMobileMenuOpen(false); } },
              { label: "Контакты", action: () => { setActivePage("contacts"); setMobileMenuOpen(false); } },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="text-left text-gray-700 hover:text-blue-600 py-2 border-b border-gray-50 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ======================== PAGE: HOME ======================== */}
      {activePage === "home" && (
        <>
          {/* HERO */}
          <section
            id="hero"
            className="relative pt-20 min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center w-full">
              <div
                className={`transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="inline-block mb-4">
                  <span className="bg-white/20 text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full">
                    Индивидуальный трансфер из Новороссийска
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight mb-6 text-white">
                  Довезём <br />
                  <span className="text-yellow-300">без попутчиков</span>
                </h1>
                <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-8 max-w-lg">
                  Только ваша компания. Фиксированная цена. Подача к дому в любое время суток — из Новороссийска в Краснодар, Крым, на Кавказ и по всей России.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-10">
                  <button
                    onClick={() => scrollTo("form")}
                    className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-yellow-400/50 flex items-center gap-2 justify-center"
                  >
                    <Icon name="Calculator" size={20} />
                    Рассчитать поездку
                  </button>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-full font-bold text-lg transition-all shadow-xl flex items-center gap-2 justify-center"
                  >
                    <Icon name="MessageCircle" size={20} />
                    Написать сейчас
                  </a>
                </div>
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/20">
                  <div>
                    <div className="text-3xl font-black text-yellow-300 mb-1">5 лет</div>
                    <p className="text-blue-200 text-sm">На рынке</p>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-yellow-300 mb-1">3 000+</div>
                    <p className="text-blue-200 text-sm">Поездок</p>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-yellow-300 mb-1">4.9 ★</div>
                    <p className="text-blue-200 text-sm">Средняя оценка</p>
                  </div>
                </div>
              </div>

              {/* Hero image placeholder */}
              <div
                className={`relative hidden lg:flex items-center justify-center transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
              >
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-white/10 rounded-3xl blur-2xl" />
                  <div className="relative bg-white/15 backdrop-blur-sm border border-white/30 rounded-3xl p-8 text-center">
                    <div className="text-6xl mb-4">🚗</div>
                    <div className="text-white font-bold text-xl mb-2">Комфортное авто</div>
                    <div className="text-blue-200 text-sm">от 1 до 7 пассажиров</div>
                    <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                      {["Новороссийск", "Краснодар", "Крым", "Кавказ"].map((city) => (
                        <div key={city} className="bg-white/20 text-white rounded-xl py-2 px-3 font-medium">
                          {city}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* NOT AVITO STRIPE */}
          <section className="bg-gray-900 py-4 px-4">
            <div className="max-w-7xl mx-auto flex flex-wrap gap-4 md:gap-8 items-center justify-center text-sm text-white/80 font-medium">
              <span className="text-yellow-400 font-bold text-base">Это не Авито</span>
              <span className="flex items-center gap-2"><Icon name="Check" size={14} className="text-green-400" />Не торгуемся</span>
              <span className="flex items-center gap-2"><Icon name="Check" size={14} className="text-green-400" />Цена не меняется</span>
              <span className="flex items-center gap-2"><Icon name="Check" size={14} className="text-green-400" />Без попутчиков</span>
              <span className="flex items-center gap-2"><Icon name="Check" size={14} className="text-green-400" />Реальная компания</span>
              <span className="flex items-center gap-2"><Icon name="Check" size={14} className="text-green-400" />3 000 поездок — проверено</span>
            </div>
          </section>

          {/* FORM */}
          <section id="form" className="py-16 px-4 bg-gray-50">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 mb-3">
                  Рассчитайте поездку
                </h2>
                <p className="text-gray-500">Заполните форму — сразу получите цену в WhatsApp</p>
              </div>
              <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Откуда</label>
                    <div className="relative">
                      <Icon name="MapPin" size={16} className="absolute left-3 top-3.5 text-blue-400" />
                      <input
                        type="text"
                        defaultValue="Новороссийск"
                        className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-gray-900 font-medium"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Куда</label>
                    <div className="relative">
                      <Icon name="MapPin" size={16} className="absolute left-3 top-3.5 text-red-400" />
                      <input
                        type="text"
                        placeholder="Краснодар, Симферополь..."
                        className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-gray-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Дата поездки</label>
                    <div className="relative">
                      <Icon name="Calendar" size={16} className="absolute left-3 top-3.5 text-blue-400" />
                      <input
                        type="date"
                        className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-gray-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Пассажиры</label>
                    <div className="relative">
                      <Icon name="Users" size={16} className="absolute left-3 top-3.5 text-blue-400" />
                      <select className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-gray-900 bg-white">
                        <option>1 пассажир</option>
                        <option>2 пассажира</option>
                        <option>3 пассажира</option>
                        <option>4 пассажира</option>
                        <option>5–7 человек (минивэн)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Класс автомобиля</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {["Эконом", "Комфорт", "Комфорт+", "Минивэн"].map((cls, i) => (
                      <label key={cls} className="cursor-pointer">
                        <input type="radio" name="class" className="sr-only" defaultChecked={i === 1} />
                        <div className="text-center py-2.5 px-3 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all has-[:checked]:border-blue-500 has-[:checked]:text-blue-600 has-[:checked]:bg-blue-50">
                          {cls}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-2xl transition-all shadow-lg hover:shadow-green-200"
                >
                  <Icon name="MessageCircle" size={22} />
                  Получить цену в WhatsApp
                </a>
                <p className="text-center text-xs text-gray-400 mt-3">
                  Нажимая кнопку, вы перейдёте в WhatsApp — ответим за 5 минут
                </p>
              </div>
            </div>
          </section>

          {/* FEATURES */}
          <section
            id="features"
            className={`py-16 px-4 bg-white transition-all duration-700 ${visibleSections["features"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 mb-3">
                  Почему выбирают нас
                </h2>
                <p className="text-gray-500">10 секунд — и всё понятно</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {[
                  { icon: "Users", title: "Без попутчиков", desc: "Только ваша компания — никто не подсаживается в дороге", color: "blue" },
                  { icon: "Tag", title: "Цена не меняется", desc: "Назвали сумму — она останется такой, что бы ни случилось", color: "green" },
                  { icon: "Home", title: "Подача к дому", desc: "Приедем прямо к вашему подъезду в назначенное время", color: "purple" },
                  { icon: "Clock", title: "Работаем 24/7", desc: "Ранний рейс, поздний поезд — всегда на связи и в дороге", color: "orange" },
                  { icon: "Package", title: "Помощь с багажом", desc: "Погрузим чемоданы и поможем донести до двери", color: "pink" },
                  { icon: "Baby", title: "Детское кресло", desc: "Бесплатно по запросу — безопасность детей прежде всего", color: "teal" },
                ].map((item, i) => {
                  const colorMap: Record<string, string> = {
                    blue: "bg-blue-50 text-blue-600",
                    green: "bg-green-50 text-green-600",
                    purple: "bg-purple-50 text-purple-600",
                    orange: "bg-orange-50 text-orange-600",
                    pink: "bg-pink-50 text-pink-600",
                    teal: "bg-teal-50 text-teal-600",
                  };
                  return (
                    <div
                      key={i}
                      className="group bg-white border border-gray-100 hover:border-blue-200 rounded-2xl p-5 md:p-6 transition-all hover:shadow-lg hover:-translate-y-1"
                      style={{ transitionDelay: `${i * 80}ms` }}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorMap[item.color]}`}>
                        <Icon name={item.icon} size={22} />
                      </div>
                      <h3 className="font-display font-bold text-gray-900 text-base md:text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ROUTE MAP */}
          <section className="py-14 px-4 bg-gradient-to-r from-blue-600 to-blue-700">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-display font-black text-white mb-8">
                Маршруты из Новороссийска
              </h2>
              <div className="flex flex-wrap justify-center items-center gap-3 md:gap-0">
                {[
                  { name: "Новороссийск", sub: "Откуда едем" },
                  { name: "Краснодар", sub: "1.5–2 ч" },
                  { name: "Крым", sub: "4–6 ч" },
                  { name: "Кавказ", sub: "3–5 ч" },
                  { name: "Вся Россия", sub: "Любой город" },
                ].map((point, i, arr) => (
                  <div key={i} className="flex items-center">
                    <div className="text-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-sm ${i === 0 ? "bg-yellow-400 text-gray-900" : "bg-white/20 text-white border-2 border-white/40"}`}>
                        {i + 1}
                      </div>
                      <div className="text-white font-semibold text-sm whitespace-nowrap">{point.name}</div>
                      <div className="text-blue-200 text-xs">{point.sub}</div>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="hidden md:block w-12 h-0.5 bg-white/30 mx-2 mt-[-20px]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* DIRECTIONS PREVIEW */}
          <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 mb-3">Популярные направления</h2>
                <p className="text-gray-500">Нажмите на своё направление</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { emoji: "✈️", title: "Аэропорты", desc: "Краснодар, Анапа, Геленджик", price: "от 3 500 ₽" },
                  { emoji: "🏖️", title: "Крым", desc: "Симферополь, Ялта, Севастополь", price: "от 8 000 ₽" },
                  { emoji: "⛰️", title: "Кавказ", desc: "Пятигорск, Кисловодск, Нальчик", price: "от 5 000 ₽" },
                  { emoji: "🏙️", title: "Краснодар", desc: "Центр, аэропорт, ЖД вокзал", price: "от 2 500 ₽" },
                ].map((dir, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePage("directions")}
                    className="group bg-white border border-gray-100 hover:border-blue-300 rounded-2xl p-5 text-left transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="text-4xl mb-3">{dir.emoji}</div>
                    <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-blue-600 transition-colors">{dir.title}</h3>
                    <p className="text-gray-400 text-xs mb-3 leading-snug">{dir.desc}</p>
                    <div className="text-blue-600 font-bold text-sm">{dir.price}</div>
                  </button>
                ))}
              </div>
              <div className="text-center mt-8">
                <button
                  onClick={() => setActivePage("directions")}
                  className="px-8 py-3 border-2 border-blue-200 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all"
                >
                  Все направления →
                </button>
              </div>
            </div>
          </section>

          {/* COMPARE */}
          <section
            id="compare"
            className={`py-16 px-4 bg-white transition-all duration-700 ${visibleSections["compare"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 mb-3">Авито vs Наш трансфер</h2>
                <p className="text-gray-500">Разница очевидна</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {/* Avito col */}
                <div className="bg-gray-100 rounded-2xl p-6 md:p-8 border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gray-300 rounded-xl flex items-center justify-center">
                      <Icon name="X" size={20} className="text-gray-600" />
                    </div>
                    <h3 className="font-bold text-gray-700 text-lg">Авито / случайный водитель</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Торгуешься и сравниваешь 10 объявлений",
                      "Цена меняется в последний момент",
                      "Могут посадить попутчиков",
                      "Ноль гарантий и ответственности",
                      "Неизвестный человек за рулём",
                      "Не дозвониться ночью",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <Icon name="X" size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Our col */}
                <div className="bg-blue-600 rounded-2xl p-6 md:p-8 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
                      <Icon name="Check" size={20} className="text-gray-900" />
                    </div>
                    <h3 className="font-bold text-white text-lg">Наш трансфер</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Один звонок — цена сразу и навсегда",
                      "Фиксированная цена без сюрпризов",
                      "Только ваша компания в салоне",
                      "3 000 поездок — реальные отзывы",
                      "Проверенные водители, страховка",
                      "Работаем 24/7 без выходных",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white">
                        <Icon name="Check" size={14} className="text-yellow-300 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FLEET PREVIEW */}
          <section
            id="fleet"
            className={`py-16 px-4 bg-gray-50 transition-all duration-700 ${visibleSections["fleet"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 mb-3">Наш автопарк</h2>
                <p className="text-gray-500">Выберите подходящий класс</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    emoji: "🚗",
                    title: "Эконом",
                    examples: "Hyundai Solaris, KIA Rio",
                    places: "1–4 места",
                    features: ["Кондиционер", "Музыка", "Чистый салон"],
                    price: "от 2 500 ₽",
                    color: "blue",
                  },
                  {
                    emoji: "🚙",
                    title: "Комфорт",
                    examples: "Toyota Camry, Skoda Octavia",
                    places: "1–4 места",
                    features: ["Кожаный салон", "Зарядка USB", "Вода в дороге"],
                    price: "от 3 500 ₽",
                    color: "purple",
                    popular: true,
                  },
                  {
                    emoji: "🚐",
                    title: "Минивэн",
                    examples: "Ford Tourneo, VW Multivan",
                    places: "5–7 мест",
                    features: ["Большой багажник", "7 мест", "Детское кресло"],
                    price: "от 5 000 ₽",
                    color: "green",
                  },
                ].map((car, i) => (
                  <div key={i} className="relative bg-white border border-gray-100 hover:border-blue-200 rounded-2xl p-6 transition-all hover:shadow-lg">
                    {car.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                        Популярный
                      </div>
                    )}
                    <div className="text-5xl mb-4">{car.emoji}</div>
                    <h3 className="font-bold text-gray-900 text-xl mb-1">{car.title}</h3>
                    <p className="text-gray-400 text-sm mb-1">{car.examples}</p>
                    <p className="text-blue-500 text-sm font-semibold mb-4">{car.places}</p>
                    <ul className="space-y-2 mb-6">
                      {car.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                          <Icon name="Check" size={14} className="text-green-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="text-blue-600 font-black text-lg mb-4">{car.price}</div>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all text-sm"
                    >
                      <Icon name="MessageCircle" size={16} />
                      Заказать
                    </a>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <button
                  onClick={() => setActivePage("fleet")}
                  className="px-8 py-3 border-2 border-blue-200 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all"
                >
                  Подробнее об автопарке →
                </button>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section
            id="how"
            className={`py-16 px-4 bg-white transition-all duration-700 ${visibleSections["how"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 mb-3">Три шага до поездки</h2>
                <p className="text-gray-500">Всё элементарно — 5 минут и готово</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { num: "1", icon: "MessageCircle", title: "Оставь заявку", desc: "Напишите в WhatsApp или позвоните — скажите откуда, куда и когда", color: "bg-blue-600" },
                  { num: "2", icon: "Tag", title: "Получи цену", desc: "Назовём точную стоимость за 5 минут. Никаких «зависит от»", color: "bg-yellow-400" },
                  { num: "3", icon: "Car", title: "Садись и едь", desc: "Водитель приедет к вашему дому в назначенное время", color: "bg-green-500" },
                ].map((step, i) => (
                  <div
                    key={i}
                    className="relative text-center"
                    style={{ transitionDelay: `${i * 150}ms` }}
                  >
                    <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg`}>
                      <span className="text-white font-black text-2xl">{step.num}</span>
                    </div>
                    <h3 className="font-display font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                    {i < 2 && (
                      <div className="hidden md:block absolute top-8 left-[calc(100%-12px)] w-6 text-blue-300 font-bold text-lg">→</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* TRUST */}
          <section
            id="trust"
            className={`py-16 px-4 bg-gray-50 transition-all duration-700 ${visibleSections["trust"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 mb-3">Нам доверяют</h2>
                <p className="text-gray-500">Реальные люди, реальные маршруты</p>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                  { value: "5 лет", label: "На рынке перевозок" },
                  { value: "3 000+", label: "Завершённых поездок" },
                  { value: "4.9 ★", label: "Средняя оценка" },
                  { value: "24/7", label: "Всегда на связи" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 text-center border border-gray-100 shadow-sm">
                    <div className="text-3xl font-black text-blue-600 mb-1">{stat.value}</div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
              {/* Reviews */}
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  {
                    name: "Анна К.",
                    route: "Новороссийск → Симферополь",
                    text: "Ехали с мужем и двумя детьми. Чистая машина, водитель вежливый, приехали точно в срок. Детское кресло предоставили бесплатно — огромный плюс!",
                    stars: 5,
                  },
                  {
                    name: "Михаил Д.",
                    route: "Новороссийск → Краснодар (аэропорт)",
                    text: "Заказал такси на ранний рейс в 4 утра. Приехали минута в минуту. Цена заранее, никаких сюрпризов. Буду обращаться постоянно.",
                    stars: 5,
                  },
                  {
                    name: "Светлана Р.",
                    route: "Новороссийск → Кисловодск",
                    text: "Удобный минивэн для нашей большой компании — 6 человек с чемоданами. Всё поместилось, ехали с комфортом. Рекомендую!",
                    stars: 5,
                  },
                ].map((review, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(review.stars)].map((_, j) => (
                        <span key={j} className="text-yellow-400 text-sm">★</span>
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">"{review.text}"</p>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{review.name}</div>
                      <div className="text-blue-500 text-xs">{review.route}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FINAL CTA */}
          <section
            id="cta"
            className={`py-16 px-4 bg-gradient-to-br from-blue-600 to-blue-700 transition-all duration-700 ${visibleSections["cta"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-4">
                Готовы ехать?
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                Один звонок или сообщение — и мы договоримся обо всём
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-full transition-all shadow-xl text-lg"
                >
                  <Icon name="MessageCircle" size={22} />
                  Написать в WhatsApp
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-bold rounded-full transition-all border border-white/30 text-lg"
                >
                  <Icon name="Phone" size={22} />
                  Позвонить
                </a>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ======================== PAGE: DIRECTIONS ======================== */}
      {activePage === "directions" && (
        <div className="pt-20 min-h-screen bg-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-display font-black text-gray-900 mb-3">Все направления</h1>
              <p className="text-gray-500">Возим из Новороссийска по всей России</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
              {[
                { emoji: "🏙️", title: "Краснодар", desc: "Центр, аэропорт, ЖД вокзал, любой адрес", price: "от 2 500 ₽", time: "1.5–2 часа" },
                { emoji: "✈️", title: "Аэропорты", desc: "Краснодар, Анапа, Геленджик — встреча с табличкой", price: "от 3 500 ₽", time: "1–3 часа" },
                { emoji: "🏖️", title: "Крым", desc: "Симферополь, Ялта, Севастополь, Феодосия", price: "от 8 000 ₽", time: "4–6 часов" },
                { emoji: "⛰️", title: "Кавказ", desc: "Пятигорск, Кисловодск, Нальчик, Владикавказ", price: "от 5 000 ₽", time: "3–5 часов" },
                { emoji: "🌆", title: "Ставрополь", desc: "Ставрополь и Ставропольский край", price: "от 4 500 ₽", time: "3–4 часа" },
                { emoji: "🗺️", title: "Другие города", desc: "Москва, Ростов, Сочи, Абрау-Дюрсо и другие", price: "по запросу", time: "уточняем" },
              ].map((dir, i) => (
                <div key={i} className="bg-white border border-gray-100 hover:border-blue-200 rounded-2xl p-6 transition-all hover:shadow-lg group">
                  <div className="text-5xl mb-4">{dir.emoji}</div>
                  <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-blue-600 transition-colors">{dir.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 leading-snug">{dir.desc}</p>
                  <div className="flex justify-between items-center mb-5">
                    <div className="text-blue-600 font-bold">{dir.price}</div>
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <Icon name="Clock" size={14} />
                      {dir.time}
                    </div>
                  </div>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all text-sm"
                  >
                    <Icon name="MessageCircle" size={16} />
                    Заказать
                  </a>
                </div>
              ))}
            </div>

            {/* For whom block */}
            <div className="bg-blue-50 rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl font-display font-black text-gray-900 mb-6 text-center">Для кого наш трансфер?</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { emoji: "✈️", title: "На рейс или поезд", desc: "Не опоздаете — подача точно в срок" },
                  { emoji: "👨‍👩‍👧‍👦", title: "Семья с детьми", desc: "Детское кресло, спокойная дорога" },
                  { emoji: "💼", title: "Деловая поездка", desc: "Работайте в дороге — тишина и комфорт" },
                  { emoji: "🎉", title: "Отдых и туры", desc: "Море, горы, Крым — с комфортом" },
                ].map((item, i) => (
                  <div key={i} className="text-center p-4">
                    <div className="text-4xl mb-3">{item.emoji}</div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-10">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all shadow-lg text-lg"
              >
                <Icon name="MessageCircle" size={22} />
                Узнать стоимость в WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ======================== PAGE: FLEET ======================== */}
      {activePage === "fleet" && (
        <div className="pt-20 min-h-screen bg-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-display font-black text-gray-900 mb-3">Автопарк</h1>
              <p className="text-gray-500">Подберём авто под любую задачу</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  emoji: "🚗",
                  title: "Эконом",
                  examples: "Hyundai Solaris, KIA Rio, Lada Vesta",
                  places: "до 4 пассажиров",
                  features: ["Кондиционер", "Аудиосистема", "Чистый ухоженный салон", "Помощь с багажом"],
                  price: "от 2 500 ₽",
                  desc: "Оптимально для коротких поездок или одного пассажира с небольшим багажом.",
                  color: "border-blue-200 bg-blue-50/30",
                },
                {
                  emoji: "🚙",
                  title: "Комфорт",
                  examples: "Toyota Camry, Skoda Octavia, Kia K5",
                  places: "до 4 пассажиров",
                  features: ["Кожаный салон", "USB-зарядки", "Вода в дороге", "Кондиционер", "Тишина"],
                  price: "от 3 500 ₽",
                  desc: "Бизнес и деловые поездки, комфортные длинные маршруты.",
                  color: "border-purple-200 bg-purple-50/30",
                  popular: true,
                },
                {
                  emoji: "🚘",
                  title: "Комфорт+",
                  examples: "BMW 5, Mercedes E-class, Audi A6",
                  places: "до 4 пассажиров",
                  features: ["Премиум интерьер", "Климат-контроль", "Вода и снеки", "Встреча с табличкой"],
                  price: "от 5 500 ₽",
                  desc: "Встреча гостей, деловые переговоры, особые случаи.",
                  color: "border-yellow-200 bg-yellow-50/30",
                },
                {
                  emoji: "🚐",
                  title: "Минивэн",
                  examples: "Ford Tourneo, Volkswagen Multivan, Mercedes Vito",
                  places: "до 7 пассажиров",
                  features: ["7 мест", "Огромный багажник", "Детское кресло", "Кондиционер", "Откидные столики"],
                  price: "от 5 000 ₽",
                  desc: "Большие компании, семьи с багажом, корпоративные группы.",
                  color: "border-green-200 bg-green-50/30",
                },
              ].map((car, i) => (
                <div key={i} className={`relative border-2 ${car.color} rounded-2xl p-6 md:p-8`}>
                  {car.popular && (
                    <div className="absolute -top-3 left-8 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                      Популярный выбор
                    </div>
                  )}
                  <div className="flex items-start gap-5">
                    <div className="text-6xl flex-shrink-0">{car.emoji}</div>
                    <div className="flex-1">
                      <h3 className="font-black text-gray-900 text-2xl mb-1">{car.title}</h3>
                      <p className="text-gray-400 text-sm mb-1">{car.examples}</p>
                      <p className="text-blue-600 font-semibold text-sm mb-4">{car.places}</p>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{car.desc}</p>
                      <ul className="grid grid-cols-2 gap-2 mb-5">
                        {car.features.map((f, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                            <Icon name="Check" size={14} className="text-green-500 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between">
                        <div className="text-blue-600 font-black text-xl">{car.price}</div>
                        <a
                          href={WHATSAPP_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all text-sm"
                        >
                          <Icon name="MessageCircle" size={16} />
                          Заказать
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison table */}
            <div className="bg-gray-50 rounded-2xl p-6 overflow-x-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Сравнение классов</h2>
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-gray-500 font-semibold">Параметр</th>
                    {["Эконом", "Комфорт", "Комфорт+", "Минивэн"].map((h) => (
                      <th key={h} className="text-center py-3 text-gray-700 font-bold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { param: "Мест", vals: ["4", "4", "4", "7"] },
                    { param: "Кондиционер", vals: ["✓", "✓", "✓", "✓"] },
                    { param: "USB зарядка", vals: ["—", "✓", "✓", "✓"] },
                    { param: "Вода", vals: ["—", "✓", "✓", "✓"] },
                    { param: "Кожаный салон", vals: ["—", "✓", "✓", "—"] },
                    { param: "Детское кресло", vals: ["✓", "✓", "✓", "✓"] },
                    { param: "Цена/100 км", vals: ["~900", "~1300", "~2000", "~1800"] },
                  ].map((row, i) => (
                    <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : ""}`}>
                      <td className="py-3 text-gray-600 font-medium">{row.param}</td>
                      {row.vals.map((v, j) => (
                        <td key={j} className={`py-3 text-center font-medium ${v === "✓" ? "text-green-500" : v === "—" ? "text-gray-300" : "text-gray-700"}`}>
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================== PAGE: CONTACTS ======================== */}
      {activePage === "contacts" && (
        <div className="pt-20 min-h-screen bg-white">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-display font-black text-gray-900 mb-3">Контакты</h1>
              <p className="text-gray-500">Выберите удобный способ связи</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {[
                {
                  icon: "MessageCircle",
                  title: "WhatsApp",
                  value: PHONE,
                  desc: "Ответим за 5 минут",
                  href: WHATSAPP_LINK,
                  color: "bg-green-500 hover:bg-green-600",
                  label: "Написать",
                },
                {
                  icon: "Phone",
                  title: "Телефон",
                  value: PHONE,
                  desc: "Звоните в любое время",
                  href: `tel:${PHONE}`,
                  color: "bg-blue-600 hover:bg-blue-700",
                  label: "Позвонить",
                },
                {
                  icon: "Send",
                  title: "Telegram",
                  value: "@transfer_nvr",
                  desc: "Напишите или позвоните",
                  href: TELEGRAM_LINK,
                  color: "bg-sky-500 hover:bg-sky-600",
                  label: "Написать",
                },
              ].map((contact, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon name={contact.icon} size={26} className="text-gray-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{contact.title}</h3>
                  <p className="text-gray-700 font-semibold text-sm mb-1">{contact.value}</p>
                  <p className="text-gray-400 text-xs mb-5">{contact.desc}</p>
                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center gap-2 py-3 ${contact.color} text-white font-semibold rounded-xl transition-all text-sm`}
                  >
                    <Icon name={contact.icon} size={16} />
                    {contact.label}
                  </a>
                </div>
              ))}
            </div>

            {/* Schedule */}
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <h2 className="font-bold text-gray-900 text-xl mb-4 flex items-center gap-2">
                <Icon name="Clock" size={20} className="text-blue-600" />
                График работы
              </h2>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                {[
                  { title: "Режим работы", value: "Круглосуточно 24/7" },
                  { title: "Праздники и выходные", value: "Работаем без перерывов" },
                  { title: "Ночные рейсы", value: "Без доплат за ночное время" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-gray-500 mb-1">{s.title}</div>
                    <div className="font-bold text-gray-900">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Short form */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm mb-10">
              <h2 className="font-bold text-gray-900 text-xl mb-5">Оставить заявку</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {[
                  { label: "Ваше имя", placeholder: "Иван", icon: "User" },
                  { label: "Маршрут", placeholder: "Новороссийск → Краснодар", icon: "MapPin" },
                  { label: "Дата поездки", placeholder: "", icon: "Calendar", type: "date" },
                  { label: "Телефон", placeholder: "+7 (___) ___-__-__", icon: "Phone", type: "tel" },
                ].map((f, i) => (
                  <div key={i}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{f.label}</label>
                    <div className="relative">
                      <Icon name={f.icon} size={16} className="absolute left-3 top-3.5 text-gray-400" />
                      <input
                        type={f.type || "text"}
                        placeholder={f.placeholder}
                        className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-gray-900"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl transition-all shadow-lg text-lg"
              >
                <Icon name="MessageCircle" size={22} />
                Отправить заявку в WhatsApp
              </a>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="font-bold text-gray-900 text-xl mb-5">Частые вопросы</h2>
              <div className="space-y-3">
                {[
                  { q: "Можно ли взять животное в поездку?", a: "Да, домашних животных в переносках или клетках берём без проблем. Уточните заранее при бронировании." },
                  { q: "Как оплатить поездку?", a: "Наличными или картой по приезду. Никаких предоплат — платите только по факту поездки." },
                  { q: "Что если рейс задержится?", a: "При встрече в аэропорту ждём столько, сколько нужно — отслеживаем ваш рейс онлайн." },
                  { q: "Есть ли детское кресло?", a: "Да, детское кресло предоставляем бесплатно по запросу. Укажите возраст ребёнка при заказе." },
                  { q: "Можно ли отменить заказ?", a: "Да, отмена возможна в любое время. Если отменяете за 2+ часа — никаких штрафов." },
                  { q: "Работаете ли ночью?", a: "Конечно. Работаем 24/7 без выходных и ночных наценок." },
                ].map((item, i) => (
                  <details key={i} className="group bg-gray-50 rounded-xl p-4 cursor-pointer">
                    <summary className="font-semibold text-gray-900 text-sm flex justify-between items-center list-none">
                      {item.q}
                      <Icon name="ChevronDown" size={16} className="text-gray-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <p className="text-gray-500 text-sm mt-3 leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================== FOOTER ======================== */}
      <footer className="border-t border-gray-100 py-8 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div className="font-bold text-gray-600">Трансфер из Новороссийска — 24/7</div>
          <div className="flex gap-6">
            <button onClick={() => setActivePage("directions")} className="hover:text-blue-600 transition-colors">Направления</button>
            <button onClick={() => setActivePage("fleet")} className="hover:text-blue-600 transition-colors">Автопарк</button>
            <button onClick={() => setActivePage("contacts")} className="hover:text-blue-600 transition-colors">Контакты</button>
          </div>
          <div className="text-gray-400">© 2025 Все права защищены</div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-all animate-pulse-ring"
        aria-label="Написать в WhatsApp"
      >
        <Icon name="MessageCircle" size={26} className="text-white" />
      </a>
    </div>
  );
};

export default Index;
