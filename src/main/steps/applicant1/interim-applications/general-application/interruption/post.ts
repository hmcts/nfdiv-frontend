import autobind from 'autobind-decorator';

import { InterimApplicationType } from '../../../../../app/case/definition';
import { AnyObject } from '../../../../../app/controller/PostController';
import StartInterimApplicationPostController from '../../common/start-interim-application/post';

@autobind
export default class DigitisedGeneralApplicationPostController extends StartInterimApplicationPostController<AnyObject> {
  protected interimApplicationType(): InterimApplicationType {
    return InterimApplicationType.DIGITISED_GENERAL_APPLICATION_D11;
  }
}
