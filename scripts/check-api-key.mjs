const key = process.env.WESHOP_API_KEY?.trim();

if (key) {
  console.log("WESHOP_API_KEY is configured for this process.");
  process.exit(0);
}

console.error(`WESHOP_API_KEY is not configured.

1. Get or manage a key at https://www.weshop.ai/apiKey
2. Add it to the secret/environment settings of the harness that executes WeShop.
3. Restart that harness, then run: npm run api-key:check

For a temporary macOS/Linux shell session:
  read -s WESHOP_API_KEY && export WESHOP_API_KEY

Do not paste the key into prompts, source files, frontend code, Git, or command arguments.`);
process.exitCode = 1;
