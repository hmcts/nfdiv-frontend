import { CaseDate, CaseWithId } from '../case/case';
import { AnyObject } from '../controller/PostController';

import { setupCheckboxParser } from './parser';

export class Form {
  constructor(private readonly form: FormContent) {}

  /**
   * Pass the form body to any fields with a parser and return mutated body;
   */
  public getParsedBody(body: AnyObject): Partial<CaseWithFormData> {
    const parsedBody = Object.entries(this.form.fields)
      .map(setupCheckboxParser)
      .filter(([, field]) => typeof field?.parser === 'function')
      .flatMap(([key, field]) => {
        const parsed = field.parser?.(body);
        return Array.isArray(parsed) ? parsed : [[key, parsed]];
      });

    return { ...body, ...Object.fromEntries(parsedBody) };
  }

  /**
   * Pass the form body to any fields with a validator and return a list of errors
   */
  public getErrors(body: Partial<CaseWithFormData>, fields = this.form?.fields): FormError[] {
    if (!fields) {
      return [];
    }

    const errors = Object.keys(fields)
      .filter(key => fields[key].validator !== undefined)
      .reduce((errors: FormError[], propertyName: string) => {
        const field = <FormField & { validator: ValidationCheck }>fields[propertyName];
        const errorType = field.validator(body?.[propertyName] as string);

        return errorType ? errors.concat({ errorType, propertyName }) : errors;
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

type ValidationCheck = (value: string | CaseDate | undefined) => void | string;

type Parser = (value: Record<string, unknown>) => void;

type Label = string | LanguageLookup;

type Warning = Label;

type Name = Label;

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
  labelHidden?: boolean;
  values: FormInput[];
  validator?: ValidationCheck;
  parser?: Parser;
}

export interface FormInput {
  name?: Name;
  label: Label;
  hint?: Label;
  classes?: string;
  selected?: boolean;
  value?: string | number;
  attributes?: Partial<HTMLInputElement>;
  validator?: ValidationCheck;
  parser?: Parser;
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

interface CaseWithFormData extends CaseWithId {
  _csrf: string;
  saveAndSignOut?: string;
  saveBeforeSessionTimeout?: string;
}
