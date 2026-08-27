# Official WeShop CLI execution

This package contains routing and creative-production instructions, not an OpenAPI client. For local command execution, use only the official `weshop` executable published by WeShop as the `weshop-cli` npm package.

## Availability gate

Before the first local execution call, run:

```bash
weshop --version
```

If that command is unavailable, stop before upload or generation and tell the user to install the official CLI:

```bash
npm install -g weshop-cli
weshop --version
weshop --help
```

Do not substitute `npx`, a package-owned client, direct `curl`, or another backend automatically. Installation changes the user's global environment and requires their authorization unless it is already included in the current request.

## Command discovery

The official CLI uses one command per Agent rather than a generic `run` command. Inspect the current command contract before executing:

```bash
weshop --help
weshop gpt-image --help
weshop info gpt-image
weshop status <execution-id>
```

Then use the native flags shown by that installed version. For example:

```bash
weshop gpt-image --prompt "A clean product photograph"
```

Use `gpt-image` as the Agent/command ID for the model labeled GPT Image 2. Do not use `gpt-image-2`. The CLI has no `list-agents` command; use `weshop --help` for its command surface and `weshop info <agent>` for one Agent.

If the harness exposes a `weshop_cli` wrapper, always include its required mode. Use `inspect` only for non-mutating `--version`, help, info, and status calls; use `execute` for upload or generation. Wrapper modes are not official CLI arguments.

## Authentication and submission safety

When the CLI is executed directly in a standalone or unmanaged harness, it requires a valid `WESHOP_API_KEY` in the trusted environment. A missing key is a local configuration prerequisite. An invalid key must be replaced or re-authorized; it is not a reason to change clients.

When an explicitly managed native WeShop tool wraps the CLI, call that tool instead of invoking or probing the CLI through Shell. The host owns authentication and may bridge an OAuth access token into the CLI process without exposing it to the Agent. In that mode, an empty Shell `WESHOP_API_KEY` is expected and must not trigger standalone setup guidance.

Before each paid create call, follow the harness's durable-operation contract. A managed native tool owns its operation identity and ledger; call it directly without creating a ledger file or inventing an operation-key argument. An unmanaged harness may retain a stable operation key and normalized request when it explicitly exposes that capability. Once an `executionId` exists, poll only that run. A create timeout, malformed response, or apparent success without an ID is outcome-unknown: do not submit again through the CLI or another client. A known terminal failure may be retried only under the Router and selected Atom's recovery rules.
