import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { FileSystem } from "../src/FileSystem.js";

describe("class FileSystem", () => {
  it("method createFile() #1", () => {
    const sample = new FileSystem();

    sample.set("Bogus", Buffer.from(""));

    sample.set("Example.txt", Buffer.from("Before!"));
    sample.set("Example.txt", Buffer.from("Hello World!"));

    sample.delete("Bogus");

    const build = sample.build();

    expect(build).toStrictEqual(
      readFileSync(`${__dirname}/fixtures/example.sarc`),
    );
  });

  it("method createFile() #2", () => {
    const sample = new FileSystem();

    sample.set("B/B.bin", Buffer.from("This File Must Be Last"));
    sample.set("A/A.bin", Buffer.from("This File Must Be First"));

    const build = sample.build();

    expect(build).toStrictEqual(
      readFileSync(`${__dirname}/fixtures/example2.sarc`),
    );
  });
});
