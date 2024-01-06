import { existsSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

import { fatal, normalize } from "@triforce-heroes/triforce-core";

import { extract } from "../Extract.js";
import { FileSystem } from "../FileSystem.js";

interface RebuildOptions {
  base?: string;
}

function writeFiles(
  basePath: string,
  currentPath: string,
  fileSystem: FileSystem,
) {
  const files = readdirSync(currentPath, { withFileTypes: true });

  for (const file of files) {
    const fileAbsolute = normalize(join(currentPath, file.name));

    if (file.isDirectory()) {
      writeFiles(basePath, fileAbsolute, fileSystem);

      continue;
    }

    fileSystem.set(
      normalize(relative(basePath, fileAbsolute)),
      readFileSync(fileAbsolute),
    );
  }
}

export function RebuildCommand(
  input: string,
  output?: string,
  options?: RebuildOptions,
) {
  if (!existsSync(input)) {
    fatal(`Directory not found: ${input}`);
  }

  const outputFile = normalize(output ?? `${input}.sarc`);

  process.stdout.write(`Rebuild ${normalize(input)} to ${outputFile}... `);

  const fileSystem = new FileSystem();

  if (options?.base !== undefined) {
    if (!existsSync(options.base)) {
      fatal(`Base file not found: ${options.base}`);
    }

    const baseEntries = extract(readFileSync(options.base));

    for (const entry of baseEntries) {
      fileSystem.set(entry.name, entry.data);
    }
  }

  writeFiles(normalize(input), normalize(input), fileSystem);
  writeFileSync(outputFile, fileSystem.build());

  process.stdout.write("OK\n");
}
