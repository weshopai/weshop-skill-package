# WeShop CLI backend selection

Use this order for local execution:

1. A native WeShop tool exposed by the harness.
2. The official `weshop` CLI when `weshop --version` succeeds.
3. The package's built-in `weshop-skill` CLI only when the official executable is absent.

Run `weshop-skill doctor` for a secret-safe local diagnosis. It reports which CLI is available and whether `WESHOP_API_KEY` is configured, but never prints the key. Do not fall back after an authentication, parameter, transport, or ambiguous submission failure. Switching clients can create a duplicate run and duplicate cost.

## Official CLI

The official CLI uses one Agent command, not a generic `run` command. Inspect the exact command before executing it:

```bash
weshop --version
weshop --help
weshop gpt-image --help
weshop gpt-image --prompt "A clean product photograph"
weshop info gpt-image
weshop status <execution-id>
```

Use `gpt-image` as the Agent/command ID for the model labeled GPT Image 2. Do not use `gpt-image-2`. The official CLI does not provide `list-agents`; use `weshop --help` for its command surface and `weshop info <agent>` for one Agent.

If the harness exposes a `weshop_cli` wrapper, always include its required mode. Use `inspect` only for non-mutating `--version`, `help`, `info`, and `status` calls; use `execute` for upload or generation. Wrapper modes are not official CLI arguments.

## Built-in fallback

The fallback talks directly to `https://openapi.weshop.ai` and uses different syntax:

```bash
weshop-skill doctor
weshop-skill catalog
weshop-skill upload ./product.png
weshop-skill info gpt-image
weshop-skill status <execution-id> --wait
weshop-skill operation <operation-key>
weshop-skill run gpt-image \
  --operation-key <stable-key> \
  --params '{"textDescription":"A clean product photograph","quality":"medium","imageSize":"2K","batchCount":1}'
```

`catalog` is the package's routing model catalog, not a live server-side list of Agents enabled for the account. `info` is authoritative for one Agent. The fallback accepts `gpt-image-2` as a compatibility alias and normalizes it to `gpt-image`. It also moves a legacy string `input.text` to `params.textDescription`, but new calls should use the native field directly.

Use `file:` values for local images. The fallback uploads them and substitutes the returned URL recursively in `input` and `params`. Large objects may be passed as `--input @input.json` or `--params @params.json`; never store secrets in them.

## Authentication and submission safety

Both local CLIs require a valid `WESHOP_API_KEY` in the trusted environment. A missing key is a local configuration prerequisite. An invalid key must be replaced or re-authorized; changing CLI backend cannot repair it.

The fallback persists a ledger at `~/.weshop-skill-package/operations.json`. Every create requires a stable `operationKey`. Once an `executionId` exists, poll only that run. A timeout, malformed response, or apparent success without an ID is outcome-unknown: do not submit through the other CLI. Use a new key plus `--parent-operation-key` only for a materially revised retry after a recorded terminal failure.
