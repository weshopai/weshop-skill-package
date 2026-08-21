# Maintainer workflows

These documents are the source of truth for changing the Skill package. The root README remains user-facing.

- [Adding or changing an Atom](adding-skills.md)
- [Importing an external Skill or project](importing-external-projects.md)
- [User custom Skills](user-custom-skills.md)

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

Before publishing, update `package.json` and `package-lock.json` to the next semantic version. Open **Actions → Publish stable release → Run workflow**, enter the identical `vX.Y.Z` tag, and run it from the intended commit on `main`. The workflow rejects a tag/package mismatch, validates the runtime tarball, publishes the same version to npm, then creates the GitHub tag and Release. Do not push the stable tag or publish npm manually during ordinary releases; a retry may continue only when that exact npm version already exists.
