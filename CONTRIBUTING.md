# Maintainer Guide

This repository separates end-user installation documentation from maintainer workflows.

## Choose the workflow

- Create a genuinely new Atom from a first-party requirement: read [Adding or changing an Atom](docs/maintainers/adding-skills.md).
- Study an external Skill or project and replace its original AI providers with WeShop: read [Importing an external project](docs/maintainers/importing-external-projects.md).
- Support a user-owned custom Skill without promoting it into the package: read [User custom Skills](docs/maintainers/user-custom-skills.md).
- Change shared routing, execution safety, model policy, installation, or the website generator: read both the relevant source and [Maintainer validation](docs/maintainers/README.md).

External material never enters `skills/` directly. Start with an isolated intake record:

```bash
npm run skills:intake -- external-project-name \
  --source https://github.com/example/project \
  --source-ref <commit-tag-version-or-content-hash>
```

The command records source provenance and creates WeShop capability-substitution and similar-Skill boundary worksheets under `intake/external-skills/`. License is not an intake gate. Similar Skills remain independent and must be distinguished in their descriptions so the Router can score them at invocation time. The command does not clone, download, execute, or install the source project.

Commit and push remain separate approval actions. Do neither without fresh authorization.
