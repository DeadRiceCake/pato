import { Inject, Service } from 'typedi';
import { CreateSensorDataDto, DeviceOs } from '../model/SensorDto';
import { SensorRepository } from '../repository/SensorRepository';
import { CreateSensorDataResponse } from '../response/SensorResponse';

@Service()
export class SensorService {
  private sensorRepository: SensorRepository;

  constructor(@Inject() sensorRepository: SensorRepository) {
    this.sensorRepository = sensorRepository;
  }

  /**
   * 요청받은 센서데이터를 DB에 저장한다.
   * @param userId 유저 id
   * @param createSensorDataDto createSensorDataDto
   */
  public async createSensorData(
    userId: number,
    createSensorDataDto: CreateSensorDataDto,
  ): Promise<CreateSensorDataResponse> {
    const { deviceOs, xAxis = 0, yAxis = 0, zAxis = 0, atmoPressure = 0, lux = 0 } = createSensorDataDto;

    if (deviceOs === DeviceOs.IOS) {
      await this.sensorRepository.insertMagneticFieldAndAtmosphericPressureData(
        userId,
        xAxis,
        yAxis,
        zAxis,
        atmoPressure,
      );
    } else if (deviceOs === DeviceOs.ANDROID) {
      await this.sensorRepository.insertMagneticFieldAndLuxData(userId, xAxis, yAxis, zAxis, lux);
    }

    return new CreateSensorDataResponse();
  }
}
