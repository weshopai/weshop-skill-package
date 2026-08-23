# WeShop capability substitution: vox-style-video-generator
| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Create editorial explainer plan/keyframes | External API and source plan | Topic, evidence, beat budget | Agent plan plus verified image route | Text, asset IDs, optional Canvas plan | Use generic editorial cutout grammar | No named-source style parity | Reviewed source steps 1–5 |
| Animate and assemble approved beats | External API and ffmpeg | Accepted keyframes and clips | `generate-video` plus `combine-videos` | Live video schema, clip IDs | Shallow 2D parallax and one living detail | Voice/music/subtitle unsupported | Reviewed source steps 6–8 |
## Deterministic operations retained locally
- Thesis, beat plan, evidence flags, and QC.
## Unsupported parity
- External APIs, ffmpeg assembly, named-source imitation, and auto audio/subtitles.
## Proposed Atom boundaries
- Candidate owns editorial cutout explainer direction; existing Atoms own media execution.
