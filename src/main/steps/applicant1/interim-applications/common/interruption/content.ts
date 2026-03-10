import { Checkbox } from '../../../../../app/case/case';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: '',
  line1: `If your application is successful, we will share your answers and any evidence you provide with your ${partner}.`,
  line2: "We will not share your contact details if you've told us to keep them private.",
  iUnderstand: 'I understand',
  errors: {
    applicant1InterimAppsIUnderstand: {
      required: "You must select 'I understand' before continuing.",
    },
  },
});

// @TODO translations
const cy = ({ partner }: CommonContent) => ({
  title: '',
  line1: `Os bydd eich cais yn llwyddiannus, byddwn yn rhannu eich ymatebion, ac unrhyw dystiolaeth rydych yn ei darparu, gyda’ch  ${partner}.`,
  line2: 'Ni fyddwn yn rhannu eich manylion cyswllt os ydych wedi dweud wrthym i’w cadw’n breifat.',
  iUnderstand: 'Rwy’n deall',
  errors: {
    applicant1InterimAppsIUnderstand: {
      required: 'Rhaid i chi ddewis ‘Rwy’n deall’ cyn parhau',
    },
  },
});

const languages = {
  en,
  cy,
};

const interimAppsIUnderstandField = (fieldName: string) => ({
  type: 'checkboxes',
  values: [
    {
      name: fieldName,
      label: l => l.iUnderstand,
      value: Checkbox.Checked,
      validator: isFieldFilledIn,
    },
  ],
});

export const applicant1Form: FormContent = {
  fields: {
    applicant1InterimAppsIUnderstand: interimAppsIUnderstandField('applicant1InterimAppsIUnderstand'),
  },
  submit: {
    text: l => l.continue,
  },
};

export const applicant2Form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2InterimAppsIUnderstand: interimAppsIUnderstandField('applicant2InterimAppsIUnderstand'),
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form: content.isApplicant2 ? applicant2Form : applicant1Form,
  };
};
