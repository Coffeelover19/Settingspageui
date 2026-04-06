import { useState } from "react";
import { Search, Eye, ChevronRight } from "lucide-react";
import { useLang, t } from "./i18n";

type FeatureGate = {
  key: string;
  nameKey: string;
  descKey: string;
  clusterKey: string;
  deploymentDefault: boolean;
  overrides: number;
};

const features: FeatureGate[] = [
  { key: "chat", nameKey: "fg.f.chat", descKey: "fg.f.chat.d", clusterKey: "fg.cluster.chat_core", deploymentDefault: true, overrides: 0 },
  { key: "group_chats", nameKey: "fg.f.group_chats", descKey: "fg.f.group_chats.d", clusterKey: "fg.cluster.chat_core", deploymentDefault: true, overrides: 2 },
  { key: "sharing", nameKey: "fg.f.sharing", descKey: "fg.f.sharing.d", clusterKey: "fg.cluster.chat_core", deploymentDefault: true, overrides: 0 },
  { key: "prompt_library", nameKey: "fg.f.prompt_library", descKey: "fg.f.prompt_library.d", clusterKey: "fg.cluster.prompting", deploymentDefault: true, overrides: 1 },
  { key: "prompt_share", nameKey: "fg.f.prompt_share", descKey: "fg.f.prompt_share.d", clusterKey: "fg.cluster.prompting", deploymentDefault: true, overrides: 0 },
  { key: "projects", nameKey: "fg.f.projects", descKey: "fg.f.projects.d", clusterKey: "fg.cluster.context", deploymentDefault: true, overrides: 0 },
  { key: "contexts", nameKey: "fg.f.contexts", descKey: "fg.f.contexts.d", clusterKey: "fg.cluster.context", deploymentDefault: true, overrides: 0 },
  { key: "reasoning", nameKey: "fg.f.reasoning", descKey: "fg.f.reasoning.d", clusterKey: "fg.cluster.model", deploymentDefault: false, overrides: 12 },
  { key: "websearch", nameKey: "fg.f.websearch", descKey: "fg.f.websearch.d", clusterKey: "fg.cluster.model", deploymentDefault: true, overrides: 3 },
  { key: "agents", nameKey: "fg.f.agents", descKey: "fg.f.agents.d", clusterKey: "fg.cluster.agents", deploymentDefault: false, overrides: 5 },
  { key: "tasks", nameKey: "fg.f.tasks", descKey: "fg.f.tasks.d", clusterKey: "fg.cluster.todo", deploymentDefault: true, overrides: 0 },
  { key: "ai_todo", nameKey: "fg.f.ai_todo", descKey: "fg.f.ai_todo.d", clusterKey: "fg.cluster.todo", deploymentDefault: false, overrides: 2 },
  { key: "settings_org", nameKey: "fg.f.org", descKey: "fg.f.org.d", clusterKey: "fg.cluster.settings", deploymentDefault: true, overrides: 0 },
  { key: "settings_smb", nameKey: "fg.f.smb", descKey: "fg.f.smb.d", clusterKey: "fg.cluster.settings", deploymentDefault: true, overrides: 0 },
  { key: "settings_monitoring", nameKey: "fg.f.monitoring", descKey: "fg.f.monitoring.d", clusterKey: "fg.cluster.settings", deploymentDefault: true, overrides: 0 },
  { key: "settings_billing", nameKey: "fg.f.billing", descKey: "fg.f.billing.d", clusterKey: "fg.cluster.settings", deploymentDefault: false, overrides: 4 },
  { key: "settings_permissions", nameKey: "fg.f.permissions", descKey: "fg.f.permissions.d", clusterKey: "fg.cluster.settings", deploymentDefault: false, overrides: 6 },
  { key: "settings_feature_gating", nameKey: "fg.f.feature_gating", descKey: "fg.f.feature_gating.d", clusterKey: "fg.cluster.settings", deploymentDefault: false, overrides: 3 },
];

const clusterOrder = [
  "fg.cluster.chat_core",
  "fg.cluster.prompting",
  "fg.cluster.context",
  "fg.cluster.model",
  "fg.cluster.agents",
  "fg.cluster.todo",
  "fg.cluster.settings",
];

type OverrideState = "default" | "on" | "off";

const mockUsers = [
  { id: "1", name: "Maximilian Lechner", state: "on" as OverrideState },
  { id: "2", name: "Anna Müller", state: "on" as OverrideState },
  { id: "3", name: "Thomas Schmidt", state: "off" as OverrideState },
];

