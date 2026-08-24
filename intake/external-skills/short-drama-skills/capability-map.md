# WeShop capability substitution: short-drama-skills

Complete one row per external AI operation. Do not combine behaviors that require different preservation or media contracts.

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| General narrative breakdown into timed continuous shots | LLM prompt rules only | Script, fixed dialogue/characters, scene facts, target pacing | `short-drama-narrative-breakdown` | Timed ordered text fields; fixed-fact and dialogue locks | Independently authored contract for observable shots and sound | No native execution, asset analysis, or full production coverage | Source `01-通用叙事拆解`; static review at `6d632fd` |
| Emotional dialogue shot breakdown | LLM prompt rules only | Dialogue scene, roles, power/emotional shifts, fixed dialogue | `short-drama-emotion-breakdown` | Camera/shot/pacing directions in text | Concrete performance and reaction cues without source prompt copying | Does not replace blocking, axis, or coverage review | Source `02-深度情绪刻画`; static review at `6d632fd` |
| Action-scene breakdown | LLM prompt rules only | Action facts, spatial state, violence/content limits, duration | `short-drama-action-breakdown` | Atomic shot text and duration estimate | Preserve causal action and physical end states | No stunt safety validation or media generation | Source `03-详细动态描述`; static review at `6d632fd` |
| Clip grouping for episode continuity | LLM prompt rules only | Ordered clips, time/place, narrative focus, adjacent states | `short-drama-continuity-split` | Ordered continuity grouping fields | Preserve each source unit and expose grouping rationale | Does not replace full production continuity validation | Source `04-按剧情连贯拆分副本`; static review at `6d632fd` |
| General video-prompt polish | LLM prompt rules only | Approved scene, fixed dialogue/assets | `short-drama-video-prompt-polish` | Per-shot prompt text fields | Independently author neutral observable prompt language | Does not prove provider adherence | Source `05-单视频提示词润色`; static review at `6d632fd` |
| High-impact drama-prompt polish | LLM prompt rules only | Approved high-intensity scene, dialogue/assets | `short-drama-high-impact-prompt` | Per-shot high-impact prompt text | Preserve facts and prohibit invented spectacle | Does not generate media | Source `06-高能戏剧化情节润色`; static review at `6d632fd` |
| Slow-cinematic prompt polish | LLM prompt rules only | Approved quiet/emotional scene, dialogue/assets | `short-drama-slow-cinematic-prompt` | Per-shot restrained prompt text | Preserve facts and prohibit invented imagery | Does not generate media | Source `07-慢节奏细腻质感润色`; static review at `6d632fd` |

## Deterministic operations retained locally

- Duration arithmetic, source-field normalization, required-field presence, dialogue equality checks, and continuity handoff checks. These remain text-only checks and must not claim generated-video quality.

## Unsupported parity

- No direct LuxReal integration, provider/model selection, asset upload, character-consistency guarantee, subtitle-removal guarantee, media generation, polling, or publication parity.

## Proposed Atom boundaries

- Each promoted Atom owns only its named text outcome. `plan-film-storyboard` owns full shootable planning and `generate-video` owns paid video execution.
