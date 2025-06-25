import striptags from 'striptags';

import {
  NoResponsePartnerNewEmailOrPostalAddress,
  NoResponseSendPapersAgainOrTrySomethingElse,
  YesOrNo,
} from '../../../../../app/case/definition';
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
    newPostalAddress: showAddress
      ? [
          stripTags(userCase.applicant1NoResponsePartnerAddress1),
          stripTags(userCase.applicant1NoResponsePartnerAddress2),
          stripTags(userCase.applicant1NoResponsePartnerAddress3),
          stripTags(userCase.applicant1NoResponsePartnerAddressTown),
          stripTags(userCase.applicant1NoResponsePartnerAddressCounty),
          stripTags(userCase.applicant1NoResponsePartnerAddressPostcode),
          stripTags(userCase.applicant1NoResponsePartnerAddressCountry),
        ]
          .filter(Boolean)
          .join('<br>')
      : userCase.applicant1NoResponseSendPapersAgainOrTrySomethingElse ===
          NoResponseSendPapersAgainOrTrySomethingElse.SEND_PAPERS_AGAIN &&
        !(userCase.applicant2AddressPrivate === YesOrNo.YES) &&
        [
          stripTags(userCase.applicant2Address1),
          stripTags(userCase.applicant2Address2),
          stripTags(userCase.applicant2Address3),
          stripTags(userCase.applicant2AddressTown),
          stripTags(userCase.applicant2AddressCounty),
          stripTags(userCase.applicant2AddressPostcode),
          stripTags(userCase.applicant2AddressCountry),
        ]
          .filter(Boolean)
          .join('<br>'),
    newEmailAddress: showEmail
      ? stripTags(userCase.applicant1NoResponsePartnerEmailAddress)
      : userCase.applicant1NoResponseSendPapersAgainOrTrySomethingElse ===
          NoResponseSendPapersAgainOrTrySomethingElse.SEND_PAPERS_AGAIN && userCase.applicant2Email,
  },
  stepLinks: {
    newPostalAddress: showAddress && `${urls.NEW_POSTAL_ADDRESS}`,
    newEmailAddress: showEmail && `${urls.PROVIDE_NEW_EMAIL_ADDRESS}`,
  },
  acceptAndSend: 'Accept and send',
});

//TODO: Welsh translation required

const cy: typeof en = en;

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
    NoResponsePartnerNewEmailOrPostalAddress.NEW_EMAIL_AND_POSTAL_ADDRESS,
  ].includes(applicant1Choice as NoResponsePartnerNewEmailOrPostalAddress);
  const showEmail = [
    NoResponsePartnerNewEmailOrPostalAddress.NEW_EMAIL,
    NoResponsePartnerNewEmailOrPostalAddress.NEW_EMAIL_AND_POSTAL_ADDRESS,
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
