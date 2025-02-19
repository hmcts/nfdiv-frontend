import { jointApplicant2CompleteCase } from '../../../test/functional/fixtures/jointApplicant2CompleteCase';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../app/case/case';
import { ApplicationType, DivorceOrDissolution, State, YesOrNo } from '../../app/case/definition';
import {
  APPLICANT_2,
  APPLICATION_ENDED,
  APPLICATION_SUBMITTED,
  APP_REPRESENTED,
  AWAITING_RESPONSE_TO_HWF_DECISION,
  CHECK_ANSWERS_URL,
  CHECK_CONDITIONAL_ORDER_ANSWERS_URL,
  CHECK_JOINT_APPLICATION,
  CONFIRM_JOINT_APPLICATION,
  CONTINUE_WITH_YOUR_APPLICATION,
  HOW_DO_YOU_WANT_TO_RESPOND,
  HUB_PAGE,
  JOINT_APPLICATION_SUBMITTED,
  PAY_AND_SUBMIT,
  PAY_YOUR_FEE,
  READ_THE_RESPONSE,
  RESPONDENT,
  SENT_TO_APPLICANT2_FOR_REVIEW,
  YOUR_DETAILS_URL,
  YOUR_SPOUSE_NEEDS_TO_CONFIRM_YOUR_JOINT_APPLICATION,
  YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
} from '../urls';

import { HomeGetController } from './get';

