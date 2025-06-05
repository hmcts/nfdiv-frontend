import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = ({ userCase, isDivorce, marriage, civilPartnership, partner, required }) => {
  return {
    title: `Check the ${isDivorce ? marriage : civilPartnership} certificate for differences in your ${partner}'s name`,
    line1: `We need to know if your ${partner}'s name is written differently on your ${isDivorce ? marriage : civilPartnership} certificate.`,
    line2: 'This could be because:',
    point1: `Your ${partner}'s changed their names after they ${isDivorce ? 'got married' : 'formed your civil partnership'}. For example, if you have taken your ${partner}'s last name or first name or you have a double-barrelled name ("Sarah Smith-David").`,
    point2: `Part of their name was not included on the ${isDivorce ? marriage : civilPartnership} certificate.`,
    point3: `Their name is spelt differently on the ${isDivorce ? marriage : civilPartnership} certificate.`,
    point4: "They are also known by a different name.",
    warning: `If your ${partner}'s name on your ${isDivorce ? marriage : civilPartnership} certificate does not match the name you have provided, you will have to upload some evidence like a government issued ID, a passport, driving license, birth certificate, or deed poll.`,
    doesNameMatchTheCertificate: `Is ${userCase.applicant2FirstNames} ${userCase.applicant2MiddleNames} ${userCase.applicant2LastNames} exactly how your ${partner}'s name is written on your ${isDivorce ? marriage : civilPartnership} certificate?`,
    yes: 'Yes',
    no: 'No',
    errors: {
      applicant2ConfirmNameMatchesCertificate: {
        required,
      },
    },
  };
};

const cy: typeof en = ({ userCase, isDivorce, marriage, civilPartnership, partner, required }) => {
  return {
    title: `Check the ${isDivorce ? marriage : civilPartnership} certificate for differences in your ${partner}'s name`,
    line1: `We need to know if your ${partner}'s name is written differently on your ${isDivorce ? marriage : civilPartnership} certificate.`,
    line2: 'This could be because:',
    point1: `Your ${partner}'s changed their names after they ${isDivorce ? 'got married' : 'formed your civil partnership'}. For example, if you have taken your ${partner}'s last name or first name or you have a double-barrelled name ("Sarah Smith-David").`,
    point2: `Part of their name was not included on the ${isDivorce ? marriage : civilPartnership} certificate.`,
    point3: `Their name is spelt differently on the ${isDivorce ? marriage : civilPartnership} certificate.`,
    point4: "They are also known by a different name.",
    warning: `If your ${partner}'s name on your ${isDivorce ? marriage : civilPartnership} certificate does not match the name you have provided, you will have to upload some evidence like a government issued ID, a passport, driving license, birth certificate, or deed poll.`,
    doesNameMatchTheCertificate: `Is ${userCase.applicant2FirstNames} ${userCase.applicant2MiddleNames} ${userCase.applicant2LastNames} exactly how your ${partner}'s name is written on your ${isDivorce ? marriage : civilPartnership} certificate?`,
    yes: 'Yes',
    no: 'No',
    errors: {
      applicant2ConfirmNameMatchesCertificate: {
        required,
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant2ConfirmNameMatchesCertificate: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.doesNameMatchTheCertificate,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: value => isFieldFilledIn(value),
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
