import { JsonController, Post, HttpCode, Body, UseBefore, Res } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Service, Inject } from 'typedi';
import { RESPONSE_CODE } from '../../../config/StatusCode';
import { ResponseBody } from '../../../common/response/Response';
import { Auth } from '../../../common/middleware/Auth';
import { SensorService } from '../application/SensorService';
import { CreateSensorDataDto } from '../model/SensorDto';
import { Response } from 'express';
import { sensorApiDescription } from '../../../../docs/openApi/description/Sensor';

@JsonController('/sensors')
@Service()
export class SensorController {
  private sensorService: SensorService;

  constructor(@Inject() sensorService: SensorService) {
    this.sensorService = sensorService;
  }

  @HttpCode(RESPONSE_CODE.SUCCESS.CREATED)
  @Post('')
  @OpenAPI({
    summary: '센서데이터 추가',
    statusCode: RESPONSE_CODE.SUCCESS.CREATED,
    description: sensorApiDescription['[post] /sensors'],
  })
  @ResponseSchema(ResponseBody)
  @UseBefore(Auth.verifyJwt)
  public async createTeam(@Body() createSensorDataDto: CreateSensorDataDto, @Res() res: Response) {
    const { id } = res.locals.jwtPayload;

    return await this.sensorService.createSensorData(id, createSensorDataDto);
  }
}
