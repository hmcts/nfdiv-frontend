import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isValidAccessCode, isValidCaseReference } from '../../../app/form/validation';

const en = () => ({
  title: 'Enter your access details',
  line1: 'Your reference number and access code are in the email you received which invited you to this application.',
  caseReference: 'Your reference number',
  caseReferenceHint: 'This is a 16-digit number',
  accessCode: 'Your access code',
  accessCodeHint: 'This is 8 characters',
  errors: {
    caseReference: {
      required:
        'You have not entered a reference number. Enter the reference number from the email you received before continuing.',
      invalid: 'You have entered an invalid reference number. Check your email and enter it again before continuing.',
      invalidReference:
        'You have entered the wrong reference number. Check your email and enter it again before continuing.',
    },
    accessCode: {
      required:
        'You have not entered an access code. Enter the access code from the email you received before continuing.',
      invalid: 'You have entered an invalid access code. Check your email and enter it again before continuing.',
      invalidAccessCode:
        'You have entered the wrong access code. Check your email and enter it again before continuing.',
    },
  },
});

const cy: typeof en = () => ({
  title: 'Rhowch eich manylion mynediad',
  line1: 'Mae eich cyfeirnod a’ch cod mynediad yn yr e-bost neu’r llythyr a gawsoch i’ch gwahodd i’r cais hwn.',
  caseReference: 'Eich cyfeirnod',
  caseReferenceHint: 'Rhif 16 digid yw hwn',
  accessCode: 'Eich cod mynediad',
  accessCodeHint: 'Mae hwn yn cynnwys 8 llythyren',
  errors: {
    caseReference: {
      required:
        'Nid ydych wedi rhoi cyfeirnod. Rhowch y cyfeirnod o’r e-bost yr ydych wedi ei dderbyn cyn mynd ymlaen.',
      invalid: 'Rydych wedi rhoi cyfeirnod annilys. Edrychwch ar eich e-bost a rhowch y cyfeirnod eto cyn mynd ymlaen.',
      invalidReference:
        'Rydych wedi rhoi’r cyfeirnod anghywir. Edrychwch ar eich e-bost a rhowch y cyfeirnod eto cyn mynd ymlaen.',
    },
    accessCode: {
      required:
        'Nid ydych wedi rhoi cod mynediad. Rhowch y cod mynediad o’r e-bost yr ydych wedi ei dderbyn cyn mynd ymlaen.',
      invalid: 'Rydych wedi rhoi cod mynediad annilys. Edrychwch ar eich e-bost a rhowch y cod eto cyn mynd ymlaen.',
      invalidAccessCode:
        'Rydych wedi rhoi’r cod mynediad anghywir. Edrychwch ar eich e-bost a rhowch y cod eto cyn mynd ymlaen.',
    },
  },
});

export const form: FormContent = {
  fields: {
    caseReference: {
      type: 'text',
      label: l => l.caseReference,
      hint: l => l.caseReferenceHint,
      labelSize: 'normal',
      classes: 'govuk-input--width-20',
      validator: input => isFieldFilledIn(input) || isValidCaseReference(input),
    },
    accessCode: {
      type: 'text',
      label: l => l.accessCode,
      hint: l => l.accessCodeHint,
      labelSize: 'normal',
      classes: 'govuk-input--width-20',
      validator: input => isFieldFilledIn(input) || isValidAccessCode(input),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
