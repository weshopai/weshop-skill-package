#!/usr/bin/env node
import { runCli } from "./cli.js";

runCli().catch((error) => {
  process.stderr.write(`${JSON.stringify({ error: { message: (error as Error).message } }, null, 2)}\n`);
  process.exitCode = 1;
});
