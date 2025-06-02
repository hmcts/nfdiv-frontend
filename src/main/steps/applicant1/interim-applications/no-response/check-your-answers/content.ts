import striptags from 'striptags';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import { DISABLE_UPON_SUBMIT } from '../../../../common/content.utils';
import * as urls from '../../../../urls';

const stripTags = value => (typeof value === 'string' ? striptags(value) : value);

const en = ({ userCase }: CommonContent) => ({
  title: 'Check your answers',
  stepQuestions: {
    name: 'Name',
    newPostalAddress: 'Address',
    newEmailAddress: 'Email address',
  },
  stepAnswers: {
    name: `${userCase.applicant2FirstNames}  ${userCase.applicant2LastNames}`,
    newPostalAddress: [
      stripTags(userCase.newApplicant2Address1),
      stripTags(userCase.newApplicant2Address2),
      stripTags(userCase.newApplicant2Address3),
      stripTags(userCase.newApplicant2AddressTown),
      stripTags(userCase.newApplicant2AddressCounty),
      stripTags(userCase.newApplicant2AddressPostcode),
      stripTags(userCase.newApplicant2AddressCountry),
    ]
      .filter(Boolean)
      .join('<br>'),
    newEmailAddress: stripTags(
      userCase.applicant2Email !== '' ? userCase.applicant2Email : userCase.newApplicant2EmailAddress
    ),
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
  const updateWhat = content.userCase.applicant1NoResponseUpdateEmailAndPostalAddress;
  return {
    ...translation,
    form,
    updateWhat,
  };
};