export function FeatureGating() {
  const { lang } = useLang();
  const [selectedFeature, setSelectedFeature] = useState<FeatureGate | null>(null);
  const [featureStates, setFeatureStates] = useState<Record<string, boolean>>(
    Object.fromEntries(features.map((f) => [f.key, f.deploymentDefault]))
  );
  const [search, setSearch] = useState("");

  const filteredFeatures = features.filter((f) =>
    t(f.nameKey, lang).toLowerCase().includes(search.toLowerCase()) ||
    t(f.clusterKey, lang).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Feature Catalog */}
        <div className="flex-1">
          <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4>{t("fg.catalog", lang)}</h4>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder={t("fg.search", lang)} className="w-full bg-muted/20 border border-border/50 rounded-lg pl-9 pr-3 py-1.5 text-sm"
                />
              </div>
            </div>

            {clusterOrder.map((clusterKey) => {
              const clusterFeatures = filteredFeatures.filter((f) => f.clusterKey === clusterKey);
              if (clusterFeatures.length === 0) return null;
              return (
                <div key={clusterKey} className="mb-4 last:mb-0">
                  <div className="text-xs text-muted-foreground mb-2 px-1">{t(clusterKey, lang)}</div>
                  <div className="space-y-1">
                    {clusterFeatures.map((f) => (
                      <button
                        key={f.key}
                        onClick={() => setSelectedFeature(f)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors ${
                          selectedFeature?.key === f.key
                            ? "border-blue-300 bg-blue-50/50 dark:border-blue-700 dark:bg-blue-900/20"
                            : "border-border/40 hover:bg-muted/30"
                        }`}
                      >
                        <div className="flex items-center gap-3 text-left">
                          <div
                            className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${
                              featureStates[f.key] ? "bg-green-500" : "bg-muted-foreground/30"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setFeatureStates((prev) => ({ ...prev, [f.key]: !prev[f.key] }));
                            }}
                          >
                            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                              featureStates[f.key] ? "translate-x-4" : "translate-x-0.5"
                            }`} />
                          </div>
                          <div>
                            <div className="text-sm">{t(f.nameKey, lang)}</div>
                            <div className="text-xs text-muted-foreground">{t(f.descKey, lang)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {f.overrides > 0 && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                              {f.overrides} {t("fg.overrides", lang)}
                            </span>
                          )}
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature Detail / User Overrides */}
        <div className="lg:w-96 shrink-0">
          {selectedFeature ? (
            <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-6 shadow-sm sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h4>{t(selectedFeature.nameKey, lang)}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{t(selectedFeature.descKey, lang)}</p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("fg.deployment_default", lang)}</span>
                  <span className={featureStates[selectedFeature.key] ? "text-green-600" : "text-red-600"}>
                    {featureStates[selectedFeature.key] ? t("fg.on", lang) : t("fg.off", lang)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("fg.overrides", lang)}</span>
                  <span>{selectedFeature.overrides}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("fg.effective_visibility", lang)}</span>
                  <span>
                    {selectedFeature.overrides + (featureStates[selectedFeature.key] ? 48 : 0)} {t("fg.on_count", lang)} / {48 - (featureStates[selectedFeature.key] ? 48 : 0) + (48 - selectedFeature.overrides)} {t("fg.off_count", lang)}
                  </span>
                </div>
              </div>

              <h4 className="text-sm mb-3">{t("fg.user_overrides", lang)}</h4>
              <div className="relative mb-3">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input placeholder={t("fg.search_user", lang)} className="w-full bg-muted/50 border border-border rounded-lg pl-8 pr-3 py-1.5 text-sm" />
              </div>

              {selectedFeature.overrides > 0 ? (
                <div className="space-y-2">
                  {mockUsers.map((u) => (
                    <div key={u.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30">
                      <span className="text-sm">{u.name}</span>
                      <div className="inline-flex rounded-md border border-border overflow-hidden">
                        {(["default", "on", "off"] as OverrideState[]).map((s) => (
                          <button
                            key={s}
                            className={`px-2 py-0.5 text-xs transition-colors ${
                              u.state === s
                                ? s === "on" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                                  : s === "off" ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                                  : "bg-muted text-muted-foreground"
                                : "bg-card hover:bg-muted text-muted-foreground"
                            }`}
                          >
                            {s === "default" ? "Default" : s === "on" ? t("fg.on", lang) : t("fg.off", lang)}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">{t("fg.no_overrides", lang)}</p>
              )}

              <button className="mt-4 w-full flex items-center justify-center gap-2 px-3 py-2 text-sm border border-border/50 rounded-lg hover:bg-muted/50 transition-colors">
                <Eye className="w-4 h-4" /> {t("fg.preview", lang)}
              </button>
            </div>
          ) : (
            <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-6 shadow-sm flex flex-col items-center justify-center min-h-[300px] text-muted-foreground">
              <Eye className="w-8 h-8 mb-2 opacity-40" />
              <p className="text-sm">{t("fg.select_feature", lang)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
