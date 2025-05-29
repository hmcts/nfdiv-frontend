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
      stripTags(userCase.applicant2Address1 !== '' ? userCase.applicant2Address1 : userCase.previousApplicant2Address1),
      stripTags(userCase.applicant2Address2 !== '' ? userCase.applicant2Address2 : userCase.previousApplicant2Address2),
      stripTags(userCase.applicant2Address3 !== '' ? userCase.applicant2Address3 : userCase.previousApplicant2Address3),
      stripTags(
        userCase.applicant2AddressTown !== '' ? userCase.applicant2AddressTown : userCase.previousApplicant2AddressTown
      ),
      stripTags(
        userCase.applicant2AddressCounty !== ''
          ? userCase.applicant2AddressCounty
          : userCase.previousApplicant2AddressCounty
      ),
      stripTags(
        userCase.applicant2AddressPostcode !== ''
          ? userCase.applicant2AddressPostcode
          : userCase.previousApplicant2AddressPostcode
      ),
      stripTags(
        userCase.applicant2AddressCountry !== ''
          ? userCase.applicant2AddressCountry
          : userCase.previousApplicant2AddressCountry
      ),
    ]
      .filter(Boolean)
      .join('<br>'),
    newEmailAddress: stripTags(userCase.applicant2Email),
  },
  stepLinks: {
    newAddress: `${urls.NEW_POSTAL_ADDRESS}`,
    newEmailAddress: `${urls.NEW_EMAIL}`,
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
