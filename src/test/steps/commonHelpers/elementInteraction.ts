import { YesOrNo } from '../../../main/app/case/definition';
import { iClickToNavigate } from './navigation';

const { I } = inject();

export const iClick = (text: string, locator?: CodeceptJS.LocatorOrString, wait?: number): void => {
  I.waitForText(text, wait);
  I.click(locator || text);
};

export const iClickElement = (selector: string, wait?: number): void => {
  I.waitForVisible(selector, wait);
  I.click(selector);
};

export const iClickRadioValueForField = (value: string, field: string = ''): void => {
  let radioSelector = `input[type="radio"][value="${value}"]`;
  if (field.trim().length > 0) {
    radioSelector += `[name="${field.trim()}"]`;
  }
  console.log(value, field)
  iClickElement(radioSelector);
};
export const iClickRadioValue = (value: string): void => {
  iClickRadioValueForField(value);
};
export const iClickYesOrNoForField = (yesOrNo: YesOrNo.YES | YesOrNo.NO, field?: string): void => {
  iClickRadioValueForField(yesOrNo, field);
};
export const iClickNo = (): void => {
  iClickYesOrNoForField(YesOrNo.NO);
};
export const iClickYes = (): void => {
  iClickYesOrNoForField(YesOrNo.YES);
};

export const iClickSubmit = async (nextUrl?: string, wait?: number, waitUntil: string = 'load'): Promise<void> => {
  const submitSelector = await I.executeScript(() =>
    document.getElementById('main-form-submit')
      ? '#main-form-submit'
      : 'button[type="submit"]:not(.document-delete-button)'
  );
  await iClickToNavigate(submitSelector, wait, nextUrl, waitUntil);
};

export const iCannotUploadDocs = (): void => {
  iClickElement('#cannotUploadDocs');
};

export const iRejectCookies = (): void => {
  iClickElement('button.cookie-banner-reject-button');
  iClickElement('button.cookie-banner-hide-button');
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
  I.waitForVisible(inputSelector, wait);
  I.fillField(inputSelector, value);
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

export const iDeleteAllUploadedFiles = async (): Promise<void> => {
  const documentDeleteButtonSelector = 'button.document-delete-button';
  let numberOfElements = await I.grabNumberOfVisibleElements(documentDeleteButtonSelector);

  const maxRetries = 10;
  let i = 0;
  while (numberOfElements > 0 && i < maxRetries) {
    iClickElement(documentDeleteButtonSelector);
    iWait(2); // Wait for the deletion to complete and the page to update
    numberOfElements = await I.grabNumberOfVisibleElements(documentDeleteButtonSelector);
    i++;
  }

  if (numberOfElements > 0) {
    throw new Error('Unable to delete previously uploaded files');
  }
};

export const iConfirmPrayerAndStatementOfTruth = (): void => {
  iClickElement('#iConfirmPrayer');
  iClickElement('#statementOfTruth');
};
