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

export const enResidual = (isDivorce: boolean): string => {
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
  showAllConnectionTypes = false
): { text: string; title: string } => {
  const connectionTypes = {
    'Habitual residence': [
      JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT,
      JurisdictionConnections.APP_2_RESIDENT,
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
    'Residual jurisdiction': [JurisdictionConnections.RESIDUAL_JURISDICTION],
  };

  const connectionText = {
    'Habitual residence': enHabitualResident,
    Domicile: enDomicile,
    'Residual jurisdiction': enResidual(isDivorce),
  };

  const connectionTypesMade: string[] = [];

  for (const [key, value] of Object.entries(connectionTypes)) {
    if ((connections && connections.some(c => value.includes(c))) || showAllConnectionTypes) {
      connectionTypesMade.push(key);
    }
  }

  let totalConnectionText = '';

  if (connectionTypesMade.length === 1) {
    return {
      text: connectionText[connectionTypesMade[0]],
      title: 'Read more about ' + connectionTypesMade[0].toLowerCase(),
    };
  } else {
    for (const connectionType of connectionTypesMade) {
      totalConnectionText +=
        '<strong>' + connectionType + '</strong><br>' + connectionText[connectionType] + '<br><br>';
    }
    return { text: totalConnectionText.slice(0, -8), title: 'Read more about your connections' };
  }
};
