import striptags from 'striptags';

import { Checkbox } from '../../../../../app/case/case';
import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import * as urls from '../../../../urls';

const en = ({ partner, userCase }: CommonContent) => ({
  stepQuestions: {
    partnerAddress: `Your ${partner}'s postal address`,
    internationalAddress: 'Is this an international address?',
    partnerEmail: `Your ${partner}'s email address`,
    doNotKnowEmail: `Do you have your ${partner}'s email address`,
  },
  stepAnswers: {
    partnerAddress: `${[
      stripTags(userCase.applicant2Address1),
      stripTags(userCase.applicant2Address2),
      stripTags(userCase.applicant2Address3),
      stripTags(userCase.applicant2AddressTown),
      stripTags(userCase.applicant2AddressCounty),
      stripTags(userCase.applicant2AddressPostcode),
      stripTags(userCase.applicant2AddressCountry),
    ]
      .filter(Boolean)
      .join('<br>')}`,
    internationalAddress: `${
      userCase.applicant2AddressOverseas === YesOrNo.NO ? '' : [stripTags(userCase.applicant2AddressOverseas)]
    }`,
    partnerEmail: `${stripTags(userCase.applicant2EmailAddress)}`,
    doNotKnowEmail: `${
      userCase.applicant1DoesNotKnowApplicant2EmailAddress === Checkbox.Checked
        ? 'I do not know their email address'
        : ''
    }`,
  },
  stepLinks: {
    partnerAddress: `${urls.NO_RESP_ADDRESS_ENTER_ADDRESS}`,
    internationalAddress: `${urls.NO_RESP_ADDRESS_ENTER_ADDRESS}`,
    partnerEmail: `${urls.NO_RESP_ADDRESS_ENTER_EMAIL}`,
  },
  title: 'Check your answers',
  submitText: 'Submit',
});

const cy: typeof en = ({ partner, userCase }: CommonContent) => ({
  stepQuestions: {
    partnerAddress: `Your ${partner}'s postal address`,
    internationalAddress: 'Is this an international address?',
    partnerEmail: `Your ${partner}'s email address`,
    doNotKnowEmail: `Do you have your ${partner}'s email address`,
  },
  stepAnswers: {
    partnerAddress: `${[
      stripTags(userCase.applicant2Address1),
      stripTags(userCase.applicant2Address2),
      stripTags(userCase.applicant2Address3),
      stripTags(userCase.applicant2AddressTown),
      stripTags(userCase.applicant2AddressCounty),
      stripTags(userCase.applicant2AddressPostcode),
      stripTags(userCase.applicant2AddressCountry),
    ]
      .filter(Boolean)
      .join('<br>')}`,
    internationalAddress: `${
      userCase.applicant2AddressOverseas === YesOrNo.NO ? '' : [stripTags(userCase.applicant2AddressOverseas)]
    }`,
    partnerEmail: `${stripTags(userCase.applicant2EmailAddress)}`,
    doNotKnowEmail: `${
      userCase.applicant1DoesNotKnowApplicant2EmailAddress === Checkbox.Checked
        ? 'I do not know their email address'
        : ''
    }`,
  },
  stepLinks: {
    partnerAddress: `${urls.NO_RESP_ADDRESS_ENTER_ADDRESS}`,
    internationalAddress: `${urls.NO_RESP_ADDRESS_ENTER_ADDRESS}`,
    partnerEmail: `${urls.NO_RESP_ADDRESS_ENTER_EMAIL}`,
    doNotKnowEmail: `${urls.NO_RESP_ADDRESS_ENTER_EMAIL}`,
  },
  title: 'Check your answers',
  submitText: 'Submit',
});

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.submitText,
  },
};

const languages = {
  en,
  cy,
};

const stripTags = value => (typeof value === 'string' ? striptags(value) : value);

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const showChangeLink = true;
  return {
    ...translations,
    form,
    showChangeLink,
  };
};
