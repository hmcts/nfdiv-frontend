import { capitalize } from 'lodash';

import { CaseWithId, Checkbox } from '../../app/case/case';
import {
  ApplicationType,
  ChangedNameHow,
  ClarificationReason,
  Gender,
  LegalAdvisorDecision,
  ListValue,
  State,
  YesOrNo,
} from '../../app/case/definition';
import { ValidationCheck } from '../../app/form/Form';

import { CommonContent, en } from './common.content';

export const DISABLE_UPON_SUBMIT = 'disable-upon-submit';

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

export const checkboxToBoolean = (checkboxValue: Checkbox | undefined): boolean => checkboxValue === Checkbox.Checked;

export const hasApplicantAppliedForFoFirst = (userCase: Partial<CaseWithId>, isApplicant2: boolean): boolean => {
  return isApplicant2
    ? userCase.applicant2AppliedForFinalOrderFirst === YesOrNo.YES
    : userCase.applicant1AppliedForFinalOrderFirst === YesOrNo.YES;
};

export const getNameChangeOtherDetailsValidator = (
  fieldName:
    | 'applicant1LastNameChangedWhenMarriedOtherDetails'
    | 'applicant1NameDifferentToMarriageCertificateOtherDetails'
    | 'applicant2LastNameChangedWhenMarriedOtherDetails'
    | 'applicant2NameDifferentToMarriageCertificateOtherDetails'
): ValidationCheck => {
  return ((value, formData) => {
    if ((value as string[])?.includes(ChangedNameHow.OTHER) && !formData[fieldName]?.length) {
      return fieldName;
    }
  }) as ValidationCheck;
};

export const nameChangedHowPossibleValue = (
  userCase: Partial<CaseWithId>,
  isApplicant2: boolean
): ChangedNameHow[] | undefined => {
  if (isApplicant2) {
    const applicant2ChangeMethods = [
      ...new Set(
        (userCase.applicant2LastNameChangedWhenMarriedMethod || []).concat(
          userCase.applicant2NameDifferentToMarriageCertificateMethod || []
        )
      ),
    ];
    return applicant2ChangeMethods.length === 0 ? userCase.applicant2NameChangedHow : applicant2ChangeMethods;
  } else {
    const applicant1ChangeMethods = [
      ...new Set(
        (userCase.applicant1LastNameChangedWhenMarriedMethod || []).concat(
          userCase.applicant1NameDifferentToMarriageCertificateMethod || []
        )
      ),
    ];
    return applicant1ChangeMethods.length === 0 ? userCase.applicant1NameChangedHow : applicant1ChangeMethods;
  }
};
