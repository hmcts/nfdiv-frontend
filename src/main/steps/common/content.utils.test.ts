import { CaseWithId, Checkbox } from '../../app/case/case';
import { Gender } from '../../app/case/definition';

import { CommonContent, en } from './common.content';
import {
  formattedCaseId,
  getAppSolAddressFields,
  getApplicant1PartnerContent,
  getPartner,
  getSelectedGender,
  getServiceName,
} from './content.utils';

describe('content.utils', () => {
  test.each([
    [true, 'Divorce'],
    [false, 'Civil partnership'],
  ])('should return serviceName', (isDivorce, expected) => {
    const translations = {
      applyForDivorce: 'divorce',
      applyForDissolution: 'civil partnership',
    } as typeof en;

    const actual = getServiceName(translations, isDivorce);

    expect(actual).toBe(expected);
  });

  test.each([
    [true, Gender.MALE, Gender.FEMALE],
    [true, Gender.FEMALE, Gender.MALE],
    [true, 'other', undefined],
    [false, Gender.FEMALE, Gender.FEMALE],
  ])('should return selectedGender', (isApplicant2, gender, expected) => {
    const userCase = {
      sameSex: Checkbox.Unchecked,
      gender,
    } as Partial<CaseWithId>;

    const selectedGender = getSelectedGender(userCase, isApplicant2);

    expect(selectedGender).toBe(expected);
  });

  test.each([
    [false, Gender.MALE, 'civil partner'],
    [true, Gender.FEMALE, 'wife'],
    [true, Gender.MALE, 'husband'],
    [true, undefined, 'spouse'],
  ])('should return partner', (isDivorce, selectedGender, expected) => {
    const translations = {
      partner: 'spouse',
      civilPartner: 'civil partner',
      husband: 'husband',
      wife: 'wife',
    } as typeof en;

    const partner = getPartner(translations, selectedGender, isDivorce);

    expect(partner).toBe(expected);
  });

  test.each([
    [Checkbox.Checked, 'husband', 'husband'],
    [Checkbox.Unchecked, 'wife', 'husband'],
    [Checkbox.Unchecked, 'civil partner', 'civil partner'],
    [Checkbox.Checked, 'civil partner', 'civil partner'],
  ])('should return partner', (sameSex, partner, expected) => {
    const content = {
      husband: 'husband',
      wife: 'wife',
      civilPartner: 'civil partner',
      userCase: {},
    } as CommonContent;

    content.userCase.sameSex = sameSex;
    content.partner = partner;

    const applicant1Partner = getApplicant1PartnerContent(content);
    expect(applicant1Partner).toBe(expected);
  });

  test.each([
    ['applicant1' as const, '', { applicant1Address1: 'Buckingham Palace', applicant1AddressPostcode: 'SW1A 1AA' }],
    [
      'applicant1' as const,
      'Solicitor',
      {
        applicant1SolicitorAddress: 'solicitor address',
        applicant1SolicitorAddress1: 'Petty France',
        applicant1SolicitorAddressPostcode: 'NW1 1PH',
      },
    ],
    ['applicant2' as const, '', { applicant2Address1: 'Aldgate Tower', applicant2AddressPostcode: 'WC1E 7JE' }],
    [
      'applicant2' as const,
      'Solicitor',
      {
        applicant2SolicitorAddress: 'solicitor address',
        applicant2SolicitorAddress1: 'Leadenhal street',
        applicant2SolicitorAddressPostcode: 'SE1 1AA',
      },
    ],
  ])('should return applicant address fields', (applicant, solPrefix, userCase) => {
    const addressFields = getAppSolAddressFields(applicant, userCase);

    expect(addressFields).toContain(userCase[`${applicant}${solPrefix}Address1`]);
    expect(addressFields).toContain(userCase[`${applicant}${solPrefix}AddressPostcode`]);
  });

  test('should format caseId', () => {
    const caseId = '1111222233334444';

    const actual = formattedCaseId(caseId);

    expect(actual).toEqual('1111-2222-3333-4444');
  });
});
