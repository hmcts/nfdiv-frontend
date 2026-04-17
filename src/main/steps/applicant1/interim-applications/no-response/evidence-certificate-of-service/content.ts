import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: 'Is your evidence a certificate of service?',
  line1: `If you have received a certificate of service completed by a process server confirming that your ${partner} has received the papers, you do not need to apply for deemed service. You must send the certificate of service to the court. The court will review it and decide whether your ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  } can proceed without a response from your ${partner}.`,
  doYouHaveCertificateOfService: 'Do you have a certificate of service?',
  errors: {
    applicant1NoResponsePartnerHasCertificateOfService: {
      required: "Select 'Yes' if you have certificate of service.",
    },
  },
});

// @TODO translations should be completed then verified
const cy = ({ isDivorce, partner }: CommonContent) => ({
  title: 'Is your evidence a certificate of service?',
  line1: `If you have received a certificate of service completed by a process server confirming that your ${partner} has received the papers, you do not need to apply for deemed service. You must send the certificate of service to the court. The court will review it and decide whether your ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  } can proceed without a response from your ${partner}.`,
  doYouHaveCertificateOfService: 'Do you have a certificate of service?',
  errors: {
    applicant1NoResponsePartnerHasCertificateOfService: {
      required: "Select 'Yes' if you have certificate of service.",
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1NoResponsePartnerHasCertificateOfService: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.doYouHaveCertificateOfService,
      labelHidden: false,
      values: [
        {
          label: l => l.yes,
          id: 'hasCertificateOfServiceYes',
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
          id: 'hasCertificateOfServiceNo',
          value: YesOrNo.NO,
        },
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
