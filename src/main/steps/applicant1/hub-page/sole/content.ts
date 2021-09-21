import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import { State } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import type { CommonContent } from '../../../common/common.content';

dayjs.extend(advancedFormat);

const en = ({ isDivorce, partner, formState }: CommonContent) => ({
  aosAwaitingOrDrafted: {
    line1: `Your application ${
      isDivorce ? 'for divorce ' : 'to end your civil partnership'
    } has been submitted and checked by court staff. It has been sent to you and your ${partner} by [email / post].`,
    line2: `Your ${partner} should respond to the ${
      isDivorce ? 'divorce application' : 'application to end your civil partner'
    } by ${formState?.dueDate || dayjs().add(2, 'weeks').format('MMMM Do YYYY')}.`,
    line3:
      'You will be notified by email when they have responded. Or told what you can do next if they do not respond.',
  },
  aosDue: {
    line1: `Your ${partner} should have responded to your ${
      isDivorce ? 'divorce application' : 'application to end your civil partner'
    } by ${
      formState?.dueDate
    }. They can still respond and have been sent a reminder. You can also contact them to remind them if it’s safe to do so.`,
    line2: `If you do not think they will respond then you can view the options for proceeding with your ${
      isDivorce ? 'divorce' : 'application to end your civil partnership'
    }`,
  },
});

// @TODO translations
const cy: typeof en = en;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const progressionIndex = [
    State.Submitted,
    State.AwaitingAos,
    State.AosDrafted,
    State.AosOverdue,
    State.Holding,
    State.AwaitingLegalAdvisorReferral,
    State.AwaitingPronouncement,
    State.FinalOrderComplete,
  ].indexOf(content.formState?.state as State);
  return {
    ...languages[content.language](content),
    progressionIndex,
  };
};
