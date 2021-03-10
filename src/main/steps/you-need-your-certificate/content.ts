import { TranslationFn } from '../../app/controller/GetController';
import { commonContent } from '../common/common.content';
import { form } from '../do-you-have-your-certificate/content';

const en = (relationship, isDivorce, partner, commonTranslations) => ({
  title: `You need your ${relationship} certificate`,
  line1: `You need your ${relationship} certificate to use this service.`,
  line2: `You should ask your ${
    isDivorce ? partner : commonTranslations.civilPartner
  } for it, if they have it. Or you can <a href="https://www.gov.uk/order-copy-birth-death-marriage-certificate" class="govuk-link" target="_blank">order a certified copy online (opens in a new tab)</a>, if you ${
    isDivorce ? 'got married' : 'formed your civil partnership'
  } in England or Wales.`,
  line3: `If your original ${relationship} certificate is not in English, you need to get it translated and certified. You can find translation services online which include certification as part of their service.`,
});

const cy: typeof en = (relationship, isDivorce, partner, commonTranslations) => ({
  title: `Mae arnoch angen eich tystysgrif ${relationship}`,
  line1: `Mae arnoch angen eich tystysgrif ${relationship} i ddefnyddio'r gwasanaeth hwn. `,
  line2: `Dylech ofyn i'ch ${
    isDivorce ? partner : commonTranslations.civilPartner
  } amdani, os yw'r dystysgrif ganddyn nhw. Fel arall, gallwch <a href="https://www.gov.uk/order-copy-birth-death-marriage-certificate" class="govuk-link" target="_blank">archebu copi ardystiedig ar-lein (agor mewn ffenest newydd)</a>, os gwnaethoch chi ${
    isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil'
  } yng Nghymru neu Loegr.`,
  line3: `Os nad yw eich tystysgrif ${relationship} wreiddiol yn Saesneg, mae arnoch angen trefnu iddi gael ei chyfieithu a'i hardystio. Gallwch ddod o hyd i wasanaethau cyfieithu ar-lein sy'n cynnwys ardystio fel rhan o'u gwasanaeth.`,
});

export const generateContent: TranslationFn = ({ language, isDivorce, partner, commonTranslations }) => {
  const common = commonTranslations as commonContent;
  const relationship = isDivorce ? common.marriage : common.civilPartnership;
  const translations =
    language === 'cy'
      ? cy(relationship, isDivorce, partner, commonTranslations)
      : en(relationship, isDivorce, partner, commonTranslations);
  return {
    ...translations,
    form,
  };
};
