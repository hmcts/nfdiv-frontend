import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';
import { IeOrNaRadioAnswers } from '../../../../common/input-labels.content';

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

const cy = ({ isDivorce, partner }: CommonContent) => ({
  title: 'Ai tystysgrif cyflwyno yw eich tystiolaeth?',
  line1: `Os ydych wedi cael tystysgrif cyflwyno sydd wedi'i chwblhau gan gyflwynydd proses yn cadarnhau bod eich ${partner} wedi derbyn y papurau, nid oes rhaid i chi wneud cais am gyflwyno tybiedig. Rhaid i chi anfon y dystygrif cyflwyno i'r llys. Bydd y llys yn ei hadolygu ac yn penderfynu a all eich ${
    isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
  } barhau heb ymateb gan eich ${partner}.`,
  doYouHaveCertificateOfService: 'A oes gennych chi dystysgrif cyflwyno?',
  errors: {
    applicant1NoResponsePartnerHasCertificateOfService: {
      required: "Dewiswch 'Ie' os oes gennych tystysgrif cyflwyno.",
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
          label: l => l[YesOrNo.YES],
          id: 'hasCertificateOfServiceYes',
          value: YesOrNo.YES,
        },
        {
          label: l => l[YesOrNo.NO],
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

export const radioButtonAnswers = IeOrNaRadioAnswers;

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const radioAnswers = radioButtonAnswers[content.language];
  return {
    ...translations,
    ...radioAnswers,
    form,
  };
};
