# WeShop tool-call assembly

Apply this reference whenever the harness exposes a `weshop_cli` wrapper. Read it before the first wrapper call in a route. If a wrapper call fails schema or argument validation, read it again, correct the existing call, and do not treat that local validation failure as a WeShop execution failure.

## Wrapper envelope

Every `weshop_cli` call must explicitly include the wrapper's required top-level `mode` field:

- `mode: "inspect"` for non-mutating version, help, info, and status calls;
- `mode: "execute"` for upload, generation, or another mutating/paid command.

`mode` belongs to the wrapper envelope. It is not a CLI argument and must never appear inside `args`. Runtime inference, when available, is only a crash-prevention fallback; Package callers must still provide `mode` explicitly.

The `args` array contains only the tokens that follow the `weshop` executable. Do not include `weshop` itself. For example:

```json
{
  "mode": "inspect",
  "args": ["gpt-image", "--help"],
  "assetVersionIds": []
}
```

## Token and asset binding

Keep every command, flag, flag value, and asset placeholder as its own `args` element. Do not combine a flag and value into one string, and do not embed shell quoting or a whole command line.

```json
{
  "mode": "execute",
  "args": ["gpt-image", "--prompt", "Place the product on a white background", "--image", "{{asset:0}}"],
  "assetVersionIds": ["asset-version-id-for-product"]
}
```

Each `{{asset:N}}` placeholder must map to exactly one entry at zero-based index `N` in `assetVersionIds`. Indices must be contiguous, in range, and refer to the intended asset role. Do not add unused asset IDs or reuse an index for a different asset.

## Validation recovery

Common local validation failures and corrections:

- missing or invalid `mode`: add the explicit top-level `inspect` or `execute` value; do not add it to `args`;
- `args` starts with `weshop`: remove that element;
- combined flag/value or command string: split it into independent array elements;
- placeholder missing, malformed, or out of range: use an exact `{{asset:N}}` token and align it with `assetVersionIds[N]`;
- asset count or order mismatch: rebuild both arrays from the declared asset roles before retrying validation.

A schema or wrapper validation error happens before a WeShop request and does not create a paid run. Correct the same intended call. Once any response contains a non-empty `executionId`, submission has been accepted: never submit the create call again. Poll, recover, download, or publish that existing execution according to the Router's submission-safety rules.

Use CLI `--help` only to discover the selected command's argv and flags. It does not define the wrapper envelope, select a model, or override Package routing policy.
