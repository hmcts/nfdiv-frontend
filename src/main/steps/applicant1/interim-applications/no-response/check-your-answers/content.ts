import striptags from 'striptags';

import { NoResponsePartnerNewEmailOrPostalAddress } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import { DISABLE_UPON_SUBMIT } from '../../../../common/content.utils';
import * as urls from '../../../../urls';

const stripTags = value => (typeof value === 'string' ? striptags(value) : value);

const en = ({ userCase }: CommonContent, showAddress: boolean, showEmail: boolean) => ({
  title: 'Check your answers',
  stepQuestions: {
    newPostalAddress: 'Address',
    newEmailAddress: 'Email address',
  },
  stepAnswers: {
    newPostalAddress:
      showAddress &&
      [
        stripTags(userCase.applicant1NoResponsePartnerAddress1),
        stripTags(userCase.applicant1NoResponsePartnerAddress2),
        stripTags(userCase.applicant1NoResponsePartnerAddress3),
        stripTags(userCase.applicant1NoResponsePartnerAddressTown),
        stripTags(userCase.applicant1NoResponsePartnerAddressCounty),
        stripTags(userCase.applicant1NoResponsePartnerAddressPostcode),
        stripTags(userCase.applicant1NoResponsePartnerAddressCountry),
      ]
        .filter(Boolean)
        .join('<br>'),
    newEmailAddress: showEmail && stripTags(userCase.applicant1NoResponsePartnerEmailAddress),
  },
  stepLinks: {
    newPostalAddress: showAddress && `${urls.NEW_POSTAL_ADDRESS}`,
    newEmailAddress: showEmail && `${urls.PROVIDE_NEW_EMAIL_ADDRESS}`,
  },
  acceptAndSend: 'Accept and send',
});

const cy: typeof en = ({ userCase }: CommonContent, showAddress: boolean, showEmail: boolean) => ({
  title: 'Gwirio eich atebion',
  stepQuestions: {
    newPostalAddress: 'Cyfeiriad',
    newEmailAddress: 'Cyfeiriad e-bost',
  },
  stepAnswers: {
    newPostalAddress:
      showAddress &&
      [
        stripTags(userCase.applicant1NoResponsePartnerAddress1),
        stripTags(userCase.applicant1NoResponsePartnerAddress2),
        stripTags(userCase.applicant1NoResponsePartnerAddress3),
        stripTags(userCase.applicant1NoResponsePartnerAddressTown),
        stripTags(userCase.applicant1NoResponsePartnerAddressCounty),
        stripTags(userCase.applicant1NoResponsePartnerAddressPostcode),
        stripTags(userCase.applicant1NoResponsePartnerAddressCountry),
      ]
        .filter(Boolean)
        .join('<br>'),
    newEmailAddress: showEmail && stripTags(userCase.applicant1NoResponsePartnerEmailAddress),
  },
  stepLinks: {
    newPostalAddress: showAddress && `${urls.NEW_POSTAL_ADDRESS}`,
    newEmailAddress: showEmail && `${urls.PROVIDE_NEW_EMAIL_ADDRESS}`,
  },
  acceptAndSend: 'Derbyn ac anfon',
});

export const form: FormContent = {
  submit: {
    text: l => l.acceptAndSend,
    classes: DISABLE_UPON_SUBMIT,
  },
  fields: {},
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const applicant1Choice = content.userCase.applicant1NoResponsePartnerNewEmailOrPostalAddress;
  const showAddress = [
    NoResponsePartnerNewEmailOrPostalAddress.NEW_POSTAL,
    NoResponsePartnerNewEmailOrPostalAddress.BOTH_EMAIL_AND_POSTAL,
  ].includes(applicant1Choice as NoResponsePartnerNewEmailOrPostalAddress);
  const showEmail = [
    NoResponsePartnerNewEmailOrPostalAddress.NEW_EMAIL,
    NoResponsePartnerNewEmailOrPostalAddress.BOTH_EMAIL_AND_POSTAL,
  ].includes(applicant1Choice as NoResponsePartnerNewEmailOrPostalAddress);
  const translation = languages[content.language](content, showAddress, showEmail);
  const updateWhat = content.userCase.applicant1NoResponsePartnerNewEmailOrPostalAddress;
  const showStatementOfTruth = false;
  return {
    ...translation,
    form,
    updateWhat,
    showStatementOfTruth,
  };
};
