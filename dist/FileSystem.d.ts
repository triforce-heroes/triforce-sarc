/// <reference types="node" resolution-mode="require"/>
export declare class FileSystem {
    private readonly entries;
    set(name: string, buffer: Buffer): void;
    delete(name: string): void;
    build(): Buffer;
}
