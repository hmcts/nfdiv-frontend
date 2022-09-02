import { CaseWithId, Checkbox } from '../../app/case/case';
import {
  ApplicationType,
  ClarificationReason,
  Gender,
  LegalAdvisorDecision,
  ListValue,
  RefusalOption,
  RejectionReason,
  State,
  YesOrNo,
} from '../../app/case/definition';

import { CommonContent, en } from './common.content';
import {
  formattedCaseId,
  getAppSolAddressFields,
  getApplicant1PartnerContent,
  getName,
  getPartner,
  getSelectedGender,
  getServiceName,
  isApplicant2EmailUpdatePossible,
  latestLegalAdvisorDecisionContent,
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
    ['applicant1', 'First One Middle One Last One'],
    ['applicant2', 'First Two Middle Two Last Two'],
  ])('should return applicant name', (applicant, expected) => {
    const userCase = {
      applicant1FirstNames: 'First One',
      applicant1MiddleNames: 'Middle One',
      applicant1LastNames: 'Last One',
      applicant2FirstNames: 'First Two',
      applicant2MiddleNames: 'Middle Two',
      applicant2LastNames: 'Last Two',
    } as Partial<CaseWithId>;

    const actual = getName(userCase, applicant as 'applicant1' | 'applicant2');

    expect(actual).toBe(expected);
  });

  test.each([
    ['applicant1', 'First One Last One'],
    ['applicant2', 'First Two Last Two'],
  ])('should return applicant name even with undefined middle name', (applicant, expected) => {
    const userCase = {
      applicant1FirstNames: 'First One',
      applicant1LastNames: 'Last One',
      applicant2FirstNames: 'First Two',
      applicant2LastNames: 'Last Two',
    } as Partial<CaseWithId>;

    const actual = getName(userCase, applicant as 'applicant1' | 'applicant2');

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

  describe('test latestLegalAdvisorDecisionContent', () => {
    test('Undefined pastLegalAdvisorDecisions', () => {
      const userCase = {
        coLegalAdvisorDecisions: undefined,
      } as Partial<CaseWithId>;
      const expected = {
        latestRefusalClarificationAdditionalInfo: '',
        latestRefusalClarificationReasons: [],
      };
      const actual = latestLegalAdvisorDecisionContent(userCase, true);
      expect(actual).toEqual(expect.objectContaining(expected));
    });

    test('Defined pastLegalAdvisorDecisions', () => {
      const coLegalAdvisorDecisionsValue: ListValue<LegalAdvisorDecision>[] = [
        {
          id: '1',
          value: {
            granted: YesOrNo.NO,
            decisionDate: '2021-05-10',
            refusalDecision: RefusalOption.MORE_INFO,
            refusalClarificationReason: [ClarificationReason.JURISDICTION_DETAILS],
            refusalClarificationAdditionalInfo: 'Test refusalClarificationAdditionalInfo value',
            refusalAdminErrorInfo: 'Test refusalAdminErrorInfo value',
            refusalRejectionReason: [RejectionReason.OTHER],
            refusalRejectionAdditionalInfo: 'Test refusalRejectionAdditionalInfo value',
          },
        },
        {
          id: '2',
          value: {
            granted: YesOrNo.YES,
            decisionDate: '2021-09-11',
            refusalDecision: RefusalOption.MORE_INFO,
            refusalClarificationReason: [
              ClarificationReason.JURISDICTION_DETAILS,
              ClarificationReason.MARRIAGE_CERTIFICATE,
            ],
            refusalClarificationAdditionalInfo: 'Test refusalClarificationAdditionalInfo value 2',
            refusalAdminErrorInfo: 'Test refusalAdminErrorInfo value 2',
            refusalRejectionReason: [RejectionReason.OTHER],
            refusalRejectionAdditionalInfo: 'Test refusalRejectionAdditionalInfo value 2',
          },
        },
      ];
      const userCase = {
        coLegalAdvisorDecisions: coLegalAdvisorDecisionsValue,
      } as Partial<CaseWithId>;
      const expected = {
        latestRefusalClarificationAdditionalInfo: '"Test refusalClarificationAdditionalInfo value"',
        latestRefusalClarificationReasons: [ClarificationReason.JURISDICTION_DETAILS],
      };
      const actual = latestLegalAdvisorDecisionContent(userCase, true);
      expect(actual).toEqual(expect.objectContaining(expected));
    });
  });

  test('pastLegalAdvisorDecisions ClarificationReason.OTHER filter', () => {
    const coLegalAdvisorDecisionsValue: ListValue<LegalAdvisorDecision>[] = [
      {
        id: '1',
        value: {
          granted: YesOrNo.NO,
          decisionDate: '2021-05-10',
          refusalDecision: RefusalOption.MORE_INFO,
          refusalClarificationReason: [ClarificationReason.JURISDICTION_DETAILS, ClarificationReason.OTHER],
          refusalClarificationAdditionalInfo: 'Test refusalClarificationAdditionalInfo value',
          refusalAdminErrorInfo: 'Test refusalAdminErrorInfo value',
          refusalRejectionReason: [RejectionReason.OTHER],
          refusalRejectionAdditionalInfo: 'Test refusalRejectionAdditionalInfo value',
        },
      },
    ];
    const userCase = {
      coLegalAdvisorDecisions: coLegalAdvisorDecisionsValue,
    } as Partial<CaseWithId>;
    const expected = {
      latestRefusalClarificationAdditionalInfo: '"Test refusalClarificationAdditionalInfo value"',
      latestRefusalClarificationReasons: [ClarificationReason.JURISDICTION_DETAILS],
    };
    const actual = latestLegalAdvisorDecisionContent(userCase, true);
    expect(actual).toEqual(expect.objectContaining(expected));
  });

  test('condensed heading true', () => {
    const userCase = {
      coLegalAdvisorDecisions: undefined,
    } as Partial<CaseWithId>;
    const expected = {
      condensedHeading: true,
    };
    const actual = latestLegalAdvisorDecisionContent(userCase, true);
    expect(actual).toEqual(expect.objectContaining(expected));
  });

  test('condensed heading false', () => {
    const userCase = {
      coLegalAdvisorDecisions: undefined,
    } as Partial<CaseWithId>;
    const expected = {
      condensedHeading: false,
    };
    const actual = latestLegalAdvisorDecisionContent(userCase, false);
    expect(actual).toEqual(expect.objectContaining(expected));
  });

  describe('isApplicant2EmailUpdatePossible', () => {
    test('Return true condition', () => {
      const userCase = {
        state: State.AwaitingApplicant2Response,
        accessCode: 'HSKJ2983',
        applicationType: ApplicationType.JOINT_APPLICATION,
      } as Partial<CaseWithId>;
      const expected = true;
      const actual = isApplicant2EmailUpdatePossible(userCase);
      expect(actual).toEqual(expected);
    });

    test('Return false when state is not correct', () => {
      const userCase = {
        state: State.Submitted,
        accessCode: 'HSKJ2983',
        applicationType: ApplicationType.JOINT_APPLICATION,
      } as Partial<CaseWithId>;
      const expected = false;
      const actual = isApplicant2EmailUpdatePossible(userCase);
      expect(actual).toEqual(expected);
    });

    test('Return false when access code is not correct', () => {
      const userCase = {
        state: State.AwaitingApplicant2Response,
        accessCode: undefined,
        applicationType: ApplicationType.JOINT_APPLICATION,
      } as Partial<CaseWithId>;
      const expected = false;
      const actual = isApplicant2EmailUpdatePossible(userCase);
      expect(actual).toEqual(expected);
    });

    test('Return false when application type is not correct', () => {
      const userCase = {
        state: State.AwaitingApplicant2Response,
        accessCode: 'HSKJ2983',
        applicationType: ApplicationType.SOLE_APPLICATION,
      } as Partial<CaseWithId>;
      const expected = false;
      const actual = isApplicant2EmailUpdatePossible(userCase);
      expect(actual).toEqual(expected);
    });
  });
});
