import { ApplicationType, JurisdictionConnections } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn, Label } from '../../../app/form/Form';
import { enConnectionUserReads } from '../../../app/jurisdiction/bulletedPointsContent';
import { addConnectionsBasedOnQuestions } from '../../../app/jurisdiction/connections';
import { enDomicile, enHabitualResident } from '../../../app/jurisdiction/moreDetailsContent';
import type { CommonContent } from '../../common/common.content';

const jurisdictionConnectionList = [
  JurisdictionConnections.APP_1_APP_2_RESIDENT,
  JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT,
  JurisdictionConnections.APP_2_RESIDENT,
  JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS,
  JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS,
  JurisdictionConnections.APP_1_APP_2_DOMICILED,
  JurisdictionConnections.APP_1_DOMICILED,
  JurisdictionConnections.APP_2_DOMICILED,
  JurisdictionConnections.RESIDUAL_JURISDICTION,
  JurisdictionConnections.APP_1_RESIDENT_JOINT,
];

const en = (
  { isDivorce, partner, applyForDivorce, applyForDissolution, userCase }: CommonContent,
  connections: JurisdictionConnections[]
) => {
  const apply = isDivorce ? applyForDivorce : applyForDissolution;
  const connectionText = enConnectionUserReads(partner, isDivorce);

  const connectionCheckboxes = [
    `My ${partner} and I are habitually resident in England and Wales`,
    `My ${partner} and I were last habitually resident in England and Wales and ones of us continues to reside there`,
    `My ${partner} is habitually resident in England and Wales`,
    'I am habitually resident in England and Wales and have resided there for at least one year immediately before making this application',
    'I am domiciled and habitually resident in England and Wales and have resided there for at least six months immediately before making this application',
    `My ${partner} and I are domiciled in England and Wales`,
    'Only I am domiciled in England and Wales',
    `Only my ${partner} is domiciled in England and Wales`,
    `My ${partner} and I ${
      isDivorce ? 'married each other' : 'registered our civil partnership'
    } in England and Wales and it would be in the interests of justice for the court to assume jurisdiction in this case`,
    'I am habitually resident in England and Wales',
  ];

  const connectionsMadeBasedOnQuestions = addConnectionsBasedOnQuestions(userCase);

  return {
    title: `You can use English or Welsh courts to ${isDivorce ? 'get a divorce' : 'end your civil partnership'}`,
    line1Prefix: `Your answers indicate that you can ${apply} in England and Wales because `,
    line2:
      'There are other ways to be legally connected to England and Wales. These may be important if there is a dispute about whether the courts have jurisdiction over your case',
    habitualResidence: 'Habitual Residence',
    habitualResidenceText: enHabitualResident,
    domicile: 'Domicile',
    domicileText: enDomicile,
    disputesAboutJurisdiction: 'Disputes about jurisdiction',
    disputesAboutJurisdictionText: `If you think there might be a dispute about whether the English and Welsh courts have jurisdiction over your case or you are not sure whether the courts have jurisdiction, then you should get legal advice before submitting this application.<br><br>
      If you think there are additional ways in which you are connected to England and Wales then you can add them below`,
    readMore: `Read more about ${
      connections.length > 1 || connections[0] === JurisdictionConnections.RESIDUAL_JURISDICTION
        ? 'jurisdiction'
        : connections[0] === JurisdictionConnections.APP_1_APP_2_DOMICILED
        ? 'domicile'
        : 'habitual residence'
    } and the other possible legal connections`,
    connectionCheckboxes,
    preMadeConnections: connectionsMadeBasedOnQuestions,
    connectionText,
  };
};

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: userCase => {
    const checkboxes: { name: string; label: Label; value: JurisdictionConnections }[] = [];
    const preMadeConnections = addConnectionsBasedOnQuestions(userCase);
    for (const index in jurisdictionConnectionList) {
      if (
        !preMadeConnections?.includes(jurisdictionConnectionList[index]) &&
        !(
          jurisdictionConnectionList[index] === JurisdictionConnections.APP_1_RESIDENT_JOINT &&
          userCase.applicationType === ApplicationType.SOLE_APPLICATION
        )
      ) {
        checkboxes.push({
          name: 'connections',
          label: l => l.connectionCheckboxes[index],
          value: jurisdictionConnectionList[index],
        });
      }
    }
    return {
      connections: {
        type: 'checkboxes',
        labelSize: 'm',
        values: checkboxes,
      },
    };
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = { en, cy };

export const generateContent: TranslationFn = content => {
  if (!content.userCase.connections?.length) {
    throw new Error('User cannot view "You can use English/Welsh courts" page if they have no connections');
  }

  const translations = languages[content.language](content, content.userCase.connections);
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
