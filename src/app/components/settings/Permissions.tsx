import { useState } from "react";
import { Search, ChevronDown, ChevronRight, Shield, Users as UsersIcon, Plus, X, Trash2, MessageSquare, FolderOpen, Plug, FileText, Settings as SettingsIcon } from "lucide-react";
import { useLang, t } from "./i18n";

type PermState = "inherited" | "allow" | "deny";

type Group = { id: string; name: string; members: number };

const defaultGroups: Group[] = [
  { id: "g1", name: "Admins", members: 3 },
  { id: "g2", name: "Team Leads", members: 8 },
  { id: "g3", name: "Users", members: 45 },
];

const UNASSIGNED_GROUP: Group = { id: "__unassigned__", name: "Nicht zugewiesen", members: 0 };

const avatarColors = [
  "bg-blue-600", "bg-emerald-600", "bg-violet-600", "bg-rose-600", "bg-amber-600",
  "bg-cyan-600", "bg-pink-600", "bg-teal-600", "bg-indigo-600", "bg-orange-600",
  "bg-lime-600", "bg-fuchsia-600", "bg-sky-600", "bg-red-600", "bg-green-600",
];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

const users = [
  { id: "1", name: "Maximilian Lechner", email: "max.lechner@kolai.eu", groups: ["Admins", "Team Leads"], licensed: true, source: "AD" },
  { id: "2", name: "Anna Müller", email: "anna.mueller@kolai.eu", groups: ["Team Leads"], licensed: true, source: "AD" },
  { id: "3", name: "Thomas Schmidt", email: "t.schmidt@kolai.eu", groups: ["Users"], licensed: true, source: "AD" },
  { id: "4", name: "Lisa Weber", email: "l.weber@kolai.eu", groups: [], licensed: false, source: "AD" },
  { id: "5", name: "Markus Fischer", email: "m.fischer@kolai.eu", groups: ["Users"], licensed: true, source: "AD" },
  { id: "6", name: "Julia Hoffmann", email: "j.hoffmann@kolai.eu", groups: ["Users"], licensed: true, source: "AD" },
  { id: "7", name: "Stefan Bauer", email: "s.bauer@kolai.eu", groups: ["Team Leads"], licensed: true, source: "AD" },
  { id: "8", name: "Katharina Wolf", email: "k.wolf@kolai.eu", groups: ["Users"], licensed: true, source: "AD" },
  { id: "9", name: "Michael Braun", email: "m.braun@kolai.eu", groups: [], licensed: false, source: "AD" },
  { id: "10", name: "Sandra Koch", email: "s.koch@kolai.eu", groups: ["Users"], licensed: true, source: "AD" },
  { id: "11", name: "Peter Richter", email: "p.richter@kolai.eu", groups: ["Admins"], licensed: true, source: "AD" },
  { id: "12", name: "Claudia Schäfer", email: "c.schaefer@kolai.eu", groups: ["Users"], licensed: true, source: "AD" },
  { id: "13", name: "Andreas Krüger", email: "a.krueger@kolai.eu", groups: ["Team Leads", "Users"], licensed: true, source: "AD" },
  { id: "14", name: "Monika Lange", email: "m.lange@kolai.eu", groups: [], licensed: false, source: "AD" },
  { id: "15", name: "Daniel Neumann", email: "d.neumann@kolai.eu", groups: ["Users"], licensed: true, source: "AD" },
];

const permissionCategoryKeys = [
  {
    nameKey: "permcat.chat", icon: MessageSquare, perms: [
      { key: "chat_use", labelKey: "p.chat_use", descKey: "p.chat_use.d" },
      { key: "group_chat", labelKey: "p.group_chat", descKey: "p.group_chat.d" },
      { key: "chat_history", labelKey: "p.chat_history", descKey: "p.chat_history.d" },
      { key: "share_prompts", labelKey: "p.share_prompts", descKey: "p.share_prompts.d" },
      { key: "feedback", labelKey: "p.feedback", descKey: "p.feedback.d" },
    ]
  },
  {
    nameKey: "permcat.projects", icon: FolderOpen, perms: [
      { key: "proj_view", labelKey: "p.proj_view", descKey: "p.proj_view.d" },
      { key: "proj_create", labelKey: "p.proj_create", descKey: "p.proj_create.d" },
      { key: "ctx_select", labelKey: "p.ctx_select", descKey: "p.ctx_select.d" },
      { key: "ctx_extend", labelKey: "p.ctx_extend", descKey: "p.ctx_extend.d" },
      { key: "ctx_share", labelKey: "p.ctx_share", descKey: "p.ctx_share.d" },
    ]
  },
  {
    nameKey: "permcat.connectors", icon: Plug, perms: [
      { key: "conn_view", labelKey: "p.conn_view", descKey: "p.conn_view.d" },
      { key: "conn_use", labelKey: "p.conn_use", descKey: "p.conn_use.d" },
      { key: "conn_add", labelKey: "p.conn_add", descKey: "p.conn_add.d" },
    ]
  },
  {
    nameKey: "permcat.prompts", icon: FileText, perms: [
      { key: "prompt_view", labelKey: "p.prompt_view", descKey: "p.prompt_view.d" },
      { key: "prompt_create", labelKey: "p.prompt_create", descKey: "p.prompt_create.d" },
      { key: "prompt_share", labelKey: "p.prompt_share", descKey: "p.prompt_share.d" },
    ]
  },
  {
    nameKey: "permcat.admin", icon: SettingsIcon, perms: [
      { key: "user_manage", labelKey: "p.user_manage", descKey: "p.user_manage.d" },
      { key: "group_manage", labelKey: "p.group_manage", descKey: "p.group_manage.d" },
      { key: "perm_manage", labelKey: "p.perm_manage", descKey: "p.perm_manage.d" },
      { key: "billing_view", labelKey: "p.billing_view", descKey: "p.billing_view.d" },
      { key: "monitoring_view", labelKey: "p.monitoring_view", descKey: "p.monitoring_view.d" },
    ]
  },
];

