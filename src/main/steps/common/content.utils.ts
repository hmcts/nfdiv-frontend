import { capitalize } from 'lodash';

import { CaseWithId, Checkbox } from '../../app/case/case';
import { Gender } from '../../app/case/definition';

import { en } from './common.content';

export const getServiceName = (translations: typeof en, isDivorce: boolean): string => {
  const serviceName = isDivorce ? translations.applyForDivorce : translations.applyForDissolution;
  return capitalize(serviceName);
};

export const getSelectedGender = (userCase: Partial<CaseWithId>, isApplicant2: boolean): Gender | undefined => {
  if (isApplicant2 && userCase?.sameSex === Checkbox.Unchecked) {
    if (userCase?.gender === Gender.MALE) {
      return Gender.FEMALE;
    } else if (userCase?.gender === Gender.FEMALE) {
      return Gender.MALE;
    } else {
      return undefined;
    }
  }
  return userCase?.gender;
};

export const getPartner = (translations: typeof en, selectedGender: Gender | undefined, isDivorce: boolean): string => {
  if (!isDivorce) {
    return translations.civilPartner;
  }
  if (selectedGender === Gender.MALE) {
    return translations.husband;
  }
  if (selectedGender === Gender.FEMALE) {
    return translations.wife;
  }
  return translations.partner;
};

export const getAppSolAddressFields = (
  applicant: 'applicant1' | 'applicant2',
  userCase: Partial<CaseWithId>
): string[] => {
  const addressPrefix = `${applicant}${userCase[`${applicant}SolicitorAddress`]?.trim() ? 'Solicitor' : ''}`;
  return [
    userCase[`${addressPrefix}Address1`],
    userCase[`${addressPrefix}Address2`],
    userCase[`${addressPrefix}Address3`],
    userCase[`${addressPrefix}AddressTown`],
    userCase[`${addressPrefix}AddressCounty`],
    userCase[`${addressPrefix}AddressPostcode`],
    userCase[`${addressPrefix}AddressCountry`],
  ].filter(Boolean);
};

export const getAddressFields = (addressPrefix: string, userCase: Partial<CaseWithId>): string[] => {
  return [
    userCase[`${addressPrefix}Address1`],
    userCase[`${addressPrefix}Address2`],
    userCase[`${addressPrefix}Address3`],
    userCase[`${addressPrefix}AddressTown`],
    userCase[`${addressPrefix}AddressCounty`],
    userCase[`${addressPrefix}AddressPostcode`],
    userCase[`${addressPrefix}AddressCountry`],
  ].filter(Boolean);
};
