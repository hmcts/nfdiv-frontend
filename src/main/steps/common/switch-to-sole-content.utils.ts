import config from 'config';
import dayjs from 'dayjs';

import { CaseWithId } from '../../app/case/case';
import { State, YesOrNo } from '../../app/case/definition';

import { hasApplicantAppliedForFoFirst } from './content.utils';

interface SwitchToSoleFinalOrderStatus {
  isWithinSwitchToSoleFoIntentionNotificationPeriod: boolean;
  hasSwitchToSoleFoIntentionNotificationPeriodExpired: boolean;
  isIntendingAndAbleToSwitchToSoleFo: boolean;
}

export const doesApplicantIntendToSwitchToSoleFo = (userCase: Partial<CaseWithId>, isApplicant2: boolean): boolean => {
  return isApplicant2
    ? userCase.doesApplicant2IntendToSwitchToSole === YesOrNo.YES
    : userCase.doesApplicant1IntendToSwitchToSole === YesOrNo.YES;
};

const getDateApplicantDeclaredIntentionToSwitchToSoleFo = (
  userCase: Partial<CaseWithId>,
  isApplicant2: boolean
): string | undefined => {
  return isApplicant2
    ? userCase.dateApplicant2DeclaredIntentionToSwitchToSoleFo
    : userCase.dateApplicant1DeclaredIntentionToSwitchToSoleFo;
};

const hasApplicantDeclaredIntentionToSwitchToSoleFo = (
  userCase: Partial<CaseWithId>,
  isApplicant2: boolean
): boolean => {
  return (
    hasApplicantAppliedForFoFirst(userCase, isApplicant2) && doesApplicantIntendToSwitchToSoleFo(userCase, isApplicant2)
  );
};

const getApplicantSwitchToSoleFoIntentionNotificationPeriodExpiryDate = (
  userCase: Partial<CaseWithId>,
  isApplicant2: boolean
): dayjs.Dayjs => {
  return dayjs(getDateApplicantDeclaredIntentionToSwitchToSoleFo(userCase, isApplicant2)).add(
    config.get('dates.switchToSoleFinalOrderIntentionNotificationOffsetDays'),
    'day'
  );
};

const isWithinSwitchToSoleFoIntentionNotificationPeriod = (
  userCase: Partial<CaseWithId>,
  isApplicant2: boolean
): boolean => {
  return (
    hasApplicantDeclaredIntentionToSwitchToSoleFo(userCase, isApplicant2) &&
    dayjs().isAfter(getDateApplicantDeclaredIntentionToSwitchToSoleFo(userCase, isApplicant2)) &&
    dayjs().isBefore(getApplicantSwitchToSoleFoIntentionNotificationPeriodExpiryDate(userCase, isApplicant2)) &&
    userCase.state === State.AwaitingJointFinalOrder
  );
};

const hasSwitchToSoleFoIntentionNotificationPeriodExpired = (
  userCase: Partial<CaseWithId>,
  isApplicant2: boolean
): boolean => {
  return (
    hasApplicantDeclaredIntentionToSwitchToSoleFo(userCase, isApplicant2) &&
    dayjs().isAfter(getApplicantSwitchToSoleFoIntentionNotificationPeriodExpiryDate(userCase, isApplicant2))
  );
};

const isIntendingAndAbleToSwitchToSoleFo = (userCase: Partial<CaseWithId>, isApplicant2: boolean): boolean => {
  return (
    hasSwitchToSoleFoIntentionNotificationPeriodExpired(userCase, isApplicant2) &&
    userCase.state === State.AwaitingJointFinalOrder
  );
};

export const getSwitchToSoleFoStatus = (
  userCase: Partial<CaseWithId>,
  isApplicant2: boolean
): SwitchToSoleFinalOrderStatus => {
  const switchToSoleStatus = {
    isWithinSwitchToSoleFoIntentionNotificationPeriod: false,
    hasSwitchToSoleFoIntentionNotificationPeriodExpired: false,
    isIntendingAndAbleToSwitchToSoleFo: false,
  };

  if (doesApplicantIntendToSwitchToSoleFo(userCase, isApplicant2) === true) {
    switchToSoleStatus.isWithinSwitchToSoleFoIntentionNotificationPeriod =
      isWithinSwitchToSoleFoIntentionNotificationPeriod(userCase, isApplicant2);
    switchToSoleStatus.hasSwitchToSoleFoIntentionNotificationPeriodExpired =
      hasSwitchToSoleFoIntentionNotificationPeriodExpired(userCase, isApplicant2);
    switchToSoleStatus.isIntendingAndAbleToSwitchToSoleFo = isIntendingAndAbleToSwitchToSoleFo(userCase, isApplicant2);
  }

  return switchToSoleStatus;
};
