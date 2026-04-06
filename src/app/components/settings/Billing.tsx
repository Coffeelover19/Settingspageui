import { useState } from "react";
import { Server, CreditCard, Users, Package, ChevronDown, ChevronRight, ExternalLink, Settings2 } from "lucide-react";
import { useLang, t } from "./i18n";

export function Billing() {
  const { lang } = useLang();
  const [timeRange, setTimeRange] = useState<"current" | "last">("current");
  const [expandedPkg, setExpandedPkg] = useState<string | null>(null);

  const packages = [
    { nameKey: "bill.base_package", descKey: "bill.base_desc", status: "bill.active", pricing: "bill.included" },
    { nameKey: "bill.todo_manager", descKey: "bill.todo_desc", status: "bill.active", pricing: "bill.monthly_surcharge" },
    { nameKey: "bill.mail_package", descKey: "bill.mail_desc", status: "bill.active", pricing: "bill.monthly_surcharge" },
    { nameKey: "bill.transaction_package", descKey: "bill.transaction_desc", status: "bill.active", pricing: "bill.usage_based" },
  ];

  const quotas = [
    { nameKey: "bill.tokens", included: 10000000, used: 8400000, unitKey: "bill.tokens" },
    { nameKey: "bill.doc_intelligence", included: 25000, used: 12300, unitKey: "bill.documents" },
  ];

  const additionalCosts = [
    { nameKey: "bill.token_overage", descKey: "bill.token_overage_desc", amount: 180.0 },
    { nameKey: "bill.doc_intelligence", descKey: "bill.doc_intelligence_desc", amount: 124.0 },
    { nameKey: "bill.models", descKey: "bill.models_desc", amount: 90.0 },
  ];

  return (
    <div className="space-y-6">
      {/* Time Toggle */}
      <div className="flex justify-end">
        <div className="inline-flex rounded-lg border border-border overflow-hidden">
          <button onClick={() => setTimeRange("current")} className={`px-3 py-1.5 text-xs transition-colors ${timeRange === "current" ? "bg-blue-600 text-white" : "bg-card hover:bg-muted"}`}>
            {t("bill.current_month", lang)}
          </button>
          <button onClick={() => setTimeRange("last")} className={`px-3 py-1.5 text-xs transition-colors ${timeRange === "last" ? "bg-blue-600 text-white" : "bg-card hover:bg-muted"}`}>
            {t("bill.last_month", lang)}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deployment Config */}
        <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Settings2 className="w-4 h-4 text-muted-foreground" />
            <h4>{t("bill.order_config", lang)}</h4>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border/40">
              <div className="flex items-center gap-3">
                <Server className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-sm">{t("bill.deployment_type", lang)}</div>
                  <div className="text-xs text-muted-foreground">{t("bill.deployment_desc", lang)}</div>
                </div>
              </div>
              <span className="text-sm px-3 py-1 rounded-lg bg-muted/50">{t("bill.on_premise", lang)}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border/40">
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-sm">{t("bill.billing_model", lang)}</div>
                  <div className="text-xs text-muted-foreground">{t("bill.billing_desc", lang)}</div>
                </div>
              </div>
              <span className="text-sm px-3 py-1 rounded-lg bg-muted/50">{t("bill.license_usage", lang)}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-sm">{t("bill.active_packages", lang)}</div>
                  <div className="text-xs text-muted-foreground">{t("bill.booked_modules", lang)}</div>
                </div>
              </div>
              <span className="text-sm px-3 py-1 rounded-lg bg-muted/50">{t("bill.packages_count", lang)}</span>
            </div>
          </div>
        </div>

        {/* Licenses */}
        <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-muted-foreground" />
            <h4>{t("bill.licenses", lang)}</h4>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 rounded-xl bg-muted/30">
              <div className="text-2xl">60</div>
              <div className="text-xs text-muted-foreground">{t("bill.booked", lang)}</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-muted/30">
              <div className="text-2xl">48</div>
              <div className="text-xs text-muted-foreground">{t("bill.assigned", lang)}</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-muted/30">
              <div className="text-2xl text-green-600">12</div>
              <div className="text-xs text-muted-foreground">{t("bill.free", lang)}</div>
            </div>
          </div>
          <div className="mb-3">
            <div className="h-4 flex rounded-full overflow-hidden bg-muted">
              <div className="bg-blue-500 rounded-full" style={{ width: "80%" }} />
            </div>
            <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
              <span>48 / 60 {t("bill.assigned_count", lang)}</span>
              <span>83 {t("bill.ad_users_total", lang)}</span>
            </div>
          </div>
          <button className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 transition-colors">
            {t("bill.view_assignments", lang)} <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Packages */}
      <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-6 shadow-sm">
        <h4 className="mb-4">{t("bill.packages_modules", lang)}</h4>
        <div className="space-y-2">
          {packages.map((pkg) => (
            <div key={pkg.nameKey} className="border border-border/50 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedPkg(expandedPkg === pkg.nameKey ? null : pkg.nameKey)}
                className="w-full flex items-center justify-between p-3.5 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{t(pkg.nameKey, lang)}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">{t(pkg.status, lang)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{t(pkg.pricing, lang)}</span>
                  {expandedPkg === pkg.nameKey ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </div>
              </button>
              {expandedPkg === pkg.nameKey && (
                <div className="px-4 pb-3.5 pt-1 text-xs text-muted-foreground border-t border-border/40">{t(pkg.descKey, lang)}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quotas */}
      <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-6 shadow-sm">
        <h4 className="mb-4">{t("bill.inclusive_quotas", lang)}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quotas.map((q) => {
            const pct = (q.used / q.included) * 100;
            const barColor = pct > 90 ? "bg-red-500" : pct > 70 ? "bg-amber-500" : "bg-blue-500";
            return (
              <div key={q.nameKey}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm">{t(q.nameKey, lang)}</span>
                  <span className="text-xs text-muted-foreground">{t(q.unitKey, lang)}</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden bg-muted mb-1.5">
                  <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{q.used.toLocaleString("de-DE")} / {q.included.toLocaleString("de-DE")}</span>
                  <span>{pct.toFixed(0)} %</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{t("bill.quota_note", lang)}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Costs */}
      <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-6 shadow-sm">
        <h4 className="mb-1">{t("bill.additional_costs", lang)}</h4>
        <p className="text-xs text-muted-foreground mb-4">{t("bill.additional_desc", lang)}</p>
        <div className="space-y-2">
          {additionalCosts.map((c) => (
            <div key={c.nameKey} className="flex items-center justify-between py-3 px-4 rounded-xl bg-muted/20 border border-border/30">
              <div>
                <div className="text-sm">{t(c.nameKey, lang)}</div>
                <div className="text-xs text-muted-foreground">{t(c.descKey, lang)}</div>
              </div>
              <span className="text-sm whitespace-nowrap">+ {c.amount.toFixed(2).replace(".", ",")} €</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border/40 flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{t("bill.total_additional", lang)}</span>
          <span className="text-lg">394,00 €</span>
        </div>
      </div>
    </div>
  );
}
