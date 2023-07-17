import { completeCase } from '../../../../test/functional/fixtures/completeCase';
import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CaseWithId, Checkbox } from '../../../app/case/case';
import { CITIZEN_UPDATE, ChangedNameHow } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import ChangesToYourNamePostController from './post';

describe('ChangesToYourNamePostController', () => {
  let userCase: Partial<CaseWithId>;
  beforeEach(() => {
    userCase = { id: '1234', ...completeCase };
  });

  const mockFormContent = {
    fields: {
      applicant1LastNameChangedWhenMarried: {},
      applicant1LastNameChangedWhenMarriedMethod: {},
      applicant1LastNameChangedWhenMarriedOtherDetails: {},
      applicant1NameDifferentToMarriageCertificate: {},
      applicant1NameDifferentToMarriageCertificateMethod: {},
      applicant1NameDifferentToMarriageCertificateOtherDetails: {},
    },
  } as unknown as FormContent;

  it('Happy path - no old fields', async () => {
    const body = {
      applicant1LastNameChangedWhenMarried: Checkbox.Checked,
      applicant1LastNameChangedWhenMarriedMethod: [ChangedNameHow.DEED_POLL],
      applicant1NameDifferentToMarriageCertificate: Checkbox.Checked,
      applicant1NameDifferentToMarriageCertificateMethod: [ChangedNameHow.OTHER],
      applicant1NameDifferentToMarriageCertificateOtherDetails: 'test details',
    };

    const changesToYourNamePostController = new ChangesToYourNamePostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { userCase } });
    const res = mockResponse();
    await changesToYourNamePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE);
  });

  it('Reset old fields if needed', async () => {
    userCase.applicant1NameChangedHow = [ChangedNameHow.DEED_POLL];

    const body = {
      applicant1LastNameChangedWhenMarried: Checkbox.Checked,
      applicant1LastNameChangedWhenMarriedMethod: [ChangedNameHow.DEED_POLL],
      applicant1NameDifferentToMarriageCertificate: Checkbox.Checked,
      applicant1NameDifferentToMarriageCertificateMethod: [ChangedNameHow.OTHER],
      applicant1NameDifferentToMarriageCertificateOtherDetails: 'test details',
    };

    const changesToYourNamePostController = new ChangesToYourNamePostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { userCase } });
    const res = mockResponse();
    await changesToYourNamePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { applicant1NameChangedHow: [], applicant1NameChangedHowOtherDetails: '', ...body },
      CITIZEN_UPDATE
    );
  });
});
