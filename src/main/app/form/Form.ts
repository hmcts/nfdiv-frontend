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

type LanguageLookup = (lang: Record<string, never>) => string;

type Label = string | LanguageLookup;

export interface FormContent {
  submit: {
    text: Label,
    class?: string
  },
  fields: Record<string, FormInput | FormOptions>
}

export interface FormOptions {
  type: string,
  label?: Label,
  values: FormInput[]
}

export interface FormInput {
  label: Label,
  class?: string,
  selected?: boolean,
  value?: string | number
}

export interface CsrfField {
  _csrf: string
}

export type FormBody<T extends FormContent> = Record<keyof T['fields'], string> & CsrfField;

