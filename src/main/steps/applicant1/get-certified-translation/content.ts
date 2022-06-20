import { TranslationFn } from '../../../app/controller/GetController';

const en = ({ isDivorce }) => ({
  title: `You need to get a ‘certified translation’ of your ${
    isDivorce ? 'marriage' : 'civil partnership'
  } certificate`,
  line1: `You need to get your ${
    isDivorce ? 'marriage' : 'civil partnership'
  } certificate translated into English and certified. You can find translation companies online which also do certification as part of their service.`,
  line2: `When you have your translated and certified ${
    isDivorce ? 'marriage' : 'civil partnership'
  } certificate then return to this application and continue. You will be asked to upload a photo of it later, or post it in.`,
  line3:
    'If you have a translated certificate that is not certified then you need to get it certified by a ‘notary public’. You can find a notary public through the <a href="https://www.thenotariessociety.org.uk/" class="govuk-link">Notaries Society</a> or the <a href="https://scrivener-notaries.org.uk/" class="govuk-link">Society of Scrivener Notaries</a>.',
});

const cy: typeof en = ({ isDivorce }) => ({
  title: `Mae arnoch angen ‘cyfieithiad ardystiedig’ o’ch tystysgrif  ${isDivorce ? 'priodas' : 'partneriaeth sifil'}`,
  line1: `Mae angen i chi gael eich tystysgrif ${
    isDivorce ? 'priodas' : 'partneriaeth sifil'
  } wedi’i hardystio a’i chyfieithu i’r Gymraeg. Gallwch ddod o hyd i gwmnïau cyfieithu ar-lein sydd hefyd yn ardystio fel rhan o’u gwasanaeth.`,
  line2: `Pan fydd gennych eich tystysgrif ${
    isDivorce ? 'priodas' : 'partneriaeth sifil'
  } wedi’i chyfieithu a’i hardystio, yna dychwelwch i’r cais hwn cyn cario ymlaen â’r cais. Gofynnir i chi lanlwytho llun ohoni’n ddiweddarach, neu ei phostio atom.`,
  line3:
    'Os oes gennych dystysgrif wedi’i chyfieithu nad yw wedi’i hardystio yna mae angen iddi gael ei hardystio gan ‘notari cyhoeddus\'. Gallwch ddod o hyd i notari cyhoeddus drwy gysylltu â naill ai <a href="https://www.thenotariessociety.org.uk/" class="govuk-link">Gymdeithas y Notarïaid</a> neu <a href="https://scrivener-notaries.org.uk/" class="govuk-link">Gymdeithas Ysgrifenyddion Notarïaid</a>.',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
  };
};
