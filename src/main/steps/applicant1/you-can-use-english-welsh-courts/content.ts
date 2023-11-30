import { Checkbox } from '../../../app/case/case';
import { ApplicationType, DivorceOrDissolution, JurisdictionConnections } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn, Label } from '../../../app/form/Form';
import { cyConnectionUserReads, enConnectionUserReads } from '../../../app/jurisdiction/bulletedPointsContent';
import { addConnectionsBasedOnQuestions } from '../../../app/jurisdiction/connections';
import {
  cyDomicile,
  cyHabitualResident,
  enDomicile,
  enHabitualResident,
} from '../../../app/jurisdiction/moreDetailsContent';
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
    and Wales and one of us continues to reside there`,
    [JurisdictionConnections.APP_2_RESIDENT_SOLE]: `My ${partner} is habitually resident in England and Wales`,
    [JurisdictionConnections.APP_2_RESIDENT_JOINT]: `My ${partner} is habitually resident in England and Wales`,
    [JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS]: `${
      isJointApplication
        ? `Me or my ${partner} are habitually resident in England and Wales and have resided there
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
    habitualResidenceText: enHabitualResident.body,
    domicile: 'Domicile',
    domicileText: enDomicile.body,
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

const cy: typeof en = (
  { isDivorce, partner, applyForDivorce, applyForDissolution, userCase, isJointApplication }: CommonContent,
  connections: JurisdictionConnections[]
) => {
  const apply = isDivorce ? applyForDivorce : applyForDissolution;
  const connectionText = cyConnectionUserReads(partner, isDivorce, isJointApplication);

  const connectionCheckboxes = {
    [JurisdictionConnections.APP_1_APP_2_RESIDENT]: `Rwyf i a fy ${partner} yn preswylio’n arferol yng Nghymru a Lloegr`,
    [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT]: `Roeddwn i a fy ${
      isDivorce ? 'n' : ''
    }${partner} yn preswylio’n arferol ddiwethaf yng Nghymru a Lloegr, ac mae un ohonom yn parhau i breswylio yno`,
    [JurisdictionConnections.APP_2_RESIDENT_SOLE]: `Mae fy ${
      isDivorce ? 'n' : ''
    }${partner} yn preswylio’n arferol yng Nghymru a Lloegr`,
    [JurisdictionConnections.APP_2_RESIDENT_JOINT]: `Mae fy ${
      isDivorce ? 'n' : ''
    }${partner} yn preswylio’n arferol yng Nghymru a Lloegr`,
    [JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS]: `${
      isJointApplication
        ? `Rwyf i neu fy ${partner} yn preswylio'n arferol yng Nghymru a Lloegr ac wedi preswylio yno am o leiaf blwyddyn yn union cyn gwneud y cais hwn`
        : 'Rwyf yn preswylio’n arferol yng Nghymru a Lloegr, ac rwyf wedi preswylio yno am o leiaf blwyddyn yn union cyn gwneud y cais hwn'
    }`,
    [JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS]: `${
      isJointApplication
        ? `Rwyf i neu fy ${partner} â'n domisil, ac yn preswylio'n arferol, yng Nghymru a Lloegr ac wedi preswylio yno am o leiaf chwe mis yn union cyn gwneud y cais hwn`
        : 'Mae fy nomisil yng Nghymru a Lloegr, rwy’n preswylio’n arferol yno, ac rwyf wedi preswylio yno am o leiaf chwe mis yn union cyn gwneud y cais hwn'
    }`,
    [JurisdictionConnections.APP_1_APP_2_DOMICILED]: `Mae fy nomisil i, a domisil fy ${
      isDivorce ? 'n' : ''
    }${partner} yng Nghymru a Lloegr`,
    [JurisdictionConnections.APP_1_DOMICILED]: 'Dim ond fy nomisil i sydd yng Nghymru a Lloegr',
    [JurisdictionConnections.APP_2_DOMICILED]: `Dim ond domisil fy ${
      isDivorce ? 'n' : ''
    }${partner} sydd yng Nghymru a Lloegr`,
    [JurisdictionConnections.RESIDUAL_JURISDICTION_CP]: `Mi wnes i a fy mhartner sifil gofrestru ein partneriaeth sifil yng Nghymru a Lloegr,
      a byddai er budd cyfiawnder i'r llys ysgwyddo awdurdodaeth yn yr achos hwn`,
    [JurisdictionConnections.RESIDUAL_JURISDICTION_D]: `Mi wnes i a fy ${partner} briodi ein gilydd yng Nghymru a
      Lloegr, a byddai er budd cyfiawnder i’r llys ysgwyddo awdurdodaeth yn yr achos hwn`,
    [JurisdictionConnections.APP_1_RESIDENT_JOINT]: 'Rwyf yn preswylio’n arferol yng Nghymru a Lloegr',
  };

  return {
    title: `Gallwch ddefnyddio’r llysoedd yng Nghymru neu Loegr i ${
      isDivorce ? 'gael ysgariad' : 'dod â’ch partneriaeth sifil i ben'
    }`,
    line1Prefix: `Mae eich atebion yn dangos y gallwch ${apply} yng Nghymru a Lloegr oherwydd`,
    line2:
      'Mae ffyrdd eraill o fod â chysylltiad cyfreithiol â Chymru a Lloegr. Gall y rhain fod yn bwysig os oes anghydfod o ran p’un a oes gan y llysoedd awdurdodaeth dros eich achos ai peidio.',
    habitualResidence: 'Preswylio’n arferol',
    habitualResidenceText: cyHabitualResident.body,
    domicile: 'Domisil',
    domicileText: cyDomicile.body,
    disputesAboutJurisdiction: 'Anghydfodau ynghylch awdurdodaeth',
    disputesAboutJurisdictionText: `Os ydych yn meddwl gall fod anghydfod ynghylch p’un a oes gan y llysoedd yng Nghymru a Lloegr awdurdodaeth dros eich achos neu beidio, neu os ydych yn ansicr p’un a oes gan y llysoedd awdurdodaeth, yna dylech gael cyngor cyfreithiol cyn cyflwyno’r cais hwn.<br><br>
      Os ydych yn meddwl bod yna ffyrdd ychwanegol y gallwch fod â chysylltiad â Chymru a Lloegr, gallwch eu hychwanegu isod`,
    readMore: `Darllenwch am ${
      connections.length > 1 ||
      [JurisdictionConnections.RESIDUAL_JURISDICTION_CP, JurisdictionConnections.RESIDUAL_JURISDICTION_D].includes(
        connections[0]
      )
        ? 'awdurdodaeth'
        : connections[0] === JurisdictionConnections.APP_1_APP_2_DOMICILED
          ? 'domisil'
          : 'preswylio’n arferol'
    } a chysylltiadau cyfreithiol eraill posib`,
    connectionCheckboxes,
    preMadeConnections: addConnectionsBasedOnQuestions(userCase),
    connectionText,
  };
};

