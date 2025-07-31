import { completeCase } from '../../../../../../test/functional/fixtures/completeCase';
import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CaseWithId } from '../../../../../app/case/case';
import { CITIZEN_UPDATE, SearchGovRecordsWhichDepartment } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';

import SearchGovWhichDepartmentPostController from './post';

describe('ChangesToYourNamePostController', () => {
  let userCase: Partial<CaseWithId>;
  beforeEach(() => {
    userCase = { id: '1234', ...completeCase };
  });

  const mockFormContent = {
    fields: {
      applicant1InterimAppsSearchGovRecordsWhichDepartments: {},
      applicant1InterimAppsSearchGovRecordsOtherEnterName: {},
      applicant1InterimAppsSearchGovRecordsWhyTheseDepartments: {},
    },
  } as unknown as FormContent;

  it('Happy path - no old fields', async () => {
    const body = {};

    const searchGovWhichDepartmentPostController = new SearchGovWhichDepartmentPostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { userCase } });
    const res = mockResponse();
    await searchGovWhichDepartmentPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE);
  });

  it('Reset old fields if needed', async () => {
    userCase.applicant1InterimAppsSearchGovRecordsWhichDepartments = [
      SearchGovRecordsWhichDepartment.DWP,
      SearchGovRecordsWhichDepartment.HMRC,
    ];

    const body = {
      applicant1InterimAppsSearchGovRecordsWhichDepartments: [
        SearchGovRecordsWhichDepartment.DWP,
        SearchGovRecordsWhichDepartment.HMRC,
      ],
      applicant1InterimAppsSearchGovRecordsOtherEnterName: 'some other name',
      applicant1InterimAppsSearchGovRecordsWhyTheseDepartments: 'some reason',
    };

    const searchGovWhichDepartmentPostController = new SearchGovWhichDepartmentPostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { userCase } });
    const res = mockResponse();
    await searchGovWhichDepartmentPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        applicant1InterimAppsSearchGovRecordsWhichDepartments: [],
        applicant1InterimAppsSearchGovRecordsOtherEnterName: '',
        applicant1InterimAppsSearchGovRecordsWhyTheseDepartments: '',
      },
      CITIZEN_UPDATE
    );
  });
});
