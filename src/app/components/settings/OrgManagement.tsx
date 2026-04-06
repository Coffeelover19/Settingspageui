import { useState } from "react";
import { X, Plus } from "lucide-react";
import { useLang, t } from "./i18n";

const modelFamilies = [
  { id: "openai", name: "OpenAI", models: ["GPT-5.1", "GPT-5.1 Mini", "GPT-4o", "GPT-4o Mini"] },
  { id: "mistral", name: "Mistral", models: ["Mistral Large", "Mistral Small", "Mistral Medium"] },
  { id: "deepseek", name: "DeepSeek", models: ["DeepSeek-V3", "DeepSeek-R1"] },
  { id: "xai", name: "xAI", models: ["Grok-3", "Grok-3 Mini"] },
  { id: "meta", name: "Meta", models: ["Llama 4 Scout", "Llama 4 Maverick"] },
];

export function OrgManagement() {
  const { lang } = useLang();
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>(["openai", "mistral", "deepseek"]);
  const [selectedModels, setSelectedModels] = useState<string[]>(["GPT-5.1", "GPT-5.1 Mini", "Mistral Large", "DeepSeek-V3"]);
  const [maxLabels, setMaxLabels] = useState(5);
  const [labels, setLabels] = useState<{ name: string; color: string }[]>([
    { name: "Marketing", color: "#3b82f6" },
    { name: "Engineering", color: "#10b981" },
    { name: lang === "de" ? "Vertrieb" : "Sales", color: "#f59e0b" },
    { name: "Support", color: "#ef4444" },
    { name: "HR", color: "#8b5cf6" },
  ]);
  const [newLabelName, setNewLabelName] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const availableModels = modelFamilies
    .filter((f) => selectedFamilies.includes(f.id))
    .flatMap((f) => f.models);

  const toggleFamily = (id: string) => {
    setHasChanges(true);
    const removing = selectedFamilies.includes(id);
    setSelectedFamilies((prev) => removing ? prev.filter((f) => f !== id) : [...prev, id]);
    if (removing) {
      const family = modelFamilies.find((f) => f.id === id);
      if (family) setSelectedModels((prev) => prev.filter((m) => !family.models.includes(m)));
    }
  };

  const toggleModel = (model: string) => {
    setHasChanges(true);
    setSelectedModels((prev) => prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]);
  };

  return (
    <div className="space-y-6">
      {/* Model Policies */}
      <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-6 shadow-sm">
        <h3 className="mb-1">{t("org.model_policies", lang)}</h3>
        <p className="text-muted-foreground text-sm mb-5">{t("org.model_policies_desc", lang)}</p>

        <div className="mb-5">
          <label className="text-sm text-muted-foreground mb-2 block">{t("org.allowed_families", lang)}</label>
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

        <div>
          <label className="text-sm text-muted-foreground mb-2 block">{t("org.approved_models", lang)}</label>
          {availableModels.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">{t("org.no_families", lang)}</p>
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

        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xs text-blue-700 dark:text-blue-300">
          {t("org.inheritance_note", lang)}
        </div>
      </div>

      {/* Prompt Template Labels */}
      <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-6 shadow-sm">
        <h3 className="mb-1">{t("org.prompt_labels", lang)}</h3>
        <p className="text-muted-foreground text-sm mb-5">{t("org.prompt_labels_desc", lang)}</p>

        <div className="mb-5">
          <label className="text-sm text-muted-foreground mb-1.5 block">{t("org.max_labels", lang)}</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const newMax = Math.max(1, maxLabels - 1);
                setMaxLabels(newMax);
                setLabels((prev) => prev.slice(0, newMax));
                setHasChanges(true);
              }}
              className="w-9 h-9 rounded-lg border border-border/50 flex items-center justify-center hover:bg-muted/50 transition-colors"
            >
              −
            </button>
            <span className="w-12 text-center text-lg">{maxLabels}</span>
            <button
              onClick={() => { setMaxLabels(maxLabels + 1); setHasChanges(true); }}
              className="w-9 h-9 rounded-lg border border-border/50 flex items-center justify-center hover:bg-muted/50 transition-colors"
            >
              +
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">{t("org.max_labels_note", lang)}</p>
        </div>

        <div className="border-t border-border/40 pt-5">
          <label className="text-sm text-muted-foreground mb-3 block">
            {t("org.defined_labels", lang)} ({labels.length} / {maxLabels})
          </label>
          <div className="space-y-2 mb-4">
            {labels.map((label, idx) => (
              <div key={idx} className="flex items-center gap-3 group">
                <input
                  type="color"
                  value={label.color}
                  onChange={(e) => {
                    setLabels((prev) => prev.map((l, i) => i === idx ? { ...l, color: e.target.value } : l));
                    setHasChanges(true);
                  }}
                  className="w-8 h-8 rounded-lg border border-border/50 cursor-pointer bg-transparent p-0.5"
                />
                <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-lg border border-border/50 bg-muted/20">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: label.color }} />
                  <input
                    type="text"
                    value={label.name}
                    onChange={(e) => {
                      setLabels((prev) => prev.map((l, i) => i === idx ? { ...l, name: e.target.value } : l));
                      setHasChanges(true);
                    }}
                    className="bg-transparent text-sm flex-1 outline-none"
                  />
                </div>
                <button
                  onClick={() => {
                    setLabels((prev) => prev.filter((_, i) => i !== idx));
                    setHasChanges(true);
                  }}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          {labels.length < maxLabels && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newLabelName}
                onChange={(e) => setNewLabelName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newLabelName.trim()) {
                    setLabels((prev) => [...prev, { name: newLabelName.trim(), color: "#6b7280" }]);
                    setNewLabelName("");
                    setHasChanges(true);
                  }
                }}
                placeholder={t("org.new_label", lang)}
                className="flex-1 max-w-xs bg-muted/20 border border-dashed border-border/50 rounded-lg px-3 py-2 text-sm placeholder:text-muted-foreground/50"
              />
              <button
                onClick={() => {
                  if (newLabelName.trim()) {
                    setLabels((prev) => [...prev, { name: newLabelName.trim(), color: "#6b7280" }]);
                    setNewLabelName("");
                    setHasChanges(true);
                  }
                }}
                className="p-2 rounded-lg border border-dashed border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}

          {labels.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border/30">
              <label className="text-xs text-muted-foreground mb-2 block">{t("org.preview", lang)}</label>
              <div className="flex flex-wrap gap-2">
                {labels.map((label, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border"
                    style={{
                      backgroundColor: label.color + "18",
                      borderColor: label.color + "40",
                      color: label.color,
                    }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: label.color }} />
                    {label.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {hasChanges && (
        <div className="sticky bottom-0 bg-card/60 backdrop-blur-md border border-border/60 rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <span className="text-sm text-muted-foreground">{t("org.unsaved", lang)}</span>
          <div className="flex gap-3">
            <button onClick={() => setHasChanges(false)} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
              {t("org.discard", lang)}
            </button>
            <button onClick={() => setHasChanges(false)} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              {t("org.save", lang)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
