import { Checkbox, LanguagePreference } from '../../../main/app/case/case.js';
import { YesOrNo } from '../../../main/app/case/definition.js';
import { BrowserCase } from '../../steps/common.js';

export const respondentCompleteCaseWithDispute: Partial<BrowserCase> = {
  confirmReadPetition: Checkbox.Checked,
  disputeApplication: YesOrNo.YES,
  confirmDisputeApplication: YesOrNo.YES,
  jurisdictionAgree: YesOrNo.YES,
  reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: '',
  inWhichCountryIsYourLifeMainlyBased: '',
  applicant2PhoneNumber: '',
  applicant2LegalProceedings: YesOrNo.NO,
  applicant2AgreeToReceiveEmails: Checkbox.Checked,
  applicant2EnglishOrWelsh: LanguagePreference.English,
};
