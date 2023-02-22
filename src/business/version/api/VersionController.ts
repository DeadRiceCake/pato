import { Inject, Service } from 'typedi';
import { Body, HttpCode, JsonController, Post } from 'routing-controllers';
import { RESPONSE_CODE } from '../../../config/StatusCode';
import { RESPONSE_DESCRIPTION } from '../../../config/Description';
import { OpenAPI } from 'routing-controllers-openapi';
import { CheckVersionDto } from '../model/dto/CheckVersionDto';
import { VersionService } from '../application/VersionService';

@JsonController('/version')
@Service()
export class VersionController {
  private versionService: VersionService;

  constructor(@Inject() versionService: VersionService) {
    this.versionService = versionService;
  }

  @HttpCode(RESPONSE_CODE.SUCCESS.OK)
  @Post('')
  @OpenAPI({
    summary: 'version 조회',
    statusCode: RESPONSE_CODE.SUCCESS.OK,
    responses: {
      [RESPONSE_CODE.SUCCESS.OK]: {
        description: RESPONSE_DESCRIPTION.SUCCESS.OK,
      },
    },
  })
  public async checkVersion(@Body() checkVersionDto: CheckVersionDto) {
    return await this.versionService.checkVersion(checkVersionDto);
  }
}
