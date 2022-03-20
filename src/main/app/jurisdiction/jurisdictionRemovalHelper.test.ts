import { Checkbox } from '../case/case';
import { Gender } from '../case/definition';

import { isFormDataDifferentToSessionData, setJurisdictionFieldsToNull } from './jurisdictionRemovalHelper';

describe('jurisdictionRemovalHelper', () => {
  describe('setJurisdictionFieldsToNull', () => {
    test('jurisdictionFields length', () => {
      const formData = {};
      const newFormData = setJurisdictionFieldsToNull(formData);
      expect(Object.keys(newFormData)).toHaveLength(9);
    });

    test('assert formData appended with null jurisdiction fields', () => {
      const formData = { sameSex: Checkbox.Checked, gender: Gender.MALE };
      const newFormData = setJurisdictionFieldsToNull(formData);
      const expectedFormData = {
        applicant1DomicileInEnglandWales: null,
        applicant2DomicileInEnglandWales: null,
        bothLastHabituallyResident: null,
        applicant1LivingInEnglandWalesTwelveMonths: null,
        applicant1LivingInEnglandWalesSixMonths: null,
        jurisdictionResidualEligible: null,
        connections: null,
        applicant1LifeBasedInEnglandAndWales: null,
        applicant2LifeBasedInEnglandAndWales: null,
        sameSex: Checkbox.Checked,
        gender: Gender.MALE,
      };
      expect(newFormData).toEqual(expectedFormData);
    });
  });

  describe('isFormDataDifferentToSessionData', () => {
    test('When values equal should return false', () => {
      const newField = { sameSex: Checkbox.Checked };
      const existingField = { sameSex: Checkbox.Checked };
      const answer = isFormDataDifferentToSessionData(newField, existingField, 'sameSex');
      expect(answer).toBe(false);
    });

    test('When values not equal should return true', () => {
      const newField = { sameSex: Checkbox.Unchecked };
      const existingField = { sameSex: Checkbox.Checked };
      const answer = isFormDataDifferentToSessionData(newField, existingField, 'sameSex');
      expect(answer).toBe(true);
    });

    test('When existing value is undefined should return false', () => {
      const newField = { sameSex: Checkbox.Unchecked };
      const existingField = { sameSex: undefined };
      const answer = isFormDataDifferentToSessionData(newField, existingField, 'sameSex');
      expect(answer).toBe(false);
    });

    test('When new value is undefined and existing value is unchecked should return false', () => {
      const newField = { sameSex: undefined };
      const existingField = { sameSex: Checkbox.Unchecked };
      const answer = isFormDataDifferentToSessionData(newField, existingField, 'sameSex');
      expect(answer).toBe(false);
    });

    test('When new value is undefined and existing value is checked should return true', () => {
      const newField = { sameSex: undefined };
      const existingField = { sameSex: Checkbox.Checked };
      const answer = isFormDataDifferentToSessionData(newField, existingField, 'sameSex');
      expect(answer).toBe(true);
    });

    test('When invalid field name passed into the method then return false', () => {
      const newField = { sameSex: Checkbox.Unchecked };
      const existingField = { sameSex: Checkbox.Checked };
      const answer = isFormDataDifferentToSessionData(newField, existingField, 'invalidFieldName');
      expect(answer).toBe(false);
    });
  });
});
