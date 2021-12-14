import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';

const en = ({ partner, isDivorce, userCase }: CommonContent) => ({
  title: `Read your ${partner}'s response`,
  line1: `You need to read your ${partner}'s response before you continue. These are the questions they were asked, including whether they want to dispute your application ${
    isDivorce ? 'for divorce' : 'to end your civil partnership'
  }. It’s legally known as an ‘acknowledgement of service’.`,
  subHeading1: 'Respondent',
  line2: `${userCase.applicant2FirstNames} ${userCase.applicant2MiddleNames} ${userCase.applicant2LastNames}`,
  subHeading2: 'Applicant',
  line3: `${userCase.applicant1FirstNames} ${userCase.applicant1MiddleNames} ${userCase.applicant1LastNames}`,
  subHeading3: 'How the respondent wants to respond',
  line4:
    userCase.disputeApplication === YesOrNo.YES
      ? 'I want to dispute the divorce'
      : 'Continue without disputing the divorce',
  subHeading4: 'The legal power (jurisdiction) of the courts',
  line5:
    userCase.jurisdictionAgree === YesOrNo.YES
      ? 'The respondent agrees the court has jurisdiction'
      : `The respondent does not agree the court has jurisdiction.<br> They provided the following reasons:<br> ${userCase.reasonCourtsOfEnglandAndWalesHaveNoJurisdiction}`,
  countryLifeMainlyBased: `They said their life was mainly based in the following country:<br> ${userCase.inWhichCountryIsYourLifeMainlyBased}`,
  subHeading5: 'Other court cases',
  line6:
    userCase.applicant2LegalProceedings === YesOrNo.NO
      ? 'The respondent said there were no other court cases relating to the marriage'
      : `The respondent said there were other court cases relating to the ${
          isDivorce ? 'marriage' : 'civil partnership'
        }. They provided the following details:<br> ${userCase.applicant2LegalProceedingsDetails}`,
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
  return {
    ...languages[content.language](content),
    form,
    hasNotAgreedToJurisdiction,
  };
};
