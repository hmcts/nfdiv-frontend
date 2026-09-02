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
      stripTags(userCase.applicant1NoRespAddressAddress1),
      stripTags(userCase.applicant1NoRespAddressAddress2),
      stripTags(userCase.applicant1NoRespAddressAddress3),
      stripTags(userCase.applicant1NoRespAddressAddressTown),
      stripTags(userCase.applicant1NoRespAddressAddressCounty),
      stripTags(userCase.applicant1NoRespAddressAddressPostcode),
      stripTags(userCase.applicant1NoRespAddressAddressCountry),
    ]
      .filter(Boolean)
      .join('<br>')}`,
    internationalAddress: `${
      userCase.applicant1NoRespAddressAddressOverseas === YesOrNo.NO
        ? ''
        : [stripTags(userCase.applicant1NoRespAddressAddressOverseas)]
    }`,
    partnerEmail: `${stripTags(userCase.applicant1NoRespAddressEmail)}`,
    doNotKnowEmail: `${
      userCase.applicant1NoRespAddressDoesNotKnowEmailAddress === Checkbox.Checked
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
      stripTags(userCase.applicant1NoRespAddressAddress1),
      stripTags(userCase.applicant1NoRespAddressAddress2),
      stripTags(userCase.applicant1NoRespAddressAddress3),
      stripTags(userCase.applicant1NoRespAddressAddressTown),
      stripTags(userCase.applicant1NoRespAddressAddressCounty),
      stripTags(userCase.applicant1NoRespAddressAddressPostcode),
      stripTags(userCase.applicant1NoRespAddressAddressCountry),
    ]
      .filter(Boolean)
      .join('<br>')}`,
    internationalAddress: `${
      userCase.applicant1NoRespAddressAddressOverseas === YesOrNo.NO
        ? ''
        : [stripTags(userCase.applicant1NoRespAddressAddressOverseas)]
    }`,
    partnerEmail: `${stripTags(userCase.applicant1NoRespAddressEmail)}`,
    doNotKnowEmail: `${
      userCase.applicant1NoRespAddressDoesNotKnowEmailAddress === Checkbox.Checked
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
