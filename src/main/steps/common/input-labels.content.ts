import { YesOrNo, YesOrNoOrNotKnown } from '../../app/case/definition';

const YesOrNoLabels: Record<YesOrNo, string> = {
  [YesOrNo.YES]: 'Yes',
  [YesOrNo.NO]: 'No',
};

const YesOrNoOrNotKnownLabels: Record<YesOrNoOrNotKnown, string> = {
  [YesOrNoOrNotKnown.YES]: YesOrNoLabels.Yes,
  [YesOrNoOrNotKnown.NO]: YesOrNoLabels.No,
  [YesOrNoOrNotKnown.NOT_KNOWN]: 'Not known',
};

const DoOrNaddoLabels: Record<YesOrNo, string> = {
  [YesOrNo.YES]: 'Do',
  [YesOrNo.NO]: 'Naddo',
};

const DoOrNaddoOrNotKnownLabels_cy: Record<YesOrNoOrNotKnown, string> = {
  [YesOrNoOrNotKnown.YES]: DoOrNaddoLabels.Yes,
  [YesOrNoOrNotKnown.NO]: DoOrNaddoLabels.No,
  [YesOrNoOrNotKnown.NOT_KNOWN]: 'Anhysbys',
};

const OesOrNacOesLabels: Record<YesOrNo, string> = {
  [YesOrNo.YES]: 'Oes',
  [YesOrNo.NO]: 'Nac oes',
};

const OesOrNacOesOrNotKnownLabels_cy: Record<YesOrNoOrNotKnown, string> = {
  [YesOrNoOrNotKnown.YES]: OesOrNacOesLabels.Yes,
  [YesOrNoOrNotKnown.NO]: OesOrNacOesLabels.No,
  [YesOrNoOrNotKnown.NOT_KNOWN]: DoOrNaddoOrNotKnownLabels_cy.NotKnown,
};

const ydwOrNacYdwLabels: Record<YesOrNo, string> = {
  [YesOrNo.YES]: 'Ydw',
  [YesOrNo.NO]: 'Nac ydw',
};

const ydwOrNacYdwOrNotKnownLabels: Record<YesOrNoOrNotKnown, string> = {
  [YesOrNoOrNotKnown.YES]: ydwOrNacYdwLabels.Yes,
  [YesOrNoOrNotKnown.NO]: ydwOrNacYdwLabels.No,
  [YesOrNoOrNotKnown.NOT_KNOWN]: DoOrNaddoOrNotKnownLabels_cy.NotKnown,
};

const ydyOrNacYdyLabels: Record<YesOrNo, string> = {
  [YesOrNo.YES]: 'Ydy',
  [YesOrNo.NO]: 'Nac ydy',
};

const ydyOrNacYdyOrNotKnownLabels: Record<YesOrNoOrNotKnown, string> = {
  [YesOrNoOrNotKnown.YES]: ydyOrNacYdyLabels.Yes,
  [YesOrNoOrNotKnown.NO]: ydyOrNacYdyLabels.No,
  [YesOrNoOrNotKnown.NOT_KNOWN]: DoOrNaddoOrNotKnownLabels_cy.NotKnown,
};

// Shared default radio answers
export const defaultYesOrNoRadioAnswers: InputLabelsByLanguage<YesOrNo> = {
  en: YesOrNoLabels,
  cy: DoOrNaddoLabels,
};

export const yesOrNoOrNotKnownRadioAnswers: InputLabelsByLanguage<YesOrNoOrNotKnown> = {
  en: YesOrNoOrNotKnownLabels,
  cy: DoOrNaddoOrNotKnownLabels_cy,
};

export const oesOrNacOesRadioAnswers: InputLabelsByLanguage<YesOrNo> = {
  ...defaultYesOrNoRadioAnswers,
  cy: OesOrNacOesLabels,
};

export const oesOrNacOesOrNotKnownRadioAnswers: InputLabelsByLanguage<YesOrNoOrNotKnown> = {
  ...yesOrNoOrNotKnownRadioAnswers,
  cy: OesOrNacOesOrNotKnownLabels_cy,
};

export const ydwOrNacYdwRadioAnswers: InputLabelsByLanguage<YesOrNo> = {
  ...defaultYesOrNoRadioAnswers,
  cy: ydwOrNacYdwLabels,
};

export const ydwOrNacYdwOrNotKnownRadioAnswers: InputLabelsByLanguage<YesOrNoOrNotKnown> = {
  ...yesOrNoOrNotKnownRadioAnswers,
  cy: ydwOrNacYdwOrNotKnownLabels,
};

export const ydyOrNacYdyRadioAnswers: InputLabelsByLanguage<YesOrNo> = {
  ...defaultYesOrNoRadioAnswers,
  cy: ydyOrNacYdyLabels,
};

export const ydyOrNacYdyOrNotKnownRadioAnswers: InputLabelsByLanguage<YesOrNoOrNotKnown> = {
  ...yesOrNoOrNotKnownRadioAnswers,
  cy: ydyOrNacYdyOrNotKnownLabels,
};

export type InputLabelsByLanguage<E extends string> = {
  en: Record<E, string>;
  cy: Record<E, string>;
};
