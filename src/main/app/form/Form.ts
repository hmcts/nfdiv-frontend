import { CaseDate, CaseWithId } from '../case/case';
import { AnyObject } from '../controller/PostController';

export class Form {
  constructor(private readonly form: FormContent) {}

  /**
   * Pass the form body to any fields with a parser and return mutated body;
   */
  public getParsedBody(body: AnyObject): Partial<CaseWithFormData> {
    const parsedBody = Object.entries(this.form.fields)
      .map(([key, field]) => {
        if ((field as FormOptions)?.type === 'checkboxes') {
          field.parser = formData =>
            (field as FormOptions).values.reduce((previous, currentCheckbox) => {
              const checkboxName = currentCheckbox.name as string;
              const checkboxValue = formData[currentCheckbox.name as string] as string[];
              return [...previous, [checkboxName, checkboxValue[checkboxValue.length - 1]]];
            }, [] as string[][]);
        }
        return [key, field];
      })
      .filter(([, field]) => typeof (field as FormOptions)?.parser === 'function')
      .flatMap(([key, field]) => {
        const parsed = (field as FormOptions).parser?.(body);
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
}
