import { JurisdictionConnections } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import type { CommonContent } from '../common/common.content';

const en = (
  { isDivorce, partner, applyForDivorce, applyForDissolution }: CommonContent,
  connections: JurisdictionConnections[]
) => {
  const apply = isDivorce ? applyForDivorce : applyForDissolution;
  const enPetRespResident = {
    line1: `Your answers indicate that you can ${apply} in England and Wales because both of you are 'habitually resident'.`,
    readMore: 'Read more about habitual residence',
    helpText1:
      "If your life is mainly based in England or Wales then you’re what is legally known as 'habitually resident'.",
    helpText2:
      'This may include working, owning property, having children in school, and your main family life taking place in England or Wales.',
    helpText3:
      'The examples above aren’t a complete list of what makes up habitual residence, and just because some of them apply to you doesn’t mean you’re habitually resident. If you’re not sure, you should get legal advice.',
    clarification: `You only need to do this if your ${partner} may disagree that both of you are habitually resident.`,
  };
  const enPetRespLastResident = {
    line1: `Your answers indicate that you can ${apply} in England and Wales because both of you were last 'habitually resident' and one of you still lives here.`,
    readMore: 'Read more about habitual residence',
    helpText1:
      "If your life is mainly based in England or Wales then you’re what is legally known as 'habitually resident'.",
    helpText2:
      'This may include working, owning property, having children in school, and your main family life taking place in England or Wales.',
    helpText3:
      'The examples above aren’t a complete list of what makes up habitual residence, and just because some of them apply to you doesn’t mean you’re habitually resident. If you’re not sure, you should get legal advice.',
    clarification: `You only need to do this if your ${partner} may disagree that both of you were last habitually resident and one of you still lives here.`,
  };
  const enRespResident = {
    line1: `Your answers indicate that you can ${apply} in England and Wales because your ${partner} is 'habitually resident'.`,
    readMore: 'Read more about habitual residence',
    helpText1:
      "If your life is mainly based in England or Wales then you’re what is legally known as 'habitually resident'.",
    helpText2:
      'This may include working, owning property, having children in school, and your main family life taking place in England or Wales.',
    helpText3:
      'The examples above aren’t a complete list of what makes up habitual residence, and just because some of them apply to you doesn’t mean you’re habitually resident. If you’re not sure, you should get legal advice.',
    clarification: `You only need to do this if your ${partner} may disagree that they is habitually resident.`,
  };
  const enPetResidentTwelveMonths = {
    line1: `Your answers indicate that you can ${apply} in England and Wales because you are 'habitually resident' and have lived here for at least 12 months.`,
    readMore: 'Read more about habitual residence',
    helpText1:
      "If your life is mainly based in England or Wales then you’re what is legally known as 'habitually resident'.",
    helpText2:
      'This may include working, owning property, having children in school, and your main family life taking place in England or Wales.',
    helpText3:
      'The examples above aren’t a complete list of what makes up habitual residence, and just because some of them apply to you doesn’t mean you’re habitually resident. If you’re not sure, you should get legal advice.',
    clarification: `You only need to do this if your ${partner} may disagree that you are habitually resident and have lived here for at least 12 months.`,
  };
  const enHabitualAndDomicileHelp = {
    readMore: 'Read more about your connections',
    helpText1: '<h3 class="govuk-heading-s">Habitual residence</h3>',
    helpText2:
      'If your life is mainly based in England or Wales then you’re what is legally known as ‘habitually resident’.',
    helpText3:
      'This may include working, owning property, having children in school, and your main family life taking place in England or Wales.',
    helpText4:
      'The examples above aren’t a complete list of what makes up habitual residence, and just because some of them apply to you doesn’t mean you’re habitually resident.',
    helpText5:
      '<h3 class="govuk-heading-s">Domicile</h3><p class="govuk-body">Your domicile is usually the place in which you were born, regard as your permanent home and to which you have the closest ties.</p><p class="govuk-body">However, domicile can be more complex, for example if you or your parents have moved countries in the past.</p>',
    helpText6:
      'When you’re born, you acquire a \'domicile of origin\'. This is usually: <ul class="govuk-list govuk-list--bullet"> <li>the country your father was domiciled in if your parents were married</li> <li>the country your mother was domiciled in if your parents were unmarried, or your father had died before you were born</li> </ul>',
    helpText7:
      "If you leave your domicile of origin and settle in another country as an adult, the new country may become your 'domicile of choice'.",
    helpText8: 'If you’re not sure about your habitual residence or domicile you should get legal advice.',
  };
  const enPetResidentSixMonths = {
    line1:
      'Your answers indicate that you’re domiciled and habitually resident and have lived here for at least 6 months.',
    ...enHabitualAndDomicileHelp,
    clarification: `You only need to do this if your ${partner} may disagree that you’re domiciled and habitually resident and have lived here for at least 6 months.`,
  };
  const enPetRespDomiciled = {
    line1: `Your answers indicate that you can ${apply} in England and Wales because both of you are 'habitually resident'.`,
    readMore: 'Read more about domicile',
    helpText1:
      'When you’re born, you acquire a <strong>domicile of origin</strong>.  This is usually: <ul class="govuk-list govuk-list--bullet"> <li>the country your father was domiciled in if your parents were married</li> <li>the country your mother was domiciled in if your parents were unmarried, or your father had died before you were born</li> </ul>',
    helpText2:
      'If you leave your domicile of origin and settle in another country as an adult, the new country may become your <strong>domicile of choice</strong>.',
    helpText3: 'You should select Yes if you have either type of domicile in England or Wales.',
    helpText4: 'If you’re not sure about your domicile you should get legal advice.',
    clarification: `You only need to do this if your ${partner} may disagree that both of you are domiciled in England or Wales.`,
  };
  const enResidualJurisdiction = {
    line1: `Your answers indicate that you can ${apply} in England and Wales because the courts of England and Wales have jurisdiction on a residual basis.`,
    ...enHabitualAndDomicileHelp,
    clarification: '',
  };

  const enConnections: Record<JurisdictionConnections, typeof enPetRespResident | undefined> = {
    [JurisdictionConnections.PET_RESP_RESIDENT]: enPetRespResident,
    [JurisdictionConnections.PET_RESP_LAST_RESIDENT]: enPetRespLastResident,
    [JurisdictionConnections.RESP_RESIDENT]: enRespResident,
    [JurisdictionConnections.PET_RESIDENT_TWELVE_MONTHS]: enPetResidentTwelveMonths,
    [JurisdictionConnections.PET_RESIDENT_SIX_MONTHS]: enPetResidentSixMonths,
    [JurisdictionConnections.PET_RESP_DOMICILED]: enPetRespDomiciled,
    [JurisdictionConnections.RESIDUAL_JURISDICTION]: enResidualJurisdiction,
  };

  return {
    title: `You can use English or Welsh courts to ${apply}`,
    ...enConnections[connections[0]],
  };
};

