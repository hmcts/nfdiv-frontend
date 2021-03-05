import { TranslationFn } from '../../app/controller/GetController';

export const generateContent: TranslationFn = ({ isDivorce, partner }) => {
  const en = {
    title: isDivorce ? 'You need your marriage certificate' : 'You need your civil partnership certificate',
    line1: `You need your ${isDivorce ? 'marriage certificate' : 'civil partnership certificate'} to use this service.`,
    line2: `You should ask your ${
      isDivorce ? partner : 'civil partner'
    } for it, if they have it. Or you can <a href="https://www.gov.uk/order-copy-birth-death-marriage-certificate" class="govuk-link" target="_blank">order a certified copy online (opens in a new tab)</a>, if you ${
      isDivorce ? 'got married' : 'formed your civil partnership'
    } in England or Wales.`,
    line3: `If your original ${
      isDivorce ? 'marriage certificate' : 'civil partnership certificate'
    } is not in English, you need to get it translated and certified. You can find translation services online which include certification as part of their service.`,
  };

  //TODO translation
  const cy: typeof en = { ...en };

  const common = {};

  return { en, cy, common };
};
