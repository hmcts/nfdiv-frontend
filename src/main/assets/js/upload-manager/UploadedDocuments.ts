import { UploadedDocument } from '../../../app/case/case';
import { getById } from '../selectors';

export class UploadedDocuments {
  documents: UploadedDocument[];
  storeEl: HTMLInputElement;

  constructor() {
    this.storeEl = getById('uploadedDocuments') as HTMLInputElement;
    this.documents = JSON.parse(this.storeEl?.value || '[]');
  }

  add(documents: UploadedDocument[]): void {
    this.documents.push(...documents);
    this.updateStore();
  }

  remove(documentId: string): void {
    const indexToDelete = this.documents.findIndex(f => f.id === documentId);
    if (indexToDelete > -1) {
      this.documents.splice(indexToDelete, 1);
    }
    this.updateStore();
  }

  get length(): number {
    return this.documents.length;
  }

  [Symbol.iterator](): IterableIterator<UploadedDocument> {
    return this.documents.values();
  }

  private updateStore() {
    this.storeEl.value = JSON.stringify(this.documents);
  }
}
