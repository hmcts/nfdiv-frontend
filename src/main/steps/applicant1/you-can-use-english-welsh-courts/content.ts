import { ApplicationType, JurisdictionConnections } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import type { CommonContent } from '../../common/common.content';

const en = (
  { isDivorce, partner, applyForDivorce, applyForDissolution }: CommonContent,
  connections: JurisdictionConnections[]
) => {
  const apply = isDivorce ? applyForDivorce : applyForDissolution;
  const enApp1App2Resident = {
    line1: `you and your ${partner} are habitually resident in England and Wales`,
  };
  const enApp1App2LastResident = {
    line1: `you and your ${partner} were last habitually resident in England and Wales and one of you continues to reside there.`,
  };
  const enApp2Resident = {
    line1: `your ${partner} is habitually resident in England and Wales.`,
  };
  const enApp1Resident = {
    line1: 'you are habitually resident in England and Wales.',
  };
  const enApp1ResidentTwelveMonths = {
    line1:
      'you are habitually resident and have resided there for at least one year immediately before making this application.',
  };
  const enApp1ResidentSixMonths = {
    line1:
      'You are domiciled and habitually resident in England and Wales and have resided there for at least six months immediately before making this application',
  };
  const enApp1App2Domiciled = {
    line1: `you and your ${partner} are domiciled in England and Wales`,
  };
  const enApp1Domiciled = {
    line1: 'Only you are domiciled in England and Wales',
  };
  const enApp2Domiciled = {
    line1: `Only your ${partner} is domiciled in England and Wales`,
  };
  const enResidualJurisdiction = {
    line1: `you and your ${partner} ${
      isDivorce ? 'married each other' : 'registered your civil partnership'
    } in England and Wales and it would be in the interests of justice for the court to assume jurisdiction in this case`,
  };
  const enConnections: Partial<Record<JurisdictionConnections, typeof enApp1App2Resident>> = {
    [JurisdictionConnections.APP_1_APP_2_RESIDENT]: enApp1App2Resident, // A
    [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT]: enApp1App2LastResident, // B
    [JurisdictionConnections.APP_2_RESIDENT]: enApp2Resident, // C
    [JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS]: enApp1ResidentTwelveMonths, // D
    [JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS]: enApp1ResidentSixMonths, // E
    [JurisdictionConnections.APP_1_APP_2_DOMICILED]: enApp1App2Domiciled, // F
    [JurisdictionConnections.APP_1_DOMICILED]: enApp1Domiciled, // G
    [JurisdictionConnections.APP_2_DOMICILED]: enApp2Domiciled, // H
    [JurisdictionConnections.RESIDUAL_JURISDICTION]: enResidualJurisdiction, // I
    [JurisdictionConnections.APP_1_RESIDENT_JOINT]: enApp1Resident, // J
  };

  const connectionCheckboxes = {
    APP_1_APP_2_RESIDENT: `My ${partner} and I are habitually resident in England and Wales`,
    APP_1_APP_2_LAST_RESIDENT: `My ${partner} and I were last habitually resident in England and Wales and ones of us continues to reside there`,
    APP_2_RESIDENT: `My ${partner} is habitually resident in England and Wales`,
    APP_1_RESIDENT_TWELVE_MONTHS:
      'I am habitually resident in England and Wales and have resided there for at least one year immediately before making this application',
    APP_1_RESIDENT_SIX_MONTHS:
      'I am domiciled and habitually resident in England and Wales and have resided there for at least six months immediately before making this application',
    APP_1_APP_2_DOMICILED: `My ${partner} and I are domiciled in England and Wales`,
    APP_1_DOMICILED: 'Only I am domiciled in England and Wales',
    APP_2_DOMICILED: `Only my ${partner} is domiciled in England and Wales`,
    RESIDUAL_JURISDICTION: `My ${partner} and I ${
      isDivorce ? 'married each other' : 'registered our civil partnership'
    } in England and Wales and it would be in the interests of justice for the court to assume jurisdiction in this case`,
    APP_1_RESIDENT_JOINT: 'I am habitually resident in England and Wales',
  };

  return {
    title: `You can use English or Welsh courts to ${isDivorce ? 'get a divorce' : 'end your civil partnership'}`,
    line1Prefix: `Your answers indicate that you can ${apply} in England and Wales because `,
    line2:
      'There are other ways to be legally connected to England and Wales. These may be important if there is a dispute about whether the courts have jurisdiction over your case',
    habitualResidence: 'Habitual Residence',
    habitualResidenceText:
      'Your habitual residence is the place in which your life is mainly based. You must be settled there and intend to stay settled there. ' +
      'Some of the following may apply: you work there, own property, have your children in school there, and your main family life takes place there.',
    domicile: 'Domicile',
    domicileText: `Your domicile is the place of your permanent home in which you live, or to which you intend to return.<br><br>
      When you were born you will have acquired your parents' domicile (for example, your father's if they were married, or your mother's if they weren’t married or if your father died before you were born).
      If you have since moved to another country and made that your permanent home then your domicile may have moved there.<br><br>
      If you were born in England and Wales, lived your entire life here, and intend to stay here, then it is very likely that you’ll be both habitually resident and domiciled here.`,
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
    ...connectionCheckboxes,
    connections,
    enConnections,
    ...enConnections[connections[0]],
  };
};

