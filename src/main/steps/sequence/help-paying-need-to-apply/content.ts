import { TranslationFn } from '../../../app/controller/GetController';

export const generateContent = (title: string): TranslationFn => ({ isDivorce }) => {
  const en = {
    title: isDivorce ? title : 'You need to apply for help with your fees',
    line1: `Your need to apply for <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" target="_blank">help with your fees (opens in new tab)</a> before you continue with this ${
      isDivorce ? 'divorce' : 'ending a civil partnership'
    } application. `,
    line2:
      'Enter the court form number ‘D8’ when asked. This will be one of the first questions when you <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" target="_blank">apply for help with your fees (opens in new tab)</a>.',
    line3: `After you have applied then you will receive a Help with Fees reference number. You should enter the reference number when you return to this ${
      isDivorce ? 'divorce' : 'ending a civil partnership'
    } application.`,
  };

  // @TODO translations
  const cy: typeof en = {
    ...en,
  };

  const common = {};

  return { en, cy, common };
};
