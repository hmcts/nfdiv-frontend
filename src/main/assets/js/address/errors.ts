export const showError = (id: string): void => {
  document.getElementById('addressErrorSummary')?.classList.remove('govuk-visually-hidden');
  document.getElementById(id)?.classList.remove('govuk-visually-hidden');
};

export const hideErrors = (): void => {
  ['errorPostCodeRequired', 'errorPostCodeInvalid', 'errorAddressNotSelected', 'addressErrorSummary'].forEach(el => {
    document.getElementById(el)?.classList.add('govuk-visually-hidden');
  });
};
