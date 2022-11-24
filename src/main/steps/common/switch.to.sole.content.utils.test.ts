import dayjs from 'dayjs';
import { now } from 'lodash';

import { getFormattedDate } from '../../app/case/answers/formatDate';
import { CaseWithId } from '../../app/case/case';
import { State, YesOrNo } from '../../app/case/definition';

import {
  doesApplicantIntendToSwitchToSoleFinalOrder,
  getSwitchToSoleFinalOrderStatus,
} from './switch.to.sole.content.utils';

describe('switch.to.sole.content.utils', () => {
  test('doesApplicantIntendToSwitchToSoleFinalOrder - applicant 1 intends', () => {
    const userCase = {
      doesApplicant1IntendToSwitchToSole: YesOrNo.YES,
      doesApplicant2IntendToSwitchToSole: YesOrNo.NO,
    } as Partial<CaseWithId>;
    let isApplicant2 = false;
    let expected = true;
    let actual = doesApplicantIntendToSwitchToSoleFinalOrder(userCase, isApplicant2);
    expect(actual).toEqual(expected);
    isApplicant2 = true;
    expected = false;
    actual = doesApplicantIntendToSwitchToSoleFinalOrder(userCase, isApplicant2);
    expect(actual).toEqual(expected);
  });

  test('doesApplicantIntendToSwitchToSoleFinalOrder - applicant 2 intends', () => {
    const userCase = {
      doesApplicant1IntendToSwitchToSole: YesOrNo.NO,
      doesApplicant2IntendToSwitchToSole: YesOrNo.YES,
    } as Partial<CaseWithId>;
    let isApplicant2 = true;
    let expected = true;
    let actual = doesApplicantIntendToSwitchToSoleFinalOrder(userCase, isApplicant2);
    expect(actual).toEqual(expected);
    isApplicant2 = false;
    expected = false;
    actual = doesApplicantIntendToSwitchToSoleFinalOrder(userCase, isApplicant2);
    expect(actual).toEqual(expected);
  });

  test('doesApplicantIntendToSwitchToSoleFinalOrder - neither applicant intends', () => {
    const userCase = {
      doesApplicant1IntendToSwitchToSole: YesOrNo.NO,
      doesApplicant2IntendToSwitchToSole: YesOrNo.NO,
    } as Partial<CaseWithId>;
    let isApplicant2 = false;
    const expected = false;
    let actual = doesApplicantIntendToSwitchToSoleFinalOrder(userCase, isApplicant2);
    expect(actual).toEqual(expected);
    isApplicant2 = true;
    actual = doesApplicantIntendToSwitchToSoleFinalOrder(userCase, isApplicant2);
    expect(actual).toEqual(expected);
  });

  test('getSwitchToSoleFinalOrderStatus - applicant 1', () => {
    const today = getFormattedDate(dayjs(now()));
    const userCase = {
      applicant1AppliedForFinalOrderFirst: YesOrNo.YES,
      doesApplicant1IntendToSwitchToSole: YesOrNo.YES,
      dateApplicant1DeclaredIntentionToSwitchToSoleFo: today,
      applicant2AppliedForFinalOrderFirst: YesOrNo.NO,
      doesApplicant2IntendToSwitchToSole: YesOrNo.NO,
      dateApplicant2DeclaredIntentionToSwitchToSoleFo: '',
      state: State.AwaitingJointFinalOrder,
    } as Partial<CaseWithId>;
    let isApplicant2 = false;
    let switchToSoleFinalOrderStatus = getSwitchToSoleFinalOrderStatus(userCase, isApplicant2);
    let within = true;
    let expired = false;
    let intendingAndAble = false;
    expect(switchToSoleFinalOrderStatus.isWithinSwitchToSoleFinalOrderIntentionNotificationPeriod).toEqual(within);
    expect(switchToSoleFinalOrderStatus.hasSwitchToSoleFinalOrderIntentionNotificationPeriodExpired).toEqual(expired);
    expect(switchToSoleFinalOrderStatus.isIntendingAndAbleToSwitchToSoleFinalOrder).toEqual(intendingAndAble);
    userCase.dateApplicant1DeclaredIntentionToSwitchToSoleFo = '2022-10-10';
    switchToSoleFinalOrderStatus = getSwitchToSoleFinalOrderStatus(userCase, isApplicant2);
    within = false;
    expired = true;
    intendingAndAble = true;
    expect(switchToSoleFinalOrderStatus.isWithinSwitchToSoleFinalOrderIntentionNotificationPeriod).toEqual(within);
    expect(switchToSoleFinalOrderStatus.hasSwitchToSoleFinalOrderIntentionNotificationPeriodExpired).toEqual(expired);
    expect(switchToSoleFinalOrderStatus.isIntendingAndAbleToSwitchToSoleFinalOrder).toEqual(intendingAndAble);
    isApplicant2 = true;
    switchToSoleFinalOrderStatus = getSwitchToSoleFinalOrderStatus(userCase, isApplicant2);
    within = false;
    expired = false;
    intendingAndAble = false;
    expect(switchToSoleFinalOrderStatus.isWithinSwitchToSoleFinalOrderIntentionNotificationPeriod).toEqual(within);
    expect(switchToSoleFinalOrderStatus.hasSwitchToSoleFinalOrderIntentionNotificationPeriodExpired).toEqual(expired);
    expect(switchToSoleFinalOrderStatus.isIntendingAndAbleToSwitchToSoleFinalOrder).toEqual(intendingAndAble);
  });

  test('getSwitchToSoleFinalOrderStatus - applicant 2', () => {
    const today = getFormattedDate(dayjs(now()));
    const userCase = {
      applicant1AppliedForFinalOrderFirst: YesOrNo.NO,
      doesApplicant1IntendToSwitchToSole: YesOrNo.NO,
      dateApplicant1DeclaredIntentionToSwitchToSoleFo: '',
      applicant2AppliedForFinalOrderFirst: YesOrNo.YES,
      doesApplicant2IntendToSwitchToSole: YesOrNo.YES,
      dateApplicant2DeclaredIntentionToSwitchToSoleFo: today,
      state: State.AwaitingJointFinalOrder,
    } as Partial<CaseWithId>;
    let isApplicant2 = true;
    let switchToSoleFinalOrderStatus = getSwitchToSoleFinalOrderStatus(userCase, isApplicant2);
    let within = true;
    let expired = false;
    let intendingAndAble = false;
    expect(switchToSoleFinalOrderStatus.isWithinSwitchToSoleFinalOrderIntentionNotificationPeriod).toEqual(within);
    expect(switchToSoleFinalOrderStatus.hasSwitchToSoleFinalOrderIntentionNotificationPeriodExpired).toEqual(expired);
    expect(switchToSoleFinalOrderStatus.isIntendingAndAbleToSwitchToSoleFinalOrder).toEqual(intendingAndAble);
    userCase.dateApplicant2DeclaredIntentionToSwitchToSoleFo = '2022-10-10';
    switchToSoleFinalOrderStatus = getSwitchToSoleFinalOrderStatus(userCase, isApplicant2);
    within = false;
    expired = true;
    intendingAndAble = true;
    expect(switchToSoleFinalOrderStatus.isWithinSwitchToSoleFinalOrderIntentionNotificationPeriod).toEqual(within);
    expect(switchToSoleFinalOrderStatus.hasSwitchToSoleFinalOrderIntentionNotificationPeriodExpired).toEqual(expired);
    expect(switchToSoleFinalOrderStatus.isIntendingAndAbleToSwitchToSoleFinalOrder).toEqual(intendingAndAble);
    isApplicant2 = false;
    switchToSoleFinalOrderStatus = getSwitchToSoleFinalOrderStatus(userCase, isApplicant2);
    expired = false;
    intendingAndAble = false;
    expect(switchToSoleFinalOrderStatus.isWithinSwitchToSoleFinalOrderIntentionNotificationPeriod).toEqual(within);
    expect(switchToSoleFinalOrderStatus.hasSwitchToSoleFinalOrderIntentionNotificationPeriodExpired).toEqual(expired);
    expect(switchToSoleFinalOrderStatus.isIntendingAndAbleToSwitchToSoleFinalOrder).toEqual(intendingAndAble);
  });
});
