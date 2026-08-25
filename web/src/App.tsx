import { useMemo, useState } from "react";
import { ArrowRight, Check, ChevronDown, Copy, Paperclip, Search, Sparkles, Terminal, WandSparkles, X, Zap } from "lucide-react";
import skillCatalog from "./generated/skill-catalog.json";

type SimilarSkill = { id: string; displayName: string; difference: string };
type Skill = Omit<(typeof skillCatalog.skills)[number], "similarSkills"> & { similarSkills?: SimilarSkill[] };
const skills: Skill[] = [...skillCatalog.skills].sort((a, b) => Number(b.featured) - Number(a.featured) || a.displayName.localeCompare(b.displayName));
const filters = ["All skills", "Featured", ...new Set(skills.map((skill) => skill.category))];
const outputField = (skill: Skill, key: string) => (skill.output as unknown as Record<string, string>)[key];

export default function App() {
  const [filter, setFilter] = useState("All skills");
  const [query, setQuery] = useState("");
  const [prompt, setPrompt] = useState("");
  const [active, setActive] = useState<Skill | null>(null);
  const [installMode, setInstallMode] = useState<"prompt" | "command">("prompt");
  const [copied, setCopied] = useState(false);
  const visible = useMemo(() => skills.filter((skill) => (filter === "All skills" || (filter === "Featured" ? skill.featured : skill.category === filter)) && `${skill.displayName} ${skill.description} ${skill.categoryTags.join(" ")}`.toLowerCase().includes(query.toLowerCase())), [filter, query]);
  const activeSimilarSkills = active?.similarSkills ?? [];
  const installText = active ? installMode === "prompt"
    ? `Review and install the ${active.displayName} skill from https://github.com/Jason12196/weshop-skill-package/tree/main/skills/${active.id}, then tell me when it is ready to use.`
    : `npx skills add Jason12196/weshop-skill-package --skill ${active.id}` : "";
  const copyInstall = async () => { await navigator.clipboard.writeText(installText); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };

  return <div className="app-shell"><main>
    <section className="hero">
      <div className="hero-kicker"><Sparkles size={15} /> WeShop creative router</div>
      <h1>What are you making<br />today?</h1>
      <p className="hero-sub">Describe the outcome. The harness selects and composes the right installed Skills.</p>
      <div className="router-box"><textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Create a consistent character sheet, turn product photos into a campaign, or direct a cinematic shot…" /><div className="router-controls"><div className="router-left"><button className="attach"><Paperclip size={18} /> Add materials</button><button className="mode">Auto route <ChevronDown size={15} /></button></div><button className="route-btn" disabled={!prompt.trim()}>Route task <ArrowRight size={18} /></button></div></div>
    </section>
    <section className="skills-section">
      <div className="skills-head"><div><p className="eyebrow">Skills for WeShop</p><h2>Installable creative workflows.</h2></div><div className="search"><Search size={18} /><input aria-label="搜索技能" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search skills" /></div></div>
      <div className="filter-row">{filters.map((item) => <button key={item} className={filter === item ? "selected" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div>
      <section className="skill-group atom-group"><div className="skill-group-heading"><div><p className="skill-group-kicker">Skill catalog</p><h3>Installable creative building blocks</h3></div><span>{visible.length} installable tools</span></div><div className="skill-grid">{visible.map((skill, index) => <article className="skill-card" key={skill.id} onClick={() => setActive(skill)}><div className={`skill-visual ${skill.tone} has-cover`}><img className="cover-image" src={skill.coverImage} alt="" /><span className="cover-number">{String(index + 1).padStart(2, "0")}</span><span className="cover-category">{skill.categoryTags.join(" · ")}</span>{skill.featured && <span className="featured-tag"><Sparkles size={11} /> Featured</span>}<div className="visual-orbit"><i /><i /><i /></div><div className="cover-info"><span className="cover-status ready">Ready to install</span><h3>{skill.displayName}</h3><div><span>{skill.routeLabel}</span><ArrowRight size={18} /></div></div></div></article>)}</div></section>
    </section>
  </main>
  {active && <div className="drawer-backdrop" onClick={() => setActive(null)}><aside className="drawer" onClick={(event) => event.stopPropagation()}>
    <button className="drawer-close" onClick={() => setActive(null)}><X /></button><p className="eyebrow">{active.categoryTags.join(" · ")} workflow</p><h2>{active.displayName} {active.featured && <span className="drawer-featured"><Sparkles size={15} /> Featured</span>}</h2><p className="drawer-desc">{active.description}</p>
    <div className="route-line"><Zap size={16} /><div><span>Routes through</span><strong>{active.routeLabel}</strong></div></div>
    <section className="install-options"><div className="install-title"><div><p>Install options</p><span>The website is a catalog; only the selected Skill is installed.</span></div><WandSparkles size={22} /></div><div className="install-tabs"><button className={installMode === "prompt" ? "active" : ""} onClick={() => setInstallMode("prompt")}>Prompt</button><button className={installMode === "command" ? "active" : ""} onClick={() => setInstallMode("command")}><Terminal size={15} /> Command</button></div><div className="install-box"><span>{installMode === "prompt" ? "Copy this sentence to your AI assistant" : "Run in your terminal"}</span><code>{installText}</code><button className={copied ? "copy-install copied" : "copy-install"} onClick={copyInstall}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? "Copied" : "Copy"}</button></div></section>
    <section className="output-contract"><div className="section-heading"><h3>Output</h3><span>Defined by SKILL.md</span></div><div className="output-grid"><div><span>Media</span><strong>{outputField(active, "Media type")}</strong></div><div><span>Quantity</span><strong>{outputField(active, "Default quantity")}</strong></div><div className="wide"><span>Composition</span><strong>{outputField(active, "Content per image") ?? outputField(active, "Content per video")}</strong></div></div></section>
    <details className="workflow-details" open><summary>What this skill does</summary><div className="skill-source-content">{active.whatThisSkillDoes.map((item) => <p key={item}>{item}</p>)}</div></details>
    <section className="prompt-examples"><h3>How to use</h3><p>{active.howToUse.summary}</p><div className="example-list">{active.howToUse.promptExamples.map((example) => <details key={example.title}><summary>{example.title}</summary><div className="prompt-code"><code>{example.prompt}</code></div></details>)}</div></section>
    {activeSimilarSkills.length > 0 && <section className="prompt-examples"><h3>Similar skills</h3><div className="skill-source-content">{activeSimilarSkills.map((skill) => <p key={skill.id}><strong>{skill.displayName}</strong> — {skill.difference}</p>)}</div></section>}
  </aside></div>}</div>;
}
