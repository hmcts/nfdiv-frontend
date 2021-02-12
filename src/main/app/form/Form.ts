import { cloneDeep } from 'lodash';

import { AnyObject } from '../controller/PostController';

export class Form {
  constructor(private readonly form: FormContent) {}

  /**
   * Pass the form body to any fields with a parser and return mutated body;
   */
  public getParseBody(body: AnyObject): AnyObject {
    const clonedBody = cloneDeep(body);
    Object.keys(this.form.fields)
      .filter(key => this.form.fields[key].parser !== undefined)
      .forEach(propertyName => {
        const field = <FormField & { parser: Parser }>this.form.fields[propertyName];
        field.parser(clonedBody);
      });
    return clonedBody;
  }

  /**
   * Pass the form body to any fields with a validator and return a list of errors
   */
  public getErrors(body: AnyObject): FormError[] {
    return Object.keys(this.form.fields)
      .filter(key => this.form.fields[key].validator !== undefined)
      .reduce((errors: FormError[], propertyName: string) => {
        const field = <FormField & { validator: ValidationCheck }>this.form.fields[propertyName];
        const errorType = field.validator(body[propertyName]);

        return errorType ? errors.concat({ errorType, propertyName }) : errors;
      }, []);
  }
}

type LanguageLookup = (lang: Record<string, never>) => string;

type ValidationCheck = (value: string | Record<string, never>) => void | string;

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
  values: FormInput[];
  validator?: ValidationCheck;
  parser?: Parser;
}

export interface FormInput {
  name?: Name;
  label: Label;
  classes?: string;
  selected?: boolean;
  value?: string | number;
  validator?: ValidationCheck;
  parser?: Parser;
  warning?: Warning;
}

export interface CsrfField {
  _csrf: string;
}

export type FormError = {
  propertyName: string;
  errorType: string;
};
