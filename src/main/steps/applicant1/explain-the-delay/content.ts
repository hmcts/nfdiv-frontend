import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = {
  title: 'Explain the delay',
  finalOrderLateExplanation:
    'You are making this application for a final order over one year from when the conditional order was made. ' +
    'Explain to the court why you did not apply for a final order earlier. Your answer will be reviewed as part of your application.',
  finalOrderStatementOfTruth: 'I believe that the facts stated in this application are true',
  confirmApplicationIsTrueMoreInformation:
    'This confirms that the information you are submitting is true and accurate, to the best of your knowledge. ' +
    'It’s known as your ‘statement of truth’.',
  errors: {
    applicant1FinalOrderLateExplanation: {
      required:
        'You have not entered any information. You need to explain why your application has been delayed before continuing.',
    },
    applicant1FinalOrderStatementOfTruth: {
      required:
        'You have not confirmed you believe the information you have entered is true. Confirm you believe it’s true before continuing.',
    },
  },
};

const cy: typeof en = {
  title: 'Esboniwch yr oedi',
  finalOrderLateExplanation:
    'Rydych yn gwneud y cais hwn am orchymyn terfynol dros flwyddyn ar ôl i’r gorchymyn amodol gael ei wneud. ' +
    'Esboniwch i’r llys pam na wnaethoch gais am orchymyn terfynol yn gynharach. Bydd eich ateb yn cael ei adolygu fel rhan o’ch cais.',
  finalOrderStatementOfTruth: 'Credaf fod y ffeithiau a nodir yn y cais hwn yn wir',
  confirmApplicationIsTrueMoreInformation:
    'Mae hyn yn cadarnhau bod yr wybodaeth yr ydych yn ei chyflwyno yn wir ac yn gywir, hyd eithaf eich gwybodaeth. ' +
    'Gelwir hwn yn eich ‘datganiad gwirionedd’.',
  errors: {
    applicant1FinalOrderLateExplanation: {
      required:
        'Nid ydych wedi darparu unrhyw wybodaeth. Mae arnoch angen esbonio pam bod oedi wedi bod gyda’ch cais cyn parhau.',
    },
    applicant1FinalOrderStatementOfTruth: {
      required:
        "Nid ydych wedi cadarnhau eich bod yn credu bod yr wybodaeth rydych wedi'i nodi yn wir. Cadarnhewch eich bod yn credu ei bod yn wir cyn parhau.",
    },
  },
};

export const form: FormContent = {
  fields: {
    applicant1FinalOrderLateExplanation: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.finalOrderLateExplanation,
      labelSize: 'normal',
      validator: isFieldFilledIn,
    },
    applicant1FinalOrderStatementOfTruth: {
      type: 'checkboxes',
      values: [
        {
          name: 'applicant1FinalOrderStatementOfTruth',
          label: l => l.finalOrderStatementOfTruth,
          value: Checkbox.Checked,
          selected: false,
          validator: isFieldFilledIn,
        },
      ],
    },
  },
  submit: {
    text: l => l.submit,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
