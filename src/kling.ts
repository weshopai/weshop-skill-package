export interface KlingPromptCompilation {
  directorPrompt: string;
  textDescription: string;
  simplified: boolean;
  omittedClauses: string[];
}

const cameraPattern = /camera|dolly|track|push[- ]?in|pull[- ]?out|pan|tilt|zoom|镜头|运镜|横移|推进|拉远|摇摄|环绕/i;
const environmentPattern = /rain|snow|wind|smoke|fog|light|shadow|platform|street|room|雨|雪|风|烟|雾|灯光|阴影|站台|街道|房间/i;
const preservePattern = /identity|clothing|wardrobe|composition|character consistency|scene unchanged|身份|服装|构图|角色一致|人物一致|场景不变/i;

function clauses(prompt: string): string[] {
  return prompt
    .split(/[\n。！？；;,，]+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

/** Compile a director-facing brief into one Kling-safe atomic shot prompt. */
export function compileKlingPrompt(prompt: string): KlingPromptCompilation {
  const source = prompt.trim().replace(/\s+/g, " ");
  const parts = clauses(source);
  if (source.length <= 220 && parts.length <= 4) {
    return { directorPrompt: source, textDescription: source, simplified: false, omittedClauses: [] };
  }

  const selected = new Set<string>();
  const take = (pattern: RegExp) => {
    const match = parts.find((part) => pattern.test(part));
    if (match) selected.add(match);
  };

  const primaryAction = parts.find((part) => !cameraPattern.test(part) && !environmentPattern.test(part) && !preservePattern.test(part));
  if (primaryAction) selected.add(primaryAction);
  take(cameraPattern);
  take(environmentPattern);
  take(preservePattern);
  if (selected.size === 0 && parts[0]) selected.add(parts[0]);

  const kept = parts.filter((part) => selected.has(part)).slice(0, 4);
  return {
    directorPrompt: source,
    textDescription: kept.join(". ") + ".",
    simplified: true,
    omittedClauses: parts.filter((part) => !kept.includes(part))
  };
}
