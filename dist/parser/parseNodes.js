import{BufferConsumer as e}from"@triforce-heroes/triforce-core";export function parseEntries(r,n){let t=[],a=new e(r.subarray(32,32+16*n.nodesCount),void 0,n.byteOrderMask),s=40+16*n.nodesCount,d=new e(r.subarray(s,n.dataOffset),void 0,n.byteOrderMask);for(let e=0;e<n.nodesCount;e++){var o;t.push((o=n.dataOffset,a.skip(4),d.seek(4*a.readUnsignedInt16()),a.skip(2),{name:d.readNullTerminatedString(),data:r.subarray(o+a.readUnsignedInt32(),o+a.readUnsignedInt32())}))}return t}