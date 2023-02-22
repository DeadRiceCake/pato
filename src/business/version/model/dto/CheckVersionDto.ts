import { IsString } from 'class-validator';

export class CheckVersionDto {
  @IsString()
  public app!: string;

  @IsString()
  public deviceOs!: string;
}
