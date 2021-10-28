import { JurisdictionConnections } from '../../app/case/definition';

export const enHabitualResident = {
  helpText1: 'Habitual residence',
  helpText2:
    'If your lives are mainly based in England or Wales then you’re what is legally known as ‘habitually resident’.',
  helpText3:
    'This may include working, owning property, having children in school, and your main family life taking place in England or Wales.',
  helpText4:
    'The examples above aren’t a complete list of what makes up habitual residence, ' +
    'and just because some of them apply to you doesn’t mean you’re habitually resident. If you’re not sure, you should get legal advice.',
};
export const enDomicile = {
  helpText5: 'Domicile',
  helpText6:
    'Your domicile is usually the place in which you were born, regard as your permanent home and to which you have the closest ties.',
  helpText7:
    'However, domicile can be more complex, for example, if you or your parents have moved countries in the past.',
  helpText8: "When you’re born, you acquire a 'domicile of origin'. This is usually:",
  helpText9:
    '<ul class="govuk-list govuk-list--bullet"><li class="govuk-list govuk-list--bullet">the country your father was domiciled in if your parents were married</li>' +
    '<li class="govuk-list govuk-list--bullet">the country your mother was domiciled in if your parents were unmarried, or your father had died before you were born</li></ul>',
  helpText10:
    "If you leave your domicile of origin and settle in another country as an adult, the new country may become your 'domicile of choice'.",
  helpText11: 'If you’re not sure about your domicile, you should get legal advice.',
};

export const enContainsHabitualResConnection = (
  connections: JurisdictionConnections[] | undefined
): typeof enHabitualResident | undefined => {
  if (
    connections &&
    (connections.includes(JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT) ||
      connections.includes(JurisdictionConnections.APP_2_RESIDENT) ||
      connections.includes(JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS) ||
      connections.includes(JurisdictionConnections.APP_1_APP_2_RESIDENT) ||
      connections.includes(JurisdictionConnections.APP_1_RESIDENT_JOINT) ||
      connections.includes(JurisdictionConnections.RESIDUAL_JURISDICTION) ||
      connections.includes(JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS))
  ) {
    return enHabitualResident;
  }
};

export const enContainsDomConnection = (
  connections: JurisdictionConnections[] | undefined
): typeof enDomicile | undefined => {
  if (
    connections &&
    (connections.includes(JurisdictionConnections.APP_1_APP_2_DOMICILED) ||
      connections.includes(JurisdictionConnections.APP_1_DOMICILED) ||
      connections.includes(JurisdictionConnections.APP_2_DOMICILED))
  ) {
    return enDomicile;
  }
};
