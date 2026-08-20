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

## Stable releases

User installations can opt into the background updater documented in the root README. It follows only stable `vX.Y.Z` releases and ignores untagged changes and prerelease-style tags.

To publish, open **Actions → Publish stable release → Run workflow**, enter the next semantic version such as `v0.3.0`, and run it from the intended commit on `main`. The workflow validates the package before it creates the tag and GitHub Release. Do not push the stable tag manually first: the updater treats the tag as installable release content.
