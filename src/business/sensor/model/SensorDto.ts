import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export enum DeviceOs {
  ANDROID = 'android',
  IOS = 'ios',
}

export class CreateSensorDataDto {
  @IsEnum(DeviceOs)
  public deviceOs!: DeviceOs;

  @IsOptional()
  @IsNumber()
  public xAxis?: number;

  @IsOptional()
  @IsNumber()
  public yAxis?: number;

  @IsOptional()
  @IsNumber()
  public zAxis?: number;

  @IsOptional()
  @IsNumber()
  public atmoPressure?: number;

  @IsOptional()
  @IsNumber()
  public lux?: number;
}
