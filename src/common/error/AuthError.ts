import { RESPONSE_DESCRIPTION } from '../../config/Description';
import { RESPONSE_STATUS } from '../../config/Status';
import { RESPONSE_CODE } from '../../config/StatusCode';
import { CustomError } from './CustomError';

export class InvaildTokenError extends CustomError<string> {
  constructor(data?: string) {
    super(
      RESPONSE_CODE.CLIENT_ERROR.UNAUTHENTICATED,
      RESPONSE_STATUS.CLIENT_ERROR.UNAUTHENTICATED,
      RESPONSE_DESCRIPTION.CLIENT_ERROR.INVALID_TOKEN,
      data,
    );
  }
}

export class ExpiredTokenError extends CustomError<unknown> {
  constructor() {
    super(
      RESPONSE_CODE.CLIENT_ERROR.UNAUTHENTICATED,
      RESPONSE_STATUS.CLIENT_ERROR.UNAUTHENTICATED,
      RESPONSE_DESCRIPTION.CLIENT_ERROR.EXPIRED_TOKEN,
    );
  }
}
