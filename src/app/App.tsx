import { useState } from "react";
import {
  Plus, FolderOpen, FileText, Layers, Moon, Sun, HelpCircle, PanelLeft,
  Settings, MessageSquare, ChevronDown, BookOpen, FlaskConical,
  User, Building2, HardDrive, BarChart3, CreditCard, Shield, Eye,
} from "lucide-react";
import { UserProfile } from "./components/settings/UserProfile";
import { OrgManagement } from "./components/settings/OrgManagement";
import { SMBConfig } from "./components/settings/SMBConfig";
import { Monitoring } from "./components/settings/Monitoring";
import { Billing } from "./components/settings/Billing";
import { Permissions } from "./components/settings/Permissions";
import { FeatureGating } from "./components/settings/FeatureGating";
import { LangProvider, useLang, t } from "./components/settings/i18n";
import { SettingsLab } from "./components/settings-lab/SettingsLab";

const sidebarItems = [
  { icon: FolderOpen, label: "Projects" },
  { icon: FileText, label: "Prompt Library" },
  { icon: Layers, label: "Contexts" },
];

const recents = [
  "Tabelle erstellen",
  "Inhalt des Kontexts erkunden",
  "E-Mail verbessern",
  "Aktuelle Prioritäten & Issues a",
  "Informationsanforderungen klärena",
  "LinkedIn-Kontakte zu Kunden mac...",
  "LinkedIn-Kontakte in Kunden verw...",
  "Sinn des Lebens",
];

const tabDefs = [
  { key: "profile", labelKey: "tab.profile", icon: User },
  { key: "smb", labelKey: "tab.smb", icon: HardDrive },
  { key: "org", labelKey: "tab.org", icon: Building2 },
  { key: "monitoring", labelKey: "tab.monitoring", icon: BarChart3 },
  { key: "billing", labelKey: "tab.billing", icon: CreditCard },
  { key: "permissions", labelKey: "tab.permissions", icon: Shield },
  { key: "features", labelKey: "tab.features", icon: Eye },
];

function AppContent() {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState("profile");
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const [showAltSettings, setShowAltSettings] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case "profile": return <UserProfile />;
      case "org": return <OrgManagement />;
      case "smb": return <SMBConfig />;
      case "monitoring": return <Monitoring />;
      case "billing": return <Billing />;
      case "permissions": return <Permissions />;
      case "features": return <FeatureGating />;
      default: return null;
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="h-screen flex flex-col bg-background text-foreground">
        {/* Top Bar */}
        <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-card shrink-0">
          <div className="flex items-center gap-3">
            <button className="text-muted-foreground hover:text-foreground">
              <PanelLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center">
                <span className="text-white text-xs">K</span>
              </div>
              <span className="text-sm">Kolai</span>
              <span className="text-xs text-muted-foreground">v1.26.1</span>
            </div>
            {showSettings && (
              <span className="text-sm text-muted-foreground ml-4">{t("settings.title", lang)}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setDarkMode(!darkMode)} className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {showAltSettings ? (
            <SettingsLab onExit={() => { setShowAltSettings(false); setShowSettings(true); setActiveTab("profile"); }} />
          ) : (
            <>
              {/* Sidebar */}
              <div className="w-56 bg-card flex flex-col shrink-0">
                <div className="p-3">
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors">
                    <Plus className="w-4 h-4" /> New Chat
                  </button>
                </div>
                <div className="px-3 space-y-0.5">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setShowSettings(false)}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg hover:bg-muted transition-colors text-muted-foreground"
                    >
                      <item.icon className="w-4 h-4" /> {item.label}
                    </button>
                  ))}
                </div>
                <div className="px-3 mt-4">
                  <div className="text-xs text-muted-foreground mb-2 px-3">RECENTS</div>
                  <div className="space-y-0.5">
                    {recents.map((r) => (
                      <button key={r} className="w-full text-left px-3 py-1 text-sm text-muted-foreground hover:text-foreground truncate rounded-lg hover:bg-muted transition-colors">
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-auto border-t border-border p-3 space-y-1">
                  <button
                    onClick={() => { setShowAltSettings(true); setShowSettings(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${showAltSettings ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                  >
                    <FlaskConical className="w-4 h-4" /> Settings Lab
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg hover:bg-muted transition-colors text-muted-foreground">
                    <BookOpen className="w-4 h-4" /> Changelog
                  </button>
                  <div className="flex items-center justify-between px-3 py-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs shrink-0">M</div>
                      <div className="min-w-0">
                        <div className="text-xs truncate">Maximilian Lechner</div>
                        <div className="text-xs text-muted-foreground truncate">max.lechner@kolai.eu</div>
                      </div>
                    </div>
                    <button
                      onClick={() => { setShowSettings(true); setShowAltSettings(false); setActiveTab("profile"); }}
                      className={`p-1 rounded-md transition-colors shrink-0 ${showSettings ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 overflow-hidden flex flex-col bg-muted/30 shadow-[inset_14px_0_58px_-12px_rgba(0,0,0,0.1)]">
                {showSettings ? (
                  <>
                    {/* Settings Header */}
                    <div className="shrink-0 pt-6 pb-0">
                      <div className="mx-auto px-8" style={{ maxWidth: "72rem" }}>
                        <h1 className="mb-1">{t("settings.title", lang)}</h1>
                        
                      </div>

                      {/* Tabs */}
                      <div className="mx-auto px-8" style={{ maxWidth: "72rem" }}>
                        <div className="flex gap-1 border-b border-border overflow-x-auto scrollbar-hide whitespace-nowrap">
                          {tabDefs.map((tab) => (
                            <button
                              key={tab.key}
                              onClick={() => setActiveTab(tab.key)}
                              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm whitespace-nowrap border-b-2 transition-colors ${
                                activeTab === tab.key
                                  ? "border-blue-600 text-blue-600"
                                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                              }`}
                            >
                              <tab.icon className="w-4 h-4" />
                              {t(tab.labelKey, lang)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 overflow-y-auto">
                      <div className="mx-auto px-8 py-6" style={{ maxWidth: "72rem" }}>
                        {/* Tab Description */}
                        <p className="text-sm text-muted-foreground mb-6">{t(`desc.${activeTab}`, lang)}</p>
                        {renderTab()}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">{t("settings.click_gear", lang)}</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AppContent />
    </LangProvider>
  );
}