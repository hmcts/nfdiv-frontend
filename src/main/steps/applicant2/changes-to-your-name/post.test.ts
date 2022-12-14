import { completeCase } from '../../../../test/functional/fixtures/completeCase';
import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CaseWithId, Checkbox } from '../../../app/case/case';
import { CITIZEN_UPDATE, ChangedNameHow } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import ChangesToYourNamePostController from './post';

describe('Applicant2ChangesToYourNamePostController', () => {
  let userCase: Partial<CaseWithId>;
  beforeEach(() => {
    userCase = { id: '1234', ...completeCase };
  });

  const mockFormContent = {
    fields: {
      applicant2LastNameChangedWhenMarried: {},
      applicant2LastNameChangedWhenMarriedMethod: {},
      applicant2LastNameChangedWhenMarriedOtherDetails: {},
      applicant2NameDifferentToMarriageCertificate: {},
      applicant2NameDifferentToMarriageCertificateMethod: {},
      applicant2NameDifferentToMarriageCertificateOtherDetails: {},
    },
  } as unknown as FormContent;

  it('Happy path - no old fields', async () => {
    const body = {
      applicant2LastNameChangedWhenMarried: Checkbox.Checked,
      applicant2LastNameChangedWhenMarriedMethod: [ChangedNameHow.DEED_POLL],
      applicant2NameDifferentToMarriageCertificate: Checkbox.Checked,
      applicant2NameDifferentToMarriageCertificateMethod: [ChangedNameHow.OTHER],
      applicant2NameDifferentToMarriageCertificateOtherDetails: 'test details',
    };

    const changesToYourNamePostController = new ChangesToYourNamePostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { userCase } });
    const res = mockResponse();
    await changesToYourNamePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE);
  });

  it('Reset old fields if needed', async () => {
    userCase.applicant2NameChangedHow = [ChangedNameHow.DEED_POLL];

    const body = {
      applicant2LastNameChangedWhenMarried: Checkbox.Checked,
      applicant2LastNameChangedWhenMarriedMethod: [ChangedNameHow.DEED_POLL],
      applicant2NameDifferentToMarriageCertificate: Checkbox.Checked,
      applicant2NameDifferentToMarriageCertificateMethod: [ChangedNameHow.OTHER],
      applicant2NameDifferentToMarriageCertificateOtherDetails: 'test details',
    };

    const changesToYourNamePostController = new ChangesToYourNamePostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { userCase } });
    const res = mockResponse();
    await changesToYourNamePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { applicant2NameChangedHow: [], applicant2NameChangedHowOtherDetails: '', ...body },
      CITIZEN_UPDATE
    );
  });
});
