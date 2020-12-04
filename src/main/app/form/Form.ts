import { DefinedError, ValidateFunction } from 'ajv';

export class Form<T> {

  constructor(
    private readonly validator: ValidateFunction
  ) { }

  public getErrors(body: T): DefinedError[] {
    this.validator(body);

    return (this.validator.errors || []) as DefinedError[];
  }

}

export interface FormContent<T> {
  submit: {
    text: string,
    class?: string
  },
  fields: Record<keyof T, FormField>
}

interface FormField {
  label: string,
  class?: string
}

export interface CsrfField {
  _csrf: string
}