describe('HomeGetController', () => {
  const controller = new HomeGetController();

  test('redirects to the first question for new users', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          state: State.Draft,
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          mockQuestion: 'mockExistingAnswer',
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(YOUR_DETAILS_URL);
  });

  test('redirects to the check your answers page for existing users', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          state: State.Draft,
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          gender: 'male',
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(CHECK_ANSWERS_URL);
  });

  test('throws an error if the user switches service type', () => {
    const req = mockRequest();
    const res = mockResponse({
      locals: { serviceType: DivorceOrDissolution.DISSOLUTION },
    });

    expect(() => controller.get(req, res)).toThrow(new Error('Invalid case type'));
  });

  test("redirects to applicant 2's first question for new applicant 2 users", () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          mockQuestion: 'mockExistingAnswer',
        },
        isApplicant2: true,
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${APPLICANT_2}${YOU_NEED_TO_REVIEW_YOUR_APPLICATION}`);
  });

  test("redirects to applicant 2's check your answers page if first question has been answered", () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicant2ScreenHasUnionBroken: YesOrNo.YES,
        },
        isApplicant2: true,
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${APPLICANT_2}${CHECK_ANSWERS_URL}`);
  });

  test('redirects to the check your joint application page for applicant 2 users if last question has been answered', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.AwaitingApplicant2Response,
          ...jointApplicant2CompleteCase,
          applicant2WhoIsFinancialOrderFor: [],
        },
        isApplicant2: true,
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${APPLICANT_2}${CHECK_JOINT_APPLICATION}`);
  });

  test('redirects to your spouse needs to confirm page for applicant 2 users in applicant2Approved state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.Applicant2Approved,
        },
        isApplicant2: true,
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${APPLICANT_2}${YOUR_SPOUSE_NEEDS_TO_CONFIRM_YOUR_JOINT_APPLICATION}`);
  });

  test('redirects to the hub page for applicant 2 users in holding state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.Holding,
        },
        isApplicant2: true,
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${APPLICANT_2}${HUB_PAGE}`);
  });

  test('redirects to hub page for applicant 2 users in ConditionalOrderPronounced state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.ConditionalOrderPronounced,
        },
        isApplicant2: true,
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${APPLICANT_2}${HUB_PAGE}`);
  });

  test('redirects to hub page for applicant 2 users in ConditionalOrderDrafted state if not applicant2ApplyForConditionalOrderStarted', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          applicant2ApplyForConditionalOrderStarted: null,
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.ConditionalOrderDrafted,
        },
        isApplicant2: true,
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${APPLICANT_2}${HUB_PAGE}`);
  });

  test('redirects to first conditional order page for applicant 2 users in ConditionalOrderDrafted state if applicant2ApplyForConditionalOrderStarted', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          applicant2ApplyForConditionalOrderStarted: YesOrNo.YES,
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.ConditionalOrderDrafted,
        },
        isApplicant2: true,
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${APPLICANT_2}${CONTINUE_WITH_YOUR_APPLICATION}`);
  });

  test('redirects to hub page for applicant 2 users in ConditionalOrderPending state if not applicant2ApplyForConditionalOrderStarted', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          applicant2ApplyForConditionalOrderStarted: null,
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.ConditionalOrderPending,
        },
        isApplicant2: true,
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${APPLICANT_2}${HUB_PAGE}`);
  });

  test('redirects to first conditional order page for applicant 2 users in ConditionalOrderPending state if applicant2ApplyForConditionalOrderStarted', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          applicant2ApplyForConditionalOrderStarted: YesOrNo.YES,
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.ConditionalOrderPending,
        },
        isApplicant2: true,
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${APPLICANT_2}${CONTINUE_WITH_YOUR_APPLICATION}`);
  });

  test('redirects to Check conditional order answers for applicant 2 in ConditionalOrderPending state if applicant2ApplyForConditionalOrder', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          applicant2ApplyForConditionalOrder: YesOrNo.YES,
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.ConditionalOrderPending,
        },
        isApplicant2: true,
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${APPLICANT_2}${CHECK_CONDITIONAL_ORDER_ANSWERS_URL}`);
  });

  test('redirects to hub page for applicant 1 users in ConditionalOrderDrafted state if not applicant1ApplyForConditionalOrderStarted', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          applicant1ApplyForConditionalOrderStarted: null,
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.ConditionalOrderDrafted,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(HUB_PAGE);
  });

  test('redirects to first conditional order page for applicant 1 users in ConditionalOrderDrafted state if applicant1ApplyForConditionalOrderStarted', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          applicant1ApplyForConditionalOrderStarted: YesOrNo.YES,
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.ConditionalOrderDrafted,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(CONTINUE_WITH_YOUR_APPLICATION);
  });

  test('redirects to hub page for applicant 1 users in ConditionalOrderPronounced state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.ConditionalOrderPronounced,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(HUB_PAGE);
  });

  test('redirects to Read the response page for sole application in ConditionalOrderDrafted state if first question not answered', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          applicant1ApplyForConditionalOrderStarted: YesOrNo.YES,
          dateAosSubmitted: '2021-05-10',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicationType: ApplicationType.SOLE_APPLICATION,
          state: State.ConditionalOrderDrafted,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(READ_THE_RESPONSE);
  });

  test('redirects to Check conditional order answers page for joint application in ConditionalOrderDrafted state if first question answered', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          applicant1ApplyForConditionalOrderStarted: YesOrNo.YES,
          applicant1ApplyForConditionalOrder: YesOrNo.YES,
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicationType: ApplicationType.JOINT_APPLICATION,
          state: State.ConditionalOrderDrafted,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(CHECK_CONDITIONAL_ORDER_ANSWERS_URL);
  });

  test('redirects to CO CYA page for sole application in ConditionalOrderDrafted state if first question answered', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          applicant1ApplyForConditionalOrderStarted: YesOrNo.YES,
          applicant1ApplyForConditionalOrder: YesOrNo.YES,
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicationType: ApplicationType.SOLE_APPLICATION,
          state: State.ConditionalOrderDrafted,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(CHECK_CONDITIONAL_ORDER_ANSWERS_URL);
  });

  test('redirects to hub page for applicant 1 users in ConditionalOrderPending state if not applicant1ApplyForConditionalOrderStarted', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          applicant1ApplyForConditionalOrderStarted: null,
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.ConditionalOrderPending,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(HUB_PAGE);
  });

  test('redirects to first conditional order page for applicant 1 users in ConditionalOrderPending state if applicant1ApplyForConditionalOrderStarted', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          applicant1ApplyForConditionalOrderStarted: YesOrNo.YES,
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.ConditionalOrderPending,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(CONTINUE_WITH_YOUR_APPLICATION);
  });

  test('redirects to Read the response page for sole application in ConditionalOrderPending state if first question not answered', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          applicant1ApplyForConditionalOrderStarted: YesOrNo.YES,
          dateAosSubmitted: '2021-05-10',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicationType: ApplicationType.SOLE_APPLICATION,
          state: State.ConditionalOrderPending,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(READ_THE_RESPONSE);
  });

  test('redirects to CO CYA page for sole application in ConditionalOrderPending state if first question answered', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          applicant1ApplyForConditionalOrderStarted: YesOrNo.YES,
          applicant1ApplyForConditionalOrder: YesOrNo.YES,
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicationType: ApplicationType.SOLE_APPLICATION,
          state: State.ConditionalOrderPending,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(CHECK_CONDITIONAL_ORDER_ANSWERS_URL);
  });

  test('redirects to hub page page for ConditionalOrderPending state if coApplicant1StatementOfTruth', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          coApplicant1StatementOfTruth: YesOrNo.YES,
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicationType: ApplicationType.JOINT_APPLICATION,
          state: State.ConditionalOrderPending,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(HUB_PAGE);
  });

  test('redirects to hub page for applicant2 users for ConditionalOrderPending state if coApplicant2StatementOfTruth', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          coApplicant2StatementOfTruth: YesOrNo.YES,
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicationType: ApplicationType.JOINT_APPLICATION,
          state: State.ConditionalOrderPending,
        },
        isApplicant2: true,
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${APPLICANT_2}${HUB_PAGE}`);
  });

  test('redirects to application ended page for applicant 1 users if applicant2ScreenHasUnionBroken is No', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          applicant2ScreenHasUnionBroken: YesOrNo.NO,
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.AwaitingApplicant1Response,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(APPLICATION_ENDED);
  });

  test('redirects to application sent for review page for applicant 1 users in awaitingApplicant2 state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.AwaitingApplicant2Response,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(SENT_TO_APPLICANT2_FOR_REVIEW);
  });

  test('redirects to confirmation page for applicant 1 users in applicant2Approved state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.Applicant2Approved,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(CONFIRM_JOINT_APPLICATION);
  });

  test('redirects to the pay your fee page for applicant 1 users for sole application in awaitingPayment state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicationType: ApplicationType.SOLE_APPLICATION,
          state: State.AwaitingPayment,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(PAY_YOUR_FEE);
  });

  test('redirects to the pay and submit page for applicant 1 users for joint application in awaitingPayment state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicationType: ApplicationType.JOINT_APPLICATION,
          state: State.AwaitingPayment,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(PAY_AND_SUBMIT);
  });

  test('redirects to application submitted page for applicant 1 users in submitted state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.Submitted,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(APPLICATION_SUBMITTED);
  });

  test('redirects to application represented page for applicant 1 users in submitted state when represented', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.Submitted,
          applicant1SolicitorRepresented: YesOrNo.YES,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(APP_REPRESENTED);
  });

  test('redirects to application represented page for applicant 2 users in post submission state when represented', () => {
    const req = mockRequest({
      session: {
        isApplicant2: true,
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.ConditionalOrderDrafted,
          applicant2SolicitorRepresented: YesOrNo.YES,
          confirmReadPetition: Checkbox.Checked,
          disputeApplication: YesOrNo.NO,
          applicationType: JOINT_APPLICATION_SUBMITTED,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${APPLICANT_2}${APP_REPRESENTED}`);
  });

  test('redirects to application submitted page for applicant 2 users in post submission when only applicant 1 represented', () => {
    const req = mockRequest({
      session: {
        isApplicant2: true,
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          isApplicant2: true,
          applicationType: ApplicationType.JOINT_APPLICATION,
          applicant1SolicitorRepresented: YesOrNo.YES,
          confirmReadPetition: Checkbox.Checked,
          disputeApplication: YesOrNo.NO,
          jurisdictionAgree: YesOrNo.YES,
          reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: '',
          inWhichCountryIsYourLifeMainlyBased: '',
          applicant2LegalProceedings: YesOrNo.NO,
          applicant2AgreeToReceiveEmails: Checkbox.Checked,
          applicant2PhoneNumber: '',
          applicant2StatementOfTruth: Checkbox.Checked,
          state: State.AwaitingPronouncement,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);
    expect(res.redirect).toHaveBeenCalledWith(`${APPLICANT_2}${HUB_PAGE}`);
  });

  test('redirects to the check your answers page for applicant 1 users in awaitingApplicant1Response state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.AwaitingApplicant1Response,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(CHECK_ANSWERS_URL);
  });

  test('redirects to the hub page for applicant 1 users in Holding state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.Holding,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(HUB_PAGE);
  });

  test('redirects to the hub page for applicant 1 users in ConditionalOrderPronounced state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.ConditionalOrderPronounced,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(HUB_PAGE);
  });

  test('redirects to the hub page for applicant 1 users in AwaitingPronouncement state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.AwaitingPronouncement,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(HUB_PAGE);
  });

  test('redirects to the hub page for respondent users in AwaitingPronouncement state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicationType: ApplicationType.SOLE_APPLICATION,
          state: State.AwaitingPronouncement,
        },
        isApplicant2: true,
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${RESPONDENT}${HUB_PAGE}`);
  });

  test('redirects to the hub page for applicant 2 users in AwaitingPronouncement state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicationType: ApplicationType.JOINT_APPLICATION,
          state: State.AwaitingPronouncement,
        },
        isApplicant2: true,
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${APPLICANT_2}${HUB_PAGE}`);
  });

  test('redirects to the hub page for applicant 2 users in AwaitingLegalAdvisorReferral state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicationType: ApplicationType.JOINT_APPLICATION,
          state: State.AwaitingLegalAdvisorReferral,
        },
        isApplicant2: true,
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${APPLICANT_2}${HUB_PAGE}`);
  });

  test('redirects to the check your answers page for respondent users in AosDrafted state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicationType: ApplicationType.SOLE_APPLICATION,
          disputeApplication: YesOrNo.NO,
          state: State.AosDrafted,
        },
        isApplicant2: true,
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${RESPONDENT}${CHECK_ANSWERS_URL}`);
  });

  test('redirects to the hub page for respondent users in holding state and aos is completed', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicationType: ApplicationType.SOLE_APPLICATION,
          state: State.Holding,
          confirmReadPetition: Checkbox.Checked,
          disputeApplication: YesOrNo.NO,
          jurisdictionAgree: YesOrNo.YES,
          reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: '',
          inWhichCountryIsYourLifeMainlyBased: '',
          applicant2LegalProceedings: YesOrNo.NO,
          applicant2AgreeToReceiveEmails: Checkbox.Checked,
          applicant2PhoneNumber: '',
          applicant2StatementOfTruth: Checkbox.Checked,
        },
        isApplicant2: true,
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${RESPONDENT}${HUB_PAGE}`);
  });

  test('redirects to the hub page for respondent users in holding state and aos is not started', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicationType: ApplicationType.SOLE_APPLICATION,
          state: State.Holding,
        },
        isApplicant2: true,
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${RESPONDENT}${HUB_PAGE}`);
  });

  test('redirects to the CYA for respondent users in holding state and aos is started but the first question is complete', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicationType: ApplicationType.SOLE_APPLICATION,
          state: State.Holding,
          confirmReadPetition: Checkbox.Checked,
          disputeApplication: YesOrNo.NO,
        },
        isApplicant2: true,
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${RESPONDENT}${CHECK_ANSWERS_URL}`);
  });

  test('redirects to the how do you want to respond page for respondent users in holding state and aos is started but the first question is not complete', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicationType: ApplicationType.SOLE_APPLICATION,
          state: State.Holding,
          confirmReadPetition: Checkbox.Checked,
        },
        isApplicant2: true,
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${RESPONDENT}${HOW_DO_YOU_WANT_TO_RESPOND}`);
  });

  test('redirects to the how do you want to respond page for respondent users if first question not complete', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicationType: ApplicationType.SOLE_APPLICATION,
          state: State.AosDrafted,
        },
        isApplicant2: true,
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${RESPONDENT}${HOW_DO_YOU_WANT_TO_RESPOND}`);
  });

  test('redirects to your-details page if no userCase in the session', () => {
    const req = mockRequest({
      session: {
        userCase: false,
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(YOUR_DETAILS_URL);
  });

  test('redirects to submitted page for applicant 1 users in submitted state when not represented', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.Submitted,
          applicant1SolicitorRepresented: YesOrNo.NO,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(APPLICATION_SUBMITTED);
  });

  test('redirects to submitted page for applicant 1 users in awaiting HWF decision state when not represented', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.AwaitingHWFDecision,
          applicant1SolicitorRepresented: YesOrNo.NO,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(APPLICATION_SUBMITTED);
  });

  test('redirects to submitted page for applicant 1 users in awaiting documents state when not represented', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.AwaitingDocuments,
          applicant1SolicitorRepresented: YesOrNo.NO,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(APPLICATION_SUBMITTED);
  });

  test('redirects to hub page for applicant 2 users in submitted state when not represented', () => {
    const req = mockRequest({
      session: {
        isApplicant2: true,
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.Submitted,
          applicant2SolicitorRepresented: YesOrNo.NO,
          applicationType: ApplicationType.JOINT_APPLICATION,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(APPLICANT_2 + HUB_PAGE);
  });

  test('redirects to hub page for applicant 2 users in awaiting HWF Decision state when not represented', () => {
    const req = mockRequest({
      session: {
        isApplicant2: true,
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.AwaitingHWFDecision,
          applicant2SolicitorRepresented: YesOrNo.NO,
          applicationType: ApplicationType.JOINT_APPLICATION,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(APPLICANT_2 + HUB_PAGE);
  });

  test('redirects to hub page for applicant 2 users in Awaiting Documents state when not represented', () => {
    const req = mockRequest({
      session: {
        isApplicant2: true,
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.AwaitingDocuments,
          applicant2SolicitorRepresented: YesOrNo.NO,
          applicationType: ApplicationType.JOINT_APPLICATION,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(APPLICANT_2 + HUB_PAGE);
  });

  test('redirects to represented page for applicant 1 users in submitted state when represented', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.Submitted,
          applicant1SolicitorRepresented: YesOrNo.YES,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(APP_REPRESENTED);
  });
  test('redirects to hub page for applicant 2 users in post submission state when not represented', () => {
    const req = mockRequest({
      session: {
        isApplicant2: true,
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.ConditionalOrderDrafted,
          applicant2SolicitorRepresented: YesOrNo.NO,
          confirmReadPetition: Checkbox.Checked,
          disputeApplication: YesOrNo.NO,
          applicationType: JOINT_APPLICATION_SUBMITTED,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${APPLICANT_2}${HUB_PAGE}`);
  });
  test('redirects to represented page for applicant 2 users in post submission state when represented', () => {
    const req = mockRequest({
      session: {
        isApplicant2: true,
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.ConditionalOrderDrafted,
          applicant2SolicitorRepresented: YesOrNo.YES,
          confirmReadPetition: Checkbox.Checked,
          disputeApplication: YesOrNo.NO,
          applicationType: JOINT_APPLICATION_SUBMITTED,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${APPLICANT_2}${APP_REPRESENTED}`);
  });
  test('redirects to hub page for applicant 1 users when coApplicant1SubmittedDate is present and not represented', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.ConditionalOrderPending,
          applicant1SolicitorRepresented: YesOrNo.NO,
          coApplicant1SubmittedDate: '2022-01-01',
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(HUB_PAGE);
  });
  test('redirects to hub page for applicant 2 users when coApplicant2SubmittedDate is present and not represented', () => {
    const req = mockRequest({
      session: {
        isApplicant2: true,
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.ConditionalOrderPending,
          applicant2SolicitorRepresented: YesOrNo.NO,
          coApplicant1SubmittedDate: '2022-01-01',
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${APPLICANT_2}${HUB_PAGE}`);
  });
  test('redirects to represented page for applicant 2 users when coApplicant2SubmittedDate is present and represented', () => {
    const req = mockRequest({
      session: {
        isApplicant2: true,
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.ConditionalOrderPending,
          applicant2SolicitorRepresented: YesOrNo.YES,
          coApplicant2SubmittedDate: '2022-01-01',
          applicationType: ApplicationType.JOINT_APPLICATION,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${APPLICANT_2}${APP_REPRESENTED}`);
  });

  test('redirects to hub page for applicant 1 users when coApplicant1SubmittedDate is present and represented', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.ConditionalOrderPending,
          coApplicant1SubmittedDate: '2022-01-01',
          applicant1SolicitorRepresented: YesOrNo.YES,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(APP_REPRESENTED);
  });

  test('redirects applicant 2 to spouse needs to confirm application page if joint application awaiting payment', () => {
    const req = mockRequest({
      session: {
        isApplicant2: true,
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.AwaitingPayment,
          applicationType: ApplicationType.JOINT_APPLICATION,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(APPLICANT_2 + YOUR_SPOUSE_NEEDS_TO_CONFIRM_YOUR_JOINT_APPLICATION);
  });

  test('redirects applicant 2 to awaiting response to hwf decision page if joint application awaiting response to hwf decision', () => {
    const req = mockRequest({
      session: {
        isApplicant2: true,
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.AwaitingResponseToHWFDecision,
          applicationType: ApplicationType.JOINT_APPLICATION,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(APPLICANT_2 + AWAITING_RESPONSE_TO_HWF_DECISION);
  });

  test('redirects to pay and submit page for applicant 1 if joint application awaiting response to hwf decision', () => {
    const req = mockRequest({
      session: {
        isApplicant2: false,
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.AwaitingResponseToHWFDecision,
          applicationType: ApplicationType.JOINT_APPLICATION,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(PAY_AND_SUBMIT);
  });

  test('redirects to pay your fee page for applicant 1 if sole application awaiting response to hwf decision', () => {
    const req = mockRequest({
      session: {
        isApplicant2: false,
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.AwaitingResponseToHWFDecision,
          applicationType: ApplicationType.SOLE_APPLICATION,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(PAY_YOUR_FEE);
  });
});
