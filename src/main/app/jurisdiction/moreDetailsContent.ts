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

const enResidual = (isDivorce: boolean): string => {
  return `If you’re in a same-sex couple and if none of the other connections apply, the court may still have jurisdiction if:
    <ul class="govuk-list govuk-list--bullet"><li class="govuk-list govuk-list--bullet">you ${
      isDivorce ? 'married' : 'formed your civil partnership'
    } in England or Wales and </li>
    <li class="govuk-list govuk-list--bullet">it would be in the interests of justice for the court to consider the application. For example, your home country does not allow ${
      isDivorce ? 'divorce' : 'civil partnerships to be ended'
    } between same-sex couples</li></ul>`;
};

export const jurisdictionMoreDetailsContent = (
  connections: JurisdictionConnections[] | undefined,
  isDivorce: boolean,
  showAllResidences = false
): { connectedToEnglandWales: string; readMore: string } => {
  const whichConnectionIsIt = {
    'habitual residence': [
      JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT,
      JurisdictionConnections.APP_2_RESIDENT,
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
    'residual jurisdiction': [JurisdictionConnections.RESIDUAL_JURISDICTION],
  };

  const infoContent = {
    'habitual residence': enHabitualResident,
    domicile: enDomicile,
    'residual jurisdiction': enResidual(isDivorce),
  };

  const infoSubheader = {
    'habitual residence': '<strong>Habitual residence</strong><br><br>',
    domicile: '<strong>Domicile</strong><br><br>',
    'residual jurisdiction': '<strong>Residual</strong><br><br>',
  };

  let totalTextParagraph = '';

  const whichTexts: string[] = [];

  for (const [key, value] of Object.entries(whichConnectionIsIt)) {
    if ((connections && connections.some(r => value.includes(r))) || showAllResidences) {
      whichTexts.push(key);
    }
  }

  if (whichTexts.length === 1) {
    return { connectedToEnglandWales: infoContent[whichTexts[0]], readMore: 'Read more about ' + whichTexts[0] };
  } else {
    for (const str of whichTexts) {
      totalTextParagraph += infoSubheader[str] + infoContent[str] + '<br><br>';
    }
    return { connectedToEnglandWales: totalTextParagraph.slice(0, -8), readMore: 'Read more about your connections' };
  }
};
