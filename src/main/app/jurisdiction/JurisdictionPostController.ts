import autobind from 'autobind-decorator';
import { Response } from 'express';

import { stepsWithContentApplicant1 } from '../../steps';
import { JURISDICTION_INTERSTITIAL_URL } from '../../steps/urls';
import { getAllPossibleAnswersForPath } from '../case/answers/possibleAnswers';
import { Case, CaseWithId } from '../case/case';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject, PostController } from '../controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../form/Form';

import { addConnectionsBasedOnQuestions } from './connections';

@autobind
export class JurisdictionPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(<FormFields>this.fields);

    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    if (req.url === JURISDICTION_INTERSTITIAL_URL && formData.connections) {
      req.body.connections = addConnectionsBasedOnQuestions({ ...req.session.userCase, ...formData }).concat(
        formData.connections
      );
    } else {
      req.body.connections = addConnectionsBasedOnQuestions({ ...req.session.userCase, ...formData });
    }

    await super.post(req, res);
  }

  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    const unreachableAnswersAsNull = getJurisdictionUnreachableAnswersAsNull(req.session.userCase);
    const dataToSave = {
      ...unreachableAnswersAsNull,
      ...formData,
    };

    return req.locals.api.triggerEvent(req.session.userCase.id, dataToSave, eventName);
  }
}

const getJurisdictionUnreachableAnswersAsNull = (userCase: Partial<Case>) => {
  const jurisdictionFields = [
    'applicant1DomicileInEnglandWales',
    'applicant2DomicileInEnglandWales',
    'bothLastHabituallyResident',
    'applicant1LivingInEnglandWalesTwelveMonths',
    'applicant1LivingInEnglandWalesSixMonths',
    'jurisdictionResidualEligible',
  ];

  const possibleAnswers = getAllPossibleAnswersForPath(userCase, stepsWithContentApplicant1);
  for (const field of jurisdictionFields) {
    if (!possibleAnswers.includes(field)) {
      userCase[field] = null;
    }
  }

  return userCase;
};
