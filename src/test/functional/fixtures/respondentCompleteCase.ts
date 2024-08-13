import { Checkbox, LanguagePreference } from '../../../main/app/case/case';
import { YesOrNo } from '../../../main/app/case/definition';
import { BrowserCase } from '../../steps/common';

export const respondentCompleteCase: Partial<BrowserCase> = {
  confirmReadPetition: Checkbox.Checked,
  disputeApplication: YesOrNo.NO,
  jurisdictionAgree: YesOrNo.YES,
  intendToDelay: YesOrNo.NO,
  reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: '',
  inWhichCountryIsYourLifeMainlyBased: '',
  applicant2PhoneNumber: '',
  applicant2LegalProceedings: YesOrNo.NO,
  applicant2AgreeToReceiveEmails: Checkbox.Checked,
  applicant2EnglishOrWelsh: LanguagePreference.English,
};
