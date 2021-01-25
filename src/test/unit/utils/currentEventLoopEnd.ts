export const currentEventLoopEnd = (): Promise<void> => new Promise(resolve => setImmediate(resolve));
