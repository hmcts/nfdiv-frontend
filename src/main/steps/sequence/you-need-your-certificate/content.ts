import { TranslationFn } from '../../../app/controller/GetController';

export const generateContent: TranslationFn = ({ isDivorce, partner }) => {
  const en = {
    title: `You need your ${isDivorce ? 'marriage' : 'civil partnership'} certificate`,
    line1: `You need your ${isDivorce ? 'marriage' : 'civil partnership'} certificate to use this service.`,
    line2: `You should ask your ${
      isDivorce ? partner : 'civil partner'
    } for it, if they have it. Or you can <a href="https://www.gov.uk/order-copy-birth-death-marriage-certificate" class="govuk-link" target="_blank">order a certified copy online (opens in a new tab)</a>, if you ${
      isDivorce ? 'got married' : 'formed your civil partnership'
    } in England or Wales.`,
    line3: `If your original ${
      isDivorce ? 'marriage certificate' : 'civil partnership certificate'
    } is not in English, you need to get it translated and certified. You can find translation services online which include certification as part of their service.`,
  };

  const cy: typeof en = {
    title: `Mae arnoch angen eich ${isDivorce ? 'tystysgrif priodas' : 'tystysgrif partneriaeth sifil'}`,
    line1: `Mae arnoch angen eich ${
      isDivorce ? 'tystysgrif priodas' : 'tystysgrif partneriaeth sifil'
    } i ddefnyddio'r gwasanaeth hwn. `,
    line2: `Dylech ofyn i'ch ${
      isDivorce ? partner : 'partner sifil'
    } amdani, os yw'r dystysgrif ganddyn nhw. Fel arall, gallwch <a href="https://www.gov.uk/order-copy-birth-death-marriage-certificate" class="govuk-link" target="_blank">archebu copi ardystiedig ar-lein (agor mewn ffenest newydd)</a>, os gwnaethoch chi ${
      isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil'
    } yng Nghymru neu Loegr.`,
    line3: `Os nad yw eich ${
      isDivorce ? 'tystysgrif priodas' : 'tystysgrif partneriaeth sifil'
    } wreiddiol yn Saesneg, mae arnoch angen trefnu iddi gael ei chyfieithu a'i hardystio. Mae cwmnïau a fydd yn gallu gwneud y gwaith cyfieithu a'r ardystio.`,
  };

  const common = {};

  return { en, cy, common };
};
