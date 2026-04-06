import { useState } from "react";
import {
  User, SlidersHorizontal, Building2, CreditCard, HardDrive, BarChart3,
  Shield, Users, KeyRound, UserPlus, Package,
  MessageSquare, FileText, ListChecks, Layers, Bot, ToggleRight,
  ArrowLeft, Settings, MessageCircle, Tag,
  ChevronRight, ChevronDown, Search, X, Plus, Minus, RotateCcw,
  FolderOpen, Folder, UserMinus, Eye,
  AlertTriangle, Zap,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart,
} from "recharts";
import { LabPermissions } from "./LabPermissions";

type NavItem = { key: string; label: string; icon: React.ElementType };
type NavGroup = { label: string; items: NavItem[] };

const navGroups: NavGroup[] = [
  {
    label: "Persönlich",
    items: [
      { key: "profile", label: "User Profil", icon: User },
      { key: "preferences", label: "Präferenzen", icon: SlidersHorizontal },
    ],
  },
  {
    label: "Organisation",
    items: [
      { key: "models", label: "Modelle", icon: Package },
      { key: "labels", label: "Labels", icon: Tag },
      { key: "billing", label: "Abrechnung", icon: CreditCard },
      { key: "analytics", label: "Analytics", icon: BarChart3 },
      { key: "feedback", label: "Feedback", icon: MessageCircle },
      { key: "smb", label: "SMB Config", icon: HardDrive },
    ],
  },
  {
    label: "Nutzerverwaltung",
    items: [
      { key: "members", label: "Mitglieder", icon: Users },
      { key: "licenses", label: "Lizenzen", icon: KeyRound },
      { key: "groups", label: "Gruppen", icon: UserPlus },
      { key: "permissions", label: "Berechtigung", icon: Shield },
    ],
  },
  {
    label: "Produkt",
    items: [
      { key: "feat-chats", label: "Chats", icon: MessageSquare },
      { key: "feat-templates", label: "Templates", icon: FileText },
      { key: "feat-todos", label: "Todo Manager", icon: ListChecks },
      { key: "feat-contexts", label: "Kontexte", icon: Layers },
      { key: "feat-agents", label: "Agenten", icon: Bot },
      { key: "feat-settings", label: "Einstellungs Feature", icon: ToggleRight },
    ],
  },
];

const pageInfo: Record<string, { title: string; desc: string }> = {
  profile: { title: "User Profil", desc: "Persönliche Informationen und Profilbild verwalten." },
  preferences: { title: "Präferenzen", desc: "Bevorzugtes Modell und Spracheinstellungen anpassen." },
  models: { title: "Modelle", desc: "Erlaubte Modellfamilien und verfügbare Einzelmodelle konfigurieren." },
  labels: { title: "Labels", desc: "Labels und deren Farben für die Organisation verwalten." },
  billing: { title: "Abrechnung", desc: "Subscription, Lizenzen und Kostenübersicht einsehen." },
  analytics: { title: "Analytics", desc: "Produktnutzung, Pipelines und System Health überwachen." },
  feedback: { title: "Feedback", desc: "Nutzerfeedback einsehen und kategorisieren." },
  smb: { title: "SMB Config", desc: "Include/Exclude-Regeln für Dateisystempfade konfigurieren." },
  members: { title: "Mitglieder", desc: "Alle Benutzer der Organisation einsehen und verwalten." },
  licenses: { title: "Lizenzen", desc: "Lizenzen an Mitglieder zuteilen oder entfernen." },
  groups: { title: "Gruppen", desc: "Gruppen erstellen, löschen und Mitglieder verwalten." },
  permissions: { title: "Berechtigung", desc: "Rechte und Entitlements für User und Gruppen verwalten." },
  "feat-chats": { title: "Chats", desc: "Chat-Features und Sichtbarkeit konfigurieren." },
  "feat-templates": { title: "Templates", desc: "Template-Features und Sichtbarkeit steuern." },
  "feat-todos": { title: "Todo Manager", desc: "Todo-Manager-Features konfigurieren." },
  "feat-contexts": { title: "Kontexte", desc: "Kontext-Features, Sichtbarkeit und Zugriff steuern." },
  "feat-agents": { title: "Agenten", desc: "Agenten-Features und Sichtbarkeit konfigurieren." },
  "feat-settings": { title: "Einstellungs Feature", desc: "Einstellungs-bezogene Features steuern." },
};

