import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import type { CommonContent } from '../../../../common/common.content';
import { getAddressFields } from '../../../../common/content.utils';
import { NEW_POSTAL_AND_EMAIL } from '../../../../urls';

const en = ({ isApp2Confidential, partner }: CommonContent, applicant2Address, updateEmailLinkPath) => ({
  title: 'Which address (in England or Wales) should bailiff service be attempted at?',
  line1:
    'Bailiff service can only be attempted at an address in England and Wales where postal delivery has already been tried.',
  line2: `If the address below is not correct you should stop this application and <a class="govuk-link" href="${updateEmailLinkPath}">update your ${partner}’s address</a>. If your ${partner} still does not respond, you can then apply for bailiff service.`,
  homeAddress: 'Address',
  partnerAddress: `${
    isApp2Confidential
      ? `We have a confidential address for your ${partner}. You can apply to attempt bailiff service at this address.`
      : applicant2Address
  }`,
});

const cy: typeof en = ({ isApp2Confidential, partner }: CommonContent, applicant2Address, updateEmailLinkPath) => ({
  title: 'Y cyfeiriad (yng Nghymru neu Loegr) lle dylai’r beili geisio cyflwyno’r ddogfen yw',
  line1:
    'Dim ond i gyfeiriad yng Nghymru a Lloegr sydd wedi’i ddefnyddio’n barod i anfon eich dogfennau drwy’r post y gall beilïaid llys gyflwyno dogfennau iddo.',
  line2: `Os nad yw’r cyfeiriad isod yn gywir dylech roi’r gorau i’r cais hwn a <a class="govuk-link" href="${updateEmailLinkPath}">diweddaru cyfeiriad eich ${partner}</a>. Os yw eich ${partner} yn parhau i beidio ag ymateb, yna gallwch ymgeisio am wasanaeth cyflwyno gan feili.`,
  homeAddress: 'Cyfeiriad',
  partnerAddress: `${
    isApp2Confidential
      ? `Mae gennym gyfeiriad cyfrinachol i'ch ${partner}. Gallwch wneud cais i geisio gwasanaeth cyflwyno gan feili yn y cyfeiriad hwn.`
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
