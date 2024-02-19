import { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";
import { fatal } from "@triforce-heroes/triforce-core/Console";
import { ByteOrder } from "@triforce-heroes/triforce-core/types/ByteOrder";

export interface DataHeader {
  byteOrderMask: ByteOrder;
  length: number;
  dataOffset: number;
  nodesCount: number;
  hashKey: number;
}

export function parseHeader(buffer: Buffer) {
  const consumer = new BufferConsumer(
    buffer,
    undefined,
    ByteOrder.LITTLE_ENDIAN,
  );
  const magic = consumer.readString(4);

  if (magic !== "SARC") {
    fatal("Not a SARC file.");
  }

  consumer.skip(2); // Header length (always 0x14).

  const byteOrderMask =
    consumer.readInt16() === 0xff_fe
      ? ByteOrder.BIG_ENDIAN
      : ByteOrder.LITTLE_ENDIAN;

  const length = consumer.readUnsignedInt32();
  const dataOffset = consumer.readUnsignedInt32();

  consumer.skip(
    2 + // Version number (always 0x0100).
      2, // Unknown (always 0x00).
  );

  consumer.skip(
    4 + // Magic header: SFAT.
      2, // Header length (always 0x0C).
  );

  const nodesCount = consumer.readUnsignedInt16();
  const hashKey = consumer.readUnsignedInt32();

  return {
    byteOrderMask,
    length,
    dataOffset,
    nodesCount,
    hashKey,
  };
}
