import { useState, useRef, useEffect } from "react";
import { Camera, Upload, RotateCcw, ChevronDown } from "lucide-react";
import { useLang, t, type Lang } from "./i18n";

const modelFamilies = [
  { id: "openai", name: "OpenAI", models: ["GPT-5.1", "GPT-5.1 Mini", "GPT-4o Mini"] },
  { id: "mistral", name: "Mistral", models: ["Mistral Large", "Mistral Small", "Mistral Medium"] },
  { id: "deepseek", name: "DeepSeek", models: ["DeepSeek-V3", "DeepSeek-R1"] },
  { id: "xai", name: "xAI", models: ["Grok-3", "Grok-3 Mini"] },
  { id: "meta", name: "Meta", models: ["Llama 4 Scout", "Llama 4 Maverick"] },
];

const languages = [
  { code: "de" as Lang, label: "Deutsch", flag: "🇩🇪" },
  { code: "en" as Lang, label: "English", flag: "🇬🇧" },
];

export function UserProfile() {
  const { lang, setLang } = useLang();
  const [langOpen, setLangOpen] = useState(false);
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>(["openai", "mistral"]);
  const [selectedModels, setSelectedModels] = useState<string[]>(["GPT-5.1", "Mistral Large"]);
  const [defaultModel, setDefaultModel] = useState("GPT-5.1");
  const [showLabels, setShowLabels] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentLang = languages.find((l) => l.code === lang)!;

  const availableModels = modelFamilies
    .filter((f) => selectedFamilies.includes(f.id))
    .flatMap((f) => f.models);

  const toggleFamily = (id: string) => {
    setHasChanges(true);
    setSelectedFamilies((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
    if (selectedFamilies.includes(id)) {
      const family = modelFamilies.find((f) => f.id === id);
      if (family) {
        setSelectedModels((prev) => prev.filter((m) => !family.models.includes(m)));
        if (family.models.includes(defaultModel)) setDefaultModel("");
      }
    }
  };

  const toggleModel = (model: string) => {
    setHasChanges(true);
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
    if (selectedModels.includes(model) && defaultModel === model) setDefaultModel("");
  };

  const personalInfo: [string, string][] = [
    [t("up.first_name", lang), "Maximilian"],
    [t("up.last_name", lang), "Lechner"],
    [t("up.username", lang), "max.lechner"],
    [t("up.email", lang), "max.lechner@kolai.eu"],
    [t("up.user_id", lang), "usr_8f3a2b1c"],
    [t("up.ad_id", lang), "ad_7e9f4d2a-3b1c-4e5f"],
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-6 shadow-sm">
        <div className="flex items-start gap-6 mb-5">
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl">M</div>
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-card border border-border/60 rounded-full flex items-center justify-center shadow-sm hover:bg-muted transition-colors">
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="mb-0.5">Maximilian Lechner</h3>
            <p className="text-sm text-muted-foreground mb-2">max.lechner@kolai.eu</p>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border/50 rounded-lg hover:bg-muted/50 transition-colors">
                <Upload className="w-3 h-3" /> {t("up.change_pic", lang)}
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border/50 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground">
                <RotateCcw className="w-3 h-3" /> {t("up.reset", lang)}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
          {personalInfo.map(([label, value]) => (
            <div key={label} className="flex flex-col gap-0.5 py-1.5 border-b border-border/30">
              <span className="text-xs text-muted-foreground">{label}</span>
              <span className="text-sm">{value}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500" />
          {t("up.ad_note", lang)}
        </p>
      </div>

      <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-6 shadow-sm">
        <h3 className="mb-1">{t("up.prefs", lang)}</h3>
        <p className="text-muted-foreground text-sm mb-5">{t("up.prefs_desc", lang)}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sprache */}
          <div>
            <label htmlFor="lang-selector" className="text-sm text-muted-foreground mb-2 block">{t("up.language", lang)}</label>
            <div className="relative" ref={langRef}>
              <button
                id="lang-selector"
                onClick={() => setLangOpen(!langOpen)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors text-sm"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg leading-none">{currentLang.flag}</span>
                  <span>{currentLang.label}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-card border border-border rounded-xl shadow-lg z-10 py-1 overflow-hidden">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                        lang === l.code ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" : "hover:bg-muted/50"
                      }`}
                    >
                      <span className="text-lg leading-none">{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Modellpräferenz */}
          <div>
            <label htmlFor="model-pref-select" className="text-sm text-muted-foreground mb-2 block">{t("up.model_pref", lang)}</label>
            <select
              id="model-pref-select"
              value={defaultModel}
              onChange={(e) => { setDefaultModel(e.target.value); setHasChanges(true); }}
              className="w-full bg-muted/20 border border-border/50 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">{t("up.please_select", lang)}</option>
              {selectedModels.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground mt-1.5">{t("up.default_model_desc", lang)}</p>
          </div>

          {/* Show Labels */}
          <div>
            <label htmlFor="show-labels-toggle" className="text-sm text-muted-foreground mb-2 block">{t("up.show_labels", lang)}</label>
            <div className="flex items-center gap-3">
              <button
                id="show-labels-toggle"
                role="switch"
                aria-checked={showLabels}
                aria-label={`${t("up.show_labels", lang)}, ${showLabels ? "on" : "off"}`}
                onClick={() => { setShowLabels(!showLabels); setHasChanges(true); }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                  showLabels ? "bg-blue-600" : "bg-muted"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition-transform ${
                    showLabels ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">{t("up.show_labels_desc", lang)}</p>
          </div>
        </div>

        <div className="border-t border-border/40 mt-6 pt-5">
          <h4 className="mb-1">{t("up.selectable_models", lang)}</h4>
          <p className="text-xs text-muted-foreground mb-4">{t("up.selectable_desc", lang)}</p>
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-1.5 block">{t("up.model_families", lang)}</label>
            <div className="flex flex-wrap gap-2">
              {modelFamilies.map((f) => (
                <button
                  key={f.id}
                  onClick={() => toggleFamily(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                    selectedFamilies.includes(f.id)
                      ? "bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300"
                      : "bg-card border-border/50 text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-2">
            <label className="text-sm text-muted-foreground mb-1.5 block">{t("up.individual_models", lang)}</label>
            {availableModels.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">{t("up.no_families", lang)}</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {availableModels.map((m) => (
                  <button
                    key={m}
                    onClick={() => toggleModel(m)}
                    className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                      selectedModels.includes(m)
                        ? "bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300"
                        : "bg-card border-border/50 text-muted-foreground hover:bg-muted/50"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {hasChanges && (
          <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-end gap-3">
            <button onClick={() => setHasChanges(false)} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("up.discard", lang)}
            </button>
            <button onClick={() => setHasChanges(false)} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              {t("up.save", lang)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}