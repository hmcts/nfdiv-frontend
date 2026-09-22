import { InterimApplicationType } from '../../../../../app/case/definition.js';
import { AnyObject } from '../../../../../app/controller/PostController.js';
import autobind from '../../../../../app/utils/autobind.js';
import StartInterimApplicationPostController from '../../common/start-interim-application/post.js';

@autobind
export default class SearchGovRecordsPostController extends StartInterimApplicationPostController<AnyObject> {
  protected interimApplicationType(): InterimApplicationType {
    return InterimApplicationType.SEARCH_GOV_RECORDS;
  }
}
