
export class Form<T> {

  public getErrors(body: T): FormError[] {
    return [];
  }

}

export interface FormError {
  field: string,
  errorName: string
}
