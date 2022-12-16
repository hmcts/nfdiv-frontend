import { State, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { DownloadEndpoint } from '../../../modules/document-download/downloadEndpoints';
import { CommonContent } from '../../common/common.content';

const en = ({ partner, isDivorce, userCase }: CommonContent) => ({
  title: `Read your ${partner}'s response`,
  line1: `You need to read your ${partner}'s response before you continue. These are the questions they were asked, including whether they want to dispute your application ${
    isDivorce ? 'for divorce' : 'to end your civil partnership'
  }. It’s legally known as an ‘acknowledgement of service’.`,
  downloadResponse: {
    text: `Download a copy of your ${partner}'s response`,
    prev: 'Previous',
    next: 'Next',
    link: DownloadEndpoint.RESPONDENT_ANSWERS,
  },
  subHeading1: 'Respondent',
  line2: `${userCase.applicant2FirstNames} ${userCase.applicant2MiddleNames} ${userCase.applicant2LastNames}`,
  subHeading2: 'Applicant',
  line3: `${userCase.applicant1FirstNames} ${userCase.applicant1MiddleNames} ${userCase.applicant1LastNames}`,
  subHeading3: 'How the respondent wants to respond',
  line4:
    userCase.disputeApplication === YesOrNo.YES
      ? `I want to dispute the ${isDivorce ? 'divorce' : 'application to end your civil partnership'}`
      : `Continue without disputing the ${isDivorce ? 'divorce' : 'application to end your civil partnership'}`,
  subHeading4: 'The legal power (jurisdiction) of the courts',
  line5:
    userCase.jurisdictionAgree === YesOrNo.YES
      ? 'The respondent agrees the court has jurisdiction'
      : `The respondent does not agree the court has jurisdiction.<br> They provided the following reasons:<br> ${userCase.reasonCourtsOfEnglandAndWalesHaveNoJurisdiction}`,
  countryLifeMainlyBased: `They said their life was mainly based in the following country:<br> ${userCase.inWhichCountryIsYourLifeMainlyBased}`,
  subHeading5: 'Other court cases',
  line6: `The respondent said there were${
    userCase.applicant2LegalProceedings === YesOrNo.NO ? ' no' : ''
  } other court cases relating to the ${isDivorce ? 'marriage' : 'civil partnership'}.${
    userCase.applicant2LegalProceedings === YesOrNo.YES
      ? ` They provided the following details:<br> ${userCase.applicant2LegalProceedingsDetails}`
      : ''
  }`,
  subHeading6: 'Statement of truth',
  line7: '“I believe the facts stated in this response are true”',
  line8: `${userCase.applicant2FirstNames} ${userCase.applicant2LastNames}`,
});

// @TODO translations
const cy: typeof en = en;

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const hasNotAgreedToJurisdiction = content.userCase.jurisdictionAgree === YesOrNo.NO;
  const showResponseDocument =
    [State.AwaitingConditionalOrder, State.ConditionalOrderDrafted].includes(content.userCase.state as State) &&
    content.userCase.applicant2Offline === YesOrNo.YES;
  return {
    ...languages[content.language](content),
    form,
    hasNotAgreedToJurisdiction,
    showResponseDocument,
  };
};
