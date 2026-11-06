import { ChangedNameHow } from '../../main/app/case/definition';

import {
  iCheckOptionValueForField,
  iClickSubmitAndExpectTheCurrentPage,
  iEnterMyEmailAddress,
  iEnterMyName,
  iEnterTheirName,
  iEnterValueIntoInput,
  iSelectNo,
  iWait,
  iWaitForVisibleError,
  iWaitForVisibleErrorSummary,
} from './commonHelpers/elementInteraction';
import { getApplicantString, getOtherApplicantString } from './commonHelpers/userInteraction';
import { dateToString, iEnterADateIntoField } from './date';
import {
  getDefaultPostcode,
  iClickCannotEnterUkPostcode,
  iClickCannotFindAddress,
  iClickFindAddress,
  iEnterPostcode,
} from './postcode';

export const iEnterValueAsTheirEmailAddress = (value: string): void => {
  iEnterValueIntoInput(value, `#${getOtherApplicantString()}EmailAddress`);
};

export const iEnterValueAsTheirSolicitorEmailAddress = (value: string): void => {
  iEnterValueIntoInput(value, `#${getOtherApplicantString()}SolicitorEmail`);
};

export const iClickSubmitAndExpectErrorElements = async (): Promise<void> => {
  await iClickSubmitAndExpectTheCurrentPage();
  iWaitForVisibleError();
};

export const iClickSubmitAndExpectErrorSummary = async (): Promise<void> => {
  await iClickSubmitAndExpectTheCurrentPage();
  iWaitForVisibleErrorSummary();
};

export const iEnterAnInvalidReferenceNumber = (): void => {
  iEnterValueIntoInput('1234123412341234', '#caseReference');
};
export const iEnterAnInvalidAccessCode = (): void => {
  iEnterValueIntoInput('QWERTY45', '#accessCode');
};

When('I click submit and expect error elements', iClickSubmitAndExpectErrorElements);
When('I click continue and expect error elements', iClickSubmitAndExpectErrorElements);
When('I click continue and expect an error summary', iClickSubmitAndExpectErrorSummary);

Given('I enter an invalid relationship date', () => {
  iEnterADateIntoField('! 1 abc', 'relationshipDate');
});

/** Setting the date to the first due to different months having different total number of days **/
Given(/I enter a relationship date that is (\d+) (?:month|months) in the past/, (month: string) => {
  const date = new Date();
  date.setDate(1);
  if (date.getMonth() - +month === 0) {
    date.setMonth(1);
  } else {
    date.setMonth(date.getMonth() - +month);
  }
  iEnterADateIntoField(dateToString(date), 'relationshipDate');
});

Given(/I enter a relationship date that is (\d+) (?:year|years) in the future/, (year: string) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + +year);
  iEnterADateIntoField(dateToString(date), 'relationshipDate');
});

Then('I enter an invalid HWF reference number', () => {
  iEnterValueIntoInput('Invalid', `#${getApplicantString()}HelpWithFeesRefNo`);
});

Then('I enter {string} as their email address', (theirEmailAddress: string) => {
  iEnterValueAsTheirEmailAddress(theirEmailAddress);
});

Then('I enter my email address as their email address', () => {
  iEnterMyEmailAddress(`#${getOtherApplicantString()}EmailAddress`);
});

Then('I enter {string} as their solicitor email address', (theirSolicitorEmailAddress: string) => {
  iEnterValueAsTheirSolicitorEmailAddress(theirSolicitorEmailAddress);
});

When('I click find address', async () => {
  await iClickFindAddress();
});
When('I click find address and expect error elements', async () => {
  await iClickFindAddress();
  iWaitForVisibleErrorSummary();
  iWait(1); // The next iClickFindAddress() call (without reloading the page) can fail without this wait
});
When('I enter an invalid postcode', () => {
  iEnterPostcode('not a postcode!');
});
When('I enter the default UK postcode', () => {
  iEnterPostcode(getDefaultPostcode());
});
When('I cannot find the address in the list', () => {
  iClickCannotFindAddress(10);
});
When('I have an international address', () => {
  iClickCannotEnterUkPostcode();
});
When('I enter invalid characters in my name', () => {
  iEnterMyName('myFirstName! myLastName1');
});
When('I enter invalid characters in their name', () => {
  iEnterTheirName('theirFirstName! theirLastName1');
});
When('I select other', () => {
  iCheckOptionValueForField(ChangedNameHow.OTHER, `${getApplicantString()}WhyNameDifferent`);
});
When('I enter an invalid phone number', () => {
  iEnterValueIntoInput('12345', `#${getApplicantString()}PhoneNumber`);
});
When('I do not agree the courts have jurisdiction', iSelectNo);
When('I enter an invalid reference number and invalid access code', () => {
  iEnterAnInvalidReferenceNumber();
  iEnterAnInvalidAccessCode();
});
When('I enter an invalid access code', () => {
  iEnterAnInvalidAccessCode();
});
When('I enter an invalid reference number', () => {
  iEnterAnInvalidReferenceNumber();
});
