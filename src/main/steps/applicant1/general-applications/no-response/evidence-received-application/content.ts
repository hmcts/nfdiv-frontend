import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: `Has your ${partner} received the ${isDivorce ? 'divorce papers' : 'papers to end your civil partnership'}`,
  line1: `If you have evidence that your ${partner} has received all the divorce papers, you may be able to apply for 'deemed service'. This means that the court accepts that your ${partner} has received the papers, so your ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  } can proceed without their response.`,
  line2: 'Suitable evidence includes:',
  suitableEvidence: {
    photo: `a photo or screenshot of a message from your ${partner} that shows they have received the papers.`,
    statement: `a statement from your or a third party explaining how your know your ${partner} has received the papers.`,
    message: `a message from us to tell you that your ${partner} has started a response.`,
  },
  canYouProveHeader: `Can you prove that your ${partner} has received the papers?`,
  proveYes: `Yes, I can prove that my ${partner} has received the papers.`,
  proveNo: 'No, I do not have any suitable evidence.',
  errors: {
    noResponsePartnerHasReceivedPapers: {
      required: `You must confirm whether or not you can prove that your ${partner} has received the papers.`,
    },
  },
});

// @TODO translations
const cy: typeof en = en;

export const form: FormContent = {
  fields: {
    applicant1NoResponsePartnerHasReceivedPapers: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.canYouProveHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.proveYes,
          id: 'proveYes',
          value: YesOrNo.YES,
        },
        {
          label: l => l.proveNo,
          id: 'proveNo',
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
