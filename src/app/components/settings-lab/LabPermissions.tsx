import { useState } from "react";
import { Check, Minus } from "lucide-react";

const groups = [
  { id: "admins", name: "Admins", members: 3 },
  { id: "team-leads", name: "Team Leads", members: 8 },
  { id: "power-users", name: "Power Users", members: 12 },
  { id: "standard", name: "Standard Users", members: 45 },
  { id: "readonly", name: "Read-Only", members: 6 },
  { id: "external", name: "Externe Partner", members: 4 },
  { id: "interns", name: "Praktikanten", members: 7 },
  { id: "compliance", name: "Compliance", members: 3 },
  { id: "support", name: "Support", members: 5 },
];

type PermCategory = {
  name: string;
  permissions: { key: string; label: string }[];
};

const categories: PermCategory[] = [
  {
    name: "Chat & Collaboration",
    permissions: [
      { key: "chat_use", label: "Chat nutzen" },
      { key: "group_chat", label: "Group Chats nutzen" },
      { key: "chat_history", label: "Chat-Historie einsehen" },
      { key: "share_prompts", label: "Prompts teilen" },
      { key: "feedback", label: "Feedback senden" },
    ],
  },
  {
    name: "Projekte",
    permissions: [
      { key: "proj_view", label: "Projekte sehen" },
      { key: "proj_create", label: "Projekte erstellen" },
      { key: "proj_edit", label: "Projekte bearbeiten" },
      { key: "proj_share", label: "Projekte teilen" },
      { key: "proj_admin", label: "Projektverwaltung" },
    ],
  },
  {
    name: "Kontexte",
    permissions: [
      { key: "ctx_view", label: "Kontexte sehen" },
      { key: "ctx_select", label: "Kontexte auswählen" },
      { key: "ctx_extend", label: "Kontexte erweitern" },
      { key: "ctx_share", label: "Kontexte teilen" },
      { key: "ctx_admin", label: "Kontext-Freigaben verwalten" },
    ],
  },
  {
    name: "Prompt Assets",
    permissions: [
      { key: "prompt_view", label: "Prompt-Vorlagen sehen" },
      { key: "prompt_create", label: "Prompt-Vorlagen erstellen" },
      { key: "prompt_share", label: "Prompt-Vorlagen teilen" },
      { key: "prompt_admin", label: "Prompt-Vorlagen administrieren" },
    ],
  },
  {
    name: "Admin-nahe Rechte",
    permissions: [
      { key: "user_manage", label: "User verwalten" },
      { key: "group_manage", label: "Gruppen verwalten" },
      { key: "perm_manage", label: "Permissions verwalten" },
      { key: "billing_view", label: "Billing einsehen" },
      { key: "monitoring_view", label: "Monitoring einsehen" },
    ],
  },
];

// Default checked state: Admins get everything, others get progressively less
const defaultPerms: Record<string, Set<string>> = {
  admins: new Set(categories.flatMap((c) => c.permissions.map((p) => p.key))),
  "team-leads": new Set([
    "chat_use", "group_chat", "chat_history", "share_prompts", "feedback",
    "proj_view", "proj_create", "proj_edit", "proj_share",
    "ctx_view", "ctx_select", "ctx_extend", "ctx_share",
    "prompt_view", "prompt_create", "prompt_share",
    "monitoring_view",
  ]),
  "power-users": new Set([
    "chat_use", "group_chat", "chat_history", "share_prompts", "feedback",
    "proj_view", "proj_create", "proj_edit",
    "ctx_view", "ctx_select", "ctx_extend",
    "prompt_view", "prompt_create", "prompt_share",
  ]),
  standard: new Set([
    "chat_use", "group_chat", "chat_history", "feedback",
    "proj_view", "proj_create",
    "ctx_view", "ctx_select",
    "prompt_view", "prompt_create",
  ]),
  readonly: new Set([
    "chat_use", "chat_history",
    "proj_view",
    "ctx_view",
    "prompt_view",
  ]),
  external: new Set([
    "chat_use", "feedback",
    "proj_view",
    "ctx_view",
    "prompt_view",
  ]),
  interns: new Set([
    "chat_use", "chat_history", "feedback",
    "proj_view",
    "ctx_view", "ctx_select",
    "prompt_view",
  ]),
  compliance: new Set([
    "chat_use", "chat_history", "feedback",
    "proj_view",
    "ctx_view",
    "prompt_view",
    "billing_view", "monitoring_view",
  ]),
  support: new Set([
    "chat_use", "group_chat", "chat_history", "feedback",
    "proj_view", "proj_create",
    "ctx_view", "ctx_select",
    "prompt_view", "prompt_create",
    "monitoring_view",
  ]),
};

function Checkbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
        checked
          ? "bg-blue-600 border-blue-600 text-white"
          : "border-border bg-background hover:border-blue-400"
      }`}
    >
      {checked && <Check className="w-3 h-3" />}
    </button>
  );
}

export function LabPermissions() {
  const [perms, setPerms] = useState<Record<string, Set<string>>>(() => {
    const copy: Record<string, Set<string>> = {};
    for (const [k, v] of Object.entries(defaultPerms)) {
      copy[k] = new Set(v);
    }
    return copy;
  });

  const toggle = (groupId: string, permKey: string) => {
    setPerms((prev) => {
      const next = { ...prev };
      const s = new Set(prev[groupId] || []);
      s.has(permKey) ? s.delete(permKey) : s.add(permKey);
      next[groupId] = s;
      return next;
    });
  };

  const toggleAllForGroup = (groupId: string, catPerms: string[]) => {
    setPerms((prev) => {
      const next = { ...prev };
      const s = new Set(prev[groupId] || []);
      const allChecked = catPerms.every((p) => s.has(p));
      catPerms.forEach((p) => (allChecked ? s.delete(p) : s.add(p)));
      next[groupId] = s;
      return next;
    });
  };

  const toggleAllForPerm = (permKey: string) => {
    setPerms((prev) => {
      const next: Record<string, Set<string>> = {};
      const allChecked = groups.every((g) => (prev[g.id] || new Set()).has(permKey));
      for (const g of groups) {
        const s = new Set(prev[g.id] || []);
        allChecked ? s.delete(permKey) : s.add(permKey);
        next[g.id] = s;
      }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Permissions Matrix */}
      {categories.map((cat) => {
        const catPermKeys = cat.permissions.map((p) => p.key);
        return (
          <div
            key={cat.name}
            className="rounded-2xl border border-border bg-card overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-muted-foreground text-xs uppercase tracking-wider">
                {cat.name}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-5 py-3 text-xs text-muted-foreground w-56 min-w-56 sticky left-0 bg-muted/30 z-10">
                      Berechtigung
                    </th>
                    {groups.map((g) => {
                      const allChecked = catPermKeys.every((p) =>
                        (perms[g.id] || new Set()).has(p)
                      );
                      const someChecked =
                        !allChecked &&
                        catPermKeys.some((p) =>
                          (perms[g.id] || new Set()).has(p)
                        );
                      return (
                        <th
                          key={g.id}
                          className="px-3 py-3 text-center min-w-[7.5rem]"
                        >
                          <div className="text-xs truncate mb-1.5">{g.name}</div>
                          <div className="text-[10px] text-muted-foreground mb-2">
                            {g.members} User
                          </div>
                          <button
                            onClick={() =>
                              toggleAllForGroup(g.id, catPermKeys)
                            }
                            className={`mx-auto w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                              allChecked
                                ? "bg-blue-600 border-blue-600 text-white"
                                : someChecked
                                ? "bg-blue-600/40 border-blue-400 text-white"
                                : "border-border bg-background hover:border-blue-400"
                            }`}
                          >
                            {allChecked ? (
                              <Check className="w-3 h-3" />
                            ) : someChecked ? (
                              <Minus className="w-3 h-3" />
                            ) : null}
                          </button>
                        </th>
                      );
                    })}
                    <th className="px-3 py-3 text-center min-w-[3rem]">
                      <div className="text-[10px] text-muted-foreground mb-1">Alle</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cat.permissions.map((perm, i) => {
                    const allGroupsChecked = groups.every((g) =>
                      (perms[g.id] || new Set()).has(perm.key)
                    );
                    return (
                      <tr
                        key={perm.key}
                        className={`border-b border-border/40 last:border-0 ${
                          i % 2 === 0 ? "" : "bg-muted/10"
                        } hover:bg-muted/20 transition-colors`}
                      >
                        <td className="px-5 py-3 text-sm sticky left-0 bg-card z-10">
                          {perm.label}
                        </td>
                        {groups.map((g) => (
                          <td key={g.id} className="text-center px-2 py-3">
                            <div className="flex justify-center">
                              <Checkbox
                                checked={(perms[g.id] || new Set()).has(
                                  perm.key
                                )}
                                onChange={() => toggle(g.id, perm.key)}
                              />
                            </div>
                          </td>
                        ))}
                        <td className="text-center px-3 py-3">
                          <div className="flex justify-center">
                            <button
                              onClick={() => toggleAllForPerm(perm.key)}
                              className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                                allGroupsChecked
                                  ? "bg-blue-600 border-blue-600 text-white"
                                  : "border-border bg-background hover:border-blue-400"
                              }`}
                            >
                              {allGroupsChecked && (
                                <Check className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}