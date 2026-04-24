import { useRef, useState } from "react";
import {
  Upload, X, Sparkles, Wand2, Maximize2, ChevronDown, ChevronRight,
  Eraser, Brush, RotateCcw, Download, Layers, Wand, Send, Paperclip,
  Image as ImageIcon, Cpu, Settings2, SlidersHorizontal,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

type Mode = "create" | "edit" | "upscale";
type EditSubMode = "text" | "mask";

const demoResults = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200",
];

const CARD_SHADOW = "0.5px 3px 6px -1px rgba(0,0,0,0.1)";

const glassCard =
  "rounded-2xl border border-white/60 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl";

/* ---------------- Atoms ---------------- */

function Card({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`${glassCard} ${className}`}
      style={{
        boxShadow: `${CARD_SHADOW}, inset 0 1px 0 rgba(255,255,255,0.6)`,
        backgroundImage:
          "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.35) 100%)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="flex items-baseline justify-between mb-2">
      <div className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{children}</div>
      {hint && <div className="text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}

function Collapsible({ title, children, defaultOpen = false, icon: Icon }: { title: string; children: React.ReactNode; defaultOpen?: boolean; icon?: any }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-border/60 pt-3">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors">
        <span className="flex items-center gap-2">{Icon && <Icon className="w-4 h-4" />} {title}</span>
        {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
      {open && <div className="mt-3 space-y-3">{children}</div>}
    </div>
  );
}

function RefThumb({ src, label, onRemove }: { src: string; label: string; onRemove: () => void }) {
  return (
    <div className="relative group aspect-square rounded-xl overflow-hidden bg-muted border border-border/70 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
      <ImageWithFallback src={src} alt={label} className="w-full h-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-1.5">
        <span className="text-[10px] text-white">{label}</span>
      </div>
      <button onClick={onRemove} className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}

function UploadTile({ onFiles, compact = false, label, multiple = true }: { onFiles: (urls: string[]) => void; compact?: boolean; label?: string; multiple?: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handle = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    onFiles(urls);
  };
  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => { e.preventDefault(); handle(e.dataTransfer.files); }}
      className={`w-full ${compact ? "aspect-square" : "py-8"} rounded-xl border border-dashed border-border/80 bg-white/50 dark:bg-white/5 hover:border-blue-600 hover:bg-blue-50/60 dark:hover:bg-blue-950/20 transition-colors flex flex-col items-center justify-center gap-1.5 text-muted-foreground`}
    >
      <Upload className="w-4 h-4" />
      {!compact && <span className="text-xs">{label ?? "Dateien ablegen oder auswählen"}</span>}
      <input ref={inputRef} type="file" accept="image/*" multiple={multiple} className="hidden" onChange={(e) => handle(e.target.files)} />
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground mb-1.5">{label}</div>
      {children}
    </div>
  );
}

function Select({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-white/70 dark:bg-white/5 backdrop-blur focus:outline-none focus:border-blue-600">
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center justify-between text-sm">
      <span>{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full transition-colors ${checked ? "bg-blue-600" : "bg-muted"}`}
      >
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${checked ? "left-[18px]" : "left-0.5"}`} />
      </button>
    </label>
  );
}

function Slider({ value, onChange, min = 1, max = 8 }: { value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  return (
    <div className="flex items-center gap-3">
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="flex-1 accent-blue-600" />
      <div className="w-8 text-right text-sm">{value}</div>
    </div>
  );
}

/* ---------------- Unified Prompt Header (tabs flow into prompt bar) ---------------- */

function PromptHeader({
  mode, onMode, prompt, setPrompt, placeholder, onSubmit, ctaLabel, model, setModel,
}: {
  mode: Mode; onMode: (m: Mode) => void;
  prompt: string; setPrompt: (v: string) => void; placeholder: string;
  onSubmit: () => void; ctaLabel: string;
  model: string; setModel: (v: string) => void;
}) {
  const items: { key: Mode; label: string; icon: any }[] = [
    { key: "create", label: "Erstellen", icon: Sparkles },
    { key: "edit", label: "Bearbeiten", icon: Wand2 },
    { key: "upscale", label: "Upscaling", icon: Maximize2 },
  ];
  return (
    <div className="relative">
      {/* Tabs that flow into the bar – full width, evenly distributed */}
      <div className="grid grid-cols-3 gap-3">
        {items.map((i) => {
          const active = mode === i.key;
          return (
            <button
              key={i.key}
              onClick={() => onMode(i.key)}
              className={`relative flex items-center justify-center gap-2.5 px-6 pt-2 pb-4 -mb-1.5 rounded-t-2xl transition-all ${
                active ? "text-white z-10" : "text-muted-foreground hover:text-foreground z-0"
              }`}
              style={{
                background: active
                  ? "linear-gradient(180deg, rgba(37,99,235,1) 0%, rgba(29,78,216,0.98) 100%)"
                  : "linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.4) 100%)",
                border: active ? "1px solid rgba(37,99,235,1)" : "1px solid rgba(255,255,255,0.7)",
                borderBottom: "none",
                boxShadow: active
                  ? "0 -4px 16px -4px rgba(37,99,235,0.4), inset 0 1px 0 rgba(255,255,255,0.3)"
                  : "0 -2px 6px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.7)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${active ? "bg-white/20" : "bg-blue-600/10"}`}>
                <i.icon className={`w-4 h-4 ${active ? "text-white" : "text-blue-600"}`} />
              </div>
              <span className="text-sm" style={{ fontWeight: active ? 500 : 400 }}>{i.label}</span>
            </button>
          );
        })}
      </div>

      {/* Prompt bar – matte glass, less transparent */}
      <div
        className="relative rounded-2xl border border-white/70 dark:border-white/10 overflow-hidden"
        style={{
          boxShadow: `${CARD_SHADOW}, inset 0 1px 0 rgba(255,255,255,0.7)`,
          background: "rgba(252,252,253,0.92)",
          backdropFilter: "blur(24px) saturate(140%)",
          WebkitBackdropFilter: "blur(24px) saturate(140%)",
        }}
      >
        {/* subtle mode tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              mode === "create"
                ? "linear-gradient(135deg, rgba(37,99,235,0.05) 0%, transparent 60%)"
                : mode === "edit"
                ? "linear-gradient(135deg, rgba(139,92,246,0.05) 0%, transparent 60%)"
                : "linear-gradient(135deg, rgba(14,165,233,0.05) 0%, transparent 60%)",
          }}
        />
        <div className="relative px-4 pt-2 pb-3 flex flex-col gap-2.5 min-h-[112px]">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent resize-none min-h-[56px] max-h-40 focus:outline-none"
            rows={2}
            style={{ fontSize: "14px" }}
          />
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-white/10 border border-border/70 backdrop-blur">
                <Cpu className="w-3.5 h-3.5 text-blue-600" />
                <select value={model} onChange={(e) => setModel(e.target.value)} className="bg-transparent text-xs focus:outline-none pr-1">
                  <option>Flux Pro 1.1</option>
                  <option>Ideogram v2</option>
                  <option>SDXL Ultra</option>
                  <option>Kolai Vision</option>
                </select>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-white/10 border border-border/70 backdrop-blur text-xs text-muted-foreground hover:text-foreground">
                <Wand className="w-3.5 h-3.5" /> Prompt Enhancer
              </button>
            </div>
            <button
              onClick={onSubmit}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors"
              style={{ boxShadow: "0 8px 20px -4px rgba(37,99,235,0.5), inset 0 1px 0 rgba(255,255,255,0.25)" }}
            >
              <Send className="w-4 h-4" /> {ctaLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Visual Dimensions Picker ---------------- */

const RATIO_OPTIONS: { key: string; w: number; h: number }[] = [
  { key: "2:3", w: 20, h: 28 },
  { key: "1:1", w: 24, h: 24 },
  { key: "16:9", w: 30, h: 17 },
  { key: "9:16", w: 17, h: 30 },
];

const SIZE_PRESETS: Record<string, { small: string; medium: string; large: string }> = {
  "1:1": { small: "768×768", medium: "1024×1024", large: "2048×2048" },
  "2:3": { small: "832×1248", medium: "1248×1872", large: "2496×3744" },
  "16:9": { small: "1376×768", medium: "2752×1536", large: "5504×3072" },
  "9:16": { small: "768×1376", medium: "1536×2752", large: "3072×5504" },
};

function DimensionsPicker({
  ratio, setRatio, size, setSize,
}: {
  ratio: string; setRatio: (v: string) => void;
  size: "small" | "medium" | "large"; setSize: (v: "small" | "medium" | "large") => void;
}) {
  const presets = SIZE_PRESETS[ratio] ?? SIZE_PRESETS["1:1"];
  const currentDim = presets[size];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm">Image Dimensions</div>
        <div className="text-xs text-muted-foreground">{currentDim}</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {RATIO_OPTIONS.map((r) => {
          const active = ratio === r.key;
          return (
            <button
              key={r.key}
              onClick={() => setRatio(r.key)}
              className={`rounded-xl p-2.5 border transition-all backdrop-blur flex flex-col items-center gap-1.5 ${
                active
                  ? "border-blue-600 bg-blue-50/70 dark:bg-blue-950/40"
                  : "border-border/70 bg-white/60 dark:bg-white/5 hover:border-blue-400"
              }`}
            >
              <div
                className={`border rounded-[3px] ${active ? "border-blue-600" : "border-muted-foreground/60"}`}
                style={{ width: `${r.w}px`, height: `${r.h}px` }}
              />
              <span className={`text-xs ${active ? "text-blue-600" : "text-muted-foreground"}`}>{r.key}</span>
            </button>
          );
        })}
        <button
          onClick={() => setRatio("custom")}
          className={`col-span-4 sm:col-span-1 hidden rounded-xl p-2.5 border border-dashed border-border/70 text-xs text-muted-foreground`}
        >
          Custom
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {(["small", "medium", "large"] as const).map((s) => {
          const active = size === s;
          return (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`rounded-xl px-3 py-2 border text-left transition-all ${
                active
                  ? "border-blue-600 bg-blue-50/70 dark:bg-blue-950/40"
                  : "border-border/70 bg-white/60 dark:bg-white/5 hover:border-blue-400"
              }`}
            >
              <div className={`text-xs ${active ? "text-blue-600" : ""}`} style={{ textTransform: "capitalize" }}>{s}</div>
              <div className="text-[11px] text-muted-foreground">{presets[s]}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CountPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="space-y-2">
      <div className="text-sm">Number of generations</div>
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((n) => {
          const active = value === n;
          return (
            <button
              key={n}
              onClick={() => onChange(n)}
              className={`rounded-xl py-2 border transition-all ${
                active
                  ? "border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-600"
                  : "border-border/70 bg-white/60 dark:bg-white/5 hover:border-blue-400"
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Create Mode ---------------- */

function CreateMode({ mode, onMode, prompt, setPrompt, model, setModel }: { mode: Mode; onMode: (m: Mode) => void; prompt: string; setPrompt: (v: string) => void; model: string; setModel: (v: string) => void }) {
  const [images, setImages] = useState<string[]>([]);
  const [refTypes, setRefTypes] = useState<string[]>(["Stil-Referenz"]);
  const [startMode, setStartMode] = useState<"free" | "template">("free");
  const [template, setTemplate] = useState<string | null>(null);
  const [enhancer, setEnhancer] = useState(true);
  const [ratio, setRatio] = useState("16:9");
  const [size, setSize] = useState<"small" | "medium" | "large">("small");
  const [numImages, setNumImages] = useState(4);
  const [selected, setSelected] = useState(0);

  const addImages = (urls: string[]) => setImages((p) => [...p, ...urls].slice(0, 10));
  const removeImage = (i: number) => setImages((p) => p.filter((_, idx) => idx !== i));

  const insertRef = (n: number) => setPrompt(`${prompt}${prompt && !prompt.endsWith(" ") ? " " : ""}Referenz ${n} `);
  const toggleRefType = (t: string) =>
    setRefTypes((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  return (
    <div className="space-y-4">
      <PromptHeader
        mode={mode}
        onMode={onMode}
        prompt={prompt}
        setPrompt={setPrompt}
        placeholder="Beschreibe die gewünschte Szene. Referenzen ansprechen mit: Referenz 1, Referenz 2 …"
        onSubmit={() => {}}
        ctaLabel="Generieren"
        model={model}
        setModel={setModel}
      />

      <div className="grid grid-cols-12 gap-4">
        {/* Left column: inputs */}
        <div className="col-span-5 space-y-4">
          <Card className="p-5">
            <SectionLabel hint={`${images.length} / 10`}>Referenzbilder</SectionLabel>
            <div className="grid grid-cols-5 gap-2">
              {images.map((src, i) => (
                <button key={i} onClick={() => insertRef(i + 1)} className="text-left">
                  <RefThumb src={src} label={`Referenz ${i + 1}`} onRemove={() => removeImage(i)} />
                </button>
              ))}
              {images.length < 10 && <UploadTile compact onFiles={addImages} />}
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground">
              Klicke eine Referenz an, um sie im Prompt einzufügen.
            </div>
          </Card>

          <Card className="p-5 space-y-4">
            <div>
              <SectionLabel>Referenzlogik</SectionLabel>
              <div className="flex flex-wrap gap-1.5">
                {["Stil-Referenz", "Charakter-Referenz", "Kompositions-Referenz"].map((t) => {
                  const on = refTypes.includes(t);
                  return (
                    <button
                      key={t}
                      onClick={() => toggleRefType(t)}
                      className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${
                        on
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white/60 dark:bg-white/5 border-border/70 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <SectionLabel>Start</SectionLabel>
              <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-muted/60 backdrop-blur">
                {[{ k: "free", l: "Freie Erstellung" }, { k: "template", l: "Mit Vorlage" }].map((o) => (
                  <button
                    key={o.k}
                    onClick={() => setStartMode(o.k as any)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${startMode === o.k ? "bg-blue-600 text-white shadow" : "text-muted-foreground"}`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
              {startMode === "template" && (
                <div className="mt-3 divide-y divide-border/60 border border-border/60 rounded-xl bg-white/50 dark:bg-white/5 overflow-hidden">
                  {["Produktfotografie", "Portrait Editorial", "Architektur-Render", "Marketing-Keyvisual"].map((x) => (
                    <button
                      key={x}
                      onClick={() => setTemplate(x)}
                      className={`w-full text-left px-3 py-2.5 text-sm transition-colors ${template === x ? "bg-blue-50/70 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300" : "hover:bg-muted/60"}`}
                    >
                      {x}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Card>

          <Card className="p-5 space-y-4">
            <SectionLabel>Einstellungen</SectionLabel>
            <Toggle checked={enhancer} onChange={setEnhancer} label="Prompt Enhancer" />
            <DimensionsPicker ratio={ratio} setRatio={setRatio} size={size} setSize={setSize} />
            <CountPicker value={numImages} onChange={setNumImages} />
            <Collapsible title="Erweitert" icon={SlidersHorizontal}>
              <Field label="Seed"><input className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-white/70 dark:bg-white/5" placeholder="zufällig" /></Field>
              <Field label="Negative Prompt"><input className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-white/70 dark:bg-white/5" placeholder="was vermieden werden soll" /></Field>
            </Collapsible>
          </Card>
        </div>

        {/* Right column: output */}
        <div className="col-span-7">
          <Card className="p-5">
            <SectionLabel>Ergebnisse</SectionLabel>
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted mb-3 border border-white/60 dark:border-white/10 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.25)]">
              <ImageWithFallback src={demoResults[selected]} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {demoResults.map((src, i) => (
                <button key={i} onClick={() => setSelected(i)} className={`aspect-square rounded-xl overflow-hidden border-2 transition ${i === selected ? "border-blue-600" : "border-transparent"}`}>
                  <ImageWithFallback src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Edit Mode ---------------- */

function EditMode({ mode, onMode, prompt, setPrompt, model, setModel }: { mode: Mode; onMode: (m: Mode) => void; prompt: string; setPrompt: (v: string) => void; model: string; setModel: (v: string) => void }) {
  const [subMode, setSubMode] = useState<EditSubMode>("text");
  const [main, setMain] = useState<string | null>("https://images.unsplash.com/photo-1520975916090-3105956dac38?w=1200");
  const [sources, setSources] = useState<string[]>([]);
  const maxSources = subMode === "text" ? 4 : 2;

  const addSources = (urls: string[]) => setSources((p) => [...p, ...urls].slice(0, maxSources));
  const removeSource = (i: number) => setSources((p) => p.filter((_, idx) => idx !== i));
  const insertRef = (n: number) => setPrompt(`${prompt}${prompt && !prompt.endsWith(" ") ? " " : ""}Referenz ${n} `);

  return (
    <div className="space-y-4">
      <PromptHeader
        mode={mode}
        onMode={onMode}
        prompt={prompt}
        setPrompt={setPrompt}
        placeholder={subMode === "mask" ? "Beschreibe die Änderung im markierten Bereich. Referenzen: Referenz 1, 2 …" : "Beschreibe die gewünschte Änderung. Referenzen: Referenz 1, 2 …"}
        onSubmit={() => {}}
        ctaLabel="Anwenden"
        model={model}
        setModel={setModel}
      />

      <div className="grid grid-cols-12 gap-4 items-stretch">
        <div className="col-span-7 flex">
          <Card className="p-5 flex-1 flex flex-col gap-4">
            <div>
              <SectionLabel>Bearbeitungsmodus</SectionLabel>
              <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-muted/60 backdrop-blur">
                {[{ k: "text", l: "Nur mit Text" }, { k: "mask", l: "Mit Bereichsauswahl" }].map((o) => (
                  <button
                    key={o.k}
                    onClick={() => { setSubMode(o.k as EditSubMode); setSources((s) => s.slice(0, o.k === "text" ? 4 : 2)); }}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${subMode === o.k ? "bg-blue-600 text-white shadow" : "text-muted-foreground"}`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-[1fr_108px] gap-3">
              <div>
                <SectionLabel>Hauptbild</SectionLabel>
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted border border-white/60 dark:border-white/10 relative shadow-[0_8px_30px_-10px_rgba(0,0,0,0.25)]">
                  {main ? (
                    <>
                      <ImageWithFallback src={main} alt="" className="w-full h-full object-cover" />
                      {subMode === "mask" && (
                        <div className="absolute inset-0 pointer-events-none bg-blue-600/15 mix-blend-multiply" />
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full p-4 flex items-center justify-center">
                      <UploadTile onFiles={(u) => setMain(u[0])} label="Hauptbild laden" multiple={false} />
                    </div>
                  )}
                </div>
                {subMode === "mask" && (
                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    {[
                      { i: Brush, l: "Markieren" }, { i: Eraser, l: "Löschen" },
                      { i: RotateCcw, l: "Invertieren" }, { i: Layers, l: "Weichzeichnen" },
                    ].map((t) => (
                      <button key={t.l} className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg border border-border/70 bg-white/60 dark:bg-white/5 hover:bg-muted backdrop-blur">
                        <t.i className="w-3.5 h-3.5" /> {t.l}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <SectionLabel hint={`${sources.length}/${maxSources}`}>Referenzen</SectionLabel>
                <div className="grid grid-cols-1 gap-2">
                  {sources.map((src, i) => (
                    <button key={i} onClick={() => insertRef(i + 1)}>
                      <RefThumb src={src} label={`Referenz ${i + 1}`} onRemove={() => removeSource(i)} />
                    </button>
                  ))}
                  {sources.length < maxSources && <UploadTile compact onFiles={addSources} />}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-span-5 flex">
          <Card className="p-5 flex-1 flex flex-col gap-3">
            <SectionLabel>Ergebnis</SectionLabel>
            <div className="flex-1 min-h-[385px] rounded-xl overflow-hidden bg-muted border border-white/60 dark:border-white/10 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.25)] relative">
              <ImageWithFallback src={demoResults[1]} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {demoResults.map((src, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-muted border border-border/60">
                  <ImageWithFallback src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-white/70 dark:bg-white/5 border border-border/60 text-muted-foreground">Vorher / Nachher</span>
              <span className="px-2.5 py-1 rounded-full bg-white/70 dark:bg-white/5 border border-border/60 text-muted-foreground">Letzte Version</span>
            </div>
            <button className="w-full py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">Übernehmen</button>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Upscale Mode ---------------- */

function UpscaleMode({ mode, onMode, prompt, setPrompt, model, setModel }: { mode: Mode; onMode: (m: Mode) => void; prompt: string; setPrompt: (v: string) => void; model: string; setModel: (v: string) => void }) {
  const [img, setImg] = useState<string | null>("https://images.unsplash.com/photo-1545987796-200677ee1e77?w=1600");
  const [level, setLevel] = useState("2×");
  const [strength, setStrength] = useState("Mittel");
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="space-y-4">
      <PromptHeader
        mode={mode}
        onMode={onMode}
        prompt={prompt}
        setPrompt={setPrompt}
        placeholder="Optionaler Fokus-Prompt, z. B. „Gesicht natürlich erhalten, Texturen verbessern.“"
        onSubmit={() => {}}
        ctaLabel="Upscalen"
        model={model}
        setModel={setModel}
      />

      <div className="grid grid-cols-12 gap-4 items-stretch">
        <div className="col-span-4 flex">
          <Card className="p-5 flex-1 flex flex-col gap-4">
            <div className="flex flex-col flex-1 min-h-0">
              <SectionLabel>Bild</SectionLabel>
              {img ? (
                <div className="relative group rounded-xl overflow-hidden bg-muted border border-white/60 dark:border-white/10 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.25)] flex-1 min-h-[385px]">
                  <ImageWithFallback src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <button onClick={() => setImg(null)} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex-1 min-h-[385px]"><UploadTile onFiles={(u) => setImg(u[0])} label="Bild wählen oder ablegen" multiple={false} /></div>
              )}
            </div>

            <Field label="Upscaling-Stufe"><Select value={level} onChange={setLevel} options={["2×", "4×", "8×"]} /></Field>
            <Field label="Stärke"><Select value={strength} onChange={setStrength} options={["Leicht", "Mittel", "Stark"]} /></Field>

            <Collapsible title="Erweiterte Optionen" icon={Settings2}>
              <Toggle checked onChange={() => {}} label="Rauschen reduzieren" />
              <Toggle checked={false} onChange={() => {}} label="Kanten schärfen" />
              <Toggle checked={false} onChange={() => {}} label="Gesicht erhalten" />
            </Collapsible>
          </Card>
        </div>

        <div className="col-span-8 flex">
          <Card className="p-5 flex-1 flex flex-col gap-3">
            <SectionLabel>Vorher / Nachher</SectionLabel>
            <div className="relative flex-1 min-h-[760px] rounded-xl overflow-hidden bg-muted border border-white/60 dark:border-white/10 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.25)] select-none">
              {img && (
                <>
                  <ImageWithFallback src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
                    <ImageWithFallback
                      src={img}
                      alt=""
                      className="absolute inset-0 h-full object-cover"
                      style={{ width: `${10000 / Math.max(sliderPos, 1)}%`, maxWidth: "none", filter: "brightness(1.08) contrast(1.2) saturate(1.05)" }}
                    />
                  </div>
                  <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow" style={{ left: `${sliderPos}%` }}>
                    <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-xs shadow">⇔</div>
                  </div>
                  <input type="range" min={0} max={100} value={sliderPos} onChange={(e) => setSliderPos(Number(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize" />
                  <div className="absolute top-2 left-2 px-2.5 py-1 text-xs rounded-full bg-black/60 text-white backdrop-blur">Vorher</div>
                  <div className="absolute top-2 right-2 px-2.5 py-1 text-xs rounded-full bg-blue-600 text-white">Nachher</div>
                </>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">Original → {level} Skalierung · {strength}</div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">
                <Download className="w-4 h-4" /> Export
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Root ---------------- */

export function Media() {
  const [mode, setMode] = useState<Mode>("create");
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("Flux Pro 1.1");

  return (
    <div
      className="h-full overflow-y-auto"
      style={{
        fontFamily: "'Poppins', system-ui, sans-serif",
        backgroundImage:
          "radial-gradient(circle at 15% 10%, rgba(59,130,246,0.12), transparent 55%), radial-gradient(circle at 85% 30%, rgba(139,92,246,0.10), transparent 55%), radial-gradient(circle at 50% 90%, rgba(14,165,233,0.10), transparent 55%)",
      }}
    >
      <div className="px-8 pt-6 pb-8 space-y-5">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="mb-1" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>Media</h1>
            <p className="text-sm text-muted-foreground">Bilder erstellen, bearbeiten und verbessern.</p>
          </div>
        </div>

        {mode === "create" && <CreateMode mode={mode} onMode={setMode} prompt={prompt} setPrompt={setPrompt} model={model} setModel={setModel} />}
        {mode === "edit" && <EditMode mode={mode} onMode={setMode} prompt={prompt} setPrompt={setPrompt} model={model} setModel={setModel} />}
        {mode === "upscale" && <UpscaleMode mode={mode} onMode={setMode} prompt={prompt} setPrompt={setPrompt} model={model} setModel={setModel} />}
      </div>
    </div>
  );
}
