import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { getRootRedirectPath } from '../../common/common.content';
import { InputLabelsByLanguage } from '../../common/input-labels.content';

const en = ({ isDivorce, partner, required }) => ({
  title: 'Review your contact details',
  detailsCorrect: 'Are these details correct and up to date?',
  currentContactDetails: `These are the details your ${partner} previously provided and is where we have sent the ${isDivorce ? 'divorce papers' : 'papers to end your civil partnership'}.`,
  homeAddress: 'Home address',
  telephoneNumber: 'Telephone number',

  errors: {
    applicant2ConfirmContactDetails: {
      required,
    },
  },
});

// @TODO translations
const cy: typeof en = ({ isDivorce, partner, required }) => ({
  title: 'Adolygu eich manylion cyswllt',
  detailsCorrect: "A yw'r manylion hyn yn gywir ac wedi eu diweddaru?",
  currentContactDetails: `Dyma'r manylion wnaeth eich ${partner} eu darparu'n flaenorol a dyna ble rydym wedi anfon y ${isDivorce ? 'papurau ysgariad' : "papurau i ddod â'ch partneriaeth sifil i ben"}.`,
  homeAddress: 'Cyfeiriad cartref',
  telephoneNumber: 'Rhif ffôn',

  errors: {
    applicant2ConfirmContactDetails: {
      required,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant2ConfirmContactDetails: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.detailsCorrect,
      labelHidden: false,
      values: [
        { label: l => l[YesOrNo.YES], value: YesOrNo.YES },
        { label: l => l[YesOrNo.NO], value: YesOrNo.NO },
      ],
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const radioButtonAnswers: InputLabelsByLanguage<YesOrNo> = {
  en: {
    [YesOrNo.YES]: 'Yes, these details are up to date',
    [YesOrNo.NO]: 'No, I want to update my contact details',
  },
  cy: {
    [YesOrNo.YES]: 'Ydy, mae’r manylion hyn yn gyfredol',
    [YesOrNo.NO]: 'Nac ydyn, rwyf eisiau diweddaru fy manylion cyswllt',
  },
};

export const generateContent: TranslationFn = content => {
  const { language, isApplicant2 } = content;
  const translations = languages[content.language](content);
  const prefixUrl = getRootRedirectPath(isApplicant2, content.userCase);
  const radioAnswers = radioButtonAnswers[language];
  const applicantAddress = [
    content.userCase?.applicant2Address1,
    content.userCase?.applicant2Address2,
    content.userCase?.applicant2Address3,
    content.userCase?.applicant2AddressTown,
    content.userCase?.applicant2AddressCounty,
    content.userCase?.applicant2AddressPostcode,
    content.userCase?.applicant2AddressCountry,
  ]
    .filter(Boolean)
    .join('<br>');
  const phoneNumber = content.userCase?.applicant2PhoneNumber;
  return {
    ...translations,
    prefixUrl,
    ...radioAnswers,
    applicantAddress,
    phoneNumber,
    form,
  };
};
