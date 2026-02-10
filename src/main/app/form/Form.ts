import { existingOrNew } from '../../steps/existing-application/content';
import { Case, CaseDate, CaseWithId } from '../case/case';
import { YesOrNo } from '../case/definition';
import { AnyObject } from '../controller/PostController';

import { setupCheckboxParser } from './parser';

const WHITELISTED_FIELDS = [
  'applicant1ConfirmReceipt',
  'applicant2ConfirmReceipt',
  'applicant1ApplyForConditionalOrderStarted',
  'applicant2ApplyForConditionalOrderStarted',
  'saveAndSignOut',
  'saveBeforeSessionTimeout',
  '_csrf',
  'connections',
];

export class Form {
  constructor(private readonly fields: FormFields) {}

  static readonly MAX_TEXT_INPUT_LENGTH = 10_000;

  /**
   * Pass the form body to any fields with a parser and return mutated body;
   */
  public getParsedBody(body: AnyObject, checkFields?: FormContent['fields']): Partial<CaseWithFormData> {
    const fields = checkFields || this.fields;

    const parsedBody = Object.entries(fields)
      .map(setupCheckboxParser(!!body.saveAndSignOut))
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

    const formFieldValues = Object.keys(body)
      .filter(key => WHITELISTED_FIELDS.includes(key) || fields[key])
      .reduce((newBody, key) => ({ [key]: body[key], ...newBody }), {});

    return { ...formFieldValues, ...subFieldsParsedBody, ...Object.fromEntries(parsedBody) };
  }

  /**
   * Pass the form body to any fields with a validator and return a list of errors
   */
  public getErrors(body: Partial<Case>): FormError[] {
    return Object.entries(this.fields).flatMap(fieldWithId => this.getErrorsFromField(body, ...fieldWithId));
  }

  private getErrorsFromField(body: Partial<Case>, id: string, field: FormField): FormError[] {
    const errorType = field.validator && field.validator(body[id], body);
const focusId = isFormOptions(field)
  ? field.values[0]?.id ?? field.id ?? id
  : id;
    const errors: FormError[] = errorType ? [{ errorType, propertyName: id, focusId }] : [];

    errors.push(...this.validateGlobalInputRules(body, id, field as FormInput));

    // if there are checkboxes or options, check them for errors
    if (isFormOptions(field)) {
      const valuesErrors = field.values.flatMap(value => this.getErrorsFromField(body, value.name || id, value));

      errors.push(...valuesErrors);
    }
    // if there are subfields and the current field is selected then check for errors in the subfields
    else if (field.subFields && (body[id] === field.value || body[id]?.includes(field.value))) {
      const subFields = Object.entries(field.subFields);
      const subFieldErrors = subFields.flatMap(([subId, subField]) => this.getErrorsFromField(body, subId, subField));

      errors.push(...subFieldErrors);
    }

    return errors;
  }

  private validateGlobalInputRules(body: Partial<Case>, id: string, field: FormField): FormError[] {
    const errors: FormError[] = [];
    const fieldType = (field as FormOptions)?.type;

    if (isFormOptions(field) || !fieldType) {
      return errors;
    }

    const isTextInput = [InputType.TEXT, InputType.TEXT_AREA].includes(fieldType as InputType);

    const fieldValue = body[id] as string | undefined;
    if (isTextInput && (fieldValue?.length ?? 0) > Form.MAX_TEXT_INPUT_LENGTH) {
      errors.push({ propertyName: id, errorType: CommonValidationErrors.MaxLength });
    }

    return errors;
  }

  public getFieldNames(): Set<string> {
    const fields = this.fields;
    const fieldNames: Set<string> = new Set();
    for (const fieldKey in fields) {
      const stepField = fields[fieldKey] as FormOptions;
      if (stepField.values && stepField.type !== 'date') {
        for (const [, value] of Object.entries(stepField.values)) {
          if (value.name) {
            fieldNames.add(value.name);
          } else {
            fieldNames.add(fieldKey);
          }
          if (value.subFields) {
            for (const field of Object.keys(value.subFields)) {
              fieldNames.add(field);
            }
          }
        }
      } else {
        fieldNames.add(fieldKey);
      }
    }

    return fieldNames;
  }

  public isComplete(body: Partial<Case>): boolean {
    for (const field of this.getFieldNames().values()) {
      // Skip refuge flags if AddressPrivate is "No"
      if (
        (field === 'applicant1InRefuge' && body['applicant1AddressPrivate'] === YesOrNo.NO) ||
        (field === 'applicant2InRefuge' && body['applicant2AddressPrivate'] === YesOrNo.NO)
      ) {
        continue; // Skip this field
      }
      if (body[field] === undefined || body[field] === null) {
        return false;
      }
    }

    return true;
  }
}

type LanguageLookup = (lang: Record<string, never>) => string;

type Parser = (value: Record<string, unknown> | string[]) => void;

export type Label = string | LanguageLookup;

type Warning = Label;

export type ValidationCheck = (
  value: string | string[] | CaseDate | undefined,
  formData: Partial<Case>
) => void | string;
export type FormFields = Record<string, FormField>;
export type FormFieldsFn = (userCase: Partial<Case>, language?: string) => FormFields;

export interface FormContent {
  submit: {
    text: Label;
    classes?: string;
    isStartButton?: boolean;
  };
  fields: FormFields | FormFieldsFn;
}

export type FormField = FormInput | FormOptions;

export interface FormOptions {
  id?: string;
  type: string;
  label?: Label;
  labelHidden?: boolean;
  labelSize?: string | null;
  labelAttributes?: Record<string, string>;
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
  autocomplete?: string;
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

enum InputType {
  TEXT = 'text',
  TEXT_AREA = 'textarea',
  RADIOS = 'radios',
  CHECKBOXES = 'checkboxes',
  DATE = 'date',
  TELEPHONE = 'tel',
  HIDDEN = 'hidden',
}

enum CommonValidationErrors {
  MaxLength = 'maxLength',
}

function isFormOptions(field: FormField): field is FormOptions {
  return (field as FormOptions).values !== undefined;
}

export interface CsrfField {
  _csrf: string;
}

export type FormError = {
  propertyName: string;
  errorType: string;
  focusId?: string;
};

interface CaseWithFormData extends CaseWithId {
  _csrf: string;
  saveAndSignOut?: string;
  saveBeforeSessionTimeout?: string;
  sendToApplicant2ForReview?: string;
  existingOrNewApplication?: existingOrNew;
}
