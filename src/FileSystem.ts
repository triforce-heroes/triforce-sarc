import { BufferBuilder } from "@triforce-heroes/triforce-core/BufferBuilder";
import { ByteOrder } from "@triforce-heroes/triforce-core/types/ByteOrder";

import { hash } from "./utils/hash.js";

const DEFAULT_KEY = 0x65;

export class FileSystem {
  public constructor(private readonly entries = new Map<string, Buffer>()) {}

  public get(name: string) {
    return this.entries.get(name);
  }

  public set(name: string, buffer: Buffer) {
    this.entries.set(name, buffer);
  }

  public delete(name: string) {
    this.entries.delete(name);
  }

  public build(byteOrder = ByteOrder.LITTLE_ENDIAN) {
    const fatBuilder = new BufferBuilder(byteOrder);
    const fatLength = 0x0c;

    fatBuilder.writeString("SFAT");
    fatBuilder.writeUnsignedInt16(fatLength);
    fatBuilder.writeUnsignedInt16(this.entries.size);
    fatBuilder.writeUnsignedInt32(DEFAULT_KEY);

    const entriesBuilder = new BufferBuilder(byteOrder);
    const namesBuilder = new BufferBuilder(byteOrder);
    const dataBuilder = new BufferBuilder(byteOrder);

    namesBuilder.writeString("SFNT");
    namesBuilder.writeUnsignedInt16(0x08);
    namesBuilder.writeUnsignedInt16(0);

    const entriesSorted = [...this.entries.entries()].sort(
      (a, b) => hash(a[0], DEFAULT_KEY) - hash(b[0], DEFAULT_KEY),
    );

    for (const [name, buffer] of entriesSorted) {
      entriesBuilder.writeUnsignedInt32(hash(name, DEFAULT_KEY));
      entriesBuilder.writeUnsignedInt32(
        (namesBuilder.length - 8) / 4 + 0x01_00_00_00,
      );
      entriesBuilder.writeUnsignedInt32(dataBuilder.length);
      entriesBuilder.writeUnsignedInt32(dataBuilder.length + buffer.length);

      dataBuilder.push(buffer);
      dataBuilder.pad(16);

      const nameBuffer = Buffer.from(`${name}\0`);

      namesBuilder.push(nameBuffer);
      namesBuilder.pad(4);
    }

    namesBuilder.pad(16);

    const headerLength = 0x14;
    const dataOffset =
      headerLength +
      fatBuilder.length +
      entriesBuilder.length +
      namesBuilder.length;

    const builder = new BufferBuilder(byteOrder);

    builder.writeString("SARC");
    builder.writeUnsignedInt16(headerLength);
    builder.writeUnsignedInt16(0xfe_ff);
    builder.writeUnsignedInt32(dataOffset + dataBuilder.length);
    builder.writeUnsignedInt32(dataOffset);
    builder.writeUnsignedInt16(0x01_00);
    builder.writeUnsignedInt16(0);

    builder.push(
      fatBuilder.build(),
      entriesBuilder.build(),
      namesBuilder.build(),
      dataBuilder.build(),
    );

    return builder.build();
  }
}
