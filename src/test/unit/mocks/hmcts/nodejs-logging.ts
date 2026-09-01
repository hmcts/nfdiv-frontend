export const mockLogger = {
  error: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

export const Logger = { getLogger: jest.fn().mockReturnValue(mockLogger) };
