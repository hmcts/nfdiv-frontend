import { ErrorObject, ValidateFunction } from 'ajv';

export class Form<T> {

  constructor(
    private readonly validator: ValidateFunction
  ) { }

  public getErrors(body: T, contentErrors: Record<string, any>): { href: string; msg: string }[] {
    const isValid = this.validator(body);
    return isValid ? [] : this.mapErrors(this.validator.errors, contentErrors);
  }

  private mapErrors(errors: ErrorObject[] | null | undefined, contentErrors: Record<string, any>): { href: string; msg: string }[] {
    let mappedErrors;
    if (errors) {
      // errors.forEach((error: ErrorObject) => {
      //   if (error.keyword === 'required') {
      //     const key = error.params.missingProperty;
      //     error.message = contentErrors[key].required;
      //   }
      // });
      mappedErrors = errors.map((error: ErrorObject) => {
        if (error.keyword === 'required') {
          const key = error.params.missingProperty;
          return {
            href: `#${key}`,
            msg: contentErrors[key].required
          };
        }
      });
    }
    return mappedErrors || [];
  }

}

type LanguageLookup = (lang: Record<string, never>) => string;

type Label = string | LanguageLookup;

export interface FormContent {
  submit: {
    text: Label,
    classes?: string
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
  classes?: string,
  selected?: boolean,
  value?: string | number
}

export interface CsrfField {
  _csrf: string
}

export type FormBody<T extends FormContent> = Record<keyof T['fields'], string> & CsrfField;

