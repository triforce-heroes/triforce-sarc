import { parseHeader } from "./parser/parseHeader.js";
import { parseEntries } from "./parser/parseNodes.js";

export function extract(buffer: Buffer) {
  return parseEntries(buffer, parseHeader(buffer));
}
