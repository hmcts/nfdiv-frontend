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
    } by ${formState?.dueDate || dayjs().add(17, 'day').format('MMMM Do YYYY')}.`,
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
  holding: {
    line1: `Your ${partner} has responded to your ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }. You can read their response.`,
    line2: `The next step is for you to apply for a ‘conditional order’. A conditional order is a document that says the court does not see any reason why you cannot ${
      isDivorce ? 'end your civil partnership' : 'get a divorce'
    }`,
    line3: `You can apply for a conditional order on ${
      formState?.dueDate || dayjs().add(141, 'day').format('MMMM Do YYYY')
    }. This is because you have to wait until 20 weeks from when the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    } was issued. You will receive an email to remind you.`,
    readMore: 'Read more about the next steps',
    line4: 'You have to complete 2 more steps before you are legally divorced:',
    steps: {
      step1: `
        <strong>Apply for a conditional order</strong><br>
        This shows that the court agrees that you’re entitled to ${
          isDivorce ? 'get a divorce' : 'end your civil partnership'
        }.`,
      step2: `
        <strong>Apply for a final order</strong><br>
        This legally ends the marriage. You cannot apply for a final order until 6 weeks after the conditional order.`,
    },
    line5: `You can use the time to decide how your money and property will be divided. This is dealt with separately to the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }. <a class="govuk-link" href="https://www.gov.uk/money-property-when-relationship-ends" target="_blank">Find out about dividing money and property</a>`,
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
