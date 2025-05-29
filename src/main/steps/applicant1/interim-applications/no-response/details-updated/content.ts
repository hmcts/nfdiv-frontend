import config from 'config';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { CommonContent } from '../../../../common/common.content';
import { HUB_PAGE } from '../../../../urls';

const en = ({ partner, isDivorce }: CommonContent) => ({
  title: 'Details updated',
  line1: `You have successfully updated your ${partner}’s contact details.`,
  whatHappensNext: 'What happens next',
  line2: `We will now serve your ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } again using the new contact details you have provided.`,
  line3: `Your ${partner} will have ${config.get(
    'dates.interimApplicationNoResponseNewContactDetailsOffsetDays'
  )} days from receiving the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } to respond. If your ${partner} does not respond, we will help you explore the other options you have to progress your ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  }.`,
  line4: 'This will not affect when you can apply for your conditional order.',
  returnToHubScreen: `<a href=${HUB_PAGE} class="govuk-link">Return to hub screen</a>`,
});

//TODO: Welsh translation required

const cy: typeof en = en;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translation = languages[content.language](content);
  return {
    ...translation,
  };
};
