# Maintainer workflows

These documents are the source of truth for changing the Skill package. The root README remains user-facing.

- [Adding or changing an Atom](adding-skills.md)
- [Importing an external Skill or project](importing-external-projects.md)

## Quality gates

Run after every promoted Atom or shared workflow change:

```bash
npm run check
npm test
npm run models:validate
npm run models:routing-validate
npm run docs:validate
npm run maintainers:validate
npm run web:build
git diff --check
```

Validate every changed Skill independently:

```bash
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/<slug>
```

An execution route is not `Ready` merely because its schema parses. Verify new WeShop routes with one representative, low-cardinality run, poll the accepted `executionId` to terminal state, inspect the declared invariants, and record the evidence in `handoff.md`. Never make a paid run without task authorization.
