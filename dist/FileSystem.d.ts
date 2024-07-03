import { ByteOrder } from "@triforce-heroes/triforce-core/types/ByteOrder";
export declare class FileSystem {
    private readonly entries;
    constructor(entries?: Map<string, Buffer>);
    get(name: string): Buffer | undefined;
    set(name: string, buffer: Buffer): void;
    delete(name: string): void;
    build(byteOrder?: ByteOrder): Buffer;
}
