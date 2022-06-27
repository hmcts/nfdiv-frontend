import { completeCase } from '../../../../test/functional/fixtures/completeCase';
import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox, UploadedFile } from '../../../app/case/case';
import { DivorceDocument } from '../../../app/case/definition';

import ProvideInformationToTheCourtGetController from './get';

describe('ProvideInformationToTheCourtGetController', () => {
  const controller = new ProvideInformationToTheCourtGetController();

  test('Should reset clarification fields', async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.session.userCase = {
      ...req.session.userCase,
      ...completeCase,
      coClarificationResponses: 'test',
      coCannotUploadClarificationDocuments: Checkbox.Checked,
      coClarificationUploadDocuments: [{ id: '1', value: { documentFileName: 'filename' } as DivorceDocument }],
      coClarificationUploadedFiles: [{ id: '1', name: 'test' } as UploadedFile],
    };

    await controller.get(req, res);

    const fieldsToResetTest = [
      'coClarificationResponses',
      'coCannotUploadClarificationDocuments',
      'coClarificationUploadDocuments',
      'coClarificationUploadedFiles',
    ];

    for (const field of fieldsToResetTest) {
      expect(req.session.userCase[field]).toEqual(undefined);
    }
  });
});
