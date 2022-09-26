export default class Test {
    async get(): Promise<string> {
        return await Promise.resolve('done');
    }
}
