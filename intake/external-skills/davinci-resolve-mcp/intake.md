# External Skill intake: davinci-resolve-mcp

## Provenance

- Source: https://github.com/lordhoell/davinci-resolve-mcp.git
- Source revision: b134a4d5bb9110a23af7669d5bbe183b9f626aa5
- Author or organization: DaVinci Resolve MCP Contributors
- License: MIT
- Reuse mode: adapted
- Reviewed date: 2026-08-20
- Files inspected: License, README, Skill/references/scripts, Python package, MCP server, and Resolve/Fusion tool inventory

## Permission decision

- License evidence: Repository-root MIT license verified
- Required notices: Required if server code is packaged
- Material allowed to reuse: Tool-boundary concepts
- Material that must be independently authored: Any integration and outcome Skills
- Decision: No reuse; MCP application is outside the installable Atom package

## Product decomposition

- User-visible outcomes: Direct DaVinci Resolve/Fusion project control
- Required inputs: Running Resolve environment, project, timeline, and requested operation
- Optional inputs: Media, render, color, and Fusion parameters
- External AI operations: None
- Deterministic operations: MCP calls mutating Resolve projects
- State, chaining, polling, and publication: Application state; renders require inspection
- Preservation and quality claims: Project targeting, reversible edits, and export verification

## Package decision

- Existing Atom updates: None
- New Atom candidates: None
- Router compositions: Existing outcome Atoms are editor-agnostic
- Rejected or unsupported behavior: Bundled MCP server, Resolve/Fusion API surface, dependency install, and application mutation
- Promotion decision and rationale: Intake complete; meaningful parity belongs in a separately maintained connector

## Security review

- Secret and environment access: Local application access only; not retained
- Remote domains and uploads: None
- Installation and executable code: Upstream server/scripts not executed or copied
- Retry and provider-spend behavior: No paid generation
- Unsafe or removed behavior: Unscoped project mutation and automatic dependency installation

## Validation evidence

- Official WeShop schema checked: Application/Atom boundary reviewed
- Representative execution: Not authorized or not run
- Acceptance result: Static integration validation pending
- Attribution packaged: Not required
