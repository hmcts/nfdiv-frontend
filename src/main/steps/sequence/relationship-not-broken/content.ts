import { TranslationFn } from '../../../app/controller/GetController';

export const generateContent = (title: string): TranslationFn => ({ isDivorce }) => {
  const en = {
    title: isDivorce ? title : 'You cannot apply to end your civil partnership',
    line1: `Your ${isDivorce ? 'marriage' : 'relationship'} must have irretrievably broken down
      for you to ${isDivorce ? 'get a divorce' : 'end your civil partnership'}. This is the law in England and Wales.`,
    line2: `If you are not sure about ${isDivorce ? 'getting a divorce' : 'ending your civil partnership'},
      you may want to consider relationship advice or counselling. This is available from private therapists and charities like <a href="https://www.relate.org.uk" class="govuk-link">Relate</a>.`,
  };

  // @TODO translations
  const cy: typeof en = {
    ...en,
  };

  const common = {};

  return { en, cy, common };
};
