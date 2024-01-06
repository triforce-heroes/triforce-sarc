import { describe, expect, it } from "vitest";

import { hash } from "../../src/utils/hash.js";

describe("hash", () => {
  const samples = [
    ["", 0],
    ["a", 97],
    ["abc", 999_494],
    ["\u0002\u0036", 256],
    ["Example.txt", 2_348_577_526],
    ["A/B/C/Example.txt", 3_649_913_709],
  ] as const;

  it.each(samples)("hash(%j) = %j", (name, output) => {
    expect(hash(name, 0x65)).toStrictEqual(output);
  });
});
