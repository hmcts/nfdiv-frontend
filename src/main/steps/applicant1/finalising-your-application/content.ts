import config from 'config';

import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { Checkbox } from '../../../app/case/case';
import { State } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';
import { generateContent as columnGenerateContent } from '../hub-page/right-column/content';

const en = ({ isDivorce, partner, userCase, isJointApplication }: CommonContent) => ({
  title: `Do you want to ${isDivorce ? 'finalise your divorce' : 'end your civil partnership'}?`,
  line1: `Your ${
    isDivorce ? 'marriage' : 'civil partnership'
  } will be legally ended after the final order is made. This might affect your finances.`,
  warningText: `If you have not finished negotiations about your money, property or other assets then you should seek legal advice before finalising
  ${isDivorce ? 'your divorce' : 'ending your civil partnership'}. ${
    isJointApplication && State.AwaitingFinalOrder.includes(userCase.state as State)
      ? 'If you want to settle your finances first, then save and sign out.'
      : ''
  }`,
  readMore: {
    subHeader: `If you want to settle your finances before  ${
      isDivorce ? 'finalising your divorce' : 'ending your civil partnership'
    }`,
    line1: 'You should save and sign out and settle your finances before applying for a final order.',
    line2: `If you have not applied by ${getFormattedDate(
      userCase.dateFinalOrderEligibleToRespondent
    )} then your ${partner} will be able to apply.
    You may both have to come to a court hearing, if they apply.`,
    line3: 'If you wait a year before applying then you will need to explain the delay to the court.',
  },
  readMoreJoint: {
    subHeader: 'Changing to a sole application',
    line1: `If you still want to ${
      isDivorce ? 'get divorced' : 'end your civil partnership'
    } but you do not think your ${partner} will confirm the final order then you can change to a sole application.
    This means your ${partner} will become the respondent.`,
    line2: `You should still continue and confirm you want to ${
      isDivorce ? 'finalise your divorce' : 'end your civil partnership'
    } below.
    If your ${partner} does not also confirm within ${config.get(
      'dates.changingToSolePartnerConfirmationWeeks'
    )} weeks then you will be able to ${
      isDivorce ? 'finalise your divorce' : 'end your civil partnership'
    } as a sole applicant.
    You will receive an email with information on how to change your application, if they do not apply.`,
  },
  readMoreAboutSettlingFinances: {
    subHeader: `Read more about settling your finances before ${
      isDivorce ? 'finalising your divorce' : 'ending your civil partnership'
    }.`,
    line1: `Your financial rights will change after the ${
      isDivorce ? 'divorce is finalised' : 'civil partnership is legally ended'
    }.
     If you have not settled your finances then you should save and sign out and seek legal advice.`,
    line2: `Your ${partner} has already confirmed this joint application.
    If you do not confirm then they can still apply to ${
      isDivorce ? 'finalise the divorce' : 'end the civil partnership'
    } as a sole applicant.
    This will mean you will become the respondent and the ${
      isDivorce ? 'divorce could be finalised' : 'civil partnership could be ended'
    } without your confirmation.
    They must give you ${config.get('dates.settlingFinancesConfirmationDays')} days notice if they intend to do this.`,
    line3: {
      part1: `If you want to settle your finances before the ${
        isDivorce ? 'divorce is finalised' : 'civil partnership is legally ended'
      }
      then you can apply to delay the final order. You can do this by filling out a `,
      part2: "'general application' D11 form",
      link: 'https://www.gov.uk/government/publications/form-d11-application-notice',
      part3: ` and sending it to the court.
      You only need to apply to delay the final order if you receive notice from your ${partner}
      that they are going to apply to ${
        isDivorce ? 'finalise the divorce' : 'end the civil partnership'
      } as a sole applicant.`,
    },
  },
  links: {
    applicationForFinalOrder:
      'https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/952032/d36-eng.pdf',
    certificateOfService: 'https://www.gov.uk/government/publications/form-n215-certificate-of-service',
  },
  readMoreChangeToSole: {
    subHeader: State.AwaitingJointFinalOrder.includes(userCase.state as State)
      ? 'Changing to a sole application'
      : 'If you want to change sole application now ',
    line1: State.AwaitingJointFinalOrder.includes(userCase.state as State)
      ? `Your ${partner} has already confirmed the application for a final order. The quickest way for you to
    ${
      isDivorce ? 'finalise your divorce' : 'end your civil partnership'
    } is for you to also confirm at the bottom of this page.`
      : `If you know your ${partner} is not going to confirm the joint application, then you can apply to change to a sole application now.
    You should save and sign out and follow these steps.`,
    line2: `If you want to change to a sole application then it will delay the ${
      isDivorce ? 'divorce' : 'ending of the civil partnership'
    }
    You can change by following the steps below:`,
    orderedList1: {
      part1: 'Download and fill out an application for a final order',
      part2: ' (as a sole applicant)',
    },
    orderedList2: {
      line1: `Give notice to your ${partner} that you are intending to apply for a final order as a sole applicant.
      You can do this by sending them a draft copy of the application by email or post. You will need to `,
      linkText: "fill out a 'certificate of service'",
      line2: ' (as a sole applicant)',
    },
    orderedList3: `You have to give your ${partner} ${config.get(
      'dates.changingToSolePartnerResponseDays'
    )} days to respond,
    starting from the day they are ‘served’ the application. After ${config.get(
      'dates.changingToSolePartnerResponseDays'
    )} days, then send the following documents and evidence to the court:`,
    bulletPoint1: {
      part1: 'The ',
      linkText: 'application for a final order',
      part2: ' (as a sole applicant)',
    },
    bulletPoint2: {
      part1: 'The ',
      linkText: "'certificate of service'",
      part2: ` which proves that you have given notice to your ${partner} that you are intending to apply for a final order as a sole applicant.`,
    },
    line3:
      'You can either post or email the documents and evidence to the court. Details of where to send them are on any correspondence you have received from the court.',
  },
  checkboxLine: `I want to ${isDivorce ? 'finalise my divorce' : 'end my civil partnership'} ${
    isJointApplication && State.AwaitingFinalOrder.includes(userCase.state as State) ? `jointly with my ${partner}` : ''
  }`,

  errors: {
    doesApplicant1WantToApplyForFinalOrder: {
      required:
        'You cannot continue without selecting the checkbox. If you do not want to continue then save and sign out.',
    },
  },
});

// @TODO translations
const cy: typeof en = en;

export const form: FormContent = {
  fields: {
    doesApplicant1WantToApplyForFinalOrder: {
      type: 'checkboxes',
      label: l => l.confirmBeforeSubmit,
      labelSize: 'm',
      values: [
        {
          name: 'doesApplicant1WantToApplyForFinalOrder',
          label: l => l.checkboxLine,
          value: Checkbox.Checked,
          validator: isFieldFilledIn,
        },
      ],
    },
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const { userCase } = content;
  const translations = languages[content.language](content);
  const isAwaitingFinalOrderState = State.AwaitingFinalOrder.includes(userCase.state as State);
  const isAwaitingJointFinalOrderState = State.AwaitingJointFinalOrder.includes(userCase.state as State);
  const isJointApplication = content.isJointApplication;
  return {
    ...translations,
    ...columnGenerateContent(content),
    isAwaitingFinalOrderState,
    isAwaitingJointFinalOrderState,
    isJointApplication,
    form,
  };
};
