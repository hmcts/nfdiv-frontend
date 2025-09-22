import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CITIZEN_UPDATE, InterimApplicationType } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';

import SearchGovRecordsPostController from './post';

describe('SearchGovRecordsPostController', () => {
  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  it('Set search government records general application type', async () => {
    const body = {};

    const expectedBody = {
      applicant1InterimApplicationType: InterimApplicationType.SEARCH_GOV_RECORDS,
    };

    const searchGovRecordsPostController = new SearchGovRecordsPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await searchGovRecordsPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_UPDATE);
  });
});
