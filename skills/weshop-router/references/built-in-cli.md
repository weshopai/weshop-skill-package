# Built-in WeShop CLI

Use the package command `weshop-skill` when the harness can execute local commands but does not expose a native WeShop OpenAPI tool. It calls `https://openapi.weshop.ai` directly and does not require the separate `weshop-cli` npm package.

Before use, ensure the trusted execution environment provides `WESHOP_API_KEY`. Never put the key in command arguments, JSON files, logs, or generated artifacts.

## Commands

```bash
weshop-skill upload ./product.png
weshop-skill info aiproduct
weshop-skill status <execution-id>
weshop-skill status <execution-id> --wait
weshop-skill operation <operation-key>
```

Submit any Standard or Premium Agent with its native OpenAPI fields:

```bash
weshop-skill run gpt-image \
  --operation-key <stable-key> \
  --params '{"textDescription":"A clean product photograph","quality":"medium","imageSize":"2K","batchCount":1}'
```

Use `file:` values for local images. The CLI uploads them and substitutes the returned URL recursively in `input` and `params`:

```bash
weshop-skill run aiproduct \
  --operation-key <stable-key> \
  --input '{"originalImage":"file:./product.png"}' \
  --params '{"textDescription":"Place the unchanged product in a warm studio scene","batchCount":1}'
```

Large request objects may be stored in local JSON files and passed as `--input @input.json` or `--params @params.json`. Do not store secrets in those files.

The command waits for a terminal result by default. Use `--no-wait` only when the caller will retain the returned `executionId` and later use `status`. A polling timeout never permits another create call.

## Submission safety

The CLI persists a ledger at `~/.weshop-skill-package/operations.json` before every create-run request. The caller must provide the Router's stable `operationKey`; the CLI refuses a create request without one. Use `weshop-skill operation <operation-key>` to inspect its durable state.

- `accepted`: a non-empty `executionId` was received; poll that run only.
- `outcome-unknown`: the create response was missing or ambiguous; do not submit again.
- `rejected`: the API returned a structured rejection; revise only after inspecting it.

Use a new key plus `--parent-operation-key` only for a permitted, materially revised retry after a known terminal failure. The CLI verifies that the parent is recorded as terminal `Failed` before submitting. The CLI does not grant Standard or Premium account access; the API key's server-side permissions remain authoritative.
