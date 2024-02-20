/// <reference types="node" resolution-mode="require"/>
export declare class FileSystem {
    private readonly entries;
    constructor(entries?: Map<string, Buffer>);
    set(name: string, buffer: Buffer): void;
    delete(name: string): void;
    build(): Buffer;
}