export const form: FormContent = {
  fields: userCase => {
    const checkboxes: { name: string; label: Label; value: JurisdictionConnections }[] = [];
    const preMadeConnections = addConnectionsBasedOnQuestions(userCase);
    const jointConnectionsOnly = [
      JurisdictionConnections.APP_1_RESIDENT_JOINT,
      JurisdictionConnections.APP_2_RESIDENT_JOINT,
    ];

    const removePreMadeConnections = c => !preMadeConnections.includes(c);
    const removeConnectionsJC2 = c => !jointConnectionsOnly.includes(c);
    const removeConnectionC = c => c !== JurisdictionConnections.APP_2_RESIDENT_SOLE;
    const removeConnectionI = c => c !== JurisdictionConnections.RESIDUAL_JURISDICTION_CP;
    const removeConnectionI2 = c => c !== JurisdictionConnections.RESIDUAL_JURISDICTION_D;

    const filters = [removePreMadeConnections];

    if (userCase.applicationType === ApplicationType.SOLE_APPLICATION) {
      filters.push(removeConnectionsJC2);
    } else {
      filters.push(removeConnectionC);
    }
    if (userCase.divorceOrDissolution === DivorceOrDissolution.DIVORCE) {
      filters.push(removeConnectionI);
    }
    if (userCase.divorceOrDissolution === DivorceOrDissolution.DISSOLUTION || userCase.sameSex !== Checkbox.Checked) {
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
