import { Locator, Page } from '@playwright/test';

import { YesOrNo } from '../../../main/app/case/definition';
import { SupportedLanguages } from '../../../main/modules/i18n';

import { iAmOnIdam, iClickToNavigate, iGrabCurrentUrl, iWaitForUrlParam } from './navigation';
import {
  getApplicantNumber,
  getApplicantString,
  getMyName,
  getOtherApplicantNumber,
  getOtherApplicantString,
  getTheirName,
  getUserEmail,
} from './userInteraction';

const { I } = inject();

export const DEFAULT_EMAIL_ADDRESS = 'simulate-delivered@notifications.service.gov.uk';

type LocatorClickOptions = NonNullable<Parameters<Locator['click']>[0]>;
export type WaitUntil = NonNullable<Parameters<Page['waitForURL']>[1]>['waitUntil'];
export type IClickOptions = LocatorClickOptions & { waitForNavigation?: WaitUntil };

export const iClick = (selector: string | CodeceptJS.LocatorOrString, options: IClickOptions = {}): void => {
  const defaultOptions = { noWaitAfter: false };
  I.click(selector, null, { ...defaultOptions, ...options });
};

export const iClickString = (text: string, locator?: CodeceptJS.LocatorOrString, wait?: number): void => {
  I.waitForText(text, wait);
  iClick(locator || text);
};

export const iWaitForVisible = (selector: string, wait?: number): void => {
  I.waitForVisible(selector + ':not(.hidden):not([hidden])', wait);
};

export const iWaitForInvisible = (selector: string, wait?: number): void => {
  I.waitForInvisible(selector, wait);
};

export const iClickElement = (selector: string, wait?: number): void => {
  iWaitForVisible(selector, wait);
  iClick(selector);
};

export const iCheckOption = (selector: string, wait?: number): void => {
  iWaitForVisible(selector, wait);
  I.checkOption(selector);
};

export const iCheckValueForField = (
  value: string,
  inputType: 'radio' | 'checkbox',
  field: string = '',
  wait?: number
): string => {
  let selector = `input[type="${inputType}"][value="${value}"]`;
  if (field.trim().length > 0) {
    selector += `[name="${field.trim()}"]`;
  }
  iCheckOption(selector, wait);
  return selector;
};

export const iCheckOptionValueForField = (value: string, field: string = '', wait?: number): string => {
  return iCheckValueForField(value, 'checkbox', field, wait);
};
export const iCheckOptionValue = (value: string, wait?: number): string => {
  return iCheckOptionValueForField(value, '', wait);
};
export const iSelectRadioValueForField = (value: string, field: string = '', wait?: number): string => {
  return iCheckValueForField(value, 'radio', field, wait);
};
export const iSelectRadioValue = (value: string, wait?: number): string => {
  return iSelectRadioValueForField(value, '', wait);
};
export const iSelectYesOrNoForField = (
  yesOrNo: YesOrNo.YES | YesOrNo.NO,
  field: string = '',
  wait?: number
): string => {
  return iSelectRadioValueForField(yesOrNo, field, wait);
};
export const iSelectNo = (wait?: number): string => {
  return iSelectYesOrNoForField(YesOrNo.NO, '', wait);
};
export const iSelectYes = (wait?: number): string => {
  return iSelectYesOrNoForField(YesOrNo.YES, '', wait);
};

export const iClickSubmitAndExpectUrl = async (
  nextUrl?: string,
  wait?: number,
  waitUntil: WaitUntil = 'load',
  titleSelector?: string
): Promise<void> => {
  const submitSelector = await I.executeScript(() =>
    document.getElementById('main-form-submit')
      ? '#main-form-submit'
      : 'button[type="submit"]:not(#hide-message):not(.document-delete-button):not(.web-payment-button--apple-pay)'
  );
  await iClickToNavigate(submitSelector, wait, nextUrl, waitUntil, titleSelector);
};

export const iClickSubmit = async (wait?: number): Promise<void> => {
  await iClickSubmitAndExpectUrl(undefined, wait);
};

export const iClickSubmitAndExpectTheCurrentPage = async (): Promise<void> => {
  const nextUrl = await iGrabCurrentUrl();
  await iClickSubmitAndExpectUrl(nextUrl);
};

export const iClickChangeLinkForQuestion = async (questionText: string): Promise<void> => {
  const selector = `a.govuk-link:has(span.govuk-visually-hidden:has-text("${questionText}"))`;
  await iClickToNavigate(selector);
};

export const iCannotUploadDocs = (): void => {
  iCheckOption('#cannotUploadDocs');
};

export const iCannotUploadNameChangeProof = (): void => {
  iCannotUploadDocs();
  iCheckOption('#cannotUploadNameChangeProof');
};

