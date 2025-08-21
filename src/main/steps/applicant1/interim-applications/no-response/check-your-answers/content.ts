import striptags from 'striptags';

import {
  NoResponsePartnerNewEmailOrAddress,
  NoResponseSendPapersAgainOrTrySomethingElse,
  YesOrNo,
} from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import { DISABLE_UPON_SUBMIT } from '../../../../common/content.utils';
import * as urls from '../../../../urls';

const stripTags = value => (typeof value === 'string' ? striptags(value) : value);

const en = ({ userCase }: CommonContent, showAddress: boolean, showEmail: boolean, sendPapersAgain: boolean) => ({
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
      : sendPapersAgain &&
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
      : sendPapersAgain && userCase.applicant2Email,
  },
  stepLinks: {
    newPostalAddress: (showAddress || sendPapersAgain) && `${urls.NEW_POSTAL_ADDRESS}`,
    newEmailAddress: (showAddress || sendPapersAgain) && `${urls.PROVIDE_NEW_EMAIL_ADDRESS}`,
  },
  acceptAndSend: 'Accept and send',
});

//TODO: Welsh translation required

const cy: typeof en = (
  { userCase }: CommonContent,
  showAddress: boolean,
  showEmail: boolean,
  sendPapersAgain: boolean
) => ({
  title: 'Gwiriwch eich atebion',
  stepQuestions: {
    newPostalAddress: 'Cyfeiriad',
    newEmailAddress: 'Cyfeiriad e-bost',
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
      : sendPapersAgain &&
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
      : sendPapersAgain && userCase.applicant2Email,
  },
  stepLinks: {
    newPostalAddress: (showAddress || sendPapersAgain) && `${urls.NEW_POSTAL_ADDRESS}`,
    newEmailAddress: (showAddress || sendPapersAgain) && `${urls.PROVIDE_NEW_EMAIL_ADDRESS}`,
  },
  acceptAndSend: 'Accept and send',
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
  const applicant1Choice = content.userCase.applicant1NoResponsePartnerNewEmailOrAddress;
  const sendPapersAgain =
    content.userCase.applicant1NoResponseSendPapersAgainOrTrySomethingElse ===
    NoResponseSendPapersAgainOrTrySomethingElse.SEND_PAPERS_AGAIN;
  const showAddress = [
    NoResponsePartnerNewEmailOrAddress.ADDRESS,
    NoResponsePartnerNewEmailOrAddress.EMAIL_AND_ADDRESS,
  ].includes(applicant1Choice as NoResponsePartnerNewEmailOrAddress);
  const showEmail = [
    NoResponsePartnerNewEmailOrAddress.EMAIL,
    NoResponsePartnerNewEmailOrAddress.EMAIL_AND_ADDRESS,
  ].includes(applicant1Choice as NoResponsePartnerNewEmailOrAddress);
  const translation = languages[content.language](content, showAddress, showEmail, sendPapersAgain);
  const updateWhat = content.userCase.applicant1NoResponsePartnerNewEmailOrAddress;
  const showStatementOfTruth = false;

  return {
    ...translation,
    form,
    updateWhat,
    showStatementOfTruth,
  };
};
