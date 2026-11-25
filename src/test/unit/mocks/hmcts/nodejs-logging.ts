import { vi } from 'vitest';

export const mockLogger = {
  error: vi.fn(),
  info: vi.fn(),
  debug: vi.fn(),
};

export const Logger = { getLogger: vi.fn().mockReturnValue(mockLogger) };
