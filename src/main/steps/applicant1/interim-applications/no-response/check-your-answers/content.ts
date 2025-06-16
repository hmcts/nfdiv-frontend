import striptags from 'striptags';

import { NoResponseSendPapersAgainOrTrySomethingElse } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import { DISABLE_UPON_SUBMIT } from '../../../../common/content.utils';
import * as urls from '../../../../urls';

const stripTags = value => (typeof value === 'string' ? striptags(value) : value);

const en = ({ userCase }: CommonContent) => ({
  title: 'Check your answers',
  stepQuestions: {
    newPostalAddress: 'Address',
    newEmailAddress: 'Email address',
  },
  stepAnswers: {
    newPostalAddress: [
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
    newEmailAddress: stripTags(userCase.applicant1NoResponsePartnerEmailAddress),
  },
  stepLinks: {
    newPostalAddress: `${urls.NEW_POSTAL_ADDRESS}`,
    newEmailAddress: `${urls.PROVIDE_NEW_EMAIL_ADDRESS}`,
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
  const translation = languages[content.language](content);
  const updateWhat = content.userCase.applicant1NoResponsePartnerNewEmailOrPostalAddress;
  const showStatementOfTruth = false;
  const readOnlyPage =
    content.userCase.applicant1NoResponseSendPapersAgainOrTrySomethingElse ===
    NoResponseSendPapersAgainOrTrySomethingElse.SEND_PAPERS_AGAIN;

  return {
    ...translation,
    form,
    updateWhat,
    showStatementOfTruth,
    readOnlyPage,
  };
};
