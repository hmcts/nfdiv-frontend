const divorceEn = {
  info: 'You need your marriage certificate',
  certificate: 'You need your marriage certificate to use this service.',
  ask:
    'You should ask your husband or wife for it, if they have it. Or you can <a href="https://www.gov.uk/order-copy-birth-death-marriage-certificate" class="govuk-link" target="_blank">order a certified copy online (opens in a new tab)</a> if you got married in England or Wales.',
  certificateTranslation:
    'If the original certificate is not in English, you’ll need to provide a <a class="govuk-link" href="https://www.gov.uk/certifying-a-document#certifying-a-translation">certified translation</a>. You then need to get it certified by a ‘notary public’.',
};

const divorceCy: typeof divorceEn = {
  info: 'You need your marriage certificate',
  certificate: 'You need your marriage certificate to use this service.',
  ask:
    'You should ask your husband or wife for it, if they have it. Or you can <a href="https://www.gov.uk/order-copy-birth-death-marriage-certificate" class="govuk-link" target="_blank">order a certified copy online (opens in a new tab)</a> if you got married in England or Wales.',
  certificateTranslation:
    'If the original certificate is not in English, you’ll need to provide a <a class="govuk-link" href="https://www.gov.uk/certifying-a-document#certifying-a-translation">certified translation</a>. You then need to get it certified by a ‘notary public’.',
};

const civilEn = {
  info: 'You need your civil partnership certificate',
  certificate: 'You need your civil partnership certificate to use this service.',
  ask:
    'You should ask your civil partner for it, if they have it. Or you can <a href="https://www.gov.uk/order-copy-birth-death-marriage-certificate" class="govuk-link" target="_blank">order a certified copy online (opens in a new tab)</a> if you formed your civil partnership in England or Wales.',
  certificateTranslation:
    'If your original civil partnership certificate is not in English, you’ll need to provide a <a class="govuk-link" href="https://www.gov.uk/certifying-a-document#certifying-a-translation">certified translation</a>. You then need to get it certified by a ‘notary public’.',
};

const civilCy: typeof civilEn = {
  info: 'You need your civil partnership certificate',
  certificate: 'You need your civil partnership certificate to use this service.',
  ask:
    'You should ask your civil partner for it, if they have it. Or you can <a href="https://www.gov.uk/order-copy-birth-death-marriage-certificate" class="govuk-link" target="_blank">order a certified copy online (opens in a new tab)</a> if you formed your civil partnership in England or Wales.',
  certificateTranslation:
    'If your original civil partnership certificate is not in English, you’ll need to provide a <a class="govuk-link" href="https://www.gov.uk/certifying-a-document#certifying-a-translation">certified translation</a>. You then need to get it certified by a ‘notary public’.',
};

//TODO civil partnership translations
export const noCertificateContent = {
  divorce: {
    en: divorceEn,
    cy: divorceCy,
  },
  civil: {
    en: civilEn,
    cy: civilCy,
  },
};
