# WeShop authentication modes

Select authentication from the execution harness before the first live WeShop request.

## Managed native WeShop tool

When the harness explicitly states that its native WeShop tool owns authentication, invoke that tool directly. The host may use OAuth, a short-lived access token, workload identity, or another managed credential without exposing it to the Agent.

- Do not inspect `WESHOP_API_KEY` or any access-token variable.
- An empty ordinary Shell environment is expected and does not mean the user is logged out.
- Do not ask the user to create, paste, or configure an API Key.
- Treat only the managed tool's explicit authentication error as evidence that login or authorization is required, and follow the host-provided recovery instruction.
- Never move a host-managed credential into Shell, a CLI argument, prompt, transcript, log, or artifact.

This mode applies only when the harness explicitly declares both the native tool and managed authentication. Merely finding a command named `weshop` is not sufficient.

## Standalone CLI or unmanaged harness

When no managed-auth declaration exists and the task will directly execute the official `weshop` CLI, check whether the trusted execution environment exposes a non-empty `WESHOP_API_KEY`.

If it is present, continue without displaying, logging, copying, or otherwise revealing its value.

If it is absent:

1. Stop before uploading materials or creating a run. This is a configuration prerequisite, not a creative-task failure.
2. Tell the user to obtain or manage a key at <https://open.weshop.ai/authorization/apikey>.
3. Ask them to store it in the secret or environment-variable settings of the harness that will execute WeShop, under the exact name `WESHOP_API_KEY`.
4. Ask them to restart or reload that harness if its environment is captured at startup, then retry the original request.

For a temporary macOS/Linux terminal session, the user can avoid shell-history exposure with:

```bash
read -s WESHOP_API_KEY && export WESHOP_API_KEY
```

Do not ask the user to paste the key into chat. Do not put it in a Skill, `.env` committed to Git, frontend bundle, URL, command argument, log, or generated artifact. Only the trusted standalone executor may send it to the configured official WeShop API.
