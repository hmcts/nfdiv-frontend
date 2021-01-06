
export class Form<T> {

  constructor(
    private readonly form: any
  ) { }

  public getErrors(body: T): FormError[] {
    const fields = this.form.fields;
    const errors = Object.keys(fields)
      .filter((field: string) => !!fields[field].validator)
      .reduce((filtered: FormError[], field: string) => {
        const error = fields[field].validator(body[field]);
        if (typeof error === 'string') {
          filtered.push({
            propertyName: field,
            errorType: error
          });
        }
        return filtered;
      }, []);

    return errors || [];
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

export type FormError = {
  propertyName: string,
  errorType: string
}
