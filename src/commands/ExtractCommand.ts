import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, normalize } from "node:path";

import { fatal } from "@triforce-heroes/triforce-core/Console";

import { extract } from "../Extract.js";

export function ExtractCommand(input: string, output?: string) {
  if (!existsSync(input)) {
    fatal(`File not found: ${input}`);
  }

  const inputDirname = dirname(input);
  const inputBasename = basename(input, ".sarc");

  const outputNormalized = normalize(
    output ?? `${inputDirname}/${inputBasename}`,
  );

  process.stdout.write(
    `Extracting ${normalize(input)} to ${outputNormalized}... `,
  );

  const entries = extract(readFileSync(input));

  for (const entry of entries) {
    const entryPath = `${outputNormalized}/${entry.name}`;

    mkdirSync(dirname(entryPath), { recursive: true });
    writeFileSync(entryPath, entry.data);
  }

  process.stdout.write("OK\n");
}
