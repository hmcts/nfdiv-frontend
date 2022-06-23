import { JurisdictionConnections } from '../case/definition';

export const enHabitualResident = `If your lives are mainly based in England or Wales then you’re what is legally known as ‘habitually resident’.<br><br>
  This may include working, owning property, having children in school, and your main family life taking place in England or Wales.<br><br>
  The examples above aren’t a complete list of what makes up habitual residence, and just because some of them apply to you doesn’t mean you’re habitually resident. If you’re not sure, you should get legal advice.`;

export const enDomicile = `Your domicile is usually the place in which you were born, regard as your permanent home and to which you have the closest ties.<br><br>
  However, domicile can be more complex, for example, if you or your parents have moved countries in the past.<br><br>
  When you’re born, you acquire a 'domicile of origin'. This is usually:
  <ul class="govuk-list govuk-list--bullet"><li class="govuk-list govuk-list--bullet">the country your father was domiciled in if your parents were married</li>
  <li class="govuk-list govuk-list--bullet">the country your mother was domiciled in if your parents were unmarried, or your father had died before you were born</li></ul>
  If you leave your domicile of origin and settle in another country as an adult, the new country may become your 'domicile of choice'.<br><br>
  If you’re not sure about your domicile, you should get legal advice.`;

export const cyHabitualResident = `Os ydych chi’n treulio’r rhan fwyaf o’ch amser yng Nghymru neu Loegr, rydych yn ‘preswylio’n arferol’ yno yn ôl y gyfraith.<br><br>
  Gall hyn gynnwys gweithio, bod yn berchen ar eiddo, bod â phlant mewn ysgol, a bod eich prif fywyd teuluol yng Nghymru neu Loegr.<br><br>
  Nid yw’r enghreifftiau uchod yn rhestr gyflawn o’r amgylchiadau sy’n diffinio preswylfa arferol. Nid yw’r ffaith bod rhai ohonynt yn berthnasol i chi o reidrwydd yn golygu eich bod yn preswylio’n arferol yn rhywle. Os nad ydych yn siŵr, dylech gael cyngor cyfreithiol.`;

export const cyDomicile = `Fel rheol, eich domisil yw’r lle y cawsoch eich geni, lle’r ydych yn meddwl amdano fel eich cartref parhaol a’r lle mae eich teulu a’ch ffrindiau agosaf yn byw.<br><br>
  Fodd bynnag, gall domisil fod yn fwy cymhleth. Er enghraifft, os ydych chi neu eich rhieni wedi symud o un wlad i’r llall yn y gorffennol.<br><br>
  Pan gewch eich geni, rydych yn cael ‘mamwlad’. Fel arfer, hon yw:
  <ul class="govuk-list govuk-list--bullet"><li class="govuk-list govuk-list--bullet">mamwlad eich tad os oedd eich rhieni wedi priodi</li>
  <li class="govuk-list govuk-list--bullet">mamwlad eich mam os nad oedd eich rhieni wedi priodi, neu os oedd eich tad wedi marw cyn i chi gael eich geni</li></ul>
  Os ydych yn gadael eich mamwlad ac yn setlo mewn gwlad arall fel oedolyn, yna efallai bydd y wlad newydd yn dod yn ‘ddomisil o’ch dewis chi’.<br><br>
  Os nad ydych chi’n siŵr am eich domisil, dylech gael cyngor cyfreithiol.`;

export const enResidual = (isDivorce: boolean, partner: string): string => {
  return `Usually, to be eligible for residual jurisdiction you or your ${partner} must be domiciled in England. Neither of you must be nationals of or habitually resident in, another country in the EU (except Denmark).<br><br>
   In addition, if you’re married to a member of the same sex, you may be eligible for residual jurisdiction if all the following apply:
   <ul class="govuk-list govuk-list--bullet"><li class="govuk-list govuk-list--bullet">you married each other in the UK</li>
   <li class="govuk-list govuk-list--bullet">neither of you are nationals of, or habitually resident in, another country in the EU (except Denmark)</li>
   <li class="govuk-list govuk-list--bullet">it would be in the interests of natural justice for the court to consider this application (this may apply if, for example, your home country does not allow ${
     isDivorce ? 'divorce' : 'ending of a civil partnership'
   } between same-sex couples)</li></ul>
   However, residual jurisdiction can be complex. If you’re not sure whether this applies to you then you should get legal advice.`;
};

export const jurisdictionMoreDetailsContent = (
  connections: JurisdictionConnections[] | undefined,
  isEnglish: boolean,
  isDivorce: boolean,
  partner: string,
  showAllConnectionTypes = false
): { text: { heading: string; body: string }[]; title: string } => {
  const connectionTypes = {
    'Habitual residence': [
      JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT,
      JurisdictionConnections.APP_2_RESIDENT_SOLE,
      JurisdictionConnections.APP_2_RESIDENT_JOINT,
      JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS,
      JurisdictionConnections.APP_1_APP_2_RESIDENT,
      JurisdictionConnections.APP_1_RESIDENT_JOINT,
      JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS,
    ],
    Domicile: [
      JurisdictionConnections.APP_1_APP_2_DOMICILED,
      JurisdictionConnections.APP_1_DOMICILED,
      JurisdictionConnections.APP_2_DOMICILED,
    ],
    'Residual jurisdiction': [
      JurisdictionConnections.RESIDUAL_JURISDICTION_CP,
      JurisdictionConnections.RESIDUAL_JURISDICTION_D,
    ],
  };

  const connectionText = isEnglish
    ? {
        'Habitual residence': enHabitualResident,
        Domicile: enDomicile,
        'Residual jurisdiction': enResidual(isDivorce, partner),
      }
    : {
        'Habitual residence': cyHabitualResident,
        Domicile: cyDomicile,
        'Residual jurisdiction': enResidual(isDivorce, partner), // todo
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
      title: 'Read more about ' + connectionTypesMade[0].toLowerCase(),
    };
  } else {
    for (const connectionType of connectionTypesMade) {
      totalConnectionArray.push({ heading: connectionType, body: connectionText[connectionType] });
    }
    return { text: totalConnectionArray, title: 'Read more about your connections' };
  }
};
