import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

export const temporaryDirectory = async (context, prefix) => {
  const directory = await mkdtemp(path.join(os.tmpdir(), prefix));
  context.after(() => rm(directory, { recursive: true, force: true }));
  return directory;
};

export const restoreListeners = (context, emitter) => {
  const previous = new Map(emitter.eventNames().map(name => [name, emitter.listeners(name)]));
  context.after(() => {
    for (const name of emitter.eventNames()) {
      for (const listener of emitter.listeners(name)) {
        if (!previous.get(name)?.includes(listener)) {
          emitter.removeListener(name, listener);
        }
      }
    }
  });
};
