import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: 'Apply to send the papers a different way',
  line1: `You can apply to send the documents to your ${partner} in a way other than by posting them. This is known as 'alternative service'. You could apply to send them:`,
  bullet1: 'by email only, without posting them',
  bullet2: 'by text message or WhatsApp, if you know their phone number',
  bullet3: 'by private message on social media',
  line2:
    'The court can send the papers by email. If you wish to send the documents by text message, WhatsApp or using social media, you will need to arrange this yourself.',
  line3: `If you know your ${partner} is living outside of England or Wales, you may wish to seek legal advice about how to legally serve the documents on your ${partner} in the country they're living in.`,
  inputLabel: 'Would you like to apply for alternative service?',
  no: 'No, I want to try something else',
  errors: {
    applicant1NoRespAddressWillApplyAltService: {
      required: 'Select yes if you want to apply for alternative service.',
    },
  },
});

// @TODO translations should be completed then verified
const cy = ({ partner }: CommonContent) => ({
  title: 'Apply to send the papers a different way',
  line1: `You can apply to send the documents to your ${partner} in a way other than by posting them. This is known as 'alternative service'. You could apply to send them:`,
  bullet1: 'by email only, without posting them',
  bullet2: 'by text message or WhatsApp, if you know their phone number',
  bullet3: 'by private message on social media',
  line2:
    'The court can send the papers by email. If you wish to send the documents by text message, WhatsApp or using social media, you will need to arrange this yourself.',
  line3: `If you know your ${partner} is living outside of England or Wales, you may wish to seek legal advice about how to legally serve the documents on your ${partner} in the country they're living in.`,
  inputLabel: 'Would you like to apply for alternative service?',
  no: 'No, I want to try something else',
  errors: {
    applicant1NoRespAddressWillApplyAltService: {
      required: 'Select yes if you want to apply for alternative service.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1NoRespAddressWillApplyAltService: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.inputLabel,
      labelHidden: false,
      values: [
        {
          label: l => l.yes,
          id: 'yes',
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
          id: 'no',
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
