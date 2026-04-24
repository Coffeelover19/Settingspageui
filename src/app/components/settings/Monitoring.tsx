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

const TIME_RANGE_KEYS = ["mon.today", "mon.7d", "mon.current_month", "mon.last_month", "mon.3months"] as const;
type TimeRangeKey = (typeof TIME_RANGE_KEYS)[number];

type TokenPoint = { label: string; input: number; output: number };
type UserTrendPoint = { label: string; users: number };
type FeatureAdoptionPoint = { name: string; usage: number };
type FeedbackPiePoint = { nameKey: string; value: number; color: string };

type DemoData = {
  tokenSeries: TokenPoint[];
  userTrend: UserTrendPoint[];
  featureAdoption: FeatureAdoptionPoint[];
  feedbackPie: FeedbackPiePoint[];
  kpis: { activeUsers: string; chats: string; openWarnings: string; newFeedback: string; openFeedback: string };
  docPipeline: { processed: number; open: number; failed: number };
};

const FEEDBACK_COLORS = ["#6366f1", "#ef4444", "#f59e0b", "#94a3b8"] as const;

// Demo data — replaced by API responses in the future. Same overall shape across
// ranges so the charts can simply re-render with the selected time window.
function getDemoData(range: TimeRangeKey): DemoData {
  switch (range) {
    case "mon.today":
      return {
        tokenSeries: [
          { label: "00:00", input: 8200, output: 4100 },
          { label: "03:00", input: 2100, output: 1050 },
          { label: "06:00", input: 5400, output: 2700 },
          { label: "09:00", input: 42000, output: 23000 },
          { label: "12:00", input: 38000, output: 21000 },
          { label: "15:00", input: 45000, output: 25000 },
          { label: "18:00", input: 28000, output: 15000 },
          { label: "21:00", input: 12000, output: 6500 },
        ],
        userTrend: [
          { label: "00", users: 4 }, { label: "03", users: 2 }, { label: "06", users: 6 },
          { label: "09", users: 28 }, { label: "12", users: 36 }, { label: "15", users: 41 },
          { label: "18", users: 22 }, { label: "21", users: 11 },
        ],
        featureAdoption: [
          { name: "Chat", usage: 88 }, { name: "Projekte", usage: 64 }, { name: "Kontexte", usage: 58 },
          { name: "Prompt-Vorlagen", usage: 46 }, { name: "Web Search", usage: 35 }, { name: "Reasoning", usage: 22 },
          { name: "Group Chats", usage: 14 }, { name: "Konnektoren", usage: 10 },
        ],
        feedbackPie: [
          { nameKey: "mon.feature_request", value: 2, color: FEEDBACK_COLORS[0] },
          { nameKey: "mon.bug", value: 1, color: FEEDBACK_COLORS[1] },
          { nameKey: "mon.performance", value: 1, color: FEEDBACK_COLORS[2] },
          { nameKey: "mon.other", value: 0, color: FEEDBACK_COLORS[3] },
        ],
        kpis: { activeUsers: "41", chats: "128", openWarnings: "2", newFeedback: "4", openFeedback: "18" },
        docPipeline: { processed: 612, open: 24, failed: 3 },
      };
    case "mon.7d":
      return {
        tokenSeries: [
          { label: "Mo", input: 320000, output: 180000 },
          { label: "Di", input: 410000, output: 230000 },
          { label: "Mi", input: 385000, output: 210000 },
          { label: "Do", input: 450000, output: 260000 },
          { label: "Fr", input: 370000, output: 200000 },
          { label: "Sa", input: 95000, output: 52000 },
          { label: "So", input: 62000, output: 34000 },
        ],
        userTrend: [
          { label: "Mo", users: 42 }, { label: "Di", users: 45 }, { label: "Mi", users: 48 },
          { label: "Do", users: 44 }, { label: "Fr", users: 38 }, { label: "Sa", users: 12 }, { label: "So", users: 8 },
        ],
        featureAdoption: [
          { name: "Chat", usage: 95 }, { name: "Projekte", usage: 72 }, { name: "Kontexte", usage: 68 },
          { name: "Prompt-Vorlagen", usage: 54 }, { name: "Web Search", usage: 41 }, { name: "Reasoning", usage: 28 },
          { name: "Group Chats", usage: 19 }, { name: "Konnektoren", usage: 15 },
        ],
        feedbackPie: [
          { nameKey: "mon.feature_request", value: 12, color: FEEDBACK_COLORS[0] },
          { nameKey: "mon.bug", value: 7, color: FEEDBACK_COLORS[1] },
          { nameKey: "mon.performance", value: 5, color: FEEDBACK_COLORS[2] },
          { nameKey: "mon.other", value: 3, color: FEEDBACK_COLORS[3] },
        ],
        kpis: { activeUsers: "48", chats: "912", openWarnings: "4", newFeedback: "9", openFeedback: "21" },
        docPipeline: { processed: 4280, open: 96, failed: 11 },
      };
    case "mon.current_month":
      return {
        tokenSeries: [
          { label: "KW 1", input: 1850000, output: 1020000 },
          { label: "KW 2", input: 2120000, output: 1180000 },
          { label: "KW 3", input: 2380000, output: 1290000 },
          { label: "KW 4", input: 1640000, output: 910000 },
        ],
        userTrend: [
          { label: "KW 1", users: 38 }, { label: "KW 2", users: 44 },
          { label: "KW 3", users: 49 }, { label: "KW 4", users: 46 },
        ],
        featureAdoption: [
          { name: "Chat", usage: 96 }, { name: "Projekte", usage: 78 }, { name: "Kontexte", usage: 71 },
          { name: "Prompt-Vorlagen", usage: 58 }, { name: "Web Search", usage: 44 }, { name: "Reasoning", usage: 32 },
          { name: "Group Chats", usage: 22 }, { name: "Konnektoren", usage: 18 },
        ],
        feedbackPie: [
          { nameKey: "mon.feature_request", value: 38, color: FEEDBACK_COLORS[0] },
          { nameKey: "mon.bug", value: 21, color: FEEDBACK_COLORS[1] },
          { nameKey: "mon.performance", value: 14, color: FEEDBACK_COLORS[2] },
          { nameKey: "mon.other", value: 9, color: FEEDBACK_COLORS[3] },
        ],
        kpis: { activeUsers: "54", chats: "3.4k", openWarnings: "6", newFeedback: "27", openFeedback: "42" },
        docPipeline: { processed: 12480, open: 162, failed: 21 },
      };
    case "mon.last_month":
      return {
        tokenSeries: [
          { label: "KW 1", input: 1720000, output: 950000 },
          { label: "KW 2", input: 1980000, output: 1090000 },
          { label: "KW 3", input: 2240000, output: 1230000 },
          { label: "KW 4", input: 2090000, output: 1140000 },
        ],
        userTrend: [
          { label: "KW 1", users: 35 }, { label: "KW 2", users: 41 },
          { label: "KW 3", users: 46 }, { label: "KW 4", users: 43 },
        ],
        featureAdoption: [
          { name: "Chat", usage: 93 }, { name: "Projekte", usage: 70 }, { name: "Kontexte", usage: 65 },
          { name: "Prompt-Vorlagen", usage: 51 }, { name: "Web Search", usage: 38 }, { name: "Reasoning", usage: 25 },
          { name: "Group Chats", usage: 17 }, { name: "Konnektoren", usage: 13 },
        ],
        feedbackPie: [
          { nameKey: "mon.feature_request", value: 34, color: FEEDBACK_COLORS[0] },
          { nameKey: "mon.bug", value: 19, color: FEEDBACK_COLORS[1] },
          { nameKey: "mon.performance", value: 12, color: FEEDBACK_COLORS[2] },
          { nameKey: "mon.other", value: 7, color: FEEDBACK_COLORS[3] },
        ],
        kpis: { activeUsers: "51", chats: "3.1k", openWarnings: "5", newFeedback: "24", openFeedback: "38" },
        docPipeline: { processed: 11860, open: 148, failed: 19 },
      };
    case "mon.3months":
      return {
        tokenSeries: [
          { label: "Feb", input: 7800000, output: 4200000 },
          { label: "Mär", input: 8400000, output: 4600000 },
          { label: "Apr", input: 9200000, output: 5000000 },
        ],
        userTrend: [
          { label: "Feb", users: 39 }, { label: "Mär", users: 44 }, { label: "Apr", users: 48 },
        ],
        featureAdoption: [
          { name: "Chat", usage: 94 }, { name: "Projekte", usage: 74 }, { name: "Kontexte", usage: 67 },
          { name: "Prompt-Vorlagen", usage: 53 }, { name: "Web Search", usage: 40 }, { name: "Reasoning", usage: 27 },
          { name: "Group Chats", usage: 18 }, { name: "Konnektoren", usage: 14 },
        ],
        feedbackPie: [
          { nameKey: "mon.feature_request", value: 96, color: FEEDBACK_COLORS[0] },
          { nameKey: "mon.bug", value: 58, color: FEEDBACK_COLORS[1] },
          { nameKey: "mon.performance", value: 37, color: FEEDBACK_COLORS[2] },
          { nameKey: "mon.other", value: 22, color: FEEDBACK_COLORS[3] },
        ],
        kpis: { activeUsers: "62", chats: "9.6k", openWarnings: "12", newFeedback: "78", openFeedback: "104" },
        docPipeline: { processed: 35420, open: 421, failed: 58 },
      };
  }
}

