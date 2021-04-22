import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { CommonContent } from '../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: 'Dividing your money and property',
  line1: `It’s usually more straightforward and less expensive if you agree with your ${partner} on how to divide your savings, property, pensions and other assets. There are mediation services available to help you come to an agreement. You’ll be given links to more information after you have submitted this application.`,
  agreeOnDividingAssets: 'If you agree about dividing money and property',
  agreeOnDividingAssetsDetails:
    'You can ask the court to make your agreement legally binding. This is known as applying for a ‘consent order’ (which is a type of financial order). There is an additional fee of £50. You can get legal advice or ask a solicitor to draft a consent order for you. You will be given links to further guidance after you have submitted this application.',
  disagreeOnDividingAssets: 'If you disagree about dividing money and property',
  disagreeOnDividingAssetsDetails:
    'You can ask the court to decide for you. This is known as asking the court to make a ‘financial order’. This means the court will decide how assets will be split. You can also apply for a financial order for your children, if appropriate. The court can also order maintenance payments to be made.',
  readMore: 'Read more about child maintenance',
  readMoreContent: `The court can only make financial orders for children under certain circumstances. You can come to an agreement with your ${partner} and make it legally binding with a consent order, or you can use the Child Maintenance Service.`,
  costs:
    'Applying to the court to make a financial order is done separately, using another form. It costs an additional £255.',
});

// @TODO translations
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
