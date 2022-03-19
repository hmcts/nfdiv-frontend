import { CaseWithId, Checkbox } from '../../app/case/case';
import { Gender } from '../../app/case/definition';

import { en } from './common.content';
import { getAppSolAddressFields, getPartner, getSelectedGender, getServiceName } from './content.utils';

describe('content.utils', () => {
  test('should return serviceName', () => {
    const translations = {
      applyForDivorce: 'divorce',
      applyForDissolution: 'civil partnership',
    } as typeof en;

    const serviceName = getServiceName(translations, true);

    expect(serviceName).toBe('Divorce');
  });

  test('should return selectedGender', () => {
    const userCase = {
      sameSex: Checkbox.Unchecked,
      gender: Gender.MALE,
    } as Partial<CaseWithId>;

    const selectedGender = getSelectedGender(userCase, true);

    expect(selectedGender).toBe(Gender.FEMALE);
  });

  test('should return partner', () => {
    const translations = {
      partner: 'spouse',
      civilPartner: 'civil partner',
      husband: 'husband',
      wife: 'wife',
    } as typeof en;
    const selectedGender = Gender.MALE;

    const partner = getPartner(translations, selectedGender, true);

    expect(partner).toBe('husband');
  });

  test('should return applicant address fields', () => {
    const userCase = {
      sameSex: Checkbox.Unchecked,
      gender: Gender.MALE,
      applicant1Address1: 'Buckingham Palace',
      applicant1AddressPostcode: 'SW1A 1AA',
      applicant1AddressCountry: 'UK',
    } as Partial<CaseWithId>;

    const addressFields = getAppSolAddressFields('applicant1', userCase);

    expect(addressFields).toContain('Buckingham Palace');
    expect(addressFields).toContain('SW1A 1AA');
    expect(addressFields).toContain('UK');
  });
});
