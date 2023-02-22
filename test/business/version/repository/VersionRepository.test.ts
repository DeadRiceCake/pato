import 'reflect-metadata';
import { VersionRepository } from '../../../../src/business/version/repository/VersionRepository';
import { createDBPool, release } from '../../../../src/common/module/Database';

describe('VersonRepository', () => {
  const versionRepository = new VersionRepository();

  beforeAll(() => createDBPool());
  afterAll(() => release());

  test('getCurrentIOSVersion', async () => {
    const result = await versionRepository.getCurrentIOSVersion();
    expect(result[0].version).toBe(`3.0.4`);
  });
  test('getCurrentAndroidVersion', async () => {
    const result = await versionRepository.getCurrentAndroidVersion();
    expect(result[0].version).toBe(`3.0.5`);
  });
  test('getCurrentAndroidVersionForced', async () => {
    const result = await versionRepository.getCurrentAndroidVersionForced();
    expect(result[0].version).toBe(`3.0.5`);
  });
  test('getCurrentIOSVersionForced', async () => {
    const result = await versionRepository.getCurrentIOSVersionForced();
    expect(result[0].version).toBe(`3.0.0`);
  });
});