function PermToggle({ value, onChange, lang }: { value: PermState; onChange: (v: PermState) => void; lang: "de" | "en" }) {
  const states: PermState[] = ["inherited", "allow", "deny"];
  const labels = {
    inherited: t("perm.inherited", lang),
    allow: t("perm.allow", lang),
    deny: t("perm.deny", lang),
  };
  return (
    <div className="inline-flex rounded-md border border-border/50 overflow-hidden">
      {states.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`px-2 py-0.5 text-xs transition-colors ${
            value === s
              ? s === "allow" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                : s === "deny" ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                : "bg-muted text-muted-foreground"
              : "bg-card hover:bg-muted text-muted-foreground"
          }`}
        >
          {labels[s]}
        </button>
      ))}
    </div>
  );
}

export function Permissions() {
  const { lang } = useLang();
  const [view, setView] = useState<"users" | "groups">("groups");
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [groups, setGroups] = useState<Group[]>(defaultGroups);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(defaultGroups[0]);
  const [search, setSearch] = useState("");
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set(["permcat.chat"]));
  const [permStates, setPermStates] = useState<Record<string, PermState>>({});
  const [userGroups, setUserGroups] = useState<Record<string, string[]>>(
    Object.fromEntries(users.map((u) => [u.id, [...u.groups]]))
  );
  const [showGroupAssign, setShowGroupAssign] = useState(false);
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const toggleCat = (nameKey: string) => {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      next.has(nameKey) ? next.delete(nameKey) : next.add(nameKey);
      return next;
    });
  };

  const filteredUsers = users.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name, "de"));

  const unassignedUsers = users.filter((u) => (userGroups[u.id] || []).length === 0);
  const unassignedGroup: Group = { ...UNASSIGNED_GROUP, members: unassignedUsers.length };
  const allDisplayGroups = [...groups, unassignedGroup];

  const filteredGroups = allDisplayGroups.filter(
    (g) => g.name.toLowerCase().includes(search.toLowerCase())
  );

  const currentUserGroups = userGroups[selectedUser.id] || [];
  const availableGroups = groups.filter((g) => !currentUserGroups.includes(g.name));

  const groupMembers = selectedGroup
    ? selectedGroup.id === "__unassigned__"
      ? unassignedUsers
      : users.filter((u) => (userGroups[u.id] || u.groups).includes(selectedGroup.name))
    : [];

  const addGroupToUser = (groupName: string) => {
    setUserGroups((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), groupName],
    }));
    setShowGroupAssign(false);
  };

  const removeGroupFromUser = (groupName: string) => {
    setUserGroups((prev) => ({
      ...prev,
      [selectedUser.id]: (prev[selectedUser.id] || []).filter((g) => g !== groupName),
    }));
  };

  const addNewGroup = () => {
    if (newGroupName.trim()) {
      const newGroup: Group = { id: `g${Date.now()}`, name: newGroupName.trim(), members: 0 };
      setGroups((prev) => [...prev, newGroup]);
      setSelectedGroup(newGroup);
      setNewGroupName("");
      setShowNewGroup(false);
    }
  };

  const deleteGroup = (groupId: string) => {
    const group = groups.find((g) => g.id === groupId);
    if (group) {
      setUserGroups((prev) => {
        const next = { ...prev };
        for (const uid of Object.keys(next)) {
          next[uid] = next[uid].filter((g) => g !== group.name);
        }
        return next;
      });
      setGroups((prev) => prev.filter((g) => g.id !== groupId));
      if (selectedGroup?.id === groupId) {
        setSelectedGroup(groups.find((g) => g.id !== groupId) || null);
      }
      setShowDeleteConfirm(null);
    }
  };

  const navigateToUser = (user: typeof users[0]) => {
    setView("users");
    setSelectedUser(user);
    setShowGroupAssign(false);
    setSearch("");
  };

  const getGroupDisplayName = (g: Group) => {
    if (g.id === "__unassigned__") return t("perm.unassigned", lang);
    return g.name;
  };

  return (
    <div className="space-y-6">
      {/* License Summary */}
      <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm">{t("perm.licenses", lang)}</h4>
          <span className="text-xs text-muted-foreground">48 / 60 {t("perm.licenses_assigned", lang)}</span>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="text-center p-2 bg-muted/20 rounded-lg">
            <div className="text-sm">60</div><div className="text-xs text-muted-foreground">{t("perm.booked", lang)}</div>
          </div>
          <div className="text-center p-2 bg-muted/20 rounded-lg">
            <div className="text-sm">48</div><div className="text-xs text-muted-foreground">{t("perm.assigned", lang)}</div>
          </div>
          <div className="text-center p-2 bg-muted/20 rounded-lg">
            <div className="text-sm text-green-600">12</div><div className="text-xs text-muted-foreground">{t("perm.free", lang)}</div>
          </div>
        </div>
        <div className="h-2 flex rounded-full overflow-hidden bg-muted">
          <div className="bg-blue-500 rounded-full" style={{ width: "80%" }} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Subject Selection */}
        <div className="lg:w-72 shrink-0">
          <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-4 shadow-sm">
            <div className="inline-flex rounded-lg border border-border overflow-hidden w-full mb-3">
              <button onClick={() => setView("groups")} className={`flex-1 px-3 py-1.5 text-xs transition-colors ${view === "groups" ? "bg-blue-600 text-white" : "bg-card"}`}>
                {t("perm.groups", lang)}
              </button>
              <button onClick={() => setView("users")} className={`flex-1 px-3 py-1.5 text-xs transition-colors ${view === "users" ? "bg-blue-600 text-white" : "bg-card"}`}>
                {t("perm.users", lang)}
              </button>
            </div>
            <div className="relative mb-3">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder={t("perm.search", lang)} className="w-full bg-muted/30 border border-border/50 rounded-lg pl-8 pr-3 py-1.5 text-sm"
              />
            </div>
            {view === "users" ? (
              <div className="space-y-1 max-h-[480px] overflow-y-auto">
                {filteredUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => { setSelectedUser(u); setShowGroupAssign(false); }}
                    className={`w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-2.5 ${
                      selectedUser.id === u.id ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "hover:bg-muted/50"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full ${avatarColors[parseInt(u.id) % avatarColors.length]} flex items-center justify-center text-white text-[10px] shrink-0`}>
                      {getInitials(u.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${u.licensed ? "bg-green-500" : "bg-red-400"}`} />
                        <span className="truncate text-sm">{u.name}</span>
                      </div>
                      <div className="text-xs text-muted-foreground truncate">{u.email}</div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {filteredGroups.map((g) => (
                  <div key={g.id} className="group relative">
                    <button
                      onClick={() => setSelectedGroup(g)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                        selectedGroup?.id === g.id ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "hover:bg-muted/50"
                      }`}
                    >
                      <UsersIcon className={`w-3.5 h-3.5 ${selectedGroup?.id === g.id ? "text-blue-500 dark:text-blue-400" : "text-muted-foreground"}`} />
                      {getGroupDisplayName(g)}
                      <span className="text-xs text-muted-foreground ml-auto mr-6">{g.id === "__unassigned__" ? unassignedUsers.length : g.members}</span>
                    </button>
                    {g.id !== "__unassigned__" && (showDeleteConfirm === g.id ? (
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <button
                          onClick={() => deleteGroup(g.id)}
                          className="px-1.5 py-0.5 text-[10px] bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                          {t("perm.yes", lang)}
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(null)}
                          className="px-1.5 py-0.5 text-[10px] bg-muted text-muted-foreground rounded hover:bg-muted/80 transition-colors"
                        >
                          {t("perm.no", lang)}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowDeleteConfirm(g.id)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 rounded text-muted-foreground hover:text-red-500 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    ))}
                  </div>
                ))}
                {showNewGroup ? (
                  <div className="flex items-center gap-1.5 mt-2">
                    <input
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addNewGroup()}
                      placeholder={t("perm.group_name", lang)}
                      className="flex-1 bg-muted/30 border border-border/50 rounded-lg px-2.5 py-1.5 text-sm"
                      autoFocus
                    />
                    <button onClick={addNewGroup} className="p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => { setShowNewGroup(false); setNewGroupName(""); }} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowNewGroup(true)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors border border-dashed border-border/50 mt-2"
                  >
                    <Plus className="w-3.5 h-3.5" /> {t("perm.new_group", lang)}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Permissions */}
        <div className="flex-1 space-y-3">
          {view === "users" ? (
            <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${avatarColors[parseInt(selectedUser.id) % avatarColors.length]} flex items-center justify-center text-white text-sm shrink-0`}>
                    {getInitials(selectedUser.name)}
                  </div>
                  <div>
                    <div className="text-sm flex items-center gap-2">
                      {selectedUser.name}
                      {selectedUser.licensed ? (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">{t("perm.licensed", lang)}</span>
                      ) : (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">{t("perm.no_license", lang)}</span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{selectedUser.email}</div>
                  </div>
                </div>
                <button className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                  selectedUser.licensed ? "border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20" : "border-green-200 text-green-600 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/20"
                }`}>
                  {selectedUser.licensed ? t("perm.revoke_license", lang) : t("perm.assign_license", lang)}
                </button>
              </div>

              <div className="border-t border-border/40 pt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">{t("perm.group_memberships", lang)}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {currentUserGroups.map((g) => (
                    <span key={g} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                      <UsersIcon className="w-3 h-3" />
                      {g}
                      <button onClick={() => removeGroupFromUser(g)} className="hover:text-red-600 transition-colors ml-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <div className="relative">
                    <button
                      onClick={() => setShowGroupAssign(!showGroupAssign)}
                      className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg border border-dashed border-border text-muted-foreground hover:text-foreground hover:border-border/80 transition-colors"
                    >
                      <Plus className="w-3 h-3" /> {t("perm.add_group", lang)}
                    </button>
                    {showGroupAssign && availableGroups.length > 0 && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-card border border-border rounded-xl shadow-lg z-10 py-1">
                        {availableGroups.map((g) => (
                          <button
                            key={g.id}
                            onClick={() => addGroupToUser(g.name)}
                            className="w-full text-left px-3 py-1.5 text-sm hover:bg-muted/50 transition-colors flex items-center gap-2"
                          >
                            <UsersIcon className="w-3.5 h-3.5 text-muted-foreground" />
                            {g.name}
                            <span className="text-xs text-muted-foreground ml-auto">{g.members}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : selectedGroup ? (
            <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <UsersIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm flex items-center gap-2">
                      {getGroupDisplayName(selectedGroup)}
                      <span className="text-xs px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground">{groupMembers.length} {t("perm.members", lang)}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{t("perm.group_desc", lang)}</div>
                  </div>
                </div>
                {selectedGroup.id !== "__unassigned__" && (
                  <button
                    onClick={() => setShowDeleteConfirm(selectedGroup.id)}
                    className="px-3 py-1.5 text-xs rounded-lg border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20 transition-colors"
                  >
                    {t("perm.delete_group", lang)}
                  </button>
                )}
              </div>

              <div className="border-t border-border/40 pt-3">
                <span className="text-xs text-muted-foreground mb-2 block">{t("perm.members_click", lang)}</span>
                <div className="flex flex-wrap gap-2">
                  {groupMembers.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => navigateToUser(u)}
                      className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-muted/30 border border-border/40 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-900/20 dark:hover:border-blue-800 transition-colors cursor-pointer"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${u.licensed ? "bg-green-500" : "bg-red-400"}`} />
                      {u.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {/* Permission Categories */}
          {permissionCategoryKeys.map((cat) => (
            <div key={cat.nameKey} className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 shadow-sm overflow-hidden">
              <button onClick={() => toggleCat(cat.nameKey)} className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-2">
                  <cat.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{t(cat.nameKey, lang)}</span>
                  <span className="text-xs text-muted-foreground">({cat.perms.length})</span>
                </div>
                {expandedCats.has(cat.nameKey) ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              </button>
              {expandedCats.has(cat.nameKey) && (
                <div className="border-t border-border/40">
                  {cat.perms.map((p) => (
                    <div key={p.key} className="flex items-center justify-between px-4 py-3 border-b border-border/30 last:border-b-0">
                      <div>
                        <div className="text-sm">{t(p.labelKey, lang)}</div>
                        <div className="text-xs text-muted-foreground">{t(p.descKey, lang)}</div>
                      </div>
                      <PermToggle
                        value={permStates[p.key] || "inherited"}
                        onChange={(v) => setPermStates((prev) => ({ ...prev, [p.key]: v }))}
                        lang={lang}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Save Bar */}
      {Object.keys(permStates).length > 0 && (
        <div className="sticky bottom-0 bg-card/60 backdrop-blur-md border border-border/60 rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <span className="text-sm text-muted-foreground">{t("perm.unsaved", lang)}</span>
          <div className="flex gap-3">
            <button onClick={() => setPermStates({})} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">{t("perm.discard", lang)}</button>
            <button onClick={() => setPermStates({})} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">{t("perm.save", lang)}</button>
          </div>
        </div>
      )}
    </div>
  );
}
