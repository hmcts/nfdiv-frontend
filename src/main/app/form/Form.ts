import { Case, CaseDate, CaseWithId } from '../case/case';
import { AnyObject } from '../controller/PostController';

import { setupCheckboxParser } from './parser';

export class Form {
  constructor(private readonly form: FormContent) {}

  /**
   * Pass the form body to any fields with a parser and return mutated body;
   */
  public getParsedBody(body: AnyObject, fields = this.form?.fields): Partial<CaseWithFormData> {
    const parsedBody = Object.entries(fields)
      .map(setupCheckboxParser)
      .filter(([, field]) => typeof field?.parser === 'function')
      .flatMap(([key, field]) => {
        const parsed = field.parser?.(body);
        return Array.isArray(parsed) ? parsed : [[key, parsed]];
      });

    let subFieldsParsedBody = {};
    for (const [, value] of Object.entries(fields)) {
      (value as FormOptions)?.values
        ?.filter(option => option.subFields !== undefined)
        .map(fieldWithSubFields => fieldWithSubFields.subFields)
        .map(subField => this.getParsedBody(body, subField))
        .forEach(parsedSubField => {
          subFieldsParsedBody = { ...subFieldsParsedBody, ...parsedSubField };
        });
    }

    return { ...body, ...Object.fromEntries(parsedBody), ...subFieldsParsedBody };
  }

  /**
   * Pass the form body to any fields with a validator and return a list of errors
   */
  public getErrors(body: Partial<Case>, fields = this.form?.fields): FormError[] {
    if (!fields) {
      return [];
    }

    const errors = Object.keys(fields)
      .filter(key => fields[key].validator !== undefined)
      .reduce((formErrors: FormError[], propertyName: string) => {
        const field = <FormField & { validator: ValidationCheck }>fields[propertyName];
        const errorType = field.validator(body?.[propertyName] as string, body);

        return errorType ? formErrors.concat({ errorType, propertyName }) : formErrors;
      }, []);

    const checkboxErrors: FormError[] = [];
    for (const [key, value] of Object.entries(fields)) {
      (value as FormOptions)?.values
        ?.filter(option => option.validator !== undefined)
        .map(option => {
          const errorType = option.validator?.(body?.[option.name as string], body);
          if (errorType) {
            checkboxErrors.push({ errorType, propertyName: key });
          }
        });
    }

    const subFieldErrors: FormError[] = [];
    for (const [key, value] of Object.entries(fields)) {
      (value as FormOptions)?.values
        ?.filter(option => option.subFields !== undefined && body[key] === option.value)
        .map(fieldWithSubFields => fieldWithSubFields.subFields)
        .map(subField => this.getErrors(body, subField))
        .map(subErrors => subFieldErrors.push(...subErrors));
    }

    return [...errors, ...checkboxErrors, ...subFieldErrors];
  }
}

type LanguageLookup = (lang: Record<string, never>) => string;

type ValidationCheck = (value: string | string[] | CaseDate | undefined, formData: Partial<Case>) => void | string;

type Parser = (value: Record<string, unknown> | string[]) => void;

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
  id?: string;
  type: string;
  label?: Label;
  labelHidden?: boolean;
  labelSize?: string | null;
  hideError?: boolean;
  values: FormInput[];
  attributes?: Partial<HTMLInputElement | HTMLTextAreaElement>;
  validator?: ValidationCheck;
  parser?: Parser;
}

export interface FormInput {
  id?: string;
  name?: string;
  label: Label;
  hint?: Label;
  classes?: string;
  hidden?: boolean;
  selected?: boolean;
  value?: string | number;
  attributes?: Partial<HTMLInputElement | HTMLTextAreaElement>;
  validator?: ValidationCheck;
  parser?: Parser;
  warning?: Warning;
  conditionalText?: Label;
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