const cy = ({ isDivorce, partner }: CommonContent, connections: JurisdictionConnections[]) => {
  const apply = isDivorce ? 'cais am ysgariad' : 'cais';
  const cyApp1App2Resident = {
    line1: `Mae eich atebion yn dangos y gallwch wneud ${apply} yng Nghymru a Lloegr am eich bod ill dau yn preswylio yno’n arferol.`,
    readMore: 'Darllenwch fwy am breswylio’n arferol',
    helpText1:
      'Os ydych chi’n treulio’r rhan fwyaf o’ch amser yng Nghymru a Lloegr, rydych yn ‘preswylio’n arferol’ yno yn ôl y gyfraith.',
    helpText2:
      'Gall hyn gynnwys gweithio, bod yn berchen ar eiddo, bod â phlant mewn ysgol, a bod eich prif fywyd teuluol yng Nghymru neu Loegr.',
    helpText3:
      'Nid yw’r enghreifftiau uchod yn rhestr gynhwysfawr o amgylchiadau sy’n enghreifftio preswylfa arferol, ac er y gallai rhai ohonynt fod yn berthnasol ichi, nid yw hynny o reidrwydd yn golygu eich bod yn preswylio’n arferol yng Nghymru neu Loegr. Os nad ydych yn siwr, dylech ofyn am gyngor cyfreithiol.',
  };
  const cyApp1App2LastResident = {
    line1: `Mae eich atebion yn dangos y gallwch wneud ${apply} yng Nghymru a Lloegr am eich bod ill dau yn preswylio yno’n arferol a bod un ohonoch yn dal i fyw yno.`,
    readMore: 'Darllenwch fwy am breswylio’n arferol',
    helpText1:
      'Os ydych chi’n treulio’r rhan fwyaf o’ch amser yng Nghymru a Lloegr, rydych yn ‘preswylio’n arferol’ yno yn ôl y gyfraith.',
    helpText2:
      'Gall hyn gynnwys gweithio, bod yn berchen ar eiddo, bod â phlant mewn ysgol, a bod eich prif fywyd teuluol yng Nghymru neu Loegr.',
    helpText3:
      'Nid yw’r enghreifftiau uchod yn rhestr gynhwysfawr o amgylchiadau sy’n enghreifftio preswylfa arferol, ac er y gallai rhai ohonynt fod yn berthnasol ichi, nid yw hynny o reidrwydd yn golygu eich bod yn preswylio’n arferol yng Nghymru neu Loegr. Os nad ydych yn siwr , dylech ofyn am gyngor cyfreithiol.',
  };
  const cyApp2Resident = {
    line1: `Mae eich atebion yn dangos y gallwch wneud ${apply} yng Nghymru a Lloegr am fod eich ${partner} yn preswylio’n arferol yno.`,
    readMore: 'Darllenwch fwy am breswylio’n arferol',
    helpText1:
      'Os ydych chi’n treulio’r rhan fwyaf o’ch amser yng Nghymru a Lloegr, rydych yn preswylio’n arferol yno yn ôl y gyfraith.',
    helpText2:
      'Gall hyn gynnwys gweithio, bod yn berchen ar eiddo, bod â phlant mewn ysgol, a bod eich prif fywyd teuluol yng Nghymru neu Loegr.',
    helpText3:
      'Nid yw’r enghreifftiau uchod yn rhestr gynhwysfawr o amgylchiadau sy’n enghreifftio preswylfa arferol, ac er y gallai rhai ohonynt fod yn berthnasol ichi, nid yw hynny o reidrwydd yn golygu eich bod yn preswylio’n arferol yng Nghymru neu Loegr. Os nad ydych yn siwr , dylech ofyn am gyngor cyfreithiol.',
  };
  const cyApp1ResidentTwelveMonths = {
    line1: `Mae eich atebion yn dangos y gallwch wneud ${apply} yng Nghymru a Lloegr am eich bod yn preswylio yno’n arferol a’ch bod wedi byw yma am o leiaf 12 mis.`,
    readMore: 'Darllenwch fwy am breswylio’n arferol',
    helpText1:
      'Os ydych chi’n treulio’r rhan fwyaf o’ch amser yng Nghymru a Lloegr, rydych yn preswylio’n arferol yno yn ôl y gyfraith.',
    helpText2:
      'Mae’n bosib i hyn gynnwys gweithio, bod yn berchen ar eiddo, bod â phlant mewn ysgol, a bod eich prif fywyd teuluol yng Nghymru neu Lloegr.',
    helpText3:
      'Nid yw’r enghreifftiau uchod yn rhestr ddihysbydd o amgylchiadau sy’n enghreifftio preswylfa arferol, ac er y gallai rhai ohonynt fod yn berthnasol ichi, nid yw hynny o reidrwydd yn golygu eich bod yn preswylio’n arferol yn rhywle. Os nad ydych yn siwr, dylech ofyn am gyngor cyfreithiol.',
  };
  const cyApp1App2Domiciled = {
    line1: `Mae eich atebion yn dangos y gallwch wneud ${apply} yng Nghymru a Lloegr am mai yng Nghymru a Lloegr y mae domisil y ddau ohonoch.`,
    readMore: 'Darllenwch fwy am beth yw domisil',
    helpText1:
      'Pan rydych yn cael eich geni, rydych yn cael <strong>mamwlad</strong>.Fel arfer, hwn yw: <ul class="govuk-list govuk-list--bullet"> <li>y wlad yr oedd eich tad â’i ddomisil ynddi os oedd eich rhieni yn briod</li> <li>y wlad yr oedd eich mam â’i domisil ynddi os nad oedd eich rhieni yn briod, neu os oedd eich tad wedi marw cyn ichi gael eich geni</li> </ul>',
    helpText2:
      'Os byddwch yn gadael eich domisil gwreiddiol ac yn ymsefydlu mewn gwlad arall fel oedolyn, efallai y daw’r wlad honno yn <strong>ddomisil drwy ddewis</strong> ichi.',
    helpText3: 'Dylech ddewis Ydy os oes gennych un o’r ddau fath o ddomisil yng Nghymru neu Loegr.',
    helpText4: 'Os nad ydych chi’n siwr am eich domisil, dylech ofyn am gyngor cyfreithiol.',
  };

  const cyConnections: Partial<Record<JurisdictionConnections, typeof cyApp1App2Resident | undefined>> = {
    [JurisdictionConnections.APP_1_APP_2_RESIDENT]: cyApp1App2Resident,
    [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT]: cyApp1App2LastResident,
    [JurisdictionConnections.APP_2_RESIDENT]: cyApp2Resident,
    [JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS]: cyApp1ResidentTwelveMonths,
    [JurisdictionConnections.APP_1_APP_2_DOMICILED]: cyApp1App2Domiciled,
  };

  return {
    title: `Gallwch ddefnyddio llys yng Nghymru neu Loegr ${
      isDivorce ? 'i gael ysgariad' : "i ddod â'ch partneriaeth sifil i ben"
    }`,
    ...cyConnections[connections[0]],
  };
};

