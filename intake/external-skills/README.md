# External Skill intake archive

This directory keeps source evidence and current external-Skill intake records. It is not part of the installable Skill registry, Router, website catalog, README inventory, or installer.

## Mechanism boundary

Records with `Mechanism version: 2` use the current policy. They are autonomous working records with a `Status: active` or `Status: inactive` lifecycle; they have no human-approval or `Pending review` stage.

Records without that marker are **legacy archive evidence**. They may contain retired language such as `merge`, `absorb`, `promotion`, or provider-era review gates. Agents must not learn, copy, or infer current intake policy from them. Use `docs/maintainers/importing-external-projects.md` and the version-2 initializer as the only current templates.

## Current-record completion

Before an active record is used to author or change an Atom, run:

```bash
npm run skills:intake -- validate <slug>
```

The check requires a complete capability substitution map, explicit adjacent-Skill boundaries, and six fuzzy semantic routing cases: at least three that select the candidate and three that select named installed neighbors. It is a completeness and routing-boundary check, not a human approval gate.
