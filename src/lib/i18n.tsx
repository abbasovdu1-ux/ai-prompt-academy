import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "en" | "de";

const translations = {
  en: {
    language: "Language",
    english: "English",
    german: "Deutsch",
    home: "Home",
    learn: "Learn",
    library: "Library",
    methods: "Methods",
    trainer: "Trainer",
    startLearning: "Start learning →",
    privacy: "Privacy",
    impressum: "Impressum",
    terms: "Terms",
    contact: "Contact",
    linkedin: "LinkedIn",
    tryTrainer: "Try what you learned in the Trainer →",
    academyLive: "AI engine: Gemini 3.1 Flash-Lite",
    heroDescription: "Master the architecture of synthetic intelligence through high-fidelity curricula and hands-on prompt engineering.",
    howItWorks: "// HOW IT WORKS",
    betterAtAI: "Three ways to get better at AI.",
    freeToBrowse: "Pick where you are. Everything is free to browse and built for everyday users — not researchers.",
    promptLab: "Prompt Lab",
    masteryPath: "The Mastery Path",
    exploreSyllabus: "Explore Syllabus →",
    scrollExplore: "Scroll to Explore",
    pageNotFound: "Page not found",
    pageNotFoundText: "The page you're looking for doesn't exist or has been moved.",
    goHome: "Go home",
    tryAgain: "Try again",
    loadError: "This page didn't load",
    loadErrorText: "Something went wrong on our end. You can try refreshing or head back home.",
  },
  de: {
    language: "Sprache",
    english: "English",
    german: "Deutsch",
    home: "Startseite",
    learn: "Lernen",
    library: "Bibliothek",
    methods: "Methoden",
    trainer: "Trainer",
    startLearning: "Jetzt lernen →",
    privacy: "Datenschutz",
    impressum: "Impressum",
    terms: "Nutzungsbedingungen",
    contact: "Kontakt",
    linkedin: "LinkedIn",
    tryTrainer: "Wende dein Wissen im Trainer an →",
    academyLive: "KI-Engine: Gemini 3.1 Flash-Lite",
    heroDescription: "Meistere die Architektur synthetischer Intelligenz mit hochwertigen Kursen und praxisnahem Prompt Engineering.",
    howItWorks: "// SO FUNKTIONIERT ES",
    betterAtAI: "Drei Wege, besser mit KI zu werden.",
    freeToBrowse: "Wähle deinen Einstieg. Alles ist kostenlos zugänglich und für den Alltag entwickelt — nicht nur für Forschende.",
    promptLab: "Prompt-Labor",
    masteryPath: "Der Lernpfad zur Meisterschaft",
    exploreSyllabus: "Lehrplan ansehen →",
    scrollExplore: "Zum Entdecken scrollen",
    pageNotFound: "Seite nicht gefunden",
    pageNotFoundText: "Diese Seite existiert nicht oder wurde verschoben.",
    goHome: "Zur Startseite",
    tryAgain: "Erneut versuchen",
    loadError: "Diese Seite konnte nicht geladen werden",
    loadErrorText: "Auf unserer Seite ist ein Fehler aufgetreten. Lade die Seite neu oder gehe zurück zur Startseite.",
  },
} as const;

type TranslationKey = keyof typeof translations.en;
type I18nContextValue = { language: Language; setLanguage: (language: Language) => void; t: (key: TranslationKey) => string };

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem("synthecs-language") === "de" ? "de" : "en";
  });

  useEffect(() => {
    window.localStorage.setItem("synthecs-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage: (next: Language) => setLanguageState(next),
    t: (key: TranslationKey) => translations[language][key],
  }), [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside I18nProvider");
  return value;
}

export function LanguageSwitcher({ inline = false }: { inline?: boolean }) {
  const { language, setLanguage, t } = useI18n();
  return (
    <div className={`${inline ? "relative" : "fixed top-4 right-4 z-[60]"} flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-2 py-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-400 backdrop-blur-md`}>
      <span className="hidden sm:inline">{t("language")}:</span>
      <button onClick={() => setLanguage("en")} className={language === "en" ? "text-white" : "hover:text-white"} aria-label="English">EN</button>
      <span className="text-zinc-700">/</span>
      <button onClick={() => setLanguage("de")} className={language === "de" ? "text-white" : "hover:text-white"} aria-label="Deutsch">DE</button>
    </div>
  );
}
