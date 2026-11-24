import { ChangedNameHow } from '../../main/app/case/definition';

import { iEnterTheAccessCode, iEnterTheCaseReference, iGetTheCaseForUser } from './commonHelpers/case-interaction';
import {
  iCheckOptionValueForField,
  iClickSubmitAndExpectTheCurrentPage,
  iEnterMyEmailAddress,
  iEnterMyName,
  iEnterTheirName,
  iEnterValueIntoInput,
  iSelectNo,
  iWaitForErrorForField,
  iWaitForErrorSummaryForField,
  iWaitForErrorWithoutSummaryForField,
  iWaitForVisibleError,
  iWaitForVisibleErrorSummary,
  iWaitForVisibleErrorWithoutSummary,
} from './commonHelpers/element-interaction';
import { TestUserKey } from './commonHelpers/idam-user-manager';
import { logAndThrow } from './commonHelpers/logger';
import {
  getApplicantString,
  getCapitalisedApplicantString,
  getCurrentUserKey,
  getOtherApplicantString,
  getUser,
} from './commonHelpers/user-interaction';
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

const parseFieldCsv = (fieldCsv: string): string[] => {
  return fieldCsv.split(',').map(field => field.trim());
};

export const iExpectErrorSummary = (fieldName?: string): void => {
  if (fieldName) {
    const fieldNames = parseFieldCsv(fieldName);
    fieldNames.forEach(field => {
      iWaitForErrorSummaryForField(field);
    });
  } else {
    iWaitForVisibleErrorSummary();
  }
};

export const iExpectErrorElements = (fieldName?: string): void => {
  if (fieldName) {
    const fieldNames = parseFieldCsv(fieldName);
    fieldNames.forEach(field => {
      iWaitForErrorForField(field);
    });
  } else {
    iWaitForVisibleError();
  }
};

export const iExpectErrorElementsWithoutSummary = (fieldName?: string): void => {
  if (fieldName) {
    const fieldNames = parseFieldCsv(fieldName);
    fieldNames.forEach(field => {
      iWaitForErrorWithoutSummaryForField(field);
    });
  } else {
    iWaitForVisibleErrorWithoutSummary();
  }
};

export const iClickSubmitAndExpectErrorSummary = async (fieldName?: string): Promise<void> => {
  await iClickSubmitAndExpectTheCurrentPage();
  iExpectErrorSummary(fieldName);
};

export const iClickSubmitAndExpectErrorElements = async (fieldName?: string): Promise<void> => {
  await iClickSubmitAndExpectTheCurrentPage();
  iExpectErrorElements(fieldName);
};

export const iClickSubmitAndExpectErrorElementsWithoutSummary = async (fieldName?: string): Promise<void> => {
  await iClickSubmitAndExpectTheCurrentPage();
  iExpectErrorElementsWithoutSummary(fieldName);
};

export const iEnterAnInvalidCaseReference = (): void => {
  iEnterTheCaseReference('1234123412341234');
};
export const iEnterAnInvalidAccessCode = (): void => {
  iEnterTheAccessCode('QWERTY45');
};

When('I click submit and expect errors for fields {string}', async (fieldName: string) => {
  await iClickSubmitAndExpectErrorElements(fieldName);
});
When('I click submit and expect an error for field {string}', async (fieldName: string) => {
  await iClickSubmitAndExpectErrorElements(fieldName);
});
When('I click submit and expect an error summary for field {string}', async (fieldName: string) => {
  await iClickSubmitAndExpectErrorSummary(fieldName);
});
When(
  'I click submit and expect an error summary for field {string} and an error for field {string}',
  async (fieldName: string, errorFieldName: string) => {
    await iClickSubmitAndExpectErrorSummary(fieldName);
    iWaitForErrorWithoutSummaryForField(errorFieldName);
  }
);
When(
  'I click submit and expect an error summary for fields {string} and errors for fields {string}',
  async (fieldName: string, errorFieldName: string) => {
    await iClickSubmitAndExpectErrorSummary(fieldName);
    iWaitForErrorWithoutSummaryForField(errorFieldName);
  }
);
When('I click continue and expect errors for fields {string}', async (fieldName: string) => {
  await iClickSubmitAndExpectErrorElements(fieldName);
});
When('I click continue and expect an error for field {string}', async (fieldName: string) => {
  await iClickSubmitAndExpectErrorElements(fieldName);
});
When('I click continue and expect an error summary for field {string}', async (fieldName: string) => {
  await iClickSubmitAndExpectErrorSummary(fieldName);
});
When(
  'I click continue and expect an error summary for field {string} and an error for field {string}',
  async (fieldName: string, errorFieldName: string) => {
    await iClickSubmitAndExpectErrorSummary(fieldName);
    iWaitForErrorWithoutSummaryForField(errorFieldName);
  }
);

