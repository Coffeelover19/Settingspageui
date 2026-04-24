import { useMemo, useState } from "react";
import { Users, MessageSquare, FileWarning, AlertTriangle, MessageCircle, Zap } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
  type ChartOptions,
} from "chart.js";
import { Line as LineChartJS, Bar as BarChartJS, Doughnut as DoughnutChartJS } from "react-chartjs-2";
import { useLang, t } from "./i18n";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  ChartTooltip,
  ChartLegend,
);

const ANIMATION_MS = 2000;

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

export function Monitoring() {
  const { lang } = useLang();
  const [timeRange, setTimeRange] = useState("mon.7d");
  const [tokenTimeScale, setTokenTimeScale] = useState<"24h" | "7d" | "30d">("7d");

  const timeRangeKeys = ["mon.today", "mon.7d", "mon.current_month", "mon.last_month", "mon.3months"];

  const kpis = [
    { labelKey: "mon.active_users", value: "48", icon: Users, color: "text-blue-600" },
    { labelKey: "mon.chats", value: "912", icon: MessageSquare, color: "text-indigo-600" },
    { labelKey: "mon.open_warnings", value: "4", icon: AlertTriangle, color: "text-red-600" },
    { labelKey: "mon.new_feedback", value: "9", icon: MessageCircle, color: "text-purple-600" },
    { labelKey: "mon.open_feedback", value: "21", icon: FileWarning, color: "text-orange-600" },
  ];

  const docPipeline = [
    { statusKey: "mon.processed", count: 14230, color: "#22c55e" },
    { statusKey: "mon.open", count: 183, color: "#f59e0b" },
    { statusKey: "mon.failed", count: 24, color: "#ef4444" },
  ];

  const incidents = [
    { titleKey: "mon.sharepoint_issue", severity: "critical", timeKey: "mon.ago_2h", systemKey: "mon.connectors" },
    { titleKey: "mon.smb_delay", severity: "warning", timeKey: "mon.ago_4h", systemKey: "SMB" },
  ];

  const feedbackPie = [
    { nameKey: "mon.feature_request", value: 12, color: "#6366f1" },
    { nameKey: "mon.bug", value: 7, color: "#ef4444" },
    { nameKey: "mon.performance", value: 5, color: "#f59e0b" },
    { nameKey: "mon.other", value: 3, color: "#94a3b8" },
  ];

  const tokenData = tokenTimeScale === "24h" ? tokenData24h : tokenTimeScale === "7d" ? tokenData7d : tokenData30d;
  const totalInput = tokenData.reduce((a, b) => a + b.input, 0);
  const totalOutput = tokenData.reduce((a, b) => a + b.output, 0);

  // Chart.js datasets / options
  const tokenChartData = useMemo(() => ({
    labels: tokenData.map((d) => d.label),
    datasets: [
      {
        label: "Input Tokens",
        data: tokenData.map((d) => d.input),
        borderColor: "#3b82f6",
        backgroundColor: (ctx: { chart: { ctx: CanvasRenderingContext2D; chartArea?: { top: number; bottom: number } } }) => {
          const { ctx: c, chartArea } = ctx.chart;
          if (!chartArea) return "rgba(59, 130, 246, 0.15)";
          const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.35)");
          gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
          return gradient;
        },
        borderWidth: 2,
        fill: true,
        tension: 0.35,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#3b82f6",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
      },
      {
        label: "Output Tokens",
        data: tokenData.map((d) => d.output),
        borderColor: "#10b981",
        backgroundColor: (ctx: { chart: { ctx: CanvasRenderingContext2D; chartArea?: { top: number; bottom: number } } }) => {
          const { ctx: c, chartArea } = ctx.chart;
          if (!chartArea) return "rgba(16, 185, 129, 0.15)";
          const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(16, 185, 129, 0.35)");
          gradient.addColorStop(1, "rgba(16, 185, 129, 0)");
          return gradient;
        },
        borderWidth: 2,
        fill: true,
        tension: 0.35,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#10b981",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
      },
    ],
  }), [tokenData]);

  const tokenChartOptions: ChartOptions<"line"> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: ANIMATION_MS, easing: "easeOutQuart" },
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(17, 24, 39, 0.92)",
        titleColor: "#fff",
        bodyColor: "#e5e7eb",
        borderColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${formatTokens(ctx.parsed.y as number)}`,
        },
      },
    },
    scales: {
      x: { grid: { color: "rgba(148, 163, 184, 0.15)" }, ticks: { font: { size: 11 } } },
      y: {
        grid: { color: "rgba(148, 163, 184, 0.15)" },
        ticks: { font: { size: 11 }, callback: (v) => formatTokens(v as number) },
      },
    },
  }), []);

  const userTrendData = useMemo(() => ({
    labels: userTrend.map((d) => d.day),
    datasets: [
      {
        label: t("mon.active_users", lang),
        data: userTrend.map((d) => d.users),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.15)",
        borderWidth: 2,
        tension: 0.35,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#3b82f6",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        fill: false,
      },
    ],
  }), [lang]);

  const userTrendOptions: ChartOptions<"line"> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: ANIMATION_MS, easing: "easeOutQuart" },
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.92)",
        titleColor: "#fff",
        bodyColor: "#e5e7eb",
        borderColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: { grid: { color: "rgba(148, 163, 184, 0.15)" }, ticks: { font: { size: 12 } } },
      y: { grid: { color: "rgba(148, 163, 184, 0.15)" }, ticks: { font: { size: 12 } }, beginAtZero: true },
    },
  }), []);

  const featureAdoptionData = useMemo(() => ({
    labels: featureAdoption.map((d) => d.name),
    datasets: [
      {
        label: t("mon.feature_adoption", lang),
        data: featureAdoption.map((d) => d.usage),
        backgroundColor: "rgba(99, 102, 241, 0.85)",
        hoverBackgroundColor: "#6366f1",
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  }), [lang]);

  const featureAdoptionOptions: ChartOptions<"bar"> = useMemo(() => ({
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: ANIMATION_MS, easing: "easeOutQuart" },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.92)",
        titleColor: "#fff",
        bodyColor: "#e5e7eb",
        borderColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        callbacks: { label: (ctx) => `${ctx.parsed.x}%` },
      },
    },
    scales: {
      x: {
        min: 0,
        max: 100,
        grid: { color: "rgba(148, 163, 184, 0.15)" },
        ticks: { font: { size: 11 }, callback: (v) => `${v}%` },
      },
      y: { grid: { display: false }, ticks: { font: { size: 11 } } },
    },
  }), []);

  const feedbackPieData = useMemo(() => ({
    labels: feedbackPie.map((f) => t(f.nameKey, lang)),
    datasets: [
      {
        data: feedbackPie.map((f) => f.value),
        backgroundColor: feedbackPie.map((f) => f.color),
        borderColor: "var(--card)",
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  }), [lang]);

  const feedbackPieOptions: ChartOptions<"doughnut"> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: "62%",
    animation: { duration: ANIMATION_MS, easing: "easeOutQuart" },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.92)",
        titleColor: "#fff",
        bodyColor: "#e5e7eb",
        borderColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        callbacks: { label: (ctx) => `${ctx.label}: ${ctx.parsed}` },
      },
    },
  }), []);

  return (
    <div className="space-y-8">
      {/* Executive Summary */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base">{t("mon.summary", lang)}</h3>
          <div className="inline-flex rounded-lg border border-border overflow-hidden">
            {timeRangeKeys.map((k) => (
              <button
                key={k}
                onClick={() => setTimeRange(k)}
                className={`px-3 py-1.5 text-xs transition-colors ${
                  timeRange === k ? "bg-blue-600 text-white" : "bg-card hover:bg-muted"
                }`}
              >
                {t(k, lang)}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {kpis.map((kpi) => (
            <div key={kpi.labelKey} className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                <span className="text-xs text-muted-foreground">{t(kpi.labelKey, lang)}</span>
              </div>
              <div className="text-2xl">{kpi.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Token Usage */}
      <section>
        <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <h4 className="text-sm">{t("mon.token_usage", lang)}</h4>
            </div>
            <div className="inline-flex rounded-lg border border-border overflow-hidden">
              {([["24h", "mon.24h"], ["7d", "mon.7days"], ["30d", "mon.30days"]] as const).map(([key, labelKey]) => (
                <button
                  key={key}
                  onClick={() => setTokenTimeScale(key)}
                  className={`px-3 py-1.5 text-xs transition-colors ${
                    tokenTimeScale === key ? "bg-blue-600 text-white" : "bg-card hover:bg-muted"
                  }`}
                >
                  {t(labelKey, lang)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-6 mb-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 rounded bg-blue-500 inline-block" /> Input: {formatTokens(totalInput)}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 rounded bg-emerald-500 inline-block" /> Output: {formatTokens(totalOutput)}
            </span>
            <span>{t("mon.total", lang)}: {formatTokens(totalInput + totalOutput)}</span>
          </div>
          <div style={{ height: 240 }}>
            <LineChartJS key={tokenTimeScale} data={tokenChartData} options={tokenChartOptions} />
          </div>
        </div>
      </section>

      {/* Product Usage */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-5 shadow-sm">
            <h4 className="mb-4 text-sm">{t("mon.user_trend", lang)}</h4>
            <div style={{ height: 200 }}>
              <LineChartJS data={userTrendData} options={userTrendOptions} />
            </div>
          </div>
          <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-5 shadow-sm">
            <h4 className="mb-4 text-sm">{t("mon.feature_adoption", lang)}</h4>
            <div style={{ height: 200 }}>
              <BarChartJS data={featureAdoptionData} options={featureAdoptionOptions} />
            </div>
          </div>
        </div>
      </section>

      {/* Document Pipeline */}
      <section>
        <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-5 shadow-sm">
          <h4 className="mb-4 text-sm">{t("mon.doc_pipeline", lang)}</h4>
          <div className="flex gap-6 mb-4">
            {docPipeline.map((d) => (
              <div key={d.statusKey} className="flex-1 text-center">
                <div className="text-xl" style={{ color: d.color }}>{d.count.toLocaleString("de-DE")}</div>
                <div className="text-xs text-muted-foreground">{t(d.statusKey, lang)}</div>
              </div>
            ))}
          </div>
          <div className="h-3 flex rounded-full overflow-hidden bg-muted">
            {docPipeline.map((d) => {
              const total = docPipeline.reduce((a, b) => a + b.count, 0);
              return <div key={d.statusKey} style={{ width: `${(d.count / total) * 100}%`, backgroundColor: d.color }} />;
            })}
          </div>
        </div>
      </section>

      {/* Health & Feedback */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-5 shadow-sm">
            <h4 className="mb-4 text-sm">{t("mon.warnings_incidents", lang)}</h4>
            <div className="flex items-center gap-3 mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <div className="text-sm text-amber-800 dark:text-amber-300">{t("mon.system_warning", lang)}</div>
                <div className="text-xs text-amber-600 dark:text-amber-400">4 {t("mon.open_issues", lang)}</div>
              </div>
            </div>
            <div className="space-y-2">
              {incidents.map((inc, i) => (
                <div key={i} className="flex items-start gap-3 py-2 px-3 rounded-lg bg-muted/30">
                  <span className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                    inc.severity === "critical" ? "bg-red-500" : "bg-amber-500"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm">{t(inc.titleKey, lang)}</div>
                    <div className="text-xs text-muted-foreground">{inc.systemKey === "SMB" ? "SMB" : t(inc.systemKey, lang)} · {t(inc.timeKey, lang)}</div>
                  </div>
                  <span className={`text-xs px-1.5 py-0.5 rounded shrink-0 ${
                    inc.severity === "critical" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}>
                    {inc.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-5 shadow-sm">
            <h4 className="mb-4 text-sm">{t("mon.feedback_categories", lang)}</h4>
            <div className="flex items-center justify-center" style={{ height: 200 }}>
              <DoughnutChartJS data={feedbackPieData} options={feedbackPieOptions} />
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {feedbackPie.map((f) => (
                <div key={f.nameKey} className="flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: f.color }} />
                  {t(f.nameKey, lang)}: {f.value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}