
export class Form<T> {

  constructor(
    private readonly validator: any
  ) { }

  public getErrors(body: T): [] {
    const errors = this.validator.fields
      .filter(f => f.required)
      .reduce((filtered, f) => {
        const [isValid, errorType] = f.validator(body[f.name]);
        if (!isValid) {
          filtered.push({
            propertyName: f.name,
            errorType: errorType
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
  fields: (FormInput | FormOptions)[]
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