When('I click continue and expect uploadedFiles error elements', async () => {
  await iClickSubmitAndExpectErrorSummary('file-upload-btn');
  iExpectErrorElementsWithoutSummary(`${getApplicantString()}UploadedFiles`);
});
When('I click continue and expect confirmReadPetition error elements', async () => {
  await iClickSubmitAndExpectErrorSummary('confirmReadPetitionId');
  iExpectErrorElementsWithoutSummary('confirmReadPetition');
});
When('I click continue and expect caseReference error elements', async () => {
  await iClickSubmitAndExpectErrorSummary('undefined');
  iExpectErrorElementsWithoutSummary('caseReference');
});
When('I click continue and expect accessCode error elements', async () => {
  await iClickSubmitAndExpectErrorSummary('undefined');
  iExpectErrorElementsWithoutSummary('accessCode');
});

When('I click submit and expect prayer and statement of truth error elements', async () => {
  await iClickSubmitAndExpectErrorSummary('iConfirmPrayer, statementOfTruth');
  const applicantString = getApplicantString();
  iExpectErrorElementsWithoutSummary(`${applicantString}IConfirmPrayer, ${applicantString}StatementOfTruth`);
});
When('I click submit and expect conditional order statement of truth error elements', async () => {
  await iClickSubmitAndExpectErrorSummary('statementOfTruth');
  iExpectErrorElementsWithoutSummary(`co${getCapitalisedApplicantString()}StatementOfTruth`);
});
When('I click submit and expect final order delay explanation error elements', async () => {
  const applicantString = getApplicantString();
  await iClickSubmitAndExpectErrorElements(`${applicantString}FinalOrderLateExplanation`);
  iExpectErrorSummary('statementOfTruth');
  iExpectErrorElementsWithoutSummary(`${applicantString}FinalOrderStatementOfTruth`);
});

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

Then('I enter my email address as their email address', async () => {
  await iEnterMyEmailAddress(`#${getOtherApplicantString()}EmailAddress`);
});

Then('I enter {string} as their solicitor email address', (theirSolicitorEmailAddress: string) => {
  iEnterValueAsTheirSolicitorEmailAddress(theirSolicitorEmailAddress);
});

When('I click find address', async () => {
  await iClickFindAddress();
});
When('I click find address and expect error elements', async () => {
  await iClickFindAddress();
  iWaitForErrorSummaryForField('postcode');
});
When('I enter an invalid postcode', () => {
  iEnterPostcode('not a postcode!');
});
When('I enter the default UK postcode', () => {
  iEnterPostcode(getDefaultPostcode());
});
When('I cannot find the address in the list', iClickCannotFindAddress);
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

let caseReferenceAndAccessCode: { caseReference: string; accessCode: string };

const getCaseReferenceAndAccessCode = async (): Promise<void> => {
  const fetchedCase = await iGetTheCaseForUser(TestUserKey.APPLICANT_1);
  const applicant1 = await getUser(TestUserKey.APPLICANT_1);

  const accessCodeField = getCurrentUserKey() === TestUserKey.APPLICANT_1 ? 'accessCodeApplicant1' : 'accessCode';
  const accessCode = fetchedCase[accessCodeField];
  if (!accessCode) {
    return logAndThrow(
      `No access code (expected in field ${accessCodeField}) was returned for case ${fetchedCase.id} retrieved by ${applicant1.username}`
    );
  }
  caseReferenceAndAccessCode = { caseReference: fetchedCase.id, accessCode };
};

Given('I get the case reference and access code', async () => {
  await getCaseReferenceAndAccessCode();
});

When('I enter an invalid access code', async () => {
  const { caseReference } = caseReferenceAndAccessCode;
  iEnterTheCaseReference(caseReference);
  iEnterAnInvalidAccessCode();
});
When('I enter an invalid case reference', async () => {
  const { accessCode } = caseReferenceAndAccessCode;
  iEnterAnInvalidCaseReference();
  iEnterTheAccessCode(accessCode);
});
When('I enter an invalid access code and no case reference', () => {
  iEnterTheCaseReference('');
  iEnterAnInvalidAccessCode();
});
When('I enter an invalid case reference and no access code', () => {
  iEnterAnInvalidCaseReference();
  iEnterTheAccessCode('');
});
When('I enter an invalid case reference and invalid access code', () => {
  iEnterAnInvalidCaseReference();
  iEnterAnInvalidAccessCode();
});
