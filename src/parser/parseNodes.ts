import { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";

import { DataHeader } from "./parseHeader.js";

export interface DataEntry {
  name: string;
  data: Buffer;
}

function parseEntry(
  buffer: Buffer,
  consumer: BufferConsumer,
  consumerNames: BufferConsumer,
  headerDataOffset: number,
): DataEntry {
  consumer.skip(4); // Name hash.
  consumerNames.seek((consumer.readUnsignedInt32() - 0x01_00_00_00) * 4);

  const name = consumerNames.readNullTerminatedString();
  const data = buffer.subarray(
    headerDataOffset + consumer.readUnsignedInt32(),
    headerDataOffset + consumer.readUnsignedInt32(),
  );

  return { name, data };
}

export function parseEntries(buffer: Buffer, header: DataHeader) {
  const entries: DataEntry[] = [];

  const consumer = new BufferConsumer(
    buffer.subarray(32, 32 + 16 * header.nodesCount),
    undefined,
    header.byteOrderMask,
  );

  const namesOffset =
    32 + // Header length (SARC + SFAT).
    8 + // Header length (SFNT).
    16 * header.nodesCount;

  const consumerNames = new BufferConsumer(
    buffer.subarray(namesOffset, header.dataOffset),
    undefined,
    header.byteOrderMask,
  );

  for (let i = 0; i < header.nodesCount; i++) {
    entries.push(
      parseEntry(buffer, consumer, consumerNames, header.dataOffset),
    );
  }

  return entries;
}