export function SettingsLab({ onExit }: { onExit: () => void }) {
  const [active, setActive] = useState("profile");
  const [groupDetail, setGroupDetail] = useState<string | null>(null);
  const [featureDetail, setFeatureDetail] = useState<{ name: string; desc: string; on: boolean } | null>(null);
  const info = pageInfo[active] || { title: active, desc: "" };

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Settings Sidebar */}
      <div className="w-64 border-r border-border bg-card flex flex-col shrink-0">
        <div className="p-4 border-b border-border">
          <button
            onClick={onExit}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur App
          </button>
          <div className="mt-3 text-xs text-muted-foreground tracking-wide uppercase">Settings Lab</div>
        </div>

        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-5">
          {navGroups.map((group) => (
            <div key={group.label}>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider px-3 mb-1.5">
                {group.label}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => { setActive(item.key); setGroupDetail(null); setFeatureDetail(null); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg transition-colors ${
                      active === item.key
                        ? "bg-blue-600/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-3">
          <div className="flex items-center justify-between px-3 py-1.5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs shrink-0">M</div>
              <div className="min-w-0">
                <div className="text-xs truncate">Maximilian Lechner</div>
                <div className="text-xs text-muted-foreground truncate">max.lechner@kolai.eu</div>
              </div>
            </div>
            <button
              onClick={onExit}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-muted/30">
        <div className="mx-auto px-8 py-8" style={{ maxWidth: "72rem" }}>
          {groupDetail ? (
            <GroupDetailPage groupName={groupDetail} onBack={() => setGroupDetail(null)} />
          ) : featureDetail ? (
            <FeatureOverridePage feature={featureDetail} onBack={() => setFeatureDetail(null)} />
          ) : (
            <>
              <h1 className="mb-1">{info.title}</h1>
              <p className="text-sm text-muted-foreground mb-8">{info.desc}</p>
              <LabPageContent page={active} onGroupClick={setGroupDetail} onFeatureClick={setFeatureDetail} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Mock Data ─── */
const allUsers = [
  { id: "1", name: "Maximilian Lechner", email: "max.lechner@kolai.eu", role: "Admin", licensed: true, groups: ["Admins", "Team Leads"] },
  { id: "2", name: "Anna Müller", email: "anna.mueller@kolai.eu", role: "Team Lead", licensed: true, groups: ["Team Leads"] },
  { id: "3", name: "Thomas Schmidt", email: "t.schmidt@kolai.eu", role: "User", licensed: true, groups: ["Standard Users"] },
  { id: "4", name: "Lisa Weber", email: "l.weber@kolai.eu", role: "User", licensed: false, groups: [] },
  { id: "5", name: "Markus Fischer", email: "m.fischer@kolai.eu", role: "User", licensed: true, groups: ["Standard Users"] },
  { id: "6", name: "Julia Hoffmann", email: "j.hoffmann@kolai.eu", role: "User", licensed: true, groups: ["Power Users"] },
  { id: "7", name: "Stefan Bauer", email: "s.bauer@kolai.eu", role: "Team Lead", licensed: true, groups: ["Team Leads"] },
  { id: "8", name: "Katharina Wolf", email: "k.wolf@kolai.eu", role: "User", licensed: true, groups: ["Standard Users"] },
  { id: "9", name: "Michael Braun", email: "m.braun@kolai.eu", role: "User", licensed: false, groups: [] },
  { id: "10", name: "Sandra Koch", email: "s.koch@kolai.eu", role: "User", licensed: true, groups: ["Standard Users"] },
  { id: "11", name: "Peter Richter", email: "p.richter@kolai.eu", role: "Admin", licensed: true, groups: ["Admins"] },
  { id: "12", name: "Claudia Schäfer", email: "c.schaefer@kolai.eu", role: "User", licensed: true, groups: ["Read-Only"] },
  { id: "13", name: "Andreas Krüger", email: "a.krueger@kolai.eu", role: "Team Lead", licensed: true, groups: ["Team Leads", "Power Users"] },
  { id: "14", name: "Monika Lange", email: "m.lange@kolai.eu", role: "User", licensed: false, groups: [] },
  { id: "15", name: "Daniel Neumann", email: "d.neumann@kolai.eu", role: "User", licensed: true, groups: ["Externe Partner"] },
];

const avatarColors = [
  "bg-blue-600", "bg-emerald-600", "bg-violet-600", "bg-rose-600", "bg-amber-600",
  "bg-cyan-600", "bg-pink-600", "bg-teal-600", "bg-indigo-600", "bg-orange-600",
  "bg-lime-600", "bg-fuchsia-600", "bg-sky-600", "bg-red-600", "bg-green-600",
];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

const cardClass = "rounded-2xl border border-border bg-card p-6";

/* ─── Feature Override Page ─── */
type OverrideState = "default" | "on" | "off";

function FeatureOverridePage({ feature, onBack }: { feature: { name: string; desc: string; on: boolean }; onBack: () => void }) {
  const [overrides, setOverrides] = useState<Record<string, OverrideState>>(
    Object.fromEntries(allUsers.map((u) => [u.id, "default" as OverrideState]))
  );
  const [search, setSearch] = useState("");

  const filtered = allUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  const overrideCount = Object.values(overrides).filter((v) => v !== "default").length;

  return (
    <>
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Zurück
      </button>
      <h1 className="mb-1">{feature.name} – Ausnahmen</h1>
      <p className="text-sm text-muted-foreground mb-6">{feature.desc}</p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className={cardClass}>
          <div className="text-xs text-muted-foreground mb-1">Deployment Default</div>
          <div className={`text-lg ${feature.on ? "text-green-600" : "text-red-600"}`}>{feature.on ? "Aktiv" : "Inaktiv"}</div>
        </div>
        <div className={cardClass}>
          <div className="text-xs text-muted-foreground mb-1">Overrides</div>
          <div className="text-lg">{overrideCount}</div>
        </div>
        <div className={cardClass}>
          <div className="text-xs text-muted-foreground mb-1">Effektive Sichtbarkeit</div>
          <div className="text-lg">
            {Object.values(overrides).filter((v) => v === "on" || (v === "default" && feature.on)).length} An / {Object.values(overrides).filter((v) => v === "off" || (v === "default" && !feature.on)).length} Aus
          </div>
        </div>
      </div>

      <div className={cardClass}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-muted-foreground text-xs uppercase tracking-wider">Nutzer-Overrides</h3>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nutzer suchen..."
              className="w-full bg-muted/20 border border-border/50 rounded-lg pl-9 pr-3 py-1.5 text-sm"
            />
          </div>
        </div>
        <div className="space-y-1">
          {filtered.map((u) => (
            <div key={u.id} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/20 transition-colors border-b border-border/40 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full ${avatarColors[parseInt(u.id) % avatarColors.length]} flex items-center justify-center text-white text-[10px] shrink-0`}>
                  {getInitials(u.name)}
                </div>
                <div>
                  <div className="text-sm">{u.name}</div>
                  <div className="text-xs text-muted-foreground">{u.email}</div>
                </div>
              </div>
              <div className="inline-flex rounded-md border border-border overflow-hidden">
                {(["default", "on", "off"] as OverrideState[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setOverrides((prev) => ({ ...prev, [u.id]: s }))}
                    className={`px-3 py-1 text-xs transition-colors ${
                      overrides[u.id] === s
                        ? s === "on" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                          : s === "off" ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                          : "bg-muted text-muted-foreground"
                        : "bg-card hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    {s === "default" ? "Default" : s === "on" ? "An" : "Aus"}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── Group Detail Page ─── */
function GroupDetailPage({ groupName, onBack }: { groupName: string; onBack: () => void }) {
  const members = allUsers.filter((u) => u.groups.includes(groupName));
  return (
    <>
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Zurück zu Gruppen
      </button>
      <h1 className="mb-1">{groupName}</h1>
      <p className="text-sm text-muted-foreground mb-6">{members.length} Mitglieder in dieser Gruppe</p>
      <div className={cardClass}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-xs text-muted-foreground">Name</th>
              <th className="text-left py-2 text-xs text-muted-foreground">E-Mail</th>
              <th className="text-left py-2 text-xs text-muted-foreground">Rolle</th>
              <th className="text-left py-2 text-xs text-muted-foreground">Lizenz</th>
            </tr>
          </thead>
          <tbody>
            {members.map((u) => (
              <tr key={u.id} className="border-b border-border/40 last:border-0">
                <td className="py-3 flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full ${avatarColors[parseInt(u.id) % avatarColors.length]} flex items-center justify-center text-white text-[10px]`}>
                    {getInitials(u.name)}
                  </div>
                  {u.name}
                </td>
                <td className="py-3 text-muted-foreground">{u.email}</td>
                <td className="py-3">{u.role}</td>
                <td className="py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${u.licensed ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                    {u.licensed ? "Aktiv" : "Keine"}
                  </span>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr><td colSpan={4} className="py-8 text-center text-muted-foreground">Keine Mitglieder in dieser Gruppe.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ─── Feature Toggle Row with click-through ─── */
function FeatureToggle({ name, desc, defaultOn, onClick }: { name: string; desc: string; defaultOn: boolean; onClick: () => void }) {
  const [deployOn, setDeployOn] = useState(defaultOn);
  const overrides = Math.floor(Math.random() * 6);
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/40 last:border-0">
      <button onClick={onClick} className="flex-1 text-left group">
        <div className="text-sm group-hover:text-blue-600 transition-colors">{name}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </button>
      <div className="flex items-center gap-4 shrink-0 ml-4">
        {overrides > 0 && <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">{overrides} Overrides</span>}
        <button
          onClick={(e) => { e.stopPropagation(); setDeployOn(!deployOn); }}
          className={`w-10 h-5 rounded-full relative transition-colors ${deployOn ? "bg-blue-600" : "bg-muted"}`}
        >
          <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${deployOn ? "right-0.5" : "left-0.5"}`} />
        </button>
        <button onClick={onClick} className="p-1 text-muted-foreground hover:text-foreground transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ─── Main Content Router ─── */
function LabPageContent({ page, onGroupClick, onFeatureClick }: { page: string; onGroupClick: (g: string) => void; onFeatureClick: (f: { name: string; desc: string; on: boolean }) => void }) {
  switch (page) {
    case "profile":
      return <ProfilePage />;
    case "preferences":
      return <PreferencesPage />;
    case "models":
      return <ModelsPage />;
    case "labels":
      return <LabelsPage />;
    case "billing":
      return <BillingPage />;
    case "analytics":
      return <AnalyticsPage />;
    case "feedback":
      return <FeedbackPage />;
    case "smb":
      return <SMBPage />;
    case "members":
      return <MembersPage />;
    case "licenses":
      return <LicensesPage />;
    case "groups":
      return <GroupsPage onGroupClick={onGroupClick} />;
    case "permissions":
      return <LabPermissions />;
    case "feat-chats":
      return <FeatureGatingSection onFeatureClick={onFeatureClick} features={[
        { name: "Chat", desc: "Grundlegende Chat-Funktionalität", on: true },
        { name: "Group Chats", desc: "Mehrere Nutzer in einem Chat", on: true },
        { name: "Chat-Sharing", desc: "Chats mit anderen teilen", on: true },
        { name: "Chat-Historie", desc: "Vergangene Chats einsehen", on: true },
        { name: "Feedback senden", desc: "Feedback zu Antworten geben", on: true },
      ]} />;
    case "feat-templates":
      return <FeatureGatingSection onFeatureClick={onFeatureClick} features={[
        { name: "Prompt-Vorlagen", desc: "Vorgefertigte Prompts verwenden", on: true },
        { name: "Prompt-Bibliothek", desc: "Zentrale Sammlung aller Prompts", on: true },
        { name: "Gespeicherte Prompts", desc: "Eigene Prompts speichern", on: true },
        { name: "Prompts teilen", desc: "Prompts mit der Organisation teilen", on: false },
      ]} />;
    case "feat-todos":
      return <FeatureGatingSection onFeatureClick={onFeatureClick} features={[
        { name: "Todo Manager", desc: "Aufgaben aus Chats erstellen", on: false },
        { name: "Todo Übersicht", desc: "Alle Aufgaben einsehen", on: false },
        { name: "Todo Zuweisung", desc: "Aufgaben zuweisen", on: false },
      ]} />;
    case "feat-contexts":
      return <ContextsPage onFeatureClick={onFeatureClick} />;
    case "feat-agents":
      return <FeatureGatingSection onFeatureClick={onFeatureClick} features={[
        { name: "Agenten", desc: "KI-Agenten verwenden", on: false },
        { name: "Agenten erstellen", desc: "Eigene Agenten konfigurieren", on: false },
        { name: "Agenten-Bibliothek", desc: "Vorkonfigurierte Agenten nutzen", on: false },
      ]} />;
    case "feat-settings":
      return <FeatureGatingSection onFeatureClick={onFeatureClick} features={[
        { name: "Modellwahl", desc: "Nutzer können Modell wählen", on: true },
        { name: "Reasoning", desc: "Reasoning-Modus aktivieren", on: true },
        { name: "Spezialmodelle", desc: "Zugang zu Spezialmodellen", on: false },
        { name: "SMB / Filesystem Zugriff", desc: "Dateisystem-Zugriff im Frontend", on: true },
      ]} />;
    default:
      return null;
  }
}

/* ─── Page Components ─── */

function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className={cardClass}>
        <h3 className="mb-4 text-muted-foreground text-xs uppercase tracking-wider">Profilbild</h3>
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl">M</div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Quelle: Microsoft-Profil</p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">Bild hochladen</button>
              <button className="px-3 py-1.5 text-xs rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors">Zurücksetzen</button>
            </div>
          </div>
        </div>
      </div>
      <div className={cardClass}>
        <h3 className="mb-4 text-muted-foreground text-xs uppercase tracking-wider">Persönliche Informationen</h3>
        <div className="grid grid-cols-2 gap-4">
          {[["Vorname", "Maximilian"], ["Nachname", "Lechner"], ["Anzeigename", "max.lechner"], ["E-Mail", "max.lechner@kolai.eu"], ["User ID", "usr_7f3a9b2c"], ["AD-ID", "ad-ml-00142"]].map(([l, v]) => (
            <div key={l}>
              <div className="text-xs text-muted-foreground mb-1">{l}</div>
              <div className="text-sm">{v}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">Einige Felder werden aus Microsoft Active Directory übernommen und sind hier nicht änderbar.</p>
      </div>
    </div>
  );
}

const prefLanguages = [
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

const prefModelFamilies = [
  { id: "openai", name: "OpenAI", models: ["GPT-5.1", "GPT-5.1 Mini", "GPT-4o Mini"] },
  { id: "mistral", name: "Mistral", models: ["Mistral Large", "Mistral Small", "Mistral Medium"] },
  { id: "deepseek", name: "DeepSeek", models: ["DeepSeek-V3", "DeepSeek-R1"] },
  { id: "xai", name: "xAI", models: ["Grok-3", "Grok-3 Mini"] },
  { id: "meta", name: "Meta", models: ["Llama 4 Scout", "Llama 4 Maverick"] },
];

function PreferencesPage() {
  const [lang, setLang] = useState("de");
  const [langOpen, setLangOpen] = useState(false);
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>(["openai", "mistral"]);
  const [selectedModels, setSelectedModels] = useState<string[]>(["GPT-5.1", "Mistral Large"]);
  const [defaultModel, setDefaultModel] = useState("GPT-5.1");
  const [hasChanges, setHasChanges] = useState(false);

  const currentLang = prefLanguages.find((l) => l.code === lang)!;

  const availableModels = prefModelFamilies
    .filter((f) => selectedFamilies.includes(f.id))
    .flatMap((f) => f.models);

  const toggleFamily = (id: string) => {
    setHasChanges(true);
    setSelectedFamilies((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
    if (selectedFamilies.includes(id)) {
      const family = prefModelFamilies.find((f) => f.id === id);
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

  return (
    <div className="space-y-6">
      <div className={cardClass}>
        <h3 className="mb-1">Sprache</h3>
        <p className="text-muted-foreground text-sm mb-4">Sprache der Benutzeroberfläche.</p>
        <div className="relative w-56">
          <button
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
            <div className="absolute top-full left-0 mt-1 w-full bg-card border border-border rounded-xl z-10 py-1 overflow-hidden">
              {prefLanguages.map((l) => (
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

      <div className={cardClass}>
        <h3 className="mb-1">Modellpräferenzen</h3>
        <p className="text-muted-foreground text-sm mb-5">Persönliche Modellauswahl und Standardmodell festlegen.</p>

        <div className="mb-5">
          <label className="text-sm text-muted-foreground mb-1.5 block">Standardmodell</label>
          <p className="text-xs text-muted-foreground mb-2">Dieses Modell wird standardmäßig in neuen Chats verwendet.</p>
          <select
            value={defaultModel}
            onChange={(e) => { setDefaultModel(e.target.value); setHasChanges(true); }}
            className="w-full max-w-xs bg-muted/20 border border-border/50 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">— Bitte wählen —</option>
            {selectedModels.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="border-t border-border/30 pt-5">
          <h4 className="mb-1">Verfügbare Modelle</h4>
          <p className="text-xs text-muted-foreground mb-4">Wähle Modellfamilien und Einzelmodelle, die du nutzen möchtest.</p>
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-1.5 block">Modellfamilien</label>
            <div className="flex flex-wrap gap-2">
              {prefModelFamilies.map((f) => (
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
            <label className="text-sm text-muted-foreground mb-1.5 block">Einzelmodelle</label>
            {availableModels.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">Keine Modellfamilie ausgewählt.</p>
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
            <button onClick={() => setHasChanges(false)} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Verwerfen</button>
            <button onClick={() => setHasChanges(false)} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Speichern</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Models Page (like normal settings OrgManagement) ─── */
const modelFamilies = [
  { id: "openai", name: "OpenAI", models: ["GPT-5.1", "GPT-5.1 Mini", "GPT-4o", "GPT-4o Mini"] },
  { id: "mistral", name: "Mistral", models: ["Mistral Large", "Mistral Small", "Mistral Medium"] },
  { id: "deepseek", name: "DeepSeek", models: ["DeepSeek-V3", "DeepSeek-R1"] },
  { id: "xai", name: "xAI", models: ["Grok-3", "Grok-3 Mini"] },
  { id: "meta", name: "Meta", models: ["Llama 4 Scout", "Llama 4 Maverick"] },
];

function ModelsPage() {
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>(["openai", "mistral", "deepseek"]);
  const [selectedModels, setSelectedModels] = useState<string[]>(["GPT-5.1", "GPT-5.1 Mini", "Mistral Large", "DeepSeek-V3"]);
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
      <div className={cardClass}>
        <h3 className="mb-1">Modellrichtlinien</h3>
        <p className="text-muted-foreground text-sm mb-5">Welche Modellfamilien und Einzelmodelle stehen den Nutzern zur Verfügung?</p>

        <div className="mb-5">
          <label className="text-sm text-muted-foreground mb-2 block">Erlaubte Modellfamilien</label>
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
          <label className="text-sm text-muted-foreground mb-2 block">Freigegebene Modelle</label>
          {availableModels.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">Keine Modellfamilie ausgewählt.</p>
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
          Nicht freigegebene Modelle werden den Nutzern nicht angezeigt. Änderungen gelten deploymentweit.
        </div>
      </div>

      {hasChanges && (
        <div className="sticky bottom-0 bg-card/60 backdrop-blur-md border border-border/60 rounded-2xl p-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Nicht gespeicherte Änderungen</span>
          <div className="flex gap-3">
            <button onClick={() => setHasChanges(false)} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground">Verwerfen</button>
            <button onClick={() => setHasChanges(false)} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Speichern</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Labels Page (with max labels setting like normal settings) ─── */
function LabelsPage() {
  const [maxLabels, setMaxLabels] = useState(5);
  const [labels, setLabels] = useState<{ id: string; name: string; color: string }[]>([
    { id: "1", name: "Marketing", color: "#3b82f6" },
    { id: "2", name: "Engineering", color: "#10b981" },
    { id: "3", name: "Vertrieb", color: "#f59e0b" },
    { id: "4", name: "Support", color: "#ef4444" },
    { id: "5", name: "HR", color: "#8b5cf6" },
  ]);
  const [newLabelName, setNewLabelName] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const addLabel = () => {
    if (newLabelName.trim() && labels.length < maxLabels) {
      setLabels((prev) => [...prev, { id: `l${Date.now()}`, name: newLabelName.trim(), color: "#6b7280" }]);
      setNewLabelName("");
      setHasChanges(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className={cardClass}>
        <h3 className="mb-1">Prompt-Vorlagen-Labels</h3>
        <p className="text-muted-foreground text-sm mb-5">Labels für die Kategorisierung von Prompt-Vorlagen verwalten.</p>

        <div className="mb-5">
          <label className="text-sm text-muted-foreground mb-1.5 block">Max. Labels pro Prompt-Vorlage</label>
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
          <p className="text-xs text-muted-foreground mt-2">Gilt deploymentweit.</p>
        </div>

        <div className="border-t border-border/40 pt-5">
          <label className="text-sm text-muted-foreground mb-3 block">
            Definierte Labels ({labels.length} / {maxLabels})
          </label>
          <div className="space-y-2 mb-4">
            {labels.map((label) => (
              <div key={label.id} className="flex items-center gap-3 group">
                <input
                  type="color"
                  value={label.color}
                  onChange={(e) => {
                    setLabels((prev) => prev.map((l) => l.id === label.id ? { ...l, color: e.target.value } : l));
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
                      setLabels((prev) => prev.map((l) => l.id === label.id ? { ...l, name: e.target.value } : l));
                      setHasChanges(true);
                    }}
                    className="bg-transparent text-sm flex-1 outline-none"
                  />
                </div>
                <button
                  onClick={() => { setLabels((prev) => prev.filter((l) => l.id !== label.id)); setHasChanges(true); }}
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
                onKeyDown={(e) => e.key === "Enter" && addLabel()}
                placeholder="Neues Label hinzufügen..."
                className="flex-1 max-w-xs bg-muted/20 border border-dashed border-border/50 rounded-lg px-3 py-2 text-sm"
              />
              <button onClick={addLabel} className="p-2 rounded-lg border border-dashed border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}

          {labels.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border/30">
              <label className="text-xs text-muted-foreground mb-2 block">Vorschau</label>
              <div className="flex flex-wrap gap-2">
                {labels.map((label) => (
                  <span
                    key={label.id}
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
        <div className="sticky bottom-0 bg-card/60 backdrop-blur-md border border-border/60 rounded-2xl p-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Nicht gespeicherte Änderungen</span>
          <div className="flex gap-3">
            <button onClick={() => setHasChanges(false)} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground">Verwerfen</button>
            <button onClick={() => setHasChanges(false)} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Speichern</button>
          </div>
        </div>
      )}
    </div>
  );
}

function BillingPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {[
          ["Deployment", "Enterprise"],
          ["Abrechnungsmodell", "Per-Seat + Overage"],
          ["Gebuchte Lizenzen", "150"],
          ["Vergeben", "127"],
          ["Frei", "23"],
          ["Zusatzkosten (März)", "€ 1.240"],
        ].map(([l, v]) => (
          <div key={l} className={cardClass}>
            <div className="text-xs text-muted-foreground mb-1">{l}</div>
            <div className="text-lg">{v}</div>
          </div>
        ))}
      </div>
      <div className={cardClass}>
        <h3 className="mb-4 text-muted-foreground text-xs uppercase tracking-wider">Vertragslogik</h3>
        <div className="grid grid-cols-2 gap-4">
          {[["Deployment-Typ", "Enterprise On-Premise"], ["Kostenlogik", "Per-Seat + Token Overage"], ["Abrechnungszeitraum", "Monatlich"], ["Letzter Sync", "31.03.2026, 08:00"]].map(([l, v]) => (
            <div key={l}>
              <div className="text-xs text-muted-foreground mb-1">{l}</div>
              <div className="text-sm">{v}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={cardClass}>
        <h3 className="mb-4 text-muted-foreground text-xs uppercase tracking-wider">Inklusivkontingente</h3>
        <div className="space-y-4">
          {[["Tokens", 72], ["Document Intelligence", 45]].map(([label, pct]) => (
            <div key={label as string}>
              <div className="flex justify-between text-sm mb-1">
                <span>{label as string}</span>
                <span className="text-muted-foreground">{pct as number}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-blue-600" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Analytics Page (with real charts like normal Monitoring) ─── */
const userTrend = [
  { day: "Mo", users: 42 }, { day: "Di", users: 45 }, { day: "Mi", users: 48 },
  { day: "Do", users: 44 }, { day: "Fr", users: 38 }, { day: "Sa", users: 12 }, { day: "So", users: 8 },
];

const featureAdoption = [
  { name: "Chat", usage: 95 }, { name: "Projekte", usage: 72 }, { name: "Kontexte", usage: 68 },
  { name: "Prompt-Vorlagen", usage: 54 }, { name: "Web Search", usage: 41 }, { name: "Reasoning", usage: 28 },
  { name: "Group Chats", usage: 19 }, { name: "Konnektoren", usage: 15 },
];

const tokenData7d = [
  { label: "Mo", input: 320000, output: 180000 },
  { label: "Di", input: 410000, output: 230000 },
  { label: "Mi", input: 385000, output: 210000 },
  { label: "Do", input: 450000, output: 260000 },
  { label: "Fr", input: 370000, output: 200000 },
  { label: "Sa", input: 95000, output: 52000 },
  { label: "So", input: 62000, output: 34000 },
];

const tokenData24h = [
  { label: "00:00", input: 8200, output: 4100 },
  { label: "03:00", input: 2100, output: 1050 },
  { label: "06:00", input: 5400, output: 2700 },
  { label: "09:00", input: 42000, output: 23000 },
  { label: "12:00", input: 38000, output: 21000 },
  { label: "15:00", input: 45000, output: 25000 },
  { label: "18:00", input: 28000, output: 15000 },
  { label: "21:00", input: 12000, output: 6500 },
];

const tokenData30d = [
  { label: "KW 9", input: 2100000, output: 1150000 },
  { label: "KW 10", input: 2350000, output: 1280000 },
  { label: "KW 11", input: 2180000, output: 1200000 },
  { label: "KW 12", input: 2520000, output: 1380000 },
];

function formatTokens(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
  return n.toString();
}

function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d");
  const [tokenTimeScale, setTokenTimeScale] = useState<"24h" | "7d" | "30d">("7d");

  const tokenData = tokenTimeScale === "24h" ? tokenData24h : tokenTimeScale === "7d" ? tokenData7d : tokenData30d;
  const totalInput = tokenData.reduce((a, b) => a + b.input, 0);
  const totalOutput = tokenData.reduce((a, b) => a + b.output, 0);

  const docPipeline = [
    { status: "Verarbeitet", count: 14230, color: "#22c55e" },
    { status: "Offen", count: 183, color: "#f59e0b" },
    { status: "Fehlgeschlagen", count: 24, color: "#ef4444" },
  ];

  return (
    <div className="space-y-8">
      {/* KPIs */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base">Executive Summary</h3>
          <div className="inline-flex rounded-lg border border-border overflow-hidden">
            {[["today", "Heute"], ["7d", "7 Tage"], ["month", "Monat"], ["last", "Vormonat"], ["3m", "3 Monate"]].map(([k, l]) => (
              <button
                key={k}
                onClick={() => setTimeRange(k)}
                className={`px-3 py-1.5 text-xs transition-colors ${timeRange === k ? "bg-blue-600 text-white" : "bg-card hover:bg-muted"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "Aktive Nutzer", value: "48", icon: Users, color: "text-blue-600" },
            { label: "Chats", value: "912", icon: MessageSquare, color: "text-indigo-600" },
            { label: "Offene Warnungen", value: "4", icon: AlertTriangle, color: "text-red-600" },
            { label: "Neues Feedback", value: "9", icon: MessageCircle, color: "text-purple-600" },
            { label: "Offenes Feedback", value: "21", icon: MessageSquare, color: "text-orange-600" },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-4">
              <div className="flex items-center gap-2 mb-2">
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                <span className="text-xs text-muted-foreground">{kpi.label}</span>
              </div>
              <div className="text-2xl">{kpi.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Token Usage */}
      <section>
        <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-6">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <h4 className="text-sm">Token-Verbrauch</h4>
            </div>
            <div className="inline-flex rounded-lg border border-border overflow-hidden">
              {([["24h", "24 Std."], ["7d", "7 Tage"], ["30d", "30 Tage"]] as const).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setTokenTimeScale(key)}
                  className={`px-3 py-1.5 text-xs transition-colors ${tokenTimeScale === key ? "bg-blue-600 text-white" : "bg-card hover:bg-muted"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-6 mb-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-blue-500 inline-block" /> Input: {formatTokens(totalInput)}</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-emerald-500 inline-block" /> Output: {formatTokens(totalOutput)}</span>
            <span>Gesamt: {formatTokens(totalInput + totalOutput)}</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart key={`lab-${tokenTimeScale}`} data={tokenData}>
              <defs>
                <linearGradient id="labInputGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="labOutputGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={formatTokens} />
              <Tooltip formatter={(value: number) => formatTokens(value)} />
              <Area type="monotone" dataKey="input" stroke="#3b82f6" strokeWidth={2} fill="url(#labInputGrad)" name="Input Tokens" />
              <Area type="monotone" dataKey="output" stroke="#10b981" strokeWidth={2} fill="url(#labOutputGrad)" name="Output Tokens" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* User Trend + Feature Adoption */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-5">
            <h4 className="mb-4 text-sm">Nutzertrend (7 Tage)</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={userTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-5">
            <h4 className="mb-4 text-sm">Feature-Adoption</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={featureAdoption} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" tick={{ fontSize: 11 }} domain={[0, 100]} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={100} />
                <Tooltip />
                <Bar dataKey="usage" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Document Pipeline */}
      <section>
        <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-5">
          <h4 className="mb-4 text-sm">Dokumenten-Pipeline</h4>
          <div className="flex gap-6 mb-4">
            {docPipeline.map((d) => (
              <div key={d.status} className="flex-1 text-center">
                <div className="text-xl" style={{ color: d.color }}>{d.count.toLocaleString("de-DE")}</div>
                <div className="text-xs text-muted-foreground">{d.status}</div>
              </div>
            ))}
          </div>
          <div className="h-3 flex rounded-full overflow-hidden bg-muted">
            {docPipeline.map((d) => {
              const total = docPipeline.reduce((a, b) => a + b.count, 0);
              return <div key={d.status} style={{ width: `${(d.count / total) * 100}%`, backgroundColor: d.color }} />;
            })}
          </div>
        </div>
      </section>

      {/* System Health (without feedback) */}
      <section>
        <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-5">
          <h4 className="mb-4 text-sm">Warnungen & Incidents</h4>
          <div className="flex items-center gap-3 mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <div className="text-sm text-amber-800 dark:text-amber-300">Systemwarnung aktiv</div>
              <div className="text-xs text-amber-600 dark:text-amber-400">4 offene Issues</div>
            </div>
          </div>
          <div className="space-y-2">
            {[
              ["SharePoint-Connector reagiert langsam", "critical", "vor 2 Std."],
              ["SMB-Sync verzögert", "warning", "vor 4 Std."],
            ].map(([title, sev, time]) => (
              <div key={title} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-muted/30">
                <span className={`w-2 h-2 rounded-full shrink-0 ${sev === "critical" ? "bg-red-500" : "bg-amber-500"}`} />
                <span className="text-sm flex-1">{title}</span>
                <span className="text-xs text-muted-foreground">{time}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${sev === "critical" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>
                  {sev}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Feedback Page (with donut chart + timeline like normal Monitoring) ─── */
const feedbackTrend = [
  { week: "KW 5", count: 4 }, { week: "KW 6", count: 7 }, { week: "KW 7", count: 3 },
  { week: "KW 8", count: 9 }, { week: "KW 9", count: 6 }, { week: "KW 10", count: 11 },
  { week: "KW 11", count: 8 }, { week: "KW 12", count: 5 }, { week: "KW 13", count: 9 },
];

const feedbackPieData = [
  { name: "Feature Request", value: 12, color: "#6366f1" },
  { name: "Bug", value: 7, color: "#ef4444" },
  { name: "Performance", value: 5, color: "#f59e0b" },
  { name: "Sonstiges", value: 3, color: "#94a3b8" },
];

function FeedbackPage() {
  const [timeRange, setTimeRange] = useState("3m");

  const feedbackItems = [
    { id: 1, user: "Anna Müller", category: "Feature Request", text: "Möglichkeit, Kontexte zwischen Projekten zu teilen", date: "30.03.2026", status: "open" },
    { id: 2, user: "Thomas Schmidt", category: "Bug", text: "Chat-Export als PDF bricht bei langen Konversationen ab", date: "29.03.2026", status: "open" },
    { id: 3, user: "Julia Hoffmann", category: "Performance", text: "Antwortzeiten bei großen Kontexten > 10 Sekunden", date: "28.03.2026", status: "open" },
    { id: 4, user: "Stefan Bauer", category: "Feature Request", text: "Dark Mode für den Chat-Bereich", date: "27.03.2026", status: "closed" },
    { id: 5, user: "Sandra Koch", category: "Bug", text: "Prompt-Vorlagen werden nicht korrekt sortiert", date: "26.03.2026", status: "open" },
    { id: 6, user: "Peter Richter", category: "Sonstiges", text: "Onboarding-Material für neue Nutzer wäre hilfreich", date: "25.03.2026", status: "closed" },
  ];

  const catColors: Record<string, string> = {
    "Feature Request": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
    "Bug": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    "Performance": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    "Sonstiges": "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[["Neues Feedback", "9"], ["Offen", "21"], ["Geschlossen", "34"], ["Gesamt", "55"]].map(([l, v]) => (
          <div key={l} className={cardClass}>
            <div className="text-xs text-muted-foreground mb-1">{l}</div>
            <div className="text-lg">{v}</div>
          </div>
        ))}
      </div>

      {/* Charts: Donut + Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-5">
          <h4 className="mb-4 text-sm">Feedback-Kategorien</h4>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={feedbackPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80}>
                  {feedbackPieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {feedbackPieData.map((f) => (
              <div key={f.name} className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: f.color }} />
                {f.name}: {f.value}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm">Feedback-Verlauf</h4>
            <div className="inline-flex rounded-lg border border-border overflow-hidden">
              {[["1m", "1 Monat"], ["3m", "3 Monate"], ["6m", "6 Monate"]].map(([k, l]) => (
                <button key={k} onClick={() => setTimeRange(k)} className={`px-2.5 py-1 text-xs transition-colors ${timeRange === k ? "bg-blue-600 text-white" : "bg-card hover:bg-muted"}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={feedbackTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} name="Feedback" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Feedback List */}
      <div className={cardClass}>
        <h3 className="mb-4 text-muted-foreground text-xs uppercase tracking-wider">Feedback-Übersicht</h3>
        <div className="space-y-2">
          {feedbackItems.map((f) => (
            <div key={f.id} className="flex items-start gap-3 py-3 px-3 rounded-lg hover:bg-muted/30 transition-colors border-b border-border/40 last:border-0">
              <span className={`w-2 h-2 rounded-full mt-2 shrink-0 ${f.status === "open" ? "bg-blue-500" : "bg-gray-400"}`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm">{f.text}</div>
                <div className="text-xs text-muted-foreground mt-1">{f.user} · {f.date}</div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${catColors[f.category] || catColors["Sonstiges"]}`}>
                {f.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── SMB Page (same as normal settings, without context user management) ─── */
type TreeNode = { id: string; name: string; path: string; children?: TreeNode[] };
type Rule = { id: string; type: "include" | "exclude"; path: string };

const mockTree: TreeNode[] = [
  {
    id: "1", name: "D:\\", path: "D:\\", children: [
      {
        id: "2", name: "Modelle", path: "D:\\Modelle", children: [
          {
            id: "3", name: "manifests", path: "D:\\Modelle\\manifests", children: [
              {
                id: "4", name: "registry.ollama.ai", path: "D:\\Modelle\\manifests\\registry.ollama.ai", children: [
                  {
                    id: "5", name: "library", path: "D:\\Modelle\\manifests\\registry.ollama.ai\\library", children: [
                      { id: "6", name: "llama3", path: "D:\\Modelle\\manifests\\registry.ollama.ai\\library\\llama3" },
                      { id: "7", name: "tinyllama", path: "D:\\Modelle\\manifests\\registry.ollama.ai\\library\\tinyllama" },
                      { id: "8", name: "mistral", path: "D:\\Modelle\\manifests\\registry.ollama.ai\\library\\mistral" },
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "9", name: "Dokumente", path: "D:\\Dokumente", children: [
          { id: "10", name: "Verträge", path: "D:\\Dokumente\\Verträge" },
          { id: "11", name: "Berichte", path: "D:\\Dokumente\\Berichte" },
          { id: "12", name: "Archiv", path: "D:\\Dokumente\\Archiv" },
        ]
      },
      {
        id: "13", name: "Shared", path: "D:\\Shared", children: [
          { id: "14", name: "Teams", path: "D:\\Shared\\Teams" },
          { id: "15", name: "Public", path: "D:\\Shared\\Public" },
        ]
      }
    ]
  }
];

const initialRules: Rule[] = [
  { id: "r1", type: "include", path: "D:\\Modelle\\manifests\\registry.ollama.ai\\library" },
  { id: "r2", type: "exclude", path: "D:\\Modelle\\manifests\\registry.ollama.ai\\library\\tinyllama" },
  { id: "r3", type: "include", path: "D:\\Dokumente\\Verträge" },
];

function getEffectiveState(path: string, rules: Rule[]): "include" | "exclude" | "neutral" | "partial" {
  const direct = rules.filter((r) => path.startsWith(r.path)).sort((a, b) => b.path.length - a.path.length);
  const hasChildren = rules.some((r) => r.path.startsWith(path) && r.path !== path);
  if (direct.length > 0) {
    const state = direct[0].type;
    if (hasChildren && rules.some((r) => r.path.startsWith(path) && r.path !== path && r.type !== state)) return "partial";
    return state;
  }
  if (hasChildren) return "partial";
  return "neutral";
}

function TreeNodeComponent({ node, rules, expanded, onToggle, onAction }: {
  node: TreeNode; rules: Rule[]; expanded: Set<string>;
  onToggle: (id: string) => void; onAction: (path: string, type: "include" | "exclude") => void;
}) {
  const isExpanded = expanded.has(node.id);
  const hasChildren = node.children && node.children.length > 0;
  const state = getEffectiveState(node.path, rules);
  const barColor = state === "include" ? "bg-green-500" : state === "exclude" ? "bg-red-500" : state === "partial" ? "bg-amber-500" : "bg-transparent";

  return (
    <div>
      <div className="group flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-muted/50 transition-colors">
        <div className={`w-1 self-stretch rounded-full ${barColor} mr-1`} />
        <button onClick={() => hasChildren && onToggle(node.id)} className="w-5 h-5 flex items-center justify-center text-muted-foreground">
          {hasChildren ? (isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />) : <span className="w-4" />}
        </button>
        {isExpanded ? <FolderOpen className="w-4 h-4 text-blue-500 shrink-0" /> : <Folder className="w-4 h-4 text-muted-foreground shrink-0" />}
        <span className="text-sm ml-1 truncate flex-1">{node.name}</span>
        {state === "include" && <span className="text-xs text-green-600">✓</span>}
        {state === "exclude" && <span className="text-xs text-red-600">✕</span>}
        {state === "partial" && <span className="text-xs text-amber-600">◐</span>}
        <div className="hidden group-hover:flex items-center gap-1 ml-2">
          <button onClick={() => onAction(node.path, "include")} className="p-1 rounded bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400" title="Include">
            <Plus className="w-3 h-3" />
          </button>
          <button onClick={() => onAction(node.path, "exclude")} className="p-1 rounded bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400" title="Exclude">
            <Minus className="w-3 h-3" />
          </button>
        </div>
      </div>
      {isExpanded && hasChildren && (
        <div className="ml-6">
          {node.children!.map((child) => (
            <TreeNodeComponent key={child.id} node={child} rules={rules} expanded={expanded} onToggle={onToggle} onAction={onAction} />
          ))}
        </div>
      )}
    </div>
  );
}

function SMBPage() {
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["1", "2", "3", "4", "5", "9"]));
  const [search, setSearch] = useState("");
  const [fileBlacklist, setFileBlacklist] = useState<string[]>(["*.tmp", "*.log", "~$*"]);
  const [folderBlacklist, setFolderBlacklist] = useState<string[]>(["node_modules", ".git", "temp"]);
  const [newFilePattern, setNewFilePattern] = useState("");
  const [newFolderPattern, setNewFolderPattern] = useState("");

  const toggleExpand = (id: string) => {
    setExpanded((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  };

  const addRule = (path: string, type: "include" | "exclude") => {
    const existing = rules.find((r) => r.path === path);
    if (existing) {
      if (existing.type === type) return;
      setRules((prev) => prev.map((r) => (r.path === path ? { ...r, type } : r)));
    } else {
      setRules((prev) => [...prev, { id: `r${Date.now()}`, type, path }]);
    }
  };

  const removeRule = (id: string) => setRules((prev) => prev.filter((r) => r.id !== id));

  const addFilePattern = () => {
    if (newFilePattern.trim() && !fileBlacklist.includes(newFilePattern.trim())) {
      setFileBlacklist((prev) => [...prev, newFilePattern.trim()]);
      setNewFilePattern("");
    }
  };

  const addFolderPattern = () => {
    if (newFolderPattern.trim() && !folderBlacklist.includes(newFolderPattern.trim())) {
      setFolderBlacklist((prev) => [...prev, newFolderPattern.trim()]);
      setNewFolderPattern("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-6">
        <h3 className="mb-1">SMB-Dateisystem</h3>
        <p className="text-muted-foreground text-sm mb-5">Include/Exclude-Regeln für Dateisystempfade konfigurieren.</p>

        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <select className="bg-muted/20 border border-border/50 rounded-lg px-3 py-2 text-sm flex-1 max-w-xs">
            <option>Default</option>
            <option>Verträge</option>
            <option>Wissensmanagement</option>
          </select>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Zum Pfad springen…" className="w-full bg-muted/20 border border-border/50 rounded-lg pl-9 pr-3 py-2 text-sm" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 border border-border/50 rounded-xl p-4 min-h-[400px] bg-muted/10 overflow-auto">
            <div className="text-xs text-muted-foreground mb-3 flex items-center gap-4">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> Included</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Excluded</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Partial</span>
            </div>
            {mockTree.map((node) => (
              <TreeNodeComponent key={node.id} node={node} rules={rules} expanded={expanded} onToggle={toggleExpand} onAction={addRule} />
            ))}
          </div>

          <div className="lg:w-80 border border-border/50 rounded-xl p-4 bg-muted/10">
            <h4 className="mb-3 text-sm">Aktive Regeln</h4>
            {rules.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">Keine Regeln definiert.</p>
            ) : (
              <div className="space-y-2">
                {rules.map((rule) => (
                  <div key={rule.id} className="flex items-start gap-2 p-2 rounded-lg bg-card border border-border text-xs">
                    <span className={`px-1.5 py-0.5 rounded text-xs shrink-0 ${rule.type === "include" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                      {rule.type === "include" ? "Include" : "Exclude"}
                    </span>
                    <span className="flex-1 break-all text-muted-foreground">{rule.path}\\**</span>
                    <button onClick={() => removeRule(rule.id)} className="text-muted-foreground hover:text-destructive shrink-0">
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border/40">
          <h4 className="text-sm mb-1">Blacklist-Muster</h4>
          <p className="text-muted-foreground text-xs mb-4">Dateien und Ordner, die beim Indexieren übersprungen werden.</p>
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm mb-3">Datei-Blacklist</h4>
              <div className="flex gap-2 mb-3">
                <input value={newFilePattern} onChange={(e) => setNewFilePattern(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addFilePattern()} placeholder="z.B. *.tmp" className="flex-1 bg-muted/20 border border-border/50 rounded-lg px-3 py-2 text-sm" />
                <button onClick={addFilePattern} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1 text-sm">
                  <Plus className="w-4 h-4" /> Hinzufügen
                </button>
              </div>
              <div className="space-y-2">
                {fileBlacklist.map((pattern) => (
                  <div key={pattern} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 border border-border/40">
                    <code className="text-sm text-foreground font-mono">{pattern}</code>
                    <button onClick={() => setFileBlacklist((prev) => prev.filter((p) => p !== pattern))} className="text-muted-foreground hover:text-destructive">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm mb-3">Ordner-Blacklist</h4>
              <div className="flex gap-2 mb-3">
                <input value={newFolderPattern} onChange={(e) => setNewFolderPattern(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addFolderPattern()} placeholder="z.B. node_modules" className="flex-1 bg-muted/20 border border-border/50 rounded-lg px-3 py-2 text-sm" />
                <button onClick={addFolderPattern} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1 text-sm">
                  <Plus className="w-4 h-4" /> Hinzufügen
                </button>
              </div>
              <div className="space-y-2">
                {folderBlacklist.map((pattern) => (
                  <div key={pattern} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 border border-border/40">
                    <code className="text-sm text-foreground font-mono">{pattern}</code>
                    <button onClick={() => setFolderBlacklist((prev) => prev.filter((p) => p !== pattern))} className="text-muted-foreground hover:text-destructive">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MembersPage() {
  const [search, setSearch] = useState("");
  const filtered = allUsers.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={cardClass}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-muted-foreground text-xs uppercase tracking-wider">Alle Mitglieder ({allUsers.length})</h3>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Suchen..." className="px-3 py-1.5 text-sm rounded-lg border border-border bg-background w-64" />
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 text-xs text-muted-foreground">Name</th>
            <th className="text-left py-2 text-xs text-muted-foreground">E-Mail</th>
            <th className="text-left py-2 text-xs text-muted-foreground">Rolle</th>
            <th className="text-left py-2 text-xs text-muted-foreground">Gruppen</th>
            <th className="text-left py-2 text-xs text-muted-foreground">Lizenz</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id} className="border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors">
              <td className="py-3 flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full ${avatarColors[parseInt(u.id) % avatarColors.length]} flex items-center justify-center text-white text-[10px] shrink-0`}>
                  {getInitials(u.name)}
                </div>
                {u.name}
              </td>
              <td className="py-3 text-muted-foreground">{u.email}</td>
              <td className="py-3">{u.role}</td>
              <td className="py-3">
                <div className="flex gap-1 flex-wrap">
                  {u.groups.length > 0 ? u.groups.map((g) => (
                    <span key={g} className="text-xs px-1.5 py-0.5 rounded bg-muted">{g}</span>
                  )) : <span className="text-xs text-muted-foreground">—</span>}
                </div>
              </td>
              <td className="py-3">
                <span className={`text-xs px-2 py-0.5 rounded-full ${u.licensed ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                  {u.licensed ? "Aktiv" : "Keine"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LicensesPage() {
  const [userLicenses, setUserLicenses] = useState<Record<string, boolean>>(
    Object.fromEntries(allUsers.map((u) => [u.id, u.licensed]))
  );

  const toggleLicense = (id: string) => {
    setUserLicenses((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const assigned = Object.values(userLicenses).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {[["Gebucht", "150"], ["Vergeben", String(assigned)], ["Frei", String(150 - assigned)]].map(([l, v]) => (
          <div key={l} className={cardClass}>
            <div className="text-xs text-muted-foreground mb-1">{l}</div>
            <div className="text-lg">{v}</div>
          </div>
        ))}
      </div>
      <div className={cardClass}>
        <h3 className="mb-4 text-muted-foreground text-xs uppercase tracking-wider">Lizenzvergabe</h3>
        <div className="space-y-1">
          {allUsers.map((u) => (
            <div key={u.id} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/20 transition-colors border-b border-border/40 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full ${avatarColors[parseInt(u.id) % avatarColors.length]} flex items-center justify-center text-white text-[10px] shrink-0`}>
                  {getInitials(u.name)}
                </div>
                <div>
                  <div className="text-sm">{u.name}</div>
                  <div className="text-xs text-muted-foreground">{u.email}</div>
                </div>
              </div>
              <button
                onClick={() => toggleLicense(u.id)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                  userLicenses[u.id]
                    ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 dark:bg-red-900/20 dark:border-red-800 dark:hover:bg-red-900/30"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {userLicenses[u.id] ? "Lizenz entfernen" : "Lizenz zuteilen"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GroupsPage({ onGroupClick }: { onGroupClick: (g: string) => void }) {
  const [groups, setGroups] = useState([
    { id: "1", name: "Admins", members: 3 },
    { id: "2", name: "Team Leads", members: 4 },
    { id: "3", name: "Power Users", members: 2 },
    { id: "4", name: "Standard Users", members: 4 },
    { id: "5", name: "Read-Only", members: 1 },
    { id: "6", name: "Externe Partner", members: 1 },
  ]);
  const [newName, setNewName] = useState("");

  const addGroup = () => {
    if (newName.trim()) {
      setGroups((prev) => [...prev, { id: `g${Date.now()}`, name: newName.trim(), members: 0 }]);
      setNewName("");
    }
  };

  const deleteGroup = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className={cardClass}>
      <h3 className="mb-4 text-muted-foreground text-xs uppercase tracking-wider">Gruppen verwalten</h3>
      <div className="space-y-1 mb-6">
        {groups.map((g) => (
          <div key={g.id} className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-muted/20 transition-colors border-b border-border/40 last:border-0 group">
            <button onClick={() => onGroupClick(g.name)} className="flex items-center gap-3 flex-1 text-left">
              <Users className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="text-sm">{g.name}</div>
                <div className="text-xs text-muted-foreground">{g.members} Mitglieder</div>
              </div>
            </button>
            <div className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <button onClick={() => deleteGroup(g.id)} className="opacity-0 group-hover:opacity-100 text-xs text-muted-foreground hover:text-red-500 transition-all">
                Löschen
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <input value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addGroup()} placeholder="Neue Gruppe..." className="flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-background" />
        <button onClick={addGroup} className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">Erstellen</button>
      </div>
    </div>
  );
}

function FeatureGatingSection({ features, onFeatureClick }: { features: { name: string; desc: string; on: boolean }[]; onFeatureClick: (f: { name: string; desc: string; on: boolean }) => void }) {
  return (
    <div className={cardClass}>
      <h3 className="mb-4 text-muted-foreground text-xs uppercase tracking-wider">Feature-Konfiguration</h3>
      <p className="text-xs text-muted-foreground mb-4">Klicke auf ein Feature, um Nutzer-Ausnahmen (Overrides) zu konfigurieren.</p>
      {features.map((f) => (
        <FeatureToggle key={f.name} name={f.name} desc={f.desc} defaultOn={f.on} onClick={() => onFeatureClick(f)} />
      ))}
    </div>
  );
}

/* ─── Contexts Page (Feature Gating + Context User Management from SMB) ─── */
type OrgUser = { id: string; name: string; email: string; initials: string; color: string };
type Context = { id: string; name: string; paths: number; created: string; userIds: string[] };

const allOrgUsers: OrgUser[] = [
  { id: "u1", name: "Maximilian Lechner", email: "max.lechner@kolai.eu", initials: "ML", color: "bg-blue-600" },
  { id: "u2", name: "Sophie Baumann", email: "sophie.baumann@kolai.eu", initials: "SB", color: "bg-purple-600" },
  { id: "u3", name: "Lukas Hoffmann", email: "lukas.hoffmann@kolai.eu", initials: "LH", color: "bg-emerald-600" },
  { id: "u4", name: "Anna Gruber", email: "anna.gruber@kolai.eu", initials: "AG", color: "bg-rose-600" },
  { id: "u5", name: "Felix Moser", email: "felix.moser@kolai.eu", initials: "FM", color: "bg-amber-600" },
  { id: "u6", name: "Julia Weber", email: "julia.weber@kolai.eu", initials: "JW", color: "bg-cyan-600" },
  { id: "u7", name: "Thomas Schneider", email: "thomas.schneider@kolai.eu", initials: "TS", color: "bg-indigo-600" },
  { id: "u8", name: "Katharina Bauer", email: "katharina.bauer@kolai.eu", initials: "KB", color: "bg-pink-600" },
  { id: "u9", name: "Markus Wagner", email: "markus.wagner@kolai.eu", initials: "MW", color: "bg-teal-600" },
  { id: "u10", name: "Laura Fischer", email: "laura.fischer@kolai.eu", initials: "LF", color: "bg-orange-600" },
];

const initialContexts: Context[] = [
  { id: "c1", name: "Default", paths: 3, created: "2025-01-15", userIds: ["u1", "u2", "u3", "u4", "u5", "u6", "u7", "u8", "u9", "u10"] },
  { id: "c2", name: "Verträge", paths: 1, created: "2025-02-20", userIds: ["u1", "u2", "u4"] },
  { id: "c3", name: "Wissensmanagement", paths: 2, created: "2025-03-10", userIds: ["u1", "u3", "u5", "u7"] },
  { id: "c4", name: "Engineering", paths: 4, created: "2025-04-05", userIds: ["u3", "u5", "u7", "u9"] },
  { id: "c5", name: "HR & Recruiting", paths: 1, created: "2025-05-18", userIds: ["u4", "u6", "u8"] },
];

function ContextsPage({ onFeatureClick }: { onFeatureClick: (f: { name: string; desc: string; on: boolean }) => void }) {
  const contextFeatures = [
    { name: "Kontext-Auswahl", desc: "Kontexte in Chats verwenden", on: true },
    { name: "Zusätzliche Kontexte", desc: "Eigene Kontexte hinzufügen", on: true },
    { name: "Kontexte-Verwaltung", desc: "Kontexte verwalten und teilen", on: false },
    { name: "Kontexte erweitern", desc: "Bestehende Kontexte erweitern", on: true },
  ];

  const [contexts, setContexts] = useState<Context[]>(initialContexts);
  const [selectedCtxId, setSelectedCtxId] = useState<string | null>(null);
  const [assignedSearch, setAssignedSearch] = useState("");
  const [availableSearch, setAvailableSearch] = useState("");

  const selectedCtx = contexts.find((c) => c.id === selectedCtxId) || null;
  const assignedUsers = selectedCtx ? allOrgUsers.filter((u) => selectedCtx.userIds.includes(u.id)) : [];
  const availableUsers = selectedCtx ? allOrgUsers.filter((u) => !selectedCtx.userIds.includes(u.id)) : [];

  const filteredAssigned = assignedUsers.filter((u) => u.name.toLowerCase().includes(assignedSearch.toLowerCase()) || u.email.toLowerCase().includes(assignedSearch.toLowerCase()));
  const filteredAvailable = availableUsers.filter((u) => u.name.toLowerCase().includes(availableSearch.toLowerCase()) || u.email.toLowerCase().includes(availableSearch.toLowerCase()));

  const addUser = (userId: string) => {
    setContexts((prev) => prev.map((c) => c.id === selectedCtxId ? { ...c, userIds: [...c.userIds, userId] } : c));
  };

  const removeUser = (userId: string) => {
    setContexts((prev) => prev.map((c) => c.id === selectedCtxId ? { ...c, userIds: c.userIds.filter((id) => id !== userId) } : c));
  };

  return (
    <div className="space-y-6">
      {/* Feature Gating */}
      <div className={cardClass}>
        <h3 className="mb-4 text-muted-foreground text-xs uppercase tracking-wider">Feature-Konfiguration</h3>
        <p className="text-xs text-muted-foreground mb-4">Klicke auf ein Feature, um Nutzer-Ausnahmen (Overrides) zu konfigurieren.</p>
        {contextFeatures.map((f) => (
          <FeatureToggle key={f.name} name={f.name} desc={f.desc} defaultOn={f.on} onClick={() => onFeatureClick(f)} />
        ))}
      </div>

      {/* Context User Management */}
      <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-6">
        <div className="flex items-center gap-2 mb-1">
          <Layers className="w-5 h-5 text-blue-600" />
          <h3>Kontext-Zugriff verwalten</h3>
        </div>
        <p className="text-muted-foreground text-sm mb-5">Steuern Sie, welche Nutzer auf welche Kontexte zugreifen dürfen.</p>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-72 shrink-0">
            <div className="space-y-1.5">
              {contexts.map((ctx) => {
                const isSelected = selectedCtxId === ctx.id;
                return (
                  <button
                    key={ctx.id}
                    onClick={() => { setSelectedCtxId(isSelected ? null : ctx.id); setAssignedSearch(""); setAvailableSearch(""); }}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-blue-50 border-blue-300 dark:bg-blue-900/30 dark:border-blue-700"
                        : "bg-muted/10 border-border/40 hover:bg-muted/30 hover:border-border/60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm ${isSelected ? "text-blue-700 dark:text-blue-300" : ""}`}>{ctx.name}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? "rotate-90 text-blue-600" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{ctx.paths} Pfade</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {ctx.userIds.length} Nutzer</span>
                    </div>
                    <div className="flex items-center mt-2 -space-x-1.5">
                      {allOrgUsers.filter((u) => ctx.userIds.includes(u.id)).slice(0, 5).map((u) => (
                        <div key={u.id} className={`w-6 h-6 rounded-full ${u.color} flex items-center justify-center text-white text-[9px] border-2 border-card`} title={u.name}>
                          {u.initials}
                        </div>
                      ))}
                      {ctx.userIds.length > 5 && (
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[9px] text-muted-foreground border-2 border-card">
                          +{ctx.userIds.length - 5}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {!selectedCtx ? (
              <div className="flex items-center justify-center h-full min-h-[300px] border border-dashed border-border/50 rounded-xl bg-muted/5">
                <div className="text-center text-muted-foreground">
                  <Layers className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Kontext auswählen um Nutzer zu verwalten</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Assigned */}
                <div className="border border-border/50 rounded-xl bg-muted/5 overflow-hidden flex flex-col">
                  <div className="px-4 py-3 border-b border-border/40 bg-muted/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Zugewiesene Nutzer</span>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">{assignedUsers.length}</span>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <input value={assignedSearch} onChange={(e) => setAssignedSearch(e.target.value)} placeholder="Nutzer suchen…" className="w-full bg-card border border-border/50 rounded-lg pl-8 pr-3 py-1.5 text-xs" />
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto max-h-[320px] p-2 space-y-1">
                    {filteredAssigned.length === 0 ? (
                      <p className="text-xs text-muted-foreground italic text-center py-6">Keine Nutzer gefunden</p>
                    ) : filteredAssigned.map((user) => (
                      <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 group transition-colors">
                        <div className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white text-xs shrink-0`}>{user.initials}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm truncate">{user.name}</div>
                          <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                        </div>
                        <button onClick={() => removeUser(user.id)} className="p-1.5 rounded-lg text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all" title="Entfernen">
                          <UserMinus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Available */}
                <div className="border border-border/50 rounded-xl bg-muted/5 overflow-hidden flex flex-col">
                  <div className="px-4 py-3 border-b border-border/40 bg-muted/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm">Verfügbare Nutzer</span>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">{availableUsers.length}</span>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <input value={availableSearch} onChange={(e) => setAvailableSearch(e.target.value)} placeholder="Nutzer suchen…" className="w-full bg-card border border-border/50 rounded-lg pl-8 pr-3 py-1.5 text-xs" />
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto max-h-[320px] p-2 space-y-1">
                    {filteredAvailable.length === 0 ? (
                      <p className="text-xs text-muted-foreground italic text-center py-6">Keine Nutzer verfügbar</p>
                    ) : filteredAvailable.map((user) => (
                      <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 group transition-colors">
                        <div className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white text-xs shrink-0 opacity-60`}>{user.initials}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm truncate text-muted-foreground">{user.name}</div>
                          <div className="text-xs text-muted-foreground/70 truncate">{user.email}</div>
                        </div>
                        <button onClick={() => addUser(user.id)} className="px-2.5 py-1 rounded-lg text-xs bg-blue-600 text-white hover:bg-blue-700 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1">
                          <Plus className="w-3 h-3" /> Hinzufügen
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
