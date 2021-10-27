import { JurisdictionConnections } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { enContainsDomConnection, enContainsHabitualResConnection } from '../../../app/jurisdiction/getResTypeContent';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, partner, formState }: CommonContent) => {
  return {
    title: `You can use English or Welsh courts to ${isDivorce ? 'get a divorce' : 'end your civil partnership'}`,
    line1: `Your answers indicate that you can apply ${
      isDivorce ? 'for a divorce' : 'to end your civil partnership'
    } in England and Wales because:`,
    connectionBulletPoints: {
      [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT]: `you and your ${partner} were both last habitually resident and one of you still lives here`,
      [JurisdictionConnections.APP_2_RESIDENT]: `your ${partner} is habitually resident`,
      [JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS]:
        'you’re domiciled and habitually resident and have lived here for at least 6 months',
      [JurisdictionConnections.APP_1_APP_2_DOMICILED]: `both you and your ${partner} are domiciled`,
      [JurisdictionConnections.RESIDUAL_JURISDICTION]:
        'the courts of England and Wales have jurisdiction on a residual basis',
      [JurisdictionConnections.APP_1_DOMICILED]: 'you are domiciled in England or Wales',
      [JurisdictionConnections.APP_2_DOMICILED]: `your ${partner} is domiciled in England or Wales`,
    },
    readMore: 'Read more about your connections',
    ...enContainsHabitualResConnection(formState?.connections),
    ...enContainsDomConnection(formState?.connections),
  };
};

// @TODO translations
const cy: typeof en = en;

export const form: FormContent = {
  fields: {
    connections: {
      type: 'hidden',
      label: l => l.title,
      labelHidden: true,
    },
  },
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
