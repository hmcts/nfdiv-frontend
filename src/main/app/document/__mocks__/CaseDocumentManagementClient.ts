export enum Classification {
  Private = 'PRIVATE',
  Restricted = 'RESTRICTED',
  Public = 'PUBLIC',
}

export const mockCreate = jest.fn();
export const mockDelete = jest.fn();
export const CaseDocumentManagementClient = jest.fn().mockImplementation(() => {
  return { create: mockCreate, delete: mockDelete };
});
