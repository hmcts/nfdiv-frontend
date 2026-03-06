import config from 'config';

import { GeneralApplicationHearingNotRequired } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { getFee } from '../../../../../app/fees/service/get-fee';
import { FormContent } from '../../../../../app/form/Form';
import { form as helpWithFeesForm } from '../../common/help-with-fees/content';

const en = (serviceFee: string) => ({
  title: 'Help with fees',
  line1: `The cost of this application is ${serviceFee}. You can <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">check the help with fees guidance on GOV.UK (opens in a new tab)</a> to find out if you are eligible for support.`,
  useHelpWithFees: 'Will you be using help with fees to pay for this application?',
  yes: 'Yes',
  no: 'No',
  errors: {
    applicant1InterimAppsUseHelpWithFees: {
      required: "Select 'Yes' if you are using help with fees for this application.",
    },
  },
});

const cy = (serviceFee: string) => ({
  title: 'Help i Dalu Ffioedd',
  line1: `Cost y cais hwn am yw ${serviceFee}. Gallwch <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFeesCY'
  )}">wirio'r cyfarwyddyd ar help i dalu ffioedd ar GOV.UK (yn agor mewn tab newydd)</a> i ganfod a ydych yn gymwys i gael cymorth. `,
  useHelpWithFees: 'A fyddwch chi’n defnyddio help i dalu ffioedd i dalu am y cais hwn?',
  yes: 'Byddaf',
  no: 'Na fyddaf',
  errors: {
    applicant1InterimAppsUseHelpWithFees: {
      required: "Dewiswch 'Byddaf' os ydych yn defnyddio’r gwasanaeth help i dalu ffioedd ar gyfer y cais hwn.",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = helpWithFeesForm;

export const generateContent: TranslationFn = content => {
  const serviceFee =
    content.userCase.applicant1GenAppHearingNotRequired === GeneralApplicationHearingNotRequired.NO
      ? getFee(config.get('fees.generalAppWithHearing'))
      : getFee(config.get('fees.generalAppWithoutHearing'));
  const translations = languages[content.language](serviceFee);
  return {
    ...translations,
    form,
  };
};
