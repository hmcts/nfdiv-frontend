import { JurisdictionConnections } from '../case/definition';

export const enHabitualResident = `If your lives are mainly based in England or Wales then you’re what is legally known as ‘habitually resident’.<br><br>
  This may include working, owning property, having children in school, and your main family life taking place in England or Wales.<br><br>
  The examples above aren’t a complete list of what makes up habitual residence, and just because some of them apply to you doesn’t mean you’re habitually resident. If you’re not sure, you should get legal advice.`;

export const cyHabitualResident = `Os ydych chi’n treulio’r rhan fwyaf o’ch amser yng Nghymru neu Loegr, rydych yn ‘preswylio’n arferol’ yno yn ôl y gyfraith.<br><br>
  Gall hyn gynnwys gweithio, bod yn berchen ar eiddo, bod â phlant mewn ysgol, a bod eich prif fywyd teuluol yng Nghymru neu Loegr.<br><br>
  Nid yw’r enghreifftiau uchod yn rhestr gyflawn o’r amgylchiadau sy’n diffinio preswylfa arferol. Nid yw’r ffaith bod rhai ohonynt yn berthnasol i chi o reidrwydd yn golygu eich bod yn preswylio’n arferol yn rhywle. Os nad ydych yn siŵr, dylech gael cyngor cyfreithiol.`;

export const enDomicile = `Your domicile is usually the place in which you were born, regard as your permanent home and to which you have the closest ties.<br><br>
  However, domicile can be more complex, for example, if you or your parents have moved countries in the past.<br><br>
  When you’re born, you acquire a 'domicile of origin'. This is usually:
  <ul class="govuk-list govuk-list--bullet"><li class="govuk-list govuk-list--bullet">the country your father was domiciled in if your parents were married</li>
  <li class="govuk-list govuk-list--bullet">the country your mother was domiciled in if your parents were unmarried, or your father had died before you were born</li></ul>
  If you leave your domicile of origin and settle in another country as an adult, the new country may become your 'domicile of choice'.<br><br>
  If you’re not sure about your domicile, you should get legal advice.`;

export const cyDomicile = `Fel rheol, eich domisil yw’r lle y cawsoch eich geni, lle’r ydych yn meddwl amdano fel eich cartref parhaol a’r lle mae eich teulu a’ch ffrindiau agosaf yn byw.<br><br>
  Fodd bynnag, gall domisil fod yn fwy cymhleth. Er enghraifft, os ydych chi neu eich rhieni wedi symud o un wlad i’r llall yn y gorffennol.<br><br>
  Pan gewch eich geni, rydych yn cael ‘mamwlad’. Fel arfer, hon yw:
  <ul class="govuk-list govuk-list--bullet"><li class="govuk-list govuk-list--bullet">mamwlad eich tad os oedd eich rhieni wedi priodi</li>
  <li class="govuk-list govuk-list--bullet">mamwlad eich mam os nad oedd eich rhieni wedi priodi, neu os oedd eich tad wedi marw cyn i chi gael eich geni</li></ul>
  Os ydych yn gadael eich mamwlad ac yn setlo mewn gwlad arall fel oedolyn, yna efallai bydd y wlad newydd yn dod yn ‘ddomisil o’ch dewis chi’.<br><br>
  Os nad ydych chi’n siŵr am eich domisil, dylech gael cyngor cyfreithiol.`;

export const enResidual = (isDivorce: boolean): string => {
  return `If you’re in a same-sex couple and if none of the other connections apply, the court may still have jurisdiction if:
    <ul class="govuk-list govuk-list--bullet"><li class="govuk-list govuk-list--bullet">you ${
      isDivorce ? 'married' : 'formed your civil partnership'
    } in England or Wales and </li>
    <li class="govuk-list govuk-list--bullet">it would be in the interests of justice for the court to consider the application. For example, your home country does not allow ${
      isDivorce ? 'divorce' : 'civil partnerships to be ended'
    } between same-sex couples</li></ul>`;
};

export const cyResidual = (isDivorce: boolean): string => {
  return `Os ydych yn gwpl o’r un rhyw, ac os nad yw unrhyw un o’r cysylltiadau eraill yn berthnasol, gall y llys dal fod ag awdurdodaeth os:
    <ul class="govuk-list govuk-list--bullet"><li class="govuk-list govuk-list--bullet">wnaethoch chi ${
      isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil'
    } yng Nghymru neu Loegr a </li>
    <li class="govuk-list govuk-list--bullet">byddai er budd cyfiawnder i’r llys ystyried y cais. Er enghraifft, nid yw’r wlad lle mae eich cartref yn caniatáu i gyplau o’r un rhyw ${
      isDivorce ? 'gael ysgariad' : 'ddod â phartneriaeth sifil i ben'
    }</li></ul>`;
};

export const jurisdictionMoreDetailsContent = (
  connections: JurisdictionConnections[] | undefined,
  isEnglish: boolean,
  isDivorce: boolean,
  showAllConnectionTypes = false
): { text: { heading: string; body: string }[]; title: string } => {
  const connectionTypes = {
    habitualResidence: [
      JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT,
      JurisdictionConnections.APP_2_RESIDENT_SOLE,
      JurisdictionConnections.APP_2_RESIDENT_JOINT,
      JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS,
      JurisdictionConnections.APP_1_APP_2_RESIDENT,
      JurisdictionConnections.APP_1_RESIDENT_JOINT,
      JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS,
    ],
    domicile: [
      JurisdictionConnections.APP_1_APP_2_DOMICILED,
      JurisdictionConnections.APP_1_DOMICILED,
      JurisdictionConnections.APP_2_DOMICILED,
    ],
    residualJurisdiction: [
      JurisdictionConnections.RESIDUAL_JURISDICTION_CP,
      JurisdictionConnections.RESIDUAL_JURISDICTION_D,
    ],
  };

  const connectionText = isEnglish
    ? {
        habitualResidence: enHabitualResident,
        domicile: enDomicile,
        residualJurisdiction: enResidual(isDivorce),
      }
    : {
        habitualResidence: cyHabitualResident,
        domicile: cyDomicile,
        residualJurisdiction: cyResidual(isDivorce),
      };
  const connectionTitle = isEnglish
    ? {
        habitualResidence: 'Habitual residence',
        domicile: 'Domicile',
        residualJurisdiction: 'Residual jurisdiction',
      }
    : {
        habitualResidence: 'Preswylio’n arferol',
        domicile: 'Domisil',
        residualJurisdiction: 'Awdurdodaeth weddillol',
      };

  const connectionTypesMade: string[] = [];

  for (const [key, value] of Object.entries(connectionTypes)) {
    if ((connections && connections.some(c => value.includes(c))) || showAllConnectionTypes) {
      connectionTypesMade.push(key);
    }
  }

  const totalConnectionArray: { heading: string; body: string }[] = [];

  if (connectionTypesMade.length === 1) {
    return {
      text: [{ heading: '', body: connectionText[connectionTypesMade[0]] }],
      title: 'Read more about ' + connectionTitle[connectionTypesMade[0]].toLowerCase(),
    };
  } else {
    for (const connectionType of connectionTypesMade) {
      totalConnectionArray.push({ heading: connectionTitle[connectionType], body: connectionText[connectionType] });
    }
    return { text: totalConnectionArray, title: 'Read more about your connections' };
  }
};
