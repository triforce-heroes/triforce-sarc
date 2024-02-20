import{BufferBuilder as e}from"@triforce-heroes/triforce-core/BufferBuilder";import{hash as t}from"./utils/hash.js";export class FileSystem{constructor(e=new Map){this.entries=e}set(e,t){this.entries.set(e,t)}delete(e){this.entries.delete(e)}build(){let n=new e(0);n.writeString("SFAT"),n.writeUnsignedInt16(12),n.writeUnsignedInt16(this.entries.size),n.writeUnsignedInt32(101);let i=new e(0),r=new e(0),s=new e(0);for(let[e,n]of(r.writeString("SFNT"),r.writeUnsignedInt32(8),[...this.entries.entries()].sort((e,n)=>t(e[0],101)-t(n[0],101)))){i.writeUnsignedInt32(t(e,101)),i.writeUnsignedInt16((r.length-8)/4),i.writeUnsignedInt16(256),i.writeUnsignedInt32(s.length),i.writeUnsignedInt32(s.length+n.length),s.push(n),s.pad(16);let d=Buffer.from(`${e}\0`);r.push(d),r.pad(4)}r.pad(16);let d=20+n.length+i.length+r.length,g=new e(0);return g.writeString("SARC"),g.writeUnsignedInt16(20),g.writeUnsignedInt16(65279),g.writeUnsignedInt32(d+s.length),g.writeUnsignedInt32(d),g.writeUnsignedInt16(256),g.writeUnsignedInt16(0),g.push(n.build(),i.build(),r.build(),s.build()),g.build()}}