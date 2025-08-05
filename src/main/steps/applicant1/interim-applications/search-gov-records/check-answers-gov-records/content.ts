import striptags from 'striptags';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import * as urls from '../../../../urls';
import {
  form as checkAnswersForm,
  generateContent as checkAnswersGenerateContent,
} from '../../common/check-answers/content';

const stripTags = value => (typeof value === 'string' ? striptags(value) : value);

const en = ({ partner, userCase }: CommonContent) => ({
  title: 'Check your answers',
  stepQuestions: {
    whySearchGovRecords: 'Why are you applying to search government records?',
    whichGovDepartmentsToSearch: `Which government departments do you need to search for your ${partner}'s details?`,
    whySearchTheseDepartments: `Why do you think these departments are most suited to getting the contact details of your ${partner}?`,
    partnerName: `${partner}'s name`,
    partnerDateOfBirth: `${partner}'s date of birth`,
    partnerNationalInsuranceNumber: `${partner}'s National Insurance number`,
    partnerLastKnownAddress: `${partner}'s last known address`,
  },
  stepAnswers: {
    whySearchGovRecords: stripTags(userCase.applicant1SearchGovRecordsReason),
    whichGovDepartmentsToSearch: stripTags(userCase.applicant1SearchGovRecordsWhichDepartments),
    whySearchTheseDepartments: stripTags(userCase.applicant1SearchGovRecordsWhyTheseDepartments),
    partnerName: stripTags(userCase.applicant1SearchGovRecordsApplicant2Name),
    partnerDateOfBirth: stripTags(userCase.applicant2DateOfBirth),
    partnerNationalInsuranceNumber: stripTags(userCase.applicant1SearchGovRecordsApplicant2NationalInsurance),
    partnerLastKnownAddress: stripTags(userCase.applicant1SearchGovRecordsApplicant2LastKnownAddress),
  },
  stepLinks: {
    whySearchGovRecords: `${urls.WHY_SEARCH_GOV_RECORDS}`,
    whichGovDepartmentsToSearch: `${urls.WHICH_GOV_DEPARTMENTS}`,
    whySearchTheseDepartments: `${urls.WHICH_GOV_DEPARTMENTS}`,
    partnerName: `${urls.PARTNER_NAME_GOV_RECORDS}`,
    partnerDateOfBirth: `${urls.PARTNER_DOB_GOV_RECORDS}`,
    partnerNationalInsuranceNumber: `${urls.PARTNER_NI_GOV_RECORDS}`,
    partnerLastKnownAddress: `${urls.PARTNER_ADDRESS_GOV_RECORDS}`,
  },
  continueToPayment: 'Continue to payment',
});

//TODO: Welsh translation required
const cy: typeof en = en;

export const form: FormContent = checkAnswersForm;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const checkAnswersContent = checkAnswersGenerateContent(content);
  const translation = languages[content.language](content);

  return {
    form,
    ...translation,
    checkAnswersContent,
  };
};
