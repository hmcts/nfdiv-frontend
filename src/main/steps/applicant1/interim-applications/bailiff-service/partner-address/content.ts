import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import type { CommonContent } from '../../../../common/common.content';
import { getAddressFields } from '../../../../common/content.utils';
import { NEW_POSTAL_AND_EMAIL } from '../../../../urls';

const en = ({ isApp2Confidential }: CommonContent, applicant2Address, updateEmailLinkPath) => ({
  title: 'Which address (in England or Wales) should bailiff service be attempted at?',
  line1:
    'Bailiff service can only be attempted at an address in England and Wales where postal delivery has already been tried.',
  line2: `If the address below is not correct you should stop this application and <a class="govuk-link" href="${updateEmailLinkPath}">update your partner’s address</a>. If your partner still does not respond, you can then apply for bailiff service.`,
  homeAddress: 'Address',
  partnerAddress: `${
    isApp2Confidential
      ? 'We have a confidential address for your partner. You can apply to attempt bailiff service at this address.'
      : applicant2Address
  }`,
});

const cy: typeof en = ({ isApp2Confidential }: CommonContent, applicant2Address, updateEmailLinkPath) => ({
  title: 'Which address (in England or Wales) should bailiff service be attempted at?',
  line1:
    'Bailiff service can only be attempted at an address in England and Wales where postal delivery has already been tried.',
  line2: `If the address below is not correct you should stop this application and <a class="govuk-link" href="${updateEmailLinkPath}">update your partner’s address</a>. If your partner still does not respond, you can then apply for bailiff service.`,
  homeAddress: 'Address',
  partnerAddress: `${
    isApp2Confidential
      ? 'We have a confidential address for your partner. You can apply to attempt bailiff service at this address.'
      : applicant2Address
  }`,
});

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const applicant2Address = getAddressFields('applicant2', content.userCase)
    .filter(field => field?.length > 0)
    .join(', ');

  const translations = languages[content.language](content, applicant2Address, NEW_POSTAL_AND_EMAIL);

  return {
    ...translations,
    form,
    applicant2Address,
  };
};