// Non-failing element visibility check.  Useful for preventing test failures when checking for optional elements
export const isElementVisible = async (selector: string, wait: number = 1, delay: number = 100): Promise<boolean> => {
  const deadline = Date.now() + wait * 1000;

  while (Date.now() < deadline) {
    const visibleCount = await I.grabNumberOfVisibleElements(selector);
    if (visibleCount > 0) {
      return true;
    }
    await new Promise<void>(resolve => setTimeout(resolve, delay));
  }

  return (await I.grabNumberOfVisibleElements(selector)) > 0;
};

const handleCookieBanner = async (action: 'accept' | 'reject'): Promise<void> => {
  const onIdam = await iAmOnIdam();
  const cookieBannerSelector = onIdam
    ? 'div#cookie-banner:not([hidden])'
    : 'div.cookie-banner.govuk-cookie-banner:not([hidden])';

  const cookieBannerVisible = await isElementVisible(cookieBannerSelector);
  if (!cookieBannerVisible) {
    return;
  }

  const actionButtonSelector = onIdam ? `button#${action}-additional-cookies` : `button.cookie-banner-${action}-button`;
  const hideButtonSelector = onIdam
    ? 'button#hide-message'
    : `div.cookie-banner-${action}-message button.cookie-banner-hide-button`;

  iClickElement(actionButtonSelector);
  iClickElement(hideButtonSelector);
};

export const iAcceptCookies = async (): Promise<void> => {
  await handleCookieBanner('accept');
};

export const iRejectCookies = async (): Promise<void> => {
  await handleCookieBanner('reject');
};

export const iWait = (time: number): void => {
  I.wait(time);
};

export const iWaitForElementWithText = (selector: string, text: string, wait?: number): void => {
  I.waitForText(text, wait, selector);
};

export const iClickMoreDetailsComponent = (): void => {
  iClickElement("span[class='govuk-details__summary-text']");
};

export const iCheckOptionFor = (optionLabel: string, fieldLabel: string): void =>
  I.checkOption(optionLabel, `//*[contains(text(), '${fieldLabel}')]/..`);

export const iEnterValueIntoInput = (value: string, inputSelector: string, wait?: number): void => {
  iWaitForVisible(inputSelector, wait);
  I.fillField(inputSelector, value);
};

export const iWaitForVisibleErrorSummary = (wait?: number): void => {
  iWaitForVisible('div.govuk-error-summary', wait);
};

export const iWaitForVisibleError = (wait?: number): void => {
  iWaitForVisibleErrorSummary(wait);
  iWaitForVisible('p.govuk-error-message', wait);
};

const iSetAddressPrivacy = (isPrivate: boolean = true, inRefuge: boolean = false): void => {
  iSelectYesOrNoForField(isPrivate ? YesOrNo.YES : YesOrNo.NO, `${getApplicantString()}AddressPrivate`);
  if (isPrivate) {
    iWaitForVisible('#inRefugeConditional');
    iSelectYesOrNoForField(inRefuge ? YesOrNo.YES : YesOrNo.NO, `${getApplicantString()}InRefuge`);
  } else {
    iWaitForInvisible('#inRefugeConditional');
  }
};
export const iSetPrivateAddress = (isPrivate: boolean = true): void => {
  iSetAddressPrivacy(isPrivate, false);
};
export const iSetInRefuge = (inRefuge: boolean = true): void => {
  iSetAddressPrivacy(true, inRefuge);
};

export const iClearTheForm = async (): Promise<void> => {
  await I.executeScript(() => {
    const checkedInputs = document.querySelectorAll('input:checked') as NodeListOf<HTMLInputElement>;
    for (const checkedInput of checkedInputs) {
      checkedInput.checked = false;
    }

    const clearInputs = (inputs: NodeListOf<HTMLInputElement | HTMLTextAreaElement>) => {
      for (const input of inputs) {
        input.value = '';
      }
    };

    clearInputs(document.querySelectorAll('textarea'));
    clearInputs(document.querySelectorAll('input[type="text"]'));
  });
  await I.grabCurrentUrl(); // Do we need to do this??
};

export const iWaitForUploadedFile = async (pathToFile: string, wait?: number): Promise<void> => {
  I.attachFile('input[type="file"]', pathToFile);
  const filename = pathToFile.split('/').pop();
  iWaitForVisible(`#filesUploaded > li.uploadedFile[data-filename='${filename}']`, wait);
};

export const iDeleteUploadedFile = async (filename: string, wait?: number): Promise<void> => {
  const uploadedFileSelector = `#filesUploaded > li.uploadedFile[data-filename="${filename}"]`;
  await iClickToNavigate(`${uploadedFileSelector} > button.document-delete-button`, wait);
  I.dontSeeElementInDOM(uploadedFileSelector);
};

