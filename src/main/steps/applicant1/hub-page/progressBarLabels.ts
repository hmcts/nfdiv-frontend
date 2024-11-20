import { StateSequence } from '../../state-sequence';

const en = (isDivorce: boolean) => ({
  submitted: 'Submitted',
  courtChecks: 'Court checks',
  response: 'Response',
  conditionalOrder: 'Conditional order',
  finalOrder: `Final order (${isDivorce ? 'Divorced' : 'Civil partnership ended'})`,
});

const enArialLabels = {
  submitted:
    'A progress bar showing the application has been submitted. The next steps are court checks, receiving a response, a conditional order being granted and a final order being granted, which is the last stage in the process. The next steps are not complete yet.',
  courtChecks:
    'A progress bar showing the application has been submitted and court checks completed. The next steps are receiving a response, a conditional order being granted and a final order being granted, which is the last stage in the process. The next steps are not complete yet.',
  response:
    'A progress bar showing the application has been submitted, court checks completed and the response has been received. The next steps show a conditional order being granted and a final order being granted, which is the last stage in the process. The next steps are not complete yet.',
  conditionalOrder:
    'A progress bar showing the application has been submitted, court checks completed, the response has been received and a conditional order has been granted. The next step shows a final order being granted, which is the final stage in the process. This step is not complete yet.',
  finalOrder:
    'A progress bar showing the application has been submitted, court checks completed, the response has been received, a conditional order has been granted and a final order has been granted. All steps are now complete.',
};

const cy: typeof en = (isDivorce: boolean) => ({
  submitted: "Wedi'i gyflwyno",
  courtChecks: 'Gwiriadau llys',
  response: 'Ymateb',
  conditionalOrder: 'Gorchymyn amodol',
  finalOrder: `Gorchymyn terfynol (${isDivorce ? 'Wedi ysgaru' : 'Partneriaeth sifil wedi dod i ben'})`,
});

const cyArialLabels: typeof enArialLabels = {
  submitted:
    'Bar cynnydd yn dangos bod y cais wedi’i gyflwyno. Y camau nesaf yw gwiriadau’r llys, cael ymateb, gorchymyn amodol yn cael ei gymeradwyo a gorchymyn terfynol yn cael ei gymeradwyo, sef y cam olaf o’r broses. Nid yw’r camau nesaf wedi’u cwblhau eto.',
  courtChecks:
    'Bar cynnydd yn dangos bod y cais wedi’i gyflwyno a bod gwiriadau’r llys wedi’u cwblhau. Y camau nesaf yw cael ymateb, gorchymyn amodol yn cael ei gymeradwyo a gorchymyn terfynol yn cael ei gymeradwyo, sef y cam olaf o’r broses. Nid yw’r camau nesaf wedi’u cwblhau eto.',
  response:
    'Bar cynnydd yn dangos bod y cais wedi’i gyflwyno, gwiriadau’r llys wedi’u cwblhau a bod yr ymateb wedi dod i law. Mae’r camau nesaf yn dangos gorchymyn amodol yn cael ei gymeradwyo a gorchymyn terfynol yn cael ei gymeradwyo, sef y cam olaf yn y broses. Nid yw’r camau nesaf wedi’u cwblhau eto.',
  conditionalOrder:
    'Bar cynnydd yn dangos bod y cais wedi’i gyflwyno, gwiriadau’r llys wedi’u cwblhau, mae’r ymateb wedi dod i law, ac mae gorchymyn amodol wedi’i gymeradwyo. Mae’r cam nesaf yn dangos y gorchymyn terfynol yn cael ei gymeradwyo, sef y cam olaf o’r broses. Nid yw cam hwn wedi’i gwblhau eto.',
  finalOrder:
    'Bar cynnydd yn dangos bod y cais wedi’i gyflwyno, gwiriadau’r llys wedi’u cwblhau, mae’r ymateb wedi dod i law, mae gorchymyn amodol wedi’i gymeradwyo ac mae gorchymyn terfynol wedi’i gymeradwyo. Mae’r holl gamau wedi’u cwblhau bellach.',
};

export const getProgressBarContent = (
  isDivorce: boolean,
  displayState: StateSequence,
  isEnglish: boolean
): ProgressBar => {
  return {
    ...(isEnglish ? en(isDivorce) : cy(isDivorce)),
    progressBarAriaLabel: getAriaLabel(displayState, isEnglish),
  };
};

const getAriaLabel = (displayState: StateSequence, isEnglish: boolean): string => {
  const ariaLabels = isEnglish ? enArialLabels : cyArialLabels;
  if (displayState.state() === 'FinalOrderComplete') {
    return ariaLabels.finalOrder;
  } else if (displayState.isAfter('ConditionalOrderPronounced')) {
    return ariaLabels.conditionalOrder;
  } else if (displayState.isAfter('IssuedToBailiff')) {
    return ariaLabels.response;
  } else if (displayState.isAtOrAfter('AwaitingAos')) {
    return ariaLabels.courtChecks;
  }
  return ariaLabels.submitted;
};

interface ProgressBar {
  courtChecks;
  submitted: string;
  response: string;
  conditionalOrder: string;
  finalOrder: string;
  progressBarAriaLabel: string;
}
