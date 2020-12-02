
export class Form {

  public getErrors(body: {}): FormError[] {
    return [];
  }

}

export interface FormError {
  field: string,
  errorName: string
}
