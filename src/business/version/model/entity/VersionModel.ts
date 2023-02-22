import { IsString } from 'class-validator';

export class VersionModel {
  @IsString()
  public version!: string;
}
