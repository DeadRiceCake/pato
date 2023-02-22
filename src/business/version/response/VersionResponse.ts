import { ResponseBody } from '../../../common/response/Response';
import { RESPONSE_STATUS } from '../../../config/Status';
import { RESPONSE_DESCRIPTION } from '../../../config/Description';

export class VersionResponse extends ResponseBody<object> {
  constructor(latestVersion: string, isForced: boolean) {
    super(RESPONSE_STATUS.SUCCESS.OK, RESPONSE_DESCRIPTION.SUCCESS.OK, {
      isForced,
      latestVersion,
    });
  }
}
