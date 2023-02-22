import { IsBoolean, IsString } from 'class-validator';

export class GetVersionDto {
  @IsString()
  public currentVersion!: string;

  @IsBoolean()
  public force_update!: boolean;
}
