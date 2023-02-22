import request from 'supertest';
import { TestApp } from '../../../utils/TestApp';

const application = new TestApp().app;

describe('[POST] /api/version', () => {
  it(`status : 200 현재 버전, 기기정보값을 바탕으로 최신 버전과 업데이트 여부를 회신`, async () => {
    const app = '3.0.0';
    const deviceOs = 'ios';
    const checkVersionDto = { app, deviceOs };

    const response = await request(application).post('/api/version').send(checkVersionDto).expect(200);

    expect(response.body.status).toBe('OK');
    expect(response.body.message).toBe('오류가 없습니다.');
    expect(response.body.data).toEqual({ latestVersion: '3.0.4', isForced: false });
  });
});
