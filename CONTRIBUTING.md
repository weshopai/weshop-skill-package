# Maintainer Guide

This repository separates end-user installation documentation from maintainer workflows.

## Choose the workflow

- Create a genuinely new Atom from a first-party requirement: read [Adding or changing an Atom](docs/maintainers/adding-skills.md).
- Study an external Skill or project and replace its original AI providers with WeShop: read [Importing an external project](docs/maintainers/importing-external-projects.md).
- Change shared routing, execution safety, model policy, installation, or the website generator: read both the relevant source and [Maintainer validation](docs/maintainers/README.md).

External material never enters `skills/` directly. Start with an isolated intake record:

```bash
npm run skills:intake -- external-project-name \
  --source https://github.com/example/project \
  --source-ref <commit-or-tag> \
  --license MIT \
  --mode adapted
```

The command records provenance and creates a WeShop capability-substitution worksheet under `intake/external-skills/`. It does not clone, download, execute, or install the source project.

Commit and push remain separate approval actions. Do neither without fresh authorization.
