import { versionQuery } from './VersionQuery';
import { execute } from '../../../common/module/Database';
import { VersionModel } from '../model/entity/VersionModel';
import { Service } from 'typedi';

@Service()
export class VersionRepository {
  public async getCurrentIOSVersion(): Promise<VersionModel[]> {
    return await execute<VersionModel[]>(versionQuery.getCurrentIOSVersion, []);
  }
  public async getCurrentAndroidVersion(): Promise<VersionModel[]> {
    return await execute<VersionModel[]>(versionQuery.getCurrentAndroidVersion, []);
  }
  public async getCurrentAndroidVersionForced(): Promise<VersionModel[]> {
    return await execute<VersionModel[]>(versionQuery.getCurrentAndroidVersionForced, []);
  }
  public async getCurrentIOSVersionForced(): Promise<VersionModel[]> {
    return await execute<VersionModel[]>(versionQuery.getCurrentIOSVersionForced, []);
  }
}
