
export class Form<T> {

  constructor(
    private readonly form: FormContent
  ) { }

  public getErrors(body: T): FormError[] {
    const errors = Object.entries(this.form.fields)
      // @ts-ignore
      .filter(([, field]) => typeof field.validator === 'function')
      .reduce((filtered: FormError[], [key, field]) => {
        // @ts-ignore
        const error = field.validator(body[key]);
        if (typeof error === 'string') {
          filtered.push({
            propertyName: key,
            errorType: error
          });
        }
        return filtered;
      }, []);

    return errors || [];
  }

}

type LanguageLookup = (lang: Record<string, never>) => string;

type ValidationCheck = (lang: string) => void | string;

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
  values: FormInput[],
  validator?: ValidationCheck
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

export type FormError = {
  propertyName: string,
  errorType: string
}
