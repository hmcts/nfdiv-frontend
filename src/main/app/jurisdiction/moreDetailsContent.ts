import { JurisdictionConnections } from '../case/definition';

const enHabitualResident = `If your lives are mainly based in England or Wales then you’re what is legally known as ‘habitually resident’.<br><br>
  This may include working, owning property, having children in school, and your main family life taking place in England or Wales.<br><br>
  The examples above aren’t a complete list of what makes up habitual residence, and just because some of them apply to you doesn’t mean you’re habitually resident. If you’re not sure, you should get legal advice.`;

const enDomicile = `Your domicile is usually the place in which you were born, regard as your permanent home and to which you have the closest ties.<br><br>
  However, domicile can be more complex, for example, if you or your parents have moved countries in the past.<br><br>
  When you’re born, you acquire a 'domicile of origin'. This is usually:
  <ul class="govuk-list govuk-list--bullet"><li class="govuk-list govuk-list--bullet">the country your father was domiciled in if your parents were married</li>
  <li class="govuk-list govuk-list--bullet">the country your mother was domiciled in if your parents were unmarried, or your father had died before you were born</li></ul>
  If you leave your domicile of origin and settle in another country as an adult, the new country may become your 'domicile of choice'.<br><br>
  If you’re not sure about your domicile, you should get legal advice.`;

export const jurisdictionMoreDetailsContent = (
  connections: JurisdictionConnections[] | undefined,
  isDivorce: boolean
  // showAllResidences = false
): { connectedToEnglandWales: string; readMore: string } => {
  const enResidual = `If you’re in a same-sex couple and if none of the other connections apply, the court may still have jurisdiction if:
    <ul class="govuk-list govuk-list--bullet"><li class="govuk-list govuk-list--bullet">you ${
      isDivorce ? 'married' : 'formed your civil partnership'
    } in England or Wales and</li>
    <li class="govuk-list govuk-list--bullet">it would be in the interests of justice for the court to consider the application. For example, your home country does not allow ${
      isDivorce ? 'divorce' : 'civil partnerships to be ended'
    } between same-sex couples</li></ul>`;

  const infoContent = {
    habitualResidence: enHabitualResident,
    domicile: enDomicile,
    residual: enResidual,
  };

  const infoTitle = {
    habitualResidence: 'Read more about habitual residence',
    domicile: 'Read more about domicile',
    residual: 'Read more about residual jurisdiction',
    multiple: 'Read more about your connections',
  };

  const infoSubheader = {
    habitualResidence: '<strong>Habitual residence</strong><br><br>',
    domicile: '<strong>Domicile</strong><br><br>',
    residual: '<strong>Residual</strong><br><br>',
  };

  let totalTextParagraph = '';

  const habitualResidentConnections = [
    JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT,
    JurisdictionConnections.APP_2_RESIDENT,
    JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS,
    JurisdictionConnections.APP_1_APP_2_RESIDENT,
    JurisdictionConnections.APP_1_RESIDENT_JOINT,
    JurisdictionConnections.RESIDUAL_JURISDICTION,
    JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS,
  ];

  const domicileConnections = [
    JurisdictionConnections.APP_1_APP_2_DOMICILED,
    JurisdictionConnections.APP_1_DOMICILED,
    JurisdictionConnections.APP_2_DOMICILED,
  ];

  const residualConnections = [JurisdictionConnections.RESIDUAL_JURISDICTION];

  const whichTexts: string[] = [];

  if (connections && connections.some(r => habitualResidentConnections.includes(r))) {
    whichTexts.push('habitualResidence');
  }
  if (connections && connections.some(r => domicileConnections.includes(r))) {
    whichTexts.push('domicile');
  }
  if (connections && connections.some(r => residualConnections.includes(r))) {
    whichTexts.push('residual');
  }

  if (whichTexts.length === 1) {
    return { connectedToEnglandWales: infoContent[whichTexts[0]], readMore: infoTitle[whichTexts[0]] };
  } else {
    for (const str of whichTexts) {
      totalTextParagraph += infoSubheader[str] + infoContent[str] + '<br><br>';
    }
    return { connectedToEnglandWales: totalTextParagraph, readMore: infoTitle[4] };
  }
};

/* TODO: Notes for jurisdiction ticket:
  1. Combine connection-summary page with you-can-use-english-and-welsh-courts (bullet point content for multiple connections, one line for one)
  2. Finish cleaning up this more details content
  3. Clean up the bulletedPointsContent file
  4. Remove checkboxes on you-can-use-english-and-welsh-courts for connections that have already been made
  5. Connection needs to already be made by the you-can-use-english-and-welsh-courts in order for the above, so might need GetController on the page rather than the current postController
  6. common.content clean up?
*/
