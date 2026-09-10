import { Checkbox } from '../../../../../app/case/case';
import { CaseData } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => {
  const iUnderstandErrors = {
    required: "You must select 'I understand' before continuing.",
  };

  return {
    title: '',
    line1: `If your application is successful, we will share your answers and any evidence you provide with your ${partner}.`,
    line2: "We will not share your contact details if you've told us to keep them private.",
    iUnderstand: 'I understand',
    errors: {
      applicant1InterimAppsIUnderstand: iUnderstandErrors,
      applicant2InterimAppsIUnderstand: iUnderstandErrors,
    },
  };
};

// @TODO translations
const cy = ({ partner }: CommonContent) => {
  const iUnderstandErrors = {
    required: 'Rhaid i chi ddewis ‘Rwy’n deall’ cyn parhau',
  };

  return {
    title: '',
    line1: `Os bydd eich cais yn llwyddiannus, byddwn yn rhannu eich ymatebion, ac unrhyw dystiolaeth rydych yn ei darparu, gyda’ch  ${partner}.`,
    line2: 'Ni fyddwn yn rhannu eich manylion cyswllt os ydych wedi dweud wrthym i’w cadw’n breifat.',
    iUnderstand: 'Rwy’n deall',
    errors: {
      applicant1InterimAppsIUnderstand: iUnderstandErrors,
      applicant2InterimAppsIUnderstand: iUnderstandErrors,
    },
  };
};

const languages = {
  en,
  cy,
};

const interimAppsIUnderstandField = (fieldName: keyof CaseData) => ({
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

export const form: FormContent = {
  fields: {
    applicant1InterimAppsIUnderstand: interimAppsIUnderstandField('applicant1InterimAppsIUnderstand'),
  },
  submit: {
    text: l => l.continue,
  },
};

export const applicant2Form: FormContent = {
  ...form,
  fields: {
    applicant2InterimAppsIUnderstand: interimAppsIUnderstandField('applicant2InterimAppsIUnderstand'),
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form: content.isApplicant2 ? applicant2Form : form,
  };
};
