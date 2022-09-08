import { capitalize } from 'lodash';

import { CaseWithId, Checkbox } from '../../app/case/case';
import {
  ApplicationType,
  ClarificationReason,
  Gender,
  LegalAdvisorDecision,
  ListValue,
  State,
} from '../../app/case/definition';

import { CommonContent, en } from './common.content';

export const getServiceName = (translations: typeof en, isDivorce: boolean): string => {
  const serviceName = isDivorce ? translations.applyForDivorce : translations.applyForDissolution;
  return capitalize(serviceName);
};

export const getName = (userCase: Partial<CaseWithId>, app: 'applicant1' | 'applicant2'): string => {
  return [userCase[app + 'FirstNames'], userCase[app + 'MiddleNames'], userCase[app + 'LastNames']]
    .filter(name => name !== undefined)
    .join(' ');
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

export const getApplicant1PartnerContent = (content: CommonContent): string => {
  if (content.userCase?.sameSex !== Checkbox.Checked && content.partner !== content.civilPartner) {
    return content.partner === content.husband ? content.wife : content.husband;
  } else {
    return content.partner;
  }
};

export const getAppSolAddressFields = (
  applicant: 'applicant1' | 'applicant2',
  userCase: Partial<CaseWithId>
): string[] => {
  const addressPrefix = `${applicant}${userCase[`${applicant}SolicitorAddress`]?.trim() ? 'Solicitor' : ''}`;
  return getAddressFields(addressPrefix, userCase);
};

export const getAddressFields = (addressPrefix: string, userCase: Partial<CaseWithId>): string[] => {
  const addressFields = [
    userCase[`${addressPrefix}Address1`],
    userCase[`${addressPrefix}Address2`],
    userCase[`${addressPrefix}Address3`],
    userCase[`${addressPrefix}AddressTown`],
    userCase[`${addressPrefix}AddressCounty`],
    userCase[`${addressPrefix}AddressPostcode`],
    userCase[`${addressPrefix}AddressCountry`],
  ].filter(Boolean);
  if (addressFields.length === 0 && userCase[`${addressPrefix}Address`]) {
    return userCase[`${addressPrefix}Address`].split('\n');
  }
  return addressFields;
};

export const formattedCaseId = (caseId: string | undefined): string | undefined => {
  return caseId?.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
};

export const accessibleDetailsSpan = (spanText: string, accessibleText: string): string => {
  return spanText + '</span><span class="govuk-visually-hidden"> &nbsp - ' + accessibleText;
};

export const latestLegalAdvisorDecisionContent = (
  userCase: Partial<CaseWithId>,
  condensedHeading: boolean
): Record<string, unknown> => {
  const pastLegalAdvisorDecisions: ListValue<LegalAdvisorDecision>[] | undefined = userCase.coLegalAdvisorDecisions;
  const contentObject = pastLegalAdvisorDecisions
    ? {
        latestRefusalClarificationAdditionalInfo: pastLegalAdvisorDecisions[0].value.refusalClarificationAdditionalInfo
          ? `"${pastLegalAdvisorDecisions[0].value.refusalClarificationAdditionalInfo}"`
          : '',
        latestRefusalClarificationReasons: pastLegalAdvisorDecisions[0].value.refusalClarificationReason?.filter(
          reason => reason !== ClarificationReason.OTHER
        ),
      }
    : {
        latestRefusalClarificationAdditionalInfo: '',
        latestRefusalClarificationReasons: [],
      };
  contentObject['condensedHeading'] = condensedHeading;
  return contentObject;
};

export const isApplicant2EmailUpdatePossible = (userCase: Partial<CaseWithId>): boolean => {
  return (
    userCase.state === State.AwaitingApplicant2Response &&
    userCase.accessCode !== undefined &&
    userCase.applicationType === ApplicationType.JOINT_APPLICATION
  );
};
