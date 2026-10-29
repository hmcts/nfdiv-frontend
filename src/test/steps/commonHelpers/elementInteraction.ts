import { Locator, Page } from '@playwright/test';
import { tryTo } from 'codeceptjs/effects';

import { YesOrNo } from '../../../main/app/case/definition';

import { iAmOnIdam, iClickToNavigate } from './navigation';
import { getApplicantString } from './userInteraction';

const { I } = inject();

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
  customTitleSelector?: string
): Promise<void> => {
  const submitSelector = await I.executeScript(() =>
    document.getElementById('main-form-submit')
      ? '#main-form-submit'
      : 'button[type="submit"]:not(#hide-message):not(.document-delete-button):not(.web-payment-button--apple-pay)'
  );
  await iClickToNavigate(submitSelector, wait, nextUrl, waitUntil, customTitleSelector);
};

export const iClickSubmit = async (wait?: number): Promise<void> => {
  await iClickSubmitAndExpectUrl(undefined, wait);
};

export const iClickChangeLinkForQuestion = async (questionText: string): Promise<void> => {
  const selector = `a.govuk-link:has(span.govuk-visually-hidden:has-text("${questionText}"))`;
  await iClickToNavigate(selector);
};

export const iCannotUploadDocs = (): void => {
  iCheckOption('#cannotUploadDocs');
};

const handleCookieBanner = async (action: 'accept' | 'reject'): Promise<void> => {
  const onIdam = await iAmOnIdam();
  const cookieBannerSelector = onIdam
    ? 'div#cookie-banner:not([hidden])'
    : 'div.cookie-banner.govuk-cookie-banner:not([hidden])';
  const cookieBannerVisible = await tryTo(() => I.waitForVisible(cookieBannerSelector, 1));
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

export const iWaitForElementWithText = async (selector: string, text: string, wait?: number): Promise<void> => {
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

const iSetAddressPrivacy = (isPrivate: boolean = false, inRefuge: boolean = false): void => {
  iSelectYesOrNoForField(isPrivate ? YesOrNo.YES : YesOrNo.NO, `${getApplicantString()}AddressPrivate`);
  if (isPrivate) {
    iWaitForVisible('#inRefugeConditional');
    iSelectYesOrNoForField(inRefuge ? YesOrNo.YES : YesOrNo.NO, `${getApplicantString()}InRefuge`);
  } else {
    iWaitForInvisible('#inRefugeConditional');
  }
};
export const iSetPrivateAddress = (isPrivate: boolean = false): void => {
  iSetAddressPrivacy(isPrivate, false);
};
export const iSetInRefuge = (inRefuge: boolean = false): void => {
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
  await I.grabCurrentUrl();
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
    // iWait(2); // Wait for the deletion to complete and the page to update - no longer needed. iClickToNavigate waits for load event.
    numberOfElements = await I.grabNumberOfVisibleElements(documentDeleteButtonSelector);
    i++;
  }

  if (numberOfElements > 0) {
    throw new Error('Unable to delete previously uploaded files');
  }

  iWaitForVisible('#noFilesUploaded');
};

export const iConfirmWeLiveInEnglandOrWales = (): void => {
  iSelectYesOrNoForField(YesOrNo.YES, 'applicant2LifeBasedInEnglandAndWales');
  iSelectYesOrNoForField(YesOrNo.YES, 'applicant1LifeBasedInEnglandAndWales');
};

export const iConfirmPrayerAndStatementOfTruth = (): void => {
  iCheckOption('#iConfirmPrayer');
  iCheckOption('#statementOfTruth');
};
