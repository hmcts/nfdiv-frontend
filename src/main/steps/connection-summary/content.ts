import { JurisdictionConnections } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { CommonContent } from '../common/common.content';

const en = ({ isDivorce, partner, formState }: CommonContent) => {
  const enHabitualResident = {
    helpText1: 'Habitual residence',
    helpText2:
      'If your lives are mainly based in England or Wales then you’re what is legally known as ‘habitually resident’.',
    helpText3:
      'This may include working, owning property, having children in school, and your main family life taking place in England or Wales.',
    helpText4:
      'The examples above aren’t a complete list of what makes up habitual residence, and just because some of them apply to you doesn’t mean you’re habitually resident. If you’re not sure, you should get legal advice.',
  };
  const enDomicile = {
    helpText5: 'Domicile',
    helpText6:
      'Your domicile is usually the place in which you were born, regard as your permanent home and to which you have the closest ties.',
    helpText7:
      'However, domicile can be more complex, for example, if you or your parents have moved countries in the past.',
    helpText8: "When you’re born, you acquire a 'domicile of origin'. This is usually:",
    helpText9:
      '<ul class="govuk-list govuk-list--bullet"><li class="govuk-list govuk-list--bullet">the country your father was domiciled in if your parents were married </li> <li class="govuk-list govuk-list--bullet">the country your mother was domiciled in if your parents were unmarried, or your father had died before you were born</li></ul>',
    helpText10:
      "If you leave your domicile of origin and settle in another country as an adult, the new country may become your 'domicile of choice'.",
    helpText11: 'If you’re not sure about your domicile, you should get legal advice.',
  };

  const enContainsHabitualResConnection = (
    connections: JurisdictionConnections[] | undefined
  ): typeof enHabitualResident | undefined => {
    if (
      connections &&
      (connections.includes(JurisdictionConnections.PET_RESP_LAST_RESIDENT) ||
        connections.includes(JurisdictionConnections.RESP_RESIDENT) ||
        connections.includes(JurisdictionConnections.PET_RESIDENT_SIX_MONTHS))
    ) {
      return enHabitualResident;
    }
  };

  const enContainsDomConnection = (
    connections: JurisdictionConnections[] | undefined
  ): typeof enDomicile | undefined => {
    if (
      connections &&
      (connections.includes(JurisdictionConnections.PET_RESP_DOMICILED) ||
        connections.includes(JurisdictionConnections.PET_DOMICILED) ||
        connections.includes(JurisdictionConnections.RESP_DOMICILED))
    ) {
      return enDomicile;
    }
  };

  return {
    title: `You can use English or Welsh courts to ${isDivorce ? 'get a divorce' : 'end your civil partnership'}`,
    line1: `Your answers indicate that you can apply ${
      isDivorce ? 'for a divorce' : 'to end your civil partnership'
    } in England and Wales because:`,
    connectionBulletPoints: {
      [JurisdictionConnections.PET_RESP_LAST_RESIDENT]: `you and your ${partner} were both last habitually resident and one of you still lives here`,
      [JurisdictionConnections.RESP_RESIDENT]: `your ${partner} is habitually resident`,
      [JurisdictionConnections.PET_RESIDENT_SIX_MONTHS]:
        'you’re domiciled and habitually resident and have lived here for at least 6 months',
      [JurisdictionConnections.PET_RESP_DOMICILED]: `both you and your ${partner} are domiciled`,
      [JurisdictionConnections.RESIDUAL_JURISDICTION]:
        'the courts of England and Wales have jurisdiction on a residual basis',
      [JurisdictionConnections.PET_DOMICILED]: 'you are domiciled in England or Wales',
      [JurisdictionConnections.RESP_DOMICILED]: `your ${partner} is domiciled in England or Wales`,
    },
    readMore: 'Read more about your connections',
    ...enContainsHabitualResConnection(formState?.connections),
    ...enContainsDomConnection(formState?.connections),
  };
};

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
