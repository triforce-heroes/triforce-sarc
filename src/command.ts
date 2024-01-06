#!/usr/bin/env node
import { program } from "commander";

import { ExtractCommand } from "./commands/ExtractCommand.js";
import { RebuildCommand } from "./commands/RebuildCommand.js";

program
  .command("rebuild")
  .description("rebuild to SARC file")
  .argument("<input>", "directory to be rebuilded")
  .argument("[output]", "output file")
  .option("-b, --base <file>", "base SARC file")
  .action(RebuildCommand);

program
  .command("extract")
  .description("extract SARC file to a directory")
  .argument("<input>", "SARC file to be extracted")
  .argument("[output]", "output directory")
  .action(ExtractCommand);

program.parse();
