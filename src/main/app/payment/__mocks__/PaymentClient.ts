import { vi } from 'vitest';

export const mockCreate = vi.fn();
export const mockGet = vi.fn();
export const PaymentClient = vi.fn(function PaymentClient() {
  return { create: mockCreate, get: mockGet };
});
