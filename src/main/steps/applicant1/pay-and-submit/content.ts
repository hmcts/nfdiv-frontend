import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: 'Pay and submit',
  line1: `Your joint application has been agreed by you and your ${partner}. You need to pay the application fee of £550 before it can be submitted. The payment system does not allow you to split the payment.`,
  line2: `You cannot use help with fees to pay because your ${partner} did not apply for help with fees. Both of you need to apply and be eligible in a joint application.`,
  detailsHeading: 'If you cannot pay',
  line3: `The payment system will only allow you to pay, but you could talk to your ${partner} about whether they would be prepared to send you some money.`,
  line4:
    'Or you could submit a sole application. If you apply as a sole applicant, only you have to apply for Help With Fees. You will not have to re-enter the information you have already provided. You will need to provide some new information though.',
  line5: 'You can submit a sole application here',
  line6: 'This joint application will not be submitted until you pay the fee.',
  continue: 'Pay and submit',
});

const cy: typeof en = en;

export const form: FormContent = {
  fields: {},
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
