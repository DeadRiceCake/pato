import { RESPONSE_DESCRIPTION } from '../../config/Description';
import { RESPONSE_STATUS } from '../../config/Status';
import { RESPONSE_CODE } from '../../config/StatusCode';
import { CustomError } from './CustomError';

export class NoContentException extends CustomError<[]> {
  constructor() {
    super(RESPONSE_CODE.SUCCESS.OK, RESPONSE_STATUS.SUCCESS.NO_CONTENT, RESPONSE_DESCRIPTION.SUCCESS.NO_CONTENT, []);
  }
}
