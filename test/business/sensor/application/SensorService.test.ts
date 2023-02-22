import 'reflect-metadata';
import { SensorService } from '../../../../src/business/sensor/application/SensorService';
import { SensorRepository } from '../../../../src/business/sensor/repository/SensorRepository';
import { createDBPool, release } from '../../../../src/common/module/Database';
import { TruncateSensorTable } from '../../../utils/TruncateTable';
import { CreateSensorDataDto } from '../../../../src/business/sensor/model/SensorDto';
import { RESPONSE_STATUS } from '../../../../src/config/Status';
import { RESPONSE_DESCRIPTION } from '../../../../src/config/Description';

describe('SensorService', () => {
  const sensorRepository = new SensorRepository();
  const sensorService = new SensorService(sensorRepository);

  beforeAll(() => createDBPool());

  afterAll(async () => {
    const truncateSensorTable = new TruncateSensorTable();
    await truncateSensorTable.truncateTable();

    release();
  });

  describe('createSensorData', () => {
    it('ios에서 요청받은 센서데이터를 DB에 저장한다.', async () => {
      const userId = 17;
      const createSensorDataDto = {
        deviceOs: 'ios',
        xAxis: 1,
        yAxis: 2,
        zAxis: 3,
        atmoPressure: 4,
      } as CreateSensorDataDto;

      const createSensorDataResponse = await sensorService.createSensorData(userId, createSensorDataDto);

      expect(createSensorDataResponse.status).toBe(RESPONSE_STATUS.SUCCESS.CREATED);
      expect(createSensorDataResponse.message).toBe(RESPONSE_DESCRIPTION.SUCCESS.CREATED);
    });

    it('android에서 요청받은 센서데이터를 DB에 저장한다.', async () => {
      const userId = 17;
      const createSensorDataDto = {
        deviceOs: 'android',
        xAxis: 1,
        yAxis: 2,
        zAxis: 3,
        atmoPressure: 4,
      } as CreateSensorDataDto;

      const createSensorDataResponse = await sensorService.createSensorData(userId, createSensorDataDto);

      expect(createSensorDataResponse.status).toBe(RESPONSE_STATUS.SUCCESS.CREATED);
      expect(createSensorDataResponse.message).toBe(RESPONSE_DESCRIPTION.SUCCESS.CREATED);
    });
  });
});
