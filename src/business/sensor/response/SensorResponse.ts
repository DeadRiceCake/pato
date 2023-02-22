import { ResponseBody } from '../../../common/response/Response';
import { RESPONSE_DESCRIPTION } from '../../../config/Description';
import { RESPONSE_STATUS } from '../../../config/Status';

export class CreateSensorDataResponse extends ResponseBody<unknown> {
  constructor() {
    super(RESPONSE_STATUS.SUCCESS.CREATED, RESPONSE_DESCRIPTION.SUCCESS.CREATED);
  }
}
