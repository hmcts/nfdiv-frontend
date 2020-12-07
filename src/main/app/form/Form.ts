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

export interface FormContent {
  submit: {
    text: string,
    class?: string
  },
  fields: Record<string, FormField>
}

interface FormField {
  label: string,
  class?: string
}

export interface CsrfField {
  _csrf: string
}

export type FormBody<T extends FormContent> = Record<keyof T['fields'], string> & CsrfField;

