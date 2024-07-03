export declare class FileSystem {
    private readonly entries;
    constructor(entries?: Map<string, Buffer>);
    get(name: string): Buffer | undefined;
    set(name: string, buffer: Buffer): void;
    delete(name: string): void;
    build(): Buffer;
}
