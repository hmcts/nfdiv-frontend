import { AnyObject } from '../controller/PostController';

export class Form {
  constructor(private readonly form: FormContent) {}

  /**
   * Pass the form body to any fields with a validator and return a list of errors
   */
  public getErrors(body: AnyObject): FormError[] {
    return Object.keys(this.form.fields)
      .filter(key => this.form.fields[key].validator !== undefined)
      .reduce((errors: FormError[], propertyName: string) => {
        const field = <FormField & { validator: ValidationCheck }>this.form.fields[propertyName];
        const errorType = field.validator(body[propertyName] as string);

        return errorType ? errors.concat({ errorType, propertyName }) : errors;
      }, []);
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
  classes?: string;
  selected?: boolean;
  value?: string | number;
  validator?: ValidationCheck;
  warning?: Warning;
}

export interface CsrfField {
  _csrf: string;
}

export type FormBody<T extends FormContent> = Record<keyof T['fields'], string> & CsrfField;

export type FormError = {
  propertyName: string;
  errorType: string;
};
