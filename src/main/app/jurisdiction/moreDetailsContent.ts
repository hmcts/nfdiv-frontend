import { JurisdictionConnections } from '../../app/case/definition';

import {
  enContainsDomConnection,
  enContainsHabitualResConnection,
  enDomicile,
  enHabitualResident,
} from './getResTypeContent';

export const jurisdictionMoreDetailsContent = (
  connections: JurisdictionConnections[] | undefined,
  isRespondent = false
): { connectedToEnglandWales: string; readMore: string } => {
  const resConnection = enContainsHabitualResConnection(connections);
  const domConnection = enContainsDomConnection(connections);

  const connectionIndex = isRespondent || (resConnection && domConnection) ? 2 : resConnection ? 1 : 0;

  const connectionText = [
    'Read more about habitual residence',
    'Read more about domicile',
    'Read more about your connections',
  ];
  const totalText = [
    Object.values(enHabitualResident).join('<br><br>').replace('Habitual residence<br><br>', ''),
    Object.values(enDomicile).join('<br><br>').replace('Domicile<br><br>', '').replace('</ul><br><br>', '</ul>'),
    Object.values(enHabitualResident)
      .join('<br><br>')
      .replace('Habitual residence', '<strong>Habitual residence</strong>') +
      '<br><br>' +
      Object.values(enDomicile)
        .join('<br><br>')
        .replace('Domicile', '<strong>Domicile</strong>')
        .replace('</ul><br><br>', '</ul>'),
  ];

  return { connectedToEnglandWales: totalText[connectionIndex], readMore: connectionText[connectionIndex] };
};
