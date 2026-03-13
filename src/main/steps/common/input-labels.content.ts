import { YesOrNo } from '../../app/case/definition';

const YesOrNoLabels: Record<YesOrNo, string> = {
  [YesOrNo.YES]: 'Yes',
  [YesOrNo.NO]: 'No',
};

const DoOrNaddoLabels: Record<YesOrNo, string> = {
  [YesOrNo.YES]: 'Do',
  [YesOrNo.NO]: 'Naddo',
};

const OesOrNacOesLabels: Record<YesOrNo, string> = {
  [YesOrNo.YES]: 'Oes',
  [YesOrNo.NO]: 'Nac oes',
};

const ydwOrNacYdwLabels: Record<YesOrNo, string> = {
  [YesOrNo.YES]: 'Ydw',
  [YesOrNo.NO]: 'Nac ydw',
};

const ydyOrNacYdyLabels: Record<YesOrNo, string> = {
  [YesOrNo.YES]: 'Ydy',
  [YesOrNo.NO]: 'Nac ydy',
};

// Shared default radio answers
export const defaultYesOrNoRadioAnswers: InputLabelsByLanguage<YesOrNo> = {
  en: YesOrNoLabels,
  cy: DoOrNaddoLabels,
};

export const oesOrNacOesRadioAnswers: InputLabelsByLanguage<YesOrNo> = {
  ...defaultYesOrNoRadioAnswers,
  cy: OesOrNacOesLabels,
};

export const ydwOrNacYdwRadioAnswers: InputLabelsByLanguage<YesOrNo> = {
  ...defaultYesOrNoRadioAnswers,
  cy: ydwOrNacYdwLabels,
};

export const ydyOrNacYdyRadioAnswers: InputLabelsByLanguage<YesOrNo> = {
  ...defaultYesOrNoRadioAnswers,
  cy: ydyOrNacYdyLabels,
};

export type InputLabelsByLanguage<E extends string> = {
  en: Record<E, string>;
  cy: Record<E, string>;
};
