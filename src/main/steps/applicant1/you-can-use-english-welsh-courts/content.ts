import { Checkbox } from '../../../app/case/case';
import { ApplicationType, DivorceOrDissolution, JurisdictionConnections } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn, Label } from '../../../app/form/Form';
import { enConnectionUserReads } from '../../../app/jurisdiction/bulletedPointsContent';
import { addConnectionsBasedOnQuestions } from '../../../app/jurisdiction/connections';
import { enDomicile, enHabitualResident } from '../../../app/jurisdiction/moreDetailsContent';
import type { CommonContent } from '../../common/common.content';

const jurisdictionConnectionList = [
  JurisdictionConnections.APP_1_APP_2_RESIDENT,
  JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT,
  JurisdictionConnections.APP_2_RESIDENT_SOLE,
  JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS,
  JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS,
  JurisdictionConnections.APP_1_APP_2_DOMICILED,
  JurisdictionConnections.APP_1_DOMICILED,
  JurisdictionConnections.APP_2_DOMICILED,
  JurisdictionConnections.RESIDUAL_JURISDICTION_CP,
  JurisdictionConnections.RESIDUAL_JURISDICTION_D,
  JurisdictionConnections.APP_1_RESIDENT_JOINT,
];

const en = (
  { isDivorce, partner, applyForDivorce, applyForDissolution, userCase, isJointApplication }: CommonContent,
  connections: JurisdictionConnections[]
) => {
  const apply = isDivorce ? applyForDivorce : applyForDissolution;
  const connectionText = enConnectionUserReads(partner, isDivorce, isJointApplication);

  const connectionCheckboxes = {
    [JurisdictionConnections.APP_1_APP_2_RESIDENT]: `My ${partner} and I are habitually resident in England and Wales`,
    [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT]: `My ${partner} and I were last habitually resident in England
    and Wales and ones of us continues to reside there`,
    [JurisdictionConnections.APP_2_RESIDENT_SOLE]: `My ${partner} is habitually resident in England and Wales`,
    [JurisdictionConnections.APP_2_RESIDENT_JOINT]: `My ${partner} is habitually resident in England and Wales`,
    [JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS]: `${
      isJointApplication
        ? `Me or my ${partner} are habitually resident in England and Wales and has resided there
      for at least one year immediately before making this application`
        : 'I am habitually resident in England and Wales and have resided there for at least one year immediately ' +
          'before making this application'
    }`,
    [JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS]: `${
      isJointApplication
        ? `Me or my ${partner} are domiciled and habitually resident in England and Wales and
    have resided there for at least six months immediately before making this application`
        : 'I am domiciled and habitually resident in England and Wales and have resided there for at least six months ' +
          'immediately before making this application'
    }`,
    [JurisdictionConnections.APP_1_APP_2_DOMICILED]: `My ${partner} and I are domiciled in England and Wales`,
    [JurisdictionConnections.APP_1_DOMICILED]: 'Only I am domiciled in England and Wales',
    [JurisdictionConnections.APP_2_DOMICILED]: `Only my ${partner} is domiciled in England and Wales`,
    [JurisdictionConnections.RESIDUAL_JURISDICTION_CP]:
      'My civil partner and I registered our civil partnership in England and Wales ' +
      'and it would be in the interests of justice for the court to assume jurisdiction in this case',
    [JurisdictionConnections.RESIDUAL_JURISDICTION_D]: `My ${partner} and I married each other in England and Wales
    and it would be in the interests of justice for the court to assume jurisdiction in this case`,
    [JurisdictionConnections.APP_1_RESIDENT_JOINT]: 'I am habitually resident in England and Wales',
  };

  return {
    title: `You can use English or Welsh courts to ${isDivorce ? 'get a divorce' : 'end your civil partnership'}`,
    line1Prefix: `Your answers indicate that you can ${apply} in England and Wales because`,
    line2:
      'There are other ways to be legally connected to England and Wales. These may be important if there is a dispute about whether the courts have jurisdiction over your case.',
    habitualResidence: 'Habitual Residence',
    habitualResidenceText: enHabitualResident,
    domicile: 'Domicile',
    domicileText: enDomicile,
    disputesAboutJurisdiction: 'Disputes about jurisdiction',
    disputesAboutJurisdictionText: `If you think there might be a dispute about whether the English and Welsh courts have jurisdiction over your case or you are not sure whether the courts have jurisdiction, then you should get legal advice before submitting this application.<br><br>
      If you think there are additional ways in which you are connected to England and Wales then you can add them below`,
    readMore: `Read more about ${
      connections.length > 1 ||
      [JurisdictionConnections.RESIDUAL_JURISDICTION_CP, JurisdictionConnections.RESIDUAL_JURISDICTION_D].includes(
        connections[0]
      )
        ? 'jurisdiction'
        : connections[0] === JurisdictionConnections.APP_1_APP_2_DOMICILED
        ? 'domicile'
        : 'habitual residence'
    } and the other possible legal connections`,
    connectionCheckboxes,
    preMadeConnections: addConnectionsBasedOnQuestions(userCase),
    connectionText,
  };
};

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: userCase => {
    const checkboxes: { name: string; label: Label; value: JurisdictionConnections }[] = [];
    const preMadeConnections = addConnectionsBasedOnQuestions(userCase);

    const removePreMadeConnections = c => !preMadeConnections.includes(c);
    const removeConnectionJ = c => c !== JurisdictionConnections.APP_1_RESIDENT_JOINT;
    const removeConnectionC = c => c !== JurisdictionConnections.APP_2_RESIDENT_SOLE;
    const removeConnectionC2 = c => c !== JurisdictionConnections.APP_2_RESIDENT_JOINT;
    const removeConnectionI = c => c !== JurisdictionConnections.RESIDUAL_JURISDICTION_CP;
    const removeConnectionI2 = c => c !== JurisdictionConnections.RESIDUAL_JURISDICTION_D;

    const filters = [removePreMadeConnections];

    if (userCase.applicationType === ApplicationType.SOLE_APPLICATION) {
      filters.push(removeConnectionJ);
      filters.push(removeConnectionC2);
    }
    if (userCase.applicationType === ApplicationType.JOINT_APPLICATION) {
      filters.push(removeConnectionC);
    }
    if (userCase.divorceOrDissolution !== DivorceOrDissolution.DISSOLUTION) {
      filters.push(removeConnectionI);
    }
    if (userCase.divorceOrDissolution === DivorceOrDissolution.DIVORCE && userCase.sameSex !== Checkbox.Checked) {
      filters.push(removeConnectionI2);
    }

    const remainingConnections = filters.reduce((list, f) => list.filter(f), jurisdictionConnectionList);

    remainingConnections.forEach(connection => {
      checkboxes.push({
        name: 'connections',
        label: l => l.connectionCheckboxes[connection],
        value: connection,
      });
    });
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
