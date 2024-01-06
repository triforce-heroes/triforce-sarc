const hashMask = BigInt(0xff_ff_ff_ff);

export function hash(name: string, key: number): number {
  let result = 0n;

  for (let i = 0; i < name.length; i++) {
    result *= BigInt(key);
    result += BigInt(name.codePointAt(i)!);
  }

  return Number(result & hashMask);
}
