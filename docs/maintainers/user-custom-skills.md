# User custom Skills

User custom Skills are local, user-owned extensions. They do not enter this repository's official `skills/` directory merely because they were created with package guidance.

## Lifecycle

1. `create-custom-skill` creates an isolated draft under `~/.weshop-skill-package/custom-skills/<slug>/` or another user-selected draft root.
2. The draft's `intake.md` records user ownership, intent, related Skill boundaries, execution behavior, safety, review state, and proposed install target. It does not contain an external-source or license gate.
3. `review-custom-skill` inventories and reads every file, runs the bundled mechanical validator, performs semantic discovery/workflow/security review, and returns `Pass`, `Revise`, or `Reject` without changing files.
4. Only a `Pass` plus explicit user confirmation permits copying the runtime files into the active Agent's user Skill directory. Exclude `intake.md` from the installed runtime directory.
5. A custom Skill remains unmanaged by the package updater. Refuse to overwrite an existing unmanaged directory.

The package checkout offers deterministic helpers:

```bash
npm run skills:custom:init -- <slug>
npm run skills:custom:review -- ~/.weshop-skill-package/custom-skills/<slug>
```

The initializer intentionally creates an incomplete draft. A review failure on its `TODO` placeholders is the expected state until authoring finishes.

## Boundaries

- Use [Importing an external Skill or project](importing-external-projects.md) when the behavior comes from a third-party source. External intake records provenance and provider substitution before a native custom draft is reviewed.
- Use [Adding or changing an Atom](adding-skills.md) only when maintainers separately decide to promote a reviewed capability into the official package. Re-author and validate it as an official Atom; do not copy a user directory mechanically.
- Similarity never requires fusion. Every custom Skill names materially related installed Skills, records relationship scores, and states when each side wins.
- A static review does not authorize paid execution or prove a new WeShop route. New execution routes require current schema evidence and a separately authorized representative run before claiming readiness.
