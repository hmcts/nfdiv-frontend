import { iCheckOption, iEnterValueIntoInput, iSelectRadio } from './commonHelpers/elementInteraction';
import { getApplicantString } from './commonHelpers/userInteraction';

When("I don't know my partner's contact details", () => {
  iSelectRadio('#notKnown');
});
When('I select alternative service', () => {
  iSelectRadio('#alternativeService');
});
When('I confirm I understand', () => {
  iCheckOption(`#${getApplicantString()}InterimAppsIUnderstand`);
});
Given('I enter my alternative service reason', () => {
  iEnterValueIntoInput('Alternative service reason', `#${getApplicantString()}AltServiceReasonForApplying`);
});
When('I want to send papers in a different way', () => {
  iSelectRadio('#inADifferentWay');
});
When('I want to serve by phone', () => {
  const applicantString = getApplicantString();
  iCheckOption(`#${applicantString}AltServiceDifferentWays`);
  iEnterValueIntoInput('07700 900457', `#${applicantString}AltServicePartnerPhone`);
});
Given('I enter more details', () => {
  iEnterValueIntoInput('More details', `#${getApplicantString()}AltServiceMethodJustification`);
});
