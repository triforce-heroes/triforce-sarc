import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { extract } from "../src/Extract.js";
import { DataEntry } from "../src/parser/parseNodes.js";

describe("extract", () => {
  const samples: Array<[string, DataEntry[]]> = [
    ["example", [{ name: "Example.txt", data: Buffer.from("Hello World!") }]],
    [
      "example2",
      [
        { name: "A/A.bin", data: Buffer.from("This File Must Be First") },
        { name: "B/B.bin", data: Buffer.from("This File Must Be Last") },
      ],
    ],
  ];

  it.each(samples)("extract(%s.sarc)", (name, structure) => {
    expect(structure).toStrictEqual(
      extract(readFileSync(`${__dirname}/fixtures/${name}.sarc`)),
    );
  });
});