const cy = ({ isDivorce, partner }: CommonContent, connections: JurisdictionConnections[]) => {
  const apply = isDivorce ? 'cais am ysgariad' : 'cais';
  const cyPetRespResident = {
    line1: `Mae eich atebion yn dangos y gallwch wneud ${apply} yng Nghymru a Lloegr am eich bod ill dau yn preswylio yno’n arferol.`,
    readMore: 'Darllenwch fwy am breswylio’n arferol',
    helpText1:
      'Os ydych chi’n treulio’r rhan fwyaf o’ch amser yng Nghymru a Lloegr, rydych yn ‘preswylio’n arferol’ yno yn ôl y gyfraith.',
    helpText2:
      'Gall hyn gynnwys gweithio, bod yn berchen ar eiddo, bod â phlant mewn ysgol, a bod eich prif fywyd teuluol yng Nghymru neu Loegr.',
    helpText3:
      'Nid yw’r enghreifftiau uchod yn rhestr gynhwysfawr o amgylchiadau sy’n enghreifftio preswylfa arferol, ac er y gallai rhai ohonynt fod yn berthnasol ichi, nid yw hynny o reidrwydd yn golygu eich bod yn preswylio’n arferol yng Nghymru neu Loegr. Os nad ydych yn siwr, dylech ofyn am gyngor cyfreithiol.',
    clarification: `Nid oes angen ichi wneud hyn ond os y gallai eich ${partner} anghytuno eich bod chi eich dau yn preswylio’n arferol yng Nghymru neu Loegr.`,
  };
  const cyPetRespLastResident = {
    line1: `Mae eich atebion yn dangos y gallwch wneud ${apply} yng Nghymru a Lloegr am eich bod ill dau yn preswylio yno’n arferol a bod un ohonoch yn dal i fyw yno.`,
    readMore: 'Darllenwch fwy am breswylio’n arferol',
    helpText1:
      'Os ydych chi’n treulio’r rhan fwyaf o’ch amser yng Nghymru a Lloegr, rydych yn ‘preswylio’n arferol’ yno yn ôl y gyfraith.',
    helpText2:
      'Gall hyn gynnwys gweithio, bod yn berchen ar eiddo, bod â phlant mewn ysgol, a bod eich prif fywyd teuluol yng Nghymru neu Loegr.',
    helpText3:
      'Nid yw’r enghreifftiau uchod yn rhestr gynhwysfawr o amgylchiadau sy’n enghreifftio preswylfa arferol, ac er y gallai rhai ohonynt fod yn berthnasol ichi, nid yw hynny o reidrwydd yn golygu eich bod yn preswylio’n arferol yng Nghymru neu Loegr. Os nad ydych yn siwr , dylech ofyn am gyngor cyfreithiol.',
    clarification: `Nid oes angen ichi wneud hyn ond os y gallai eich ${partner} anghytuno eich bod chi eich dau yn preswylio’n arferol yma’n fwyaf diweddar a bod un ohonoch yn dal i fyw yma.`,
  };
  const cyRespResident = {
    line1: `Mae eich atebion yn dangos y gallwch wneud ${apply} yng Nghymru a Lloegr am fod eich ${partner} yn preswylio’n arferol yno.`,
    readMore: 'Darllenwch fwy am breswylio’n arferol',
    helpText1:
      'Os ydych chi’n treulio’r rhan fwyaf o’ch amser yng Nghymru a Lloegr, rydych yn preswylio’n arferol yno yn ôl y gyfraith.',
    helpText2:
      'Gall hyn gynnwys gweithio, bod yn berchen ar eiddo, bod â phlant mewn ysgol, a bod eich prif fywyd teuluol yng Nghymru neu Loegr.',
    helpText3:
      'Nid yw’r enghreifftiau uchod yn rhestr gynhwysfawr o amgylchiadau sy’n enghreifftio preswylfa arferol, ac er y gallai rhai ohonynt fod yn berthnasol ichi, nid yw hynny o reidrwydd yn golygu eich bod yn preswylio’n arferol yng Nghymru neu Loegr. Os nad ydych yn siwr , dylech ofyn am gyngor cyfreithiol.',
    clarification: `Nid oes angen ichi wneud hyn ond os y gallai eich ${partner} anghytuno ei fod/bod yn preswylio’n arferol.`,
  };
  const cyPetResidentTwelveMonths = {
    line1: `Mae eich atebion yn dangos y gallwch wneud ${apply} yng Nghymru a Lloegr am eich bod yn preswylio yno’n arferol a’ch bod wedi byw yma am o leiaf 12 mis.`,
    readMore: 'Darllenwch fwy am breswylio’n arferol',
    helpText1:
      'Os ydych chi’n treulio’r rhan fwyaf o’ch amser yng Nghymru a Lloegr, rydych yn preswylio’n arferol yno yn ôl y gyfraith.',
    helpText2:
      'Mae’n bosib i hyn gynnwys gweithio, bod yn berchen ar eiddo, bod â phlant mewn ysgol, a bod eich prif fywyd teuluol yng Nghymru neu Lloegr.',
    helpText3:
      'Nid yw’r enghreifftiau uchod yn rhestr ddihysbydd o amgylchiadau sy’n enghreifftio preswylfa arferol, ac er y gallai rhai ohonynt fod yn berthnasol ichi, nid yw hynny o reidrwydd yn golygu eich bod yn preswylio’n arferol yn rhywle. Os nad ydych yn siwr, dylech ofyn am gyngor cyfreithiol.',
    clarification: `Nid oes angen ichi wneud hyn ond os y gallai eich ${partner} anghytuno eich bod yn preswylio yma’n arferol a’ch bod wedi byw yma am o leiaf blwyddyn.`,
  };
  const cyHabitualAndDomicileHelp = {
    readMore: 'Darllen mwy am eich cysylltiadau',
    helpText1: '<h3 class="govuk-heading-s">Habitual residence</h3>',
    helpText2:
      'Os ydych chi’n treulio’r rhan fwyaf o’ch amser yng Nghymru neu Loegr, rydych yn preswylio’n arferol yno yn ôl y gyfraith.',
    helpText3:
      'Gall hyn gynnwys gweithio, bod yn berchen ar eiddo, bod â phlant mewn ysgol, a bod eich prif fywyd teuluol yng Nghymru neu Loegr.',
    helpText4:
      'Nid yw’r enghreifftiau uchod yn rhestr gynhwysfawr o amgylchiadau sy’n enghreifftio preswylfa arferol, ac er y gallai rhai ohonynt fod yn berthnasol ichi, nid yw hynny o reidrwydd yn golygu eich bod yn preswylio’n arferol yng Nghymru neu Loegr.',
    helpText5:
      '<h3 class="govuk-heading-s">Domicile</h3><p class="govuk-body">Fel arfer, eich domisil yw’r lle y cawsoch eich geni, y lle yr ydych yn meddwl amdano fel eich cartref parhaol a’r lle y mae eich teulu a’ch ffrindiau agosaf yn byw.</p><p class="govuk-body">Ond, mae’n bosib i’ch domisil fod yn fwy cymhleth, er enghraifft os ydych chi neu eich rhieni wedi symud o un wlad i’r llall yn y gorffennol.</p>',
    helpText6:
      'Pan rydych yn cael eich geni, rydych yn cael ‘mamwlad’. Fel arfer, hwn yw: <ul class="govuk-list govuk-list--bullet"> <li>y wlad yr oedd eich tad â’i ddomisil ynddi os oedd eich rhieni yn briod</li> <li>y wlad yr oedd eich mam â’i domisil ynddi os nad oedd eich rhieni yn briod, neu os oedd eich tad wedi marw cyn ichi gael eich geni</li> </ul>',
    helpText7:
      'Os byddwch yn gadael eich domisil gwreiddiol ac yn ymsefydlu mewn gwlad arall fel oedolyn, yna gallai’r wlad newydd ddod yn ‘ddomisil dewisol’ ichi.',
    helpText8:
      'Os nad ydych chi’n siwr ynglyn â’ch preswylfa arferol neu eich domisil, dylech ofyn am gyngor cyfreithiol.',
  };
  const cyPetResidentSixMonths = {
    line1:
      'Dengys eich atebion fod eich domisil yng Nghymru neu Loegr, a’ch bod yn preswylio yno’n arferol ac wedi byw yno am o leiaf chwe mis.',
    ...cyHabitualAndDomicileHelp,
    clarification: `Nid oes angen ichi wneud hyn ond os y gallai eich ${partner} anghytuno bod eich domisil yma, eich bod yn preswylio yma’n arferol a’ch bod wedi byw yma am o leiaf 6 mis.`,
  };
  const cyPetRespDomiciled = {
    line1: `Mae eich atebion yn dangos y gallwch wneud ${apply} yng Nghymru a Lloegr am mai yng Nghymru a Lloegr y mae domisil y ddau ohonoch.`,
    readMore: 'Darllenwch fwy am beth yw domisil',
    helpText1:
      'Pan rydych yn cael eich geni, rydych yn cael <strong>mamwlad</strong>.Fel arfer, hwn yw: <ul class="govuk-list govuk-list--bullet"> <li>y wlad yr oedd eich tad â’i ddomisil ynddi os oedd eich rhieni yn briod</li> <li>y wlad yr oedd eich mam â’i domisil ynddi os nad oedd eich rhieni yn briod, neu os oedd eich tad wedi marw cyn ichi gael eich geni</li> </ul>',
    helpText2:
      'Os byddwch yn gadael eich domisil gwreiddiol ac yn ymsefydlu mewn gwlad arall fel oedolyn, efallai y daw’r wlad honno yn <strong>ddomisil drwy ddewis</strong> ichi.',
    helpText3: 'Dylech ddewis Ydy os oes gennych un o’r ddau fath o ddomisil yng Nghymru neu Loegr.',
    helpText4: 'Os nad ydych chi’n siwr am eich domisil, dylech ofyn am gyngor cyfreithiol.',
    clarification: `Nid oes angen ichi wneud hyn ond os y gallai eich ${partner} anghytuno eich bod chi eich dau â’ch domisil yng Nghymru neu Loegr.`,
  };
  const cyResidualJurisdiction = {
    line1: `Mae eich atebion yn dangos y gallwch wneud ${apply} yng Nghymru a Lloegr am bod gan lysoedd Cymru a Lloegr awdurdodaeth ar sail weddillol.`,
    ...cyHabitualAndDomicileHelp,
    clarification: '',
  };

  const cyConnections: Record<JurisdictionConnections, typeof cyPetRespResident | undefined> = {
    [JurisdictionConnections.PET_RESP_RESIDENT]: cyPetRespResident,
    [JurisdictionConnections.PET_RESP_LAST_RESIDENT]: cyPetRespLastResident,
    [JurisdictionConnections.RESP_RESIDENT]: cyRespResident,
    [JurisdictionConnections.PET_RESIDENT_TWELVE_MONTHS]: cyPetResidentTwelveMonths,
    [JurisdictionConnections.PET_RESIDENT_SIX_MONTHS]: cyPetResidentSixMonths,
    [JurisdictionConnections.PET_RESP_DOMICILED]: cyPetRespDomiciled,
    [JurisdictionConnections.RESIDUAL_JURISDICTION]: cyResidualJurisdiction,
  };

  return {
    title: `Gallwch ddefnyddio llys yng Nghymru neu Loegr ${
      isDivorce ? 'i gael ysgariad' : "i ddod â'ch partneriaeth sifil i ben"
    }`,
    ...cyConnections[connections[0]],
  };
};

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

const languages = { en, cy };

export const generateContent: TranslationFn = content => {
  const translations = content.formState?.connections
    ? languages[content.language](content, content.formState.connections)
    : {};

  return {
    ...translations,
    form,
  };
};
