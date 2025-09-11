import { capitalize } from 'lodash';
import striptags from 'striptags';

import { getFormattedCaseDate } from '../../../../../app/case/answers/formatDate';
import { CaseDate } from '../../../../../app/case/case';
import { SearchGovRecordsWhichDepartment, YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import * as urls from '../../../../urls';
import {
  form as checkAnswersForm,
  generateContent as checkAnswersGenerateContent,
} from '../../common/check-answers/content';

const stripTags = value => (typeof value === 'string' ? striptags(value) : value);

const en = (
  { partner, userCase }: CommonContent,
  {
    useHwf,
    hwfReference,
    knowsPartnersNINumber,
    knowsPartnerDateOfBirth,
    knowsOtherAddresses,
    willSearchOtherDepartments,
  }: {
    useHwf: YesOrNo;
    hwfReference: string;
    knowsPartnersNINumber: boolean;
    knowsPartnerDateOfBirth: boolean;
    knowsOtherAddresses: boolean;
    willSearchOtherDepartments: boolean;
  }
) => ({
  title: 'Check your answers',
  stepQuestions: {
    useHwf: 'Help paying the application fee',
    hwfReference: 'Help with fees reference number',
    whySearchGovRecords: 'Why are you applying to search government records?',
    whichGovDepartmentsToSearch: `Which government departments do you need to search for your ${partner}'s details?`,
    otherGovDepartmentsToSearch: 'Please specify the other departments',
    whySearchTheseDepartments: `Why do you think these departments are most suited to getting the contact details of your ${partner}?`,
    partnerName: `${capitalize(partner)}'s name`,
    knowPartnerDateOfBirth: `Do you know your ${partner}'s date of birth?`,
    partnerDateOfBirth: `${capitalize(partner)}'s date of birth`,
    partnerApproximateAge: `${capitalize(partner)}'s approximate age`,
    knowPartnerNationalInsuranceNumber: `Do you know your ${partner}'s National Insurance number?`,
    partnerNationalInsuranceNumber: `${capitalize(partner)}'s National Insurance number`,
    partnerLastKnownAddress: `${capitalize(partner)}'s last known address`,
    partnerLastKnownAddressDates: `Dates your ${partner} lived at the last known address`,
    partnerAnyAdditionalKnownAddresses: `Do you know of any other addresses related to your ${partner}?`,
    partnerAnyAdditionalKnownAddress1: 'Other address 1',
    partnerAnyAdditionalKnownAddressDates1: `Dates your ${partner} lived at other address 1`,
    partnerAnyAdditionalKnownAddress2: 'Other address 2',
    partnerAnyAdditionalKnownAddressDates2: `Dates your ${partner} lived at other address 2`,
  },
  stepAnswers: {
    useHwf: `${useHwf}`,
    hwfReference: `${hwfReference}`,
    whySearchGovRecords: stripTags(userCase.applicant1SearchGovRecordsReasonForApplying),
    whichGovDepartmentsToSearch: userCase.applicant1SearchGovRecordsWhichDepartments
      ? userCase.applicant1SearchGovRecordsWhichDepartments
          ?.join(' / ')
          .replace(SearchGovRecordsWhichDepartment.DWP, 'DWP')
          .replace(SearchGovRecordsWhichDepartment.HMRC, 'HMRC')
          .replace(SearchGovRecordsWhichDepartment.OTHER, 'Other')
      : '',
    otherGovDepartmentsToSearch:
      willSearchOtherDepartments && stripTags(userCase.applicant1SearchGovRecordsOtherDepartmentNames),
    whySearchTheseDepartments: stripTags(userCase.applicant1SearchGovRecordsWhyTheseDepartments),
    partnerName: stripTags(userCase.applicant1SearchGovRecordsPartnerName),
    knowPartnerDateOfBirth: stripTags(userCase.applicant1SearchGovRecordsKnowPartnerDateOfBirth),
    partnerDateOfBirth:
      knowsPartnerDateOfBirth &&
      `${
        userCase.applicant1SearchGovRecordsPartnerDateOfBirth
          ? `${getFormattedCaseDate(userCase.applicant1SearchGovRecordsPartnerDateOfBirth as CaseDate)}`
          : null
      }`,
    partnerApproximateAge:
      !knowsPartnerDateOfBirth && stripTags(userCase.applicant1SearchGovRecordsPartnerApproximateAge),
    knowPartnerNationalInsuranceNumber: stripTags(userCase.applicant1SearchGovRecordsKnowPartnerNationalInsurance),
    partnerNationalInsuranceNumber:
      knowsPartnersNINumber && stripTags(userCase.applicant1SearchGovRecordsPartnerNationalInsurance),
    partnerLastKnownAddress: [
      stripTags(userCase.applicant1SearchGovRecordsPartnerLastKnownAddress1),
      stripTags(userCase.applicant1SearchGovRecordsPartnerLastKnownAddress2),
      stripTags(userCase.applicant1SearchGovRecordsPartnerLastKnownAddress3),
      stripTags(userCase.applicant1SearchGovRecordsPartnerLastKnownAddressTown),
      stripTags(userCase.applicant1SearchGovRecordsPartnerLastKnownAddressCounty),
      stripTags(userCase.applicant1SearchGovRecordsPartnerLastKnownAddressPostcode),
      stripTags(userCase.applicant1SearchGovRecordsPartnerLastKnownAddressCountry),
    ]
      .filter(Boolean)
      .join('<br>'),
    partnerLastKnownAddressDates: stripTags(userCase.applicant1SearchGovRecordsPartnerLastKnownAddressDates),
    partnerAnyAdditionalKnownAddresses:
      knowsOtherAddresses && stripTags(userCase.applicant1SearchGovRecordsKnowPartnerAdditionalAddresses),
    partnerAnyAdditionalKnownAddress1:
      knowsOtherAddresses && stripTags(userCase.applicant1SearchGovRecordsPartnerAdditionalAddress1),
    partnerAnyAdditionalKnownAddressDates1:
      knowsOtherAddresses && stripTags(userCase.applicant1SearchGovRecordsPartnerAdditionalAddressDates1),
    partnerAnyAdditionalKnownAddress2:
      knowsOtherAddresses && stripTags(userCase.applicant1SearchGovRecordsPartnerAdditionalAddress2),
    partnerAnyAdditionalKnownAddressDates2:
      knowsOtherAddresses && stripTags(userCase.applicant1SearchGovRecordsPartnerAdditionalAddressDates2),
  },
  stepLinks: {
    useHwf: `${urls.SEARCH_GOV_RECORDS_HWF}`,
    hwfReference: `${urls.HWF_REFERENCE_NUMBER_INPUT_GOV_RECORDS}`,
    whySearchGovRecords: `${urls.WHY_SEARCH_GOV_RECORDS}`,
    whichGovDepartmentsToSearch: `${urls.WHICH_GOV_DEPARTMENTS}`,
    otherGovDepartmentsToSearch: `${urls.WHICH_GOV_DEPARTMENTS}`,
    whySearchTheseDepartments: `${urls.WHICH_GOV_DEPARTMENTS}`,
    partnerName: `${urls.PARTNER_NAME_GOV_RECORDS}`,
    knowPartnerDateOfBirth: `${urls.PARTNER_DOB_GOV_RECORDS}`,
    partnerDateOfBirth: `${urls.PARTNER_DOB_GOV_RECORDS}`,
    partnerApproximateAge: `${urls.PARTNER_DOB_GOV_RECORDS}`,
    knowPartnerNationalInsuranceNumber: `${urls.PARTNER_NI_GOV_RECORDS}`,
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
const cy: typeof en = (
  { partner, userCase }: CommonContent,
  {
    useHwf,
    hwfReference,
    knowsPartnersNINumber,
    knowsPartnerDateOfBirth,
    knowsOtherAddresses,
    willSearchOtherDepartments,
  }: {
    useHwf: YesOrNo;
    hwfReference: string;
    knowsPartnersNINumber: boolean;
    knowsPartnerDateOfBirth: boolean;
    knowsOtherAddresses: boolean;
    willSearchOtherDepartments: boolean;
  }
) => ({
  title: 'Gwiriwch eich atebion',
  stepQuestions: {
    useHwf: 'Help i dalu’r ffi gwneud cais',
    hwfReference: 'Cyfeirnod help i dalu ffioedd',
    whySearchGovRecords: 'Pam ydych yn gwneud cais i chwilio cofnodion y llywodraeth?',
    whichGovDepartmentsToSearch: `Pa adrannau’r llywodraeth ydych angen eu chwilio am fanylion eich ${partner}?`,
    otherGovDepartmentsToSearch: 'Please specify the other departments',
    whySearchTheseDepartments: `Pam ydych chi’n meddwl mai’r adrannau hyn sydd fwyaf addas i gael manylion cyswllt eich ${partner}?`,
    partnerName: `Enw’ch ${partner}`,
    knowPartnerDateOfBirth: `Ydych chi’n gwybod dyddiad geni eich ${partner}?`,
    partnerDateOfBirth: `Dyddiad geni eich ${partner}`,
    partnerApproximateAge: `Oedran eich ${partner} yn fras`,
    knowPartnerNationalInsuranceNumber: `Ydych chi’n gwybod rhif Yswiriant Gwladol eich ${partner}?`,
    partnerNationalInsuranceNumber: `Rhif Yswiriant Gwladol eich ${partner}`,
    partnerLastKnownAddress: `Cyfeiriad hysbys diwethaf eich ${partner}`,
    partnerLastKnownAddressDates: `Dyddiadau y bu eich ${partner} yn byw yn y cyfeiriad hysbys diwethaf`,
    partnerAnyAdditionalKnownAddresses: `Ydych chi’n gwybod am unrhyw gyfeiriadau eraill sy’n gysylltiedig â’ch ${partner}?`,
    partnerAnyAdditionalKnownAddress1: 'Cyfeiriad 1 arall',
    partnerAnyAdditionalKnownAddressDates1: `Dyddiadau y bu eich ${partner} yn byw yn y cyfeiriad 1 arall`,
    partnerAnyAdditionalKnownAddress2: 'Cyfeiriad 2 arall',
    partnerAnyAdditionalKnownAddressDates2: `Dyddiadau y bu eich ${partner} yn byw yn y cyfeiriad 2 arall`,
  },
  stepAnswers: {
    useHwf: `${useHwf}`,
    hwfReference: `${hwfReference}`,
    whySearchGovRecords: stripTags(userCase.applicant1SearchGovRecordsReasonForApplying),
    whichGovDepartmentsToSearch: userCase.applicant1SearchGovRecordsWhichDepartments
      ? userCase.applicant1SearchGovRecordsWhichDepartments
          ?.join(' / ')
          .replace(SearchGovRecordsWhichDepartment.DWP, 'DWP')
          .replace(SearchGovRecordsWhichDepartment.HMRC, 'HMRC')
          .replace(SearchGovRecordsWhichDepartment.OTHER, 'Other')
      : '',
    otherGovDepartmentsToSearch:
      willSearchOtherDepartments && stripTags(userCase.applicant1SearchGovRecordsOtherDepartmentNames),
    whySearchTheseDepartments: stripTags(userCase.applicant1SearchGovRecordsWhyTheseDepartments),
    partnerName: stripTags(userCase.applicant1SearchGovRecordsPartnerName),
    knowPartnerDateOfBirth: stripTags(userCase.applicant1SearchGovRecordsKnowPartnerDateOfBirth),
    partnerDateOfBirth:
      knowsPartnerDateOfBirth &&
      `${
        userCase.applicant1SearchGovRecordsPartnerDateOfBirth
          ? `${getFormattedCaseDate(userCase.applicant1SearchGovRecordsPartnerDateOfBirth as CaseDate)}`
          : null
      }`,
    partnerApproximateAge:
      !knowsPartnerDateOfBirth && stripTags(userCase.applicant1SearchGovRecordsPartnerApproximateAge),
    knowPartnerNationalInsuranceNumber: stripTags(userCase.applicant1SearchGovRecordsKnowPartnerNationalInsurance),
    partnerNationalInsuranceNumber:
      knowsPartnersNINumber && stripTags(userCase.applicant1SearchGovRecordsPartnerNationalInsurance),
    partnerLastKnownAddress: [
      stripTags(userCase.applicant1SearchGovRecordsPartnerLastKnownAddress1),
      stripTags(userCase.applicant1SearchGovRecordsPartnerLastKnownAddress2),
      stripTags(userCase.applicant1SearchGovRecordsPartnerLastKnownAddress3),
      stripTags(userCase.applicant1SearchGovRecordsPartnerLastKnownAddressTown),
      stripTags(userCase.applicant1SearchGovRecordsPartnerLastKnownAddressCounty),
      stripTags(userCase.applicant1SearchGovRecordsPartnerLastKnownAddressPostcode),
      stripTags(userCase.applicant1SearchGovRecordsPartnerLastKnownAddressCountry),
    ]
      .filter(Boolean)
      .join('<br>'),
    partnerLastKnownAddressDates: stripTags(userCase.applicant1SearchGovRecordsPartnerLastKnownAddressDates),
    partnerAnyAdditionalKnownAddresses:
      knowsOtherAddresses && stripTags(userCase.applicant1SearchGovRecordsKnowPartnerAdditionalAddresses),
    partnerAnyAdditionalKnownAddress1:
      knowsOtherAddresses && stripTags(userCase.applicant1SearchGovRecordsPartnerAdditionalAddress1),
    partnerAnyAdditionalKnownAddressDates1:
      knowsOtherAddresses && stripTags(userCase.applicant1SearchGovRecordsPartnerAdditionalAddressDates1),
    partnerAnyAdditionalKnownAddress2:
      knowsOtherAddresses && stripTags(userCase.applicant1SearchGovRecordsPartnerAdditionalAddress2),
    partnerAnyAdditionalKnownAddressDates2:
      knowsOtherAddresses && stripTags(userCase.applicant1SearchGovRecordsPartnerAdditionalAddressDates2),
  },
  stepLinks: {
    useHwf: `${urls.SEARCH_GOV_RECORDS_HWF}`,
    hwfReference: `${urls.HWF_REFERENCE_NUMBER_INPUT_GOV_RECORDS}`,
    whySearchGovRecords: `${urls.WHY_SEARCH_GOV_RECORDS}`,
    whichGovDepartmentsToSearch: `${urls.WHICH_GOV_DEPARTMENTS}`,
    otherGovDepartmentsToSearch: `${urls.WHICH_GOV_DEPARTMENTS}`,
    whySearchTheseDepartments: `${urls.WHICH_GOV_DEPARTMENTS}`,
    partnerName: `${urls.PARTNER_NAME_GOV_RECORDS}`,
    knowPartnerDateOfBirth: `${urls.PARTNER_DOB_GOV_RECORDS}`,
    partnerDateOfBirth: `${urls.PARTNER_DOB_GOV_RECORDS}`,
    partnerApproximateAge: `${urls.PARTNER_DOB_GOV_RECORDS}`,
    knowPartnerNationalInsuranceNumber: `${urls.PARTNER_NI_GOV_RECORDS}`,
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

export const form: FormContent = checkAnswersForm;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const useHwf = content.userCase.applicant1InterimAppsUseHelpWithFees as YesOrNo;
  const hwfReference = content.userCase.applicant1InterimAppsHwfRefNumber as string;
  const knowsPartnersNINumber = content.userCase.applicant1SearchGovRecordsKnowPartnerNationalInsurance === YesOrNo.YES;
  const knowsPartnerDateOfBirth = content.userCase.applicant1SearchGovRecordsKnowPartnerDateOfBirth === YesOrNo.YES;
  const knowsOtherAddresses = content.userCase.applicant1SearchGovRecordsKnowPartnerAdditionalAddresses === YesOrNo.YES;
  const willSearchOtherDepartments = !!content.userCase.applicant1SearchGovRecordsWhichDepartments?.includes(
    SearchGovRecordsWhichDepartment.OTHER
  );

  const contentVariables = {
    useHwf,
    hwfReference,
    knowsPartnersNINumber,
    knowsPartnerDateOfBirth,
    knowsOtherAddresses,
    willSearchOtherDepartments,
  };

  const defaultCheckAnswersContent = checkAnswersGenerateContent(content);
  const customContent = languages[content.language](content, contentVariables);

  return {
    ...defaultCheckAnswersContent,
    ...customContent,
    form,
    useHwf,
    hwfReference,
  };
};