function formatTokens(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
  return n.toString();
}

export function Monitoring() {
  const { lang } = useLang();
  const [timeRange, setTimeRange] = useState<TimeRangeKey>("mon.7d");

  const demo = useMemo(() => getDemoData(timeRange), [timeRange]);
  const { tokenSeries, userTrend, featureAdoption, feedbackPie } = demo;

  const kpis = [
    { labelKey: "mon.active_users", value: demo.kpis.activeUsers, icon: Users, color: "text-blue-600" },
    { labelKey: "mon.chats", value: demo.kpis.chats, icon: MessageSquare, color: "text-indigo-600" },
    { labelKey: "mon.open_warnings", value: demo.kpis.openWarnings, icon: AlertTriangle, color: "text-red-600" },
    { labelKey: "mon.new_feedback", value: demo.kpis.newFeedback, icon: MessageCircle, color: "text-purple-600" },
    { labelKey: "mon.open_feedback", value: demo.kpis.openFeedback, icon: FileWarning, color: "text-orange-600" },
  ];

  const docPipeline = [
    { statusKey: "mon.processed", count: demo.docPipeline.processed, color: "#22c55e" },
    { statusKey: "mon.open", count: demo.docPipeline.open, color: "#f59e0b" },
    { statusKey: "mon.failed", count: demo.docPipeline.failed, color: "#ef4444" },
  ];

  const incidents = [
    { titleKey: "mon.sharepoint_issue", severity: "critical", timeKey: "mon.ago_2h", systemKey: "mon.connectors" },
    { titleKey: "mon.smb_delay", severity: "warning", timeKey: "mon.ago_4h", systemKey: "SMB" },
  ];

  const totalInput = tokenSeries.reduce((a, b) => a + b.input, 0);
  const totalOutput = tokenSeries.reduce((a, b) => a + b.output, 0);

  // Chart.js datasets / options
  const tokenChartData = useMemo(() => ({
    labels: tokenSeries.map((d) => d.label),
    datasets: [
      {
        label: "Input Tokens",
        data: tokenSeries.map((d) => d.input),
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
        data: tokenSeries.map((d) => d.output),
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
  }), [tokenSeries]);

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
    labels: userTrend.map((d) => d.label),
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
  }), [userTrend, lang]);

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
  }), [featureAdoption, lang]);

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
  }), [feedbackPie, lang]);

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
            {TIME_RANGE_KEYS.map((k) => (
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
            <span className="text-xs text-muted-foreground">{t(timeRange, lang)}</span>
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
            <LineChartJS key={timeRange} data={tokenChartData} options={tokenChartOptions} />
          </div>
        </div>
      </section>

      {/* Product Usage */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-5 shadow-sm">
            <h4 className="mb-4 text-sm">{t("mon.user_trend", lang)}</h4>
            <div style={{ height: 200 }}>
              <LineChartJS key={timeRange} data={userTrendData} options={userTrendOptions} />
            </div>
          </div>
          <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/60 p-5 shadow-sm">
            <h4 className="mb-4 text-sm">{t("mon.feature_adoption", lang)}</h4>
            <div style={{ height: 200 }}>
              <BarChartJS key={timeRange} data={featureAdoptionData} options={featureAdoptionOptions} />
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
              <DoughnutChartJS key={timeRange} data={feedbackPieData} options={feedbackPieOptions} />
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