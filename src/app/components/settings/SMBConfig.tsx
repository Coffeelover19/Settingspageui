import { useState } from "react";
import { ChevronRight, ChevronDown, FolderOpen, Folder, Plus, Minus, RotateCcw, Search, X, Users, UserPlus, UserMinus, Layers } from "lucide-react";
import { useLang, t } from "./i18n";

type TreeNode = {
  id: string;
  name: string;
  path: string;
  children?: TreeNode[];
};

type Rule = {
  id: string;
  type: "include" | "exclude";
  path: string;
};

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
    if (hasChildren && rules.some((r) => r.path.startsWith(path) && r.path !== path && r.type !== state)) {
      return "partial";
    }
    return state;
  }
  if (hasChildren) return "partial";
  return "neutral";
}

function TreeNodeComponent({
  node, rules, expanded, onToggle, onAction,
}: {
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
        <button
          onClick={() => hasChildren && onToggle(node.id)}
          className="w-5 h-5 flex items-center justify-center text-muted-foreground"
        >
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

type OrgUser = {
  id: string;
  name: string;
  email: string;
  initials: string;
  color: string;
};

type Context = {
  id: string;
  name: string;
  paths: number;
  created: string;
  userIds: string[];
};

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

function ContextUserManagement({ lang }: { lang: "de" | "en" }) {
  const [contexts, setContexts] = useState<Context[]>(initialContexts);
  const [selectedCtxId, setSelectedCtxId] = useState<string | null>(null);
  const [assignedSearch, setAssignedSearch] = useState("");
  const [availableSearch, setAvailableSearch] = useState("");

  const selectedCtx = contexts.find((c) => c.id === selectedCtxId) || null;
  const assignedUsers = selectedCtx
    ? allOrgUsers.filter((u) => selectedCtx.userIds.includes(u.id))
    : [];
  const availableUsers = selectedCtx
    ? allOrgUsers.filter((u) => !selectedCtx.userIds.includes(u.id))
    : [];

  const filteredAssigned = assignedUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(assignedSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(assignedSearch.toLowerCase())
  );
  const filteredAvailable = availableUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(availableSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(availableSearch.toLowerCase())
  );

  const addUser = (userId: string) => {
    setContexts((prev) =>
      prev.map((c) =>
        c.id === selectedCtxId ? { ...c, userIds: [...c.userIds, userId] } : c
      )
    );
  };

  const removeUser = (userId: string) => {
    setContexts((prev) =>
      prev.map((c) =>
        c.id === selectedCtxId ? { ...c, userIds: c.userIds.filter((id) => id !== userId) } : c
      )
    );
  };

  return (
    <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <Layers className="w-5 h-5 text-blue-600" />
        <h3>{t("smb.ctx_mgmt", lang)}</h3>
      </div>
      <p className="text-muted-foreground text-sm mb-5">{t("smb.ctx_mgmt_desc", lang)}</p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Context List */}
        <div className="lg:w-72 shrink-0">
          <div className="space-y-1.5">
            {contexts.map((ctx) => {
              const isSelected = selectedCtxId === ctx.id;
              return (
                <button
                  key={ctx.id}
                  onClick={() => {
                    setSelectedCtxId(isSelected ? null : ctx.id);
                    setAssignedSearch("");
                    setAvailableSearch("");
                  }}
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
                    <span>{ctx.paths} {t("smb.ctx_paths", lang)}</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" /> {ctx.userIds.length} {t("smb.ctx_users_count", lang)}
                    </span>
                  </div>
                  {/* Mini avatar row */}
                  <div className="flex items-center mt-2 -space-x-1.5">
                    {allOrgUsers
                      .filter((u) => ctx.userIds.includes(u.id))
                      .slice(0, 5)
                      .map((u) => (
                        <div
                          key={u.id}
                          className={`w-6 h-6 rounded-full ${u.color} flex items-center justify-center text-white text-[9px] border-2 border-card`}
                          title={u.name}
                        >
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

        {/* Detail Panel */}
        <div className="flex-1 min-w-0">
          {!selectedCtx ? (
            <div className="flex items-center justify-center h-full min-h-[300px] border border-dashed border-border/50 rounded-xl bg-muted/5">
              <div className="text-center text-muted-foreground">
                <Layers className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">{t("smb.ctx_select_prompt", lang)}</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Assigned Users */}
              <div className="border border-border/50 rounded-xl bg-muted/5 overflow-hidden flex flex-col">
                <div className="px-4 py-3 border-b border-border/40 bg-muted/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{t("smb.ctx_assigned_users", lang)}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      {assignedUsers.length}
                    </span>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      value={assignedSearch}
                      onChange={(e) => setAssignedSearch(e.target.value)}
                      placeholder={t("smb.ctx_search_users", lang)}
                      className="w-full bg-card border border-border/50 rounded-lg pl-8 pr-3 py-1.5 text-xs"
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto max-h-[320px] p-2 space-y-1">
                  {filteredAssigned.length === 0 ? (
                    <p className="text-xs text-muted-foreground italic text-center py-6">
                      {assignedSearch ? t("smb.ctx_no_results", lang) : t("smb.ctx_no_users", lang)}
                    </p>
                  ) : (
                    filteredAssigned.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 group transition-colors"
                      >
                        <div className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white text-xs shrink-0`}>
                          {user.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm truncate">{user.name}</div>
                          <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                        </div>
                        <button
                          onClick={() => removeUser(user.id)}
                          className="p-1.5 rounded-lg text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                          title={t("smb.ctx_remove", lang)}
                        >
                          <UserMinus className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Available Users */}
              <div className="border border-border/50 rounded-xl bg-muted/5 overflow-hidden flex flex-col">
                <div className="px-4 py-3 border-b border-border/40 bg-muted/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm">{t("smb.ctx_available_users", lang)}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                      {availableUsers.length}
                    </span>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      value={availableSearch}
                      onChange={(e) => setAvailableSearch(e.target.value)}
                      placeholder={t("smb.ctx_search_users", lang)}
                      className="w-full bg-card border border-border/50 rounded-lg pl-8 pr-3 py-1.5 text-xs"
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto max-h-[320px] p-2 space-y-1">
                  {filteredAvailable.length === 0 ? (
                    <p className="text-xs text-muted-foreground italic text-center py-6">
                      {availableSearch ? t("smb.ctx_no_results", lang) : t("smb.ctx_no_available", lang)}
                    </p>
                  ) : (
                    filteredAvailable.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 group transition-colors"
                      >
                        <div className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white text-xs shrink-0 opacity-60`}>
                          {user.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm truncate text-muted-foreground">{user.name}</div>
                          <div className="text-xs text-muted-foreground/70 truncate">{user.email}</div>
                        </div>
                        <button
                          onClick={() => addUser(user.id)}
                          className="px-2.5 py-1 rounded-lg text-xs bg-blue-600 text-white hover:bg-blue-700 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          {t("smb.ctx_add", lang)}
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function SMBConfig() {
  const { lang } = useLang();
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["1", "2", "3", "4", "5", "9"]));
  const [search, setSearch] = useState("");
  const [fileBlacklist, setFileBlacklist] = useState<string[]>(["*.tmp", "*.log", "~$*"]);
  const [folderBlacklist, setFolderBlacklist] = useState<string[]>(["node_modules", ".git", "temp"]);
  const [newFilePattern, setNewFilePattern] = useState("");
  const [newFolderPattern, setNewFolderPattern] = useState("");

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
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

  const removeFilePattern = (pattern: string) => setFileBlacklist((prev) => prev.filter((p) => p !== pattern));

  const addFolderPattern = () => {
    if (newFolderPattern.trim() && !folderBlacklist.includes(newFolderPattern.trim())) {
      setFolderBlacklist((prev) => [...prev, newFolderPattern.trim()]);
      setNewFolderPattern("");
    }
  };

  const removeFolderPattern = (pattern: string) => setFolderBlacklist((prev) => prev.filter((p) => p !== pattern));

  return (
    <div className="space-y-6">
      <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-6 shadow-sm">
        <h3 className="mb-1">{t("smb.title", lang)}</h3>
        <p className="text-muted-foreground text-sm mb-5">{t("smb.desc", lang)}</p>

        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <select className="bg-muted/20 border border-border/50 rounded-lg px-3 py-2 text-sm flex-1 max-w-xs">
            <option>{t("smb.context_default", lang)}</option>
            <option>{t("smb.context_contracts", lang)}</option>
            <option>{t("smb.context_knowledge", lang)}</option>
          </select>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("smb.jump_to_path", lang)}
              className="w-full bg-muted/20 border border-border/50 rounded-lg pl-9 pr-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 border border-border/50 rounded-xl p-4 min-h-[400px] bg-muted/10 overflow-auto">
            <div className="text-xs text-muted-foreground mb-3 flex items-center gap-4">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> {t("smb.included", lang)}</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> {t("smb.excluded", lang)}</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> {t("smb.partial", lang)}</span>
            </div>
            {mockTree.map((node) => (
              <TreeNodeComponent key={node.id} node={node} rules={rules} expanded={expanded} onToggle={toggleExpand} onAction={addRule} />
            ))}
          </div>

          <div className="lg:w-80 border border-border/50 rounded-xl p-4 bg-muted/10">
            <h4 className="mb-3 text-sm">{t("smb.active_rules", lang)}</h4>
            {rules.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">{t("smb.no_rules", lang)}</p>
            ) : (
              <div className="space-y-2">
                {rules.map((rule) => (
                  <div key={rule.id} className="flex items-start gap-2 p-2 rounded-lg bg-card border border-border text-xs">
                    <span className={`px-1.5 py-0.5 rounded text-xs shrink-0 ${
                      rule.type === "include" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
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
          <h4 className="text-sm mb-1">{t("smb.blacklist_patterns", lang)}</h4>
          <p className="text-muted-foreground text-xs mb-4">{t("smb.blacklist_desc", lang)}</p>

          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm mb-3">{t("smb.file_blacklist", lang)}</h4>
              <div className="flex gap-2 mb-3">
                <input
                  value={newFilePattern}
                  onChange={(e) => setNewFilePattern(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addFilePattern()}
                  placeholder={t("smb.file_placeholder", lang)}
                  className="flex-1 bg-muted/20 border border-border/50 rounded-lg px-3 py-2 text-sm"
                />
                <button onClick={addFilePattern} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1 text-sm">
                  <Plus className="w-4 h-4" /> {t("smb.add", lang)}
                </button>
              </div>
              <div className="space-y-2">
                {fileBlacklist.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">{t("smb.no_file_patterns", lang)}</p>
                ) : (
                  fileBlacklist.map((pattern, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 border border-border/40">
                      <code className="text-sm text-foreground font-mono">{pattern}</code>
                      <button onClick={() => removeFilePattern(pattern)} className="text-muted-foreground hover:text-destructive">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm mb-3">{t("smb.folder_blacklist", lang)}</h4>
              <div className="flex gap-2 mb-3">
                <input
                  value={newFolderPattern}
                  onChange={(e) => setNewFolderPattern(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addFolderPattern()}
                  placeholder={t("smb.folder_placeholder", lang)}
                  className="flex-1 bg-muted/20 border border-border/50 rounded-lg px-3 py-2 text-sm"
                />
                <button onClick={addFolderPattern} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1 text-sm">
                  <Plus className="w-4 h-4" /> {t("smb.add", lang)}
                </button>
              </div>
              <div className="space-y-2">
                {folderBlacklist.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">{t("smb.no_folder_patterns", lang)}</p>
                ) : (
                  folderBlacklist.map((pattern, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 border border-border/40">
                      <code className="text-sm text-foreground font-mono">{pattern}</code>
                      <button onClick={() => removeFolderPattern(pattern)} className="text-muted-foreground hover:text-destructive">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-800/50">
            <p className="text-xs text-blue-700 dark:text-blue-400">
              <strong>{lang === "de" ? "Hinweis:" : "Note:"}</strong> {t("smb.wildcard_note", lang)}
            </p>
          </div>
        </div>
      </div>

      {/* Context User Management */}
      <ContextUserManagement lang={lang} />

      <div className="sticky bottom-0 bg-card/60 backdrop-blur-md border border-border/60 rounded-2xl p-4 flex items-center justify-between shadow-lg">
        <span className="text-sm text-muted-foreground">{t("smb.save_note", lang)}</span>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground">{t("smb.discard", lang)}</button>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">{t("smb.review_apply", lang)}</button>
        </div>
      </div>
    </div>
  );
}