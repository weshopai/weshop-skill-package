# WeShop API key setup

Before the first live WeShop API request in a task, check whether the execution harness exposes a non-empty `WESHOP_API_KEY`.

If it is present, continue without displaying, logging, copying, or otherwise revealing its value.

If it is absent:

1. Stop before uploading materials or creating a run. This is a configuration prerequisite, not a creative-task failure.
2. Tell the user to obtain or manage a key at <https://www.weshop.ai/apiKey>.
3. Ask them to store it in the secret or environment-variable settings of the harness that will execute WeShop, under the exact name `WESHOP_API_KEY`.
4. Ask them to restart or reload that harness if its environment is captured at startup, then retry the original request.

For a temporary macOS/Linux terminal session, the user can avoid shell-history exposure with:

```bash
read -s WESHOP_API_KEY && export WESHOP_API_KEY
```

Do not ask the user to paste the key into chat. Do not put it in a Skill, `.env` committed to Git, frontend bundle, URL, command argument, log, or generated artifact. Only a trusted server-side executor may send it to `https://openapi.weshop.ai`.