export const form: FormContent = {
  fields: userCase => {
    return {
      connections: {
        type: 'checkboxes',
        labelSize: 'm',
        values: [
          {
            name: 'connections',
            label: l => l.APP_1_APP_2_RESIDENT,
            value: JurisdictionConnections.APP_1_APP_2_RESIDENT,
          },
          {
            name: 'connections',
            label: l => l.APP_1_APP_2_LAST_RESIDENT,
            value: JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT,
          },
          {
            name: 'connections',
            label: l => l.APP_2_RESIDENT,
            value: JurisdictionConnections.APP_2_RESIDENT,
          },
          {
            name: 'connections',
            hidden: userCase.applicationType === ApplicationType.SOLE_APPLICATION,
            label: l => l.APP_1_RESIDENT_JOINT,
            value: JurisdictionConnections.APP_1_RESIDENT_JOINT,
          },
          {
            name: 'connections',
            label: l => l.APP_1_RESIDENT_TWELVE_MONTHS,
            value: JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS,
          },
          {
            name: 'connections',
            label: l => l.APP_1_RESIDENT_SIX_MONTHS,
            value: JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS,
          },
          {
            name: 'connections',
            label: l => l.APP_1_APP_2_DOMICILED,
            value: JurisdictionConnections.APP_1_APP_2_DOMICILED,
          },
          {
            name: 'connections',
            label: l => l.APP_1_DOMICILED,
            value: JurisdictionConnections.APP_1_DOMICILED,
          },
          {
            name: 'connections',
            label: l => l.APP_2_DOMICILED,
            value: JurisdictionConnections.APP_2_DOMICILED,
          },
          {
            name: 'connections',
            label: l => l.RESIDUAL_JURISDICTION,
            value: JurisdictionConnections.RESIDUAL_JURISDICTION,
          },
        ],
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
