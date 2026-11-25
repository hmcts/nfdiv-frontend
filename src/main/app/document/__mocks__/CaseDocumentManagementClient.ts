import { vi } from 'vitest';

export enum Classification {
  Private = 'PRIVATE',
  Restricted = 'RESTRICTED',
  Public = 'PUBLIC',
}

export const mockCreate = vi.fn();
export const mockDelete = vi.fn();
export const CaseDocumentManagementClient = vi.fn(function CaseDocumentManagementClient() {
  return { create: mockCreate, delete: mockDelete };
});
