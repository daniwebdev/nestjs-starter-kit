export abstract class ProviderStorage<Instance> {
    abstract put(destination: string, buffer: Buffer, mimetype?: string): Promise<any>;
    abstract move(origin:string, destination: string): Promise<any>
    abstract instance(): Instance | any
}