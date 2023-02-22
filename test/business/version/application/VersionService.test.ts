import 'reflect-metadata';
import { VersionService } from '../../../../src/business/version/application/VersionService';
import { VersionRepository } from '../../../../src/business/version/repository/VersionRepository';
import { createDBPool, release } from '../../../../src/common/module/Database';
import { RESPONSE_STATUS } from '../../../../src/config/Status';
import { RESPONSE_DESCRIPTION } from '../../../../src/config/Description';

describe('VersionService', () => {
  const versionRepository = new VersionRepository();
  const versionService = new VersionService(versionRepository);

  beforeAll(() => createDBPool());
  afterAll(() => release());

  test('getIOSLatestVersion', async () => {
    const deviceOs = 'ios';
    const result = await versionService.getLatestVersion(deviceOs);

    expect(result[0].version).toBe(`3.0.4`);
  });

  test('getAndroidLatestVersion', async () => {
    const deviceOs = 'android';
    const result = await versionService.getLatestVersion(deviceOs);

    expect(result[0].version).toBe(`3.0.5`);
  });

  test('getIOSForcedVersion', async () => {
    const deviceOs = 'ios';
    const result = await versionService.getForcedLatestVersion(deviceOs);

    expect(result[0].version).toBe(`3.0.0`);
  });

  test('getAndroidForcedVersion', async () => {
    const deviceOs = 'android';
    const result = await versionService.getForcedLatestVersion(deviceOs);

    expect(result[0].version).toBe(`3.0.5`);
  });

  test('checkVersion', async () => {
    const app = '3.0.0';
    const deviceOs = 'ios';
    const checkVersionDto = { app, deviceOs };

    const result = await versionService.checkVersion(checkVersionDto);

    expect(result.message).toBe(RESPONSE_DESCRIPTION.SUCCESS.OK);
    expect(result.status).toBe(RESPONSE_STATUS.SUCCESS.OK);
    expect(result.data).toStrictEqual({ latestVersion: '3.0.4', isForced: false });
  });
});
