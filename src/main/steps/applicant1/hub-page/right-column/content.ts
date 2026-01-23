import { State } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { currentStateFn } from '../../../state-sequence';

const en = () => ({
  iWantTo: 'I want to...',
  gettingHelp: 'Getting help',
  moneyAndPropertyLinkText: 'Find out about dividing money and property',
});

// @TODO translations
const cy: typeof en = () => ({
  iWantTo: 'Rwyf eisiau...',
  gettingHelp: 'Cael help',
  moneyAndPropertyLinkText: 'Rhagor o wybodaeth am rannu arian ac eiddo',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const currentState = currentStateFn(content.userCase?.state);
  const showMoneyAndPropertySidebarLink =
    currentState.isAfter(State.AwaitingDocuments) || currentState.isAtOrAfter(State.AwaitingHWFDecision);
  return {
    ...languages[content.language](),
    showMoneyAndPropertySidebarLink,
  };
};
