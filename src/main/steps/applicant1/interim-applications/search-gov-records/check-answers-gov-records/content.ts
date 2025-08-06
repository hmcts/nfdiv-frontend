import { capitalize } from 'lodash';
import striptags from 'striptags';

import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import * as urls from '../../../../urls';
import {
  form as checkAnswersForm,
  generateContent as checkAnswersGenerateContent,
} from '../../common/check-answers/content';

const stripTags = value => (typeof value === 'string' ? striptags(value) : value);

const en = ({ partner, userCase }: CommonContent, useHwf: YesOrNo, hwfReference: string) => ({
  title: 'Check your answers',
  stepQuestions: {
    useHwf: 'Help paying the application fee',
    hwfReference: 'Help with fees reference number',
    whySearchGovRecords: 'Why are you applying to search government records?',
    whichGovDepartmentsToSearch: `Which government departments do you need to search for your ${partner}'s details?`,
    whySearchTheseDepartments: `Why do you think these departments are most suited to getting the contact details of your ${partner}?`,
    partnerName: `${capitalize(partner)}'s name`,
    partnerDateOfBirth: `${partner}'s date of birth`,
    partnerNationalInsuranceNumber: `${capitalize(partner)}'s National Insurance number`,
    partnerLastKnownAddress: `${capitalize(partner)}'s last known address`,
    partnerLastKnownAddressDates: `${capitalize(partner)}'s last known address dates lived there`,
    partnerAnyAdditionalKnownAddresses: `${capitalize(partner)}'s any additional known addresses`,
    partnerAnyAdditionalKnownAddress1: `${capitalize(partner)}'s any additional known address 1`,
    partnerAnyAdditionalKnownAddressDates1: `${capitalize(partner)}'s any additional known address 1 dates lived there`,
    partnerAnyAdditionalKnownAddress2: `${capitalize(partner)}'s any additional known address 2`,
    partnerAnyAdditionalKnownAddressDates2: `${capitalize(partner)}'s any additional known address 2 dates lived there`,
  },
  stepAnswers: {
    useHwf: `${useHwf}`,
    hwfReference: `${hwfReference}`,
    whySearchGovRecords: stripTags(userCase.applicant1SearchGovRecordsReason),
    whichGovDepartmentsToSearch: stripTags(userCase.applicant1SearchGovRecordsWhichDepartments),
    whySearchTheseDepartments: stripTags(userCase.applicant1SearchGovRecordsWhyTheseDepartments),
    partnerName: stripTags(userCase.applicant1SearchGovRecordsApplicant2Name),
    partnerDateOfBirth: stripTags(userCase.applicant2DateOfBirth),
    partnerNationalInsuranceNumber: stripTags(userCase.applicant1SearchGovRecordsApplicant2NationalInsurance),
    partnerLastKnownAddress: stripTags(userCase.applicant1SearchGovRecordsApplicant2LastKnownAddress),
    partnerLastKnownAddressDates: stripTags(userCase.applicant1SearchGovRecordsApplicant2LastKnownAddressDates),
    partnerAnyAdditionalKnownAddresses: stripTags(userCase.applicant1SearchGovRecordsKnowApplicant2AdditionalAddresses),
    partnerAnyAdditionalKnownAddress1: stripTags(userCase.applicant1SearchGovRecordsApplicant2AdditionalAddress1),
    partnerAnyAdditionalKnownAddressDates1: stripTags(
      userCase.applicant1SearchGovRecordsApplicant2AdditionalAddressDates1
    ),
    partnerAnyAdditionalKnownAddress2: stripTags(userCase.applicant1SearchGovRecordsApplicant2AdditionalAddress2),
    partnerAnyAdditionalKnownAddressDates2: stripTags(
      userCase.applicant1SearchGovRecordsApplicant2AdditionalAddressDates2
    ),
  },
  stepLinks: {
    useHwf: `${urls.HELP_WITH_FEES_DEEMED}`,
    hwfReference: `${urls.HWF_REFERENCE_NUMBER_INPUT_DEEMED}`,
    whySearchGovRecords: `${urls.WHY_SEARCH_GOV_RECORDS}`,
    whichGovDepartmentsToSearch: `${urls.WHICH_GOV_DEPARTMENTS}`,
    whySearchTheseDepartments: `${urls.WHICH_GOV_DEPARTMENTS}`,
    partnerName: `${urls.PARTNER_NAME_GOV_RECORDS}`,
    partnerDateOfBirth: `${urls.PARTNER_DOB_GOV_RECORDS}`,
    partnerNationalInsuranceNumber: `${urls.PARTNER_NI_GOV_RECORDS}`,
    partnerLastKnownAddress: `${urls.PARTNER_ADDRESS_GOV_RECORDS}`,
    partnerLastKnownAddressDates: `${urls.PARTNER_ADDRESS_GOV_RECORDS}`,
    partnerAnyAdditionalKnownAddresses: `${urls.PARTNER_ADDRESS_ADDITIONAL_ADDRESSES}`,
    partnerAnyAdditionalKnownAddress1: `${urls.PARTNER_ADDRESS_ADDITIONAL_GOV_RECORDS}`,
    partnerAnyAdditionalKnownAddressDates1: `${urls.PARTNER_ADDRESS_ADDITIONAL_GOV_RECORDS}`,
    partnerAnyAdditionalKnownAddress2: `${urls.PARTNER_ADDRESS_ADDITIONAL_GOV_RECORDS}`,
    partnerAnyAdditionalKnownAddressDates2: `${urls.PARTNER_ADDRESS_ADDITIONAL_GOV_RECORDS}`,
  },
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
  const useHwf = content.userCase.applicant1InterimAppsUseHelpWithFees as YesOrNo;
  const hwfReference = content.userCase.applicant1InterimAppsHwfRefNumber as string;
  const translations = languages[content.language](content, useHwf, hwfReference);

  return {
    ...checkAnswersContent,
    ...translations,
    form,
    useHwf,
    hwfReference,
  };
};