export const iDeleteAllUploadedFiles = async (): Promise<void> => {
  const documentDeleteButtonSelector = 'button.document-delete-button';
  let numberOfElements = await I.grabNumberOfVisibleElements(documentDeleteButtonSelector);

  const maxRetries = 10;
  let i = 0;
  while (numberOfElements > 0 && i < maxRetries) {
    await iClickToNavigate(documentDeleteButtonSelector);
    numberOfElements = await I.grabNumberOfVisibleElements(documentDeleteButtonSelector);
    i++;
  }

  if (numberOfElements > 0) {
    throw new Error('Unable to delete previously uploaded files');
  }

  iWaitForVisible('#noFilesUploaded');
};

export const iConfirmWeLiveInEnglandOrWales = (): void => {
  iSelectYesOrNoForField(YesOrNo.YES, 'applicant1LifeBasedInEnglandAndWales');
  iSelectYesOrNoForField(YesOrNo.YES, 'applicant2LifeBasedInEnglandAndWales');
};

export const iConfirmPrayerAndStatementOfTruth = (): void => {
  iCheckOption('#iConfirmPrayer');
  iCheckOption('#statementOfTruth');
};

export const iEnterNames = (applicant: string, names: string | { firstName: string; lastName: string }): void => {
  if (typeof names === 'string') {
    names = { firstName: names.split(' ')[0], lastName: names.split(' ')[1] };
  }
  iEnterValueIntoInput(names.firstName, `#${applicant}FirstNames`);
  iEnterValueIntoInput(names.lastName, `#${applicant}LastNames`);
};
export const iEnterMyName = (names: string | { firstName: string; lastName: string } = getMyName()): void => {
  iEnterNames(getApplicantString(), names);
};
export const iEnterTheirName = (names: string | { firstName: string; lastName: string } = getTheirName()): void => {
  iEnterNames(getOtherApplicantString(), names);
};

export const iEnterCertificateName = (
  applicant: string,
  names: string | { firstName: string; lastName: string }
): void => {
  if (typeof names === 'object') {
    names = `${names.firstName} ${names.lastName}`;
  }
  iEnterValueIntoInput(names, `#${applicant}FullNameOnCertificate`);
};
export const iEnterMyCertificateName = (name: string | { firstName: string; lastName: string } = getMyName()): void => {
  iEnterCertificateName(getApplicantString(), name);
};
export const iEnterTheirCertificateName = (
  name: string | { firstName: string; lastName: string } = getTheirName()
): void => {
  iEnterCertificateName(getOtherApplicantString(), name);
};

export const iAgreeTheCourtCanContactMeByEmail = (): void => {
  const selector = `#${getApplicantString()}AgreeToReceiveEmails`;
  iCheckOption(selector);
};

export const iEnterTheDefaultEmailAddressInto = (selector: string): void => {
  iEnterValueIntoInput(DEFAULT_EMAIL_ADDRESS, selector);
};
export const iEnterTheirDefaultEmailAddress = (): void => {
  const applicant = getOtherApplicantString();
  iEnterTheDefaultEmailAddressInto(`#${applicant}EmailAddress`);
};
export const iEnterTheirDefaultSolicitorEmailAddress = (): void => {
  const applicant = getOtherApplicantString();
  iEnterTheDefaultEmailAddressInto(`#${applicant}SolicitorEmail`);
};

export const iEnterMyEmailAddress = (selector: string = `#${getApplicantString()}EmailAddress`): void => {
  const testUserEmail = getUserEmail(getApplicantNumber());
  iEnterValueIntoInput(testUserEmail, selector);
};
export const iEnterTheirEmailAddress = (selector: string = `#${getOtherApplicantString()}EmailAddress`): void => {
  const theirEmailAddress = getUserEmail(getOtherApplicantNumber());
  iEnterValueIntoInput(theirEmailAddress, selector);
};

const getLanguageToggleSelector = (lang: SupportedLanguages): string => {
  return `#languageToggleLink[lang="${lang}"]`;
};

export const iToggleLanguageToWelsh = async (): Promise<void> => {
  await iClickToNavigate(getLanguageToggleSelector(SupportedLanguages.Cy));
  iWaitForUrlParam('lng', SupportedLanguages.Cy, 10);
  iWaitForVisible(getLanguageToggleSelector(SupportedLanguages.En), 10);
};

export const iToggleLanguageToEnglish = async (): Promise<void> => {
  await iClickToNavigate(getLanguageToggleSelector(SupportedLanguages.En));
  iWaitForUrlParam('lng', SupportedLanguages.En, 10);
  iWaitForVisible(getLanguageToggleSelector(SupportedLanguages.Cy), 10);
};
