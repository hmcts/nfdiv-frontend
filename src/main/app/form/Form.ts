import { AnyObject } from '../controller/PostController';

export class Form {
  constructor(private readonly form: FormContent) {}

  /**
   * Pass the form body to any fields with a validator and return a list of errors
   */
  public getErrors(body: AnyObject, fields = this.form.fields): FormError[] {
    const errors = Object.keys(fields)
      .filter(key => fields[key].validator !== undefined)
      .reduce((previous: FormError[], current: string) => {
        const field = <FormField & { validator: ValidationCheck }>fields[current];
        const errorType = field.validator(body[current] as string);

        return errorType ? previous.concat({ errorType, propertyName: current }) : previous;
      }, []);

    const subFieldErrors: FormError[] = [];
    for (const [key, value] of Object.entries(fields)) {
      (value as FormOptions)?.values
        ?.filter(option => option.subFields !== undefined && body[key] === option.value)
        .map(fieldWithSubFields => fieldWithSubFields.subFields)
        .map(subField => this.getErrors(body, subField))
        .map(subErrors => subFieldErrors.push(...subErrors));
    }

    return [...errors, ...subFieldErrors];
  }
}

type LanguageLookup = (lang: Record<string, never>) => string;

type ValidationCheck = (lang: string) => void | string;

type Label = string | LanguageLookup;

type Warning = Label;

export interface FormContent {
  submit: {
    text: Label;
    classes?: string;
  };
  fields: Record<string, FormField>;
}

export type FormField = FormInput | FormOptions;

export interface FormOptions {
  type: string;
  label?: Label;
  values: FormInput[];
  validator?: ValidationCheck;
}

export interface FormInput {
  label: Label;
  hint?: Label;
  classes?: string;
  selected?: boolean;
  value?: string | number;
  attributes?: Partial<HTMLInputElement>;
  validator?: ValidationCheck;
  warning?: Warning;
  subFields?: Record<string, FormField>;
}

export interface CsrfField {
  _csrf: string;
}

export type FormError = {
  propertyName: string;
  errorType: string;
};
