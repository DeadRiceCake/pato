import request from 'supertest';
import { release } from '../../../../src/common/module/Database';
import { TEST_CONFIG } from '../../../../src/config/Env';
import { TestApp } from '../../../utils/TestApp';
import { TruncateSensorTable } from '../../../utils/TruncateTable';
import { setHeader } from '../../../utils/Util';

const app = new TestApp().app;

afterAll(async () => {
  const truncateSensorTable = new TruncateSensorTable();
  await truncateSensorTable.truncateTable();

  release();
});

describe('[POST] /api/sensors', () => {
  it('201: deviceOs가 ios일 경우', async () => {
    const requestBody = {
      deviceOs: 'ios',
      xAxis: 1.234,
      yAxis: 1.234,
      zAxis: 1.234,
      atmoPressure: 1.234,
    };

    await request(app).post(`/api/sensors`).set(setHeader(TEST_CONFIG.JWT)).send(requestBody).expect(201);
  });

  it('201: deviceOs가 android일 경우', async () => {
    const requestBody = {
      deviceOs: 'android',
      xAxis: 1.234,
      yAxis: 1.234,
      zAxis: 1.234,
      lux: 1.234,
    };

    await request(app).post(`/api/sensors`).set(setHeader(TEST_CONFIG.JWT)).send(requestBody).expect(201);
  });
});
