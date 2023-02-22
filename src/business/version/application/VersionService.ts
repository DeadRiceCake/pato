import { Inject, Service } from 'typedi';
import { ResponseBody } from '../../../common/response/Response';
import { VersionRepository } from '../repository/VersionRepository';
import { CheckVersionDto } from '../model/dto/CheckVersionDto';
import { VersionModel } from '../model/entity/VersionModel';
import { VersionResponse } from '../response/VersionResponse';

@Service()
export class VersionService {
  private versionRepository: VersionRepository;

  constructor(@Inject() versionRepository: VersionRepository) {
    this.versionRepository = versionRepository;
  }

  public async checkVersion(checkVersionDto: CheckVersionDto): Promise<ResponseBody<object>> {
    const currentVersion = await this.getLatestVersion(checkVersionDto.deviceOs);
    const forcedVersion = await this.getForcedLatestVersion(checkVersionDto.deviceOs);
    const latestVersion = currentVersion[0].version;

    if (currentVersion === forcedVersion) {
      return new VersionResponse(latestVersion, true);
    }
    return new VersionResponse(latestVersion, false);
  }

  public async getLatestVersion(deviceOs: string): Promise<VersionModel[]> {
    if (deviceOs === 'ios') {
      return this.versionRepository.getCurrentIOSVersion();
    } else {
      return this.versionRepository.getCurrentAndroidVersion();
    }
  }

  public async getForcedLatestVersion(deviceOs: string): Promise<VersionModel[]> {
    if (deviceOs === 'ios') {
      return this.versionRepository.getCurrentIOSVersionForced();
    } else {
      return this.versionRepository.getCurrentAndroidVersionForced();
    }
  }
}
