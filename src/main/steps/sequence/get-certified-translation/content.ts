import { TranslationFn } from '../../../app/controller/GetController';

export const generateContent: TranslationFn = ({ isDivorce }) => {
  const relationship = isDivorce ? 'marriage' : 'civil partnership';
  const en = {
    title: `You need to get a ‘certified translation’ of your ${relationship} certificate?`,
    line1: `You need to get your ${relationship} certificate translated into English and certified. You can find translation companies online which also do certification as part of their service.`,
    line2: `When you have your translated and certified ${relationship} certificate then return to this application and continue. You will be asked to upload a photo of it later, or post it in.`,
    subHeading: 'If you have a translated certificate but it is not certified',
    line3:
      'You need to get it certified by a notary public’. You can find a notary public through the <a href="https://www.thenotariessociety.org.uk/" class="govuk-link">Notaries Society</a> or the <a href="https://scrivener-notaries.org.uk/" class="govuk-link">Society of Scrivener Notaries</a>.',
  };

  const cy: typeof en = {
    ...en,
  };

  const common = {};

  return { en, cy, common };
};
