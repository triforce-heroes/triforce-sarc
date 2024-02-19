/// <reference types="node" resolution-mode="require"/>
import { ByteOrder } from "@triforce-heroes/triforce-core/types/ByteOrder";
export interface DataHeader {
    byteOrderMask: ByteOrder;
    length: number;
    dataOffset: number;
    nodesCount: number;
    hashKey: number;
}
export declare function parseHeader(buffer: Buffer): {
    byteOrderMask: ByteOrder;
    length: number;
    dataOffset: number;
    nodesCount: number;
    hashKey: number;
};
