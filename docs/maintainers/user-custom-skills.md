# User custom Skills

User custom Skills are local, user-owned extensions. They do not enter this repository's official `skills/` directory merely because they were created with package guidance.

## Lifecycle

1. `create-custom-skill` creates an isolated draft under `~/.weshop-skill-package/custom-skills/<slug>/` or another user-selected draft root. An uploaded file or folder enters this isolated area before it can become discoverable.
2. The draft's `intake.md` records origin, ownership when known, intent, related Skill boundaries, execution behavior, safety, local check state, and proposed install target. User-authored work has no external-source or license gate. Imported work records local provenance and a content fingerprint and is statically inspected as untrusted content without executing bundled code.
3. `create-custom-skill` inventories the draft, runs its bundled mechanical checker, performs semantic discovery/workflow/security self-checks, and repairs supported local-authoring issues.
4. An explicit request to create, save, import, or upload a Skill for local use authorizes installation after the intake and local check pass. Copy the runtime files into the active Agent's user Skill directory without asking for a redundant confirmation, and exclude `intake.md` from the installed runtime directory.
5. Stop for explicit permission only before overwriting an existing unmanaged Skill. Bundled code execution, unapproved remote access, paid generation, user-asset upload, and external publication retain their own authorization boundaries.
6. A custom Skill remains unmanaged by the package updater. Refuse to overwrite an existing unmanaged directory.

The package checkout offers deterministic helpers:

```bash
weshop-skills custom init <slug>
weshop-skills custom check ~/.weshop-skill-package/custom-skills/<slug>
```

The initializer intentionally creates an incomplete draft. A check failure on its `TODO` placeholders is the expected state until authoring finishes.

## Boundaries

- A file or folder uploaded into Canvas remains a local custom-Skill intake even when it came from a third party. Use [Importing an external Skill or project](importing-external-projects.md) only when maintainers are considering that behavior for the official Package; that workflow records repository provenance and WeShop provider substitution before an official Atom is authored.
- Use [Adding or changing an Atom](adding-skills.md) only when the user explicitly asks to publish or contribute the local Skill to the official package and maintainers decide to consider it. A plain upload/import into Canvas remains local. Official contribution starts independent intake and review; re-author and validate it as an official Atom rather than copying a user directory mechanically.
- Similarity never requires fusion. Every custom Skill names materially related installed Skills, records relationship scores, and states when each side wins.
- A static review does not authorize paid execution or prove a new WeShop route. New execution routes require current schema evidence and a separately authorized representative run before claiming readiness.
