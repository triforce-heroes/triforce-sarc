let t=BigInt(4294967295);export function hash(n,e){let i=0n;for(let t=0;t<n.length;t++)i*=BigInt(e),i+=BigInt(n.codePointAt(t));return Number(i&t)}