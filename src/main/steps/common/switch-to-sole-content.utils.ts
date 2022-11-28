import config from 'config';
import dayjs from 'dayjs';

import { CaseWithId } from '../../app/case/case';
import { State, YesOrNo } from '../../app/case/definition';

import { hasApplicantAppliedForFinalOrderFirst } from './content.utils';

interface SwitchToSoleFinalOrderStatus {
  isWithinSwitchToSoleFinalOrderIntentionNotificationPeriod: boolean;
  hasSwitchToSoleFinalOrderIntentionNotificationPeriodExpired: boolean;
  isIntendingAndAbleToSwitchToSoleFinalOrder: boolean;
}

export const doesApplicantIntendToSwitchToSoleFinalOrder = (
  userCase: Partial<CaseWithId>,
  isApplicant2: boolean
): boolean => {
  return isApplicant2
    ? userCase.doesApplicant2IntendToSwitchToSole === YesOrNo.YES
    : userCase.doesApplicant1IntendToSwitchToSole === YesOrNo.YES;
};

const dateApplicantDeclaredIntentionToSwitchToSoleFinalOrder = (
  userCase: Partial<CaseWithId>,
  isApplicant2: boolean
): string | undefined => {
  return isApplicant2
    ? userCase.dateApplicant2DeclaredIntentionToSwitchToSoleFo
    : userCase.dateApplicant1DeclaredIntentionToSwitchToSoleFo;
};

const hasApplicantDeclaredIntentionToSwitchToSoleFinalOrder = (
  userCase: Partial<CaseWithId>,
  isApplicant2: boolean
): boolean => {
  return (
    hasApplicantAppliedForFinalOrderFirst(userCase, isApplicant2) &&
    doesApplicantIntendToSwitchToSoleFinalOrder(userCase, isApplicant2) &&
    dayjs().isAfter(dateApplicantDeclaredIntentionToSwitchToSoleFinalOrder(userCase, isApplicant2))
  );
};

const applicantSwitchToSoleFinalOrderIntentionNotificationPeriodExpiryDate = (
  userCase: Partial<CaseWithId>,
  isApplicant2: boolean
): dayjs.Dayjs => {
  return dayjs(dateApplicantDeclaredIntentionToSwitchToSoleFinalOrder(userCase, isApplicant2)).add(
    config.get('dates.switchToSoleFinalOrderIntentionNotificationOffsetDays'),
    'day'
  );
};

const isWithinSwitchToSoleFinalOrderIntentionNotificationPeriod = (
  userCase: Partial<CaseWithId>,
  isApplicant2: boolean
): boolean => {
  return (
    hasApplicantDeclaredIntentionToSwitchToSoleFinalOrder(userCase, isApplicant2) &&
    dayjs().isBefore(applicantSwitchToSoleFinalOrderIntentionNotificationPeriodExpiryDate(userCase, isApplicant2)) &&
    userCase.state === State.AwaitingJointFinalOrder
  );
};

const hasSwitchToSoleFinalOrderIntentionNotificationPeriodExpired = (
  userCase: Partial<CaseWithId>,
  isApplicant2: boolean
): boolean => {
  return (
    hasApplicantDeclaredIntentionToSwitchToSoleFinalOrder(userCase, isApplicant2) &&
    dayjs().isAfter(applicantSwitchToSoleFinalOrderIntentionNotificationPeriodExpiryDate(userCase, isApplicant2))
  );
};

const isIntendingAndAbleToSwitchToSoleFinalOrder = (userCase: Partial<CaseWithId>, isApplicant2: boolean): boolean => {
  return (
    hasSwitchToSoleFinalOrderIntentionNotificationPeriodExpired(userCase, isApplicant2) &&
    userCase.state === State.AwaitingJointFinalOrder
  );
};

export const getSwitchToSoleFinalOrderStatus = (
  userCase: Partial<CaseWithId>,
  isApplicant2: boolean
): SwitchToSoleFinalOrderStatus => {
  const switchToSoleStatus = {
    isWithinSwitchToSoleFinalOrderIntentionNotificationPeriod: false,
    hasSwitchToSoleFinalOrderIntentionNotificationPeriodExpired: false,
    isIntendingAndAbleToSwitchToSoleFinalOrder: false,
  };

  if (doesApplicantIntendToSwitchToSoleFinalOrder(userCase, isApplicant2) === true) {
    switchToSoleStatus.isWithinSwitchToSoleFinalOrderIntentionNotificationPeriod =
      isWithinSwitchToSoleFinalOrderIntentionNotificationPeriod(userCase, isApplicant2);
    switchToSoleStatus.hasSwitchToSoleFinalOrderIntentionNotificationPeriodExpired =
      hasSwitchToSoleFinalOrderIntentionNotificationPeriodExpired(userCase, isApplicant2);
    switchToSoleStatus.isIntendingAndAbleToSwitchToSoleFinalOrder = isIntendingAndAbleToSwitchToSoleFinalOrder(
      userCase,
      isApplicant2
    );
  }

  return switchToSoleStatus;
};
