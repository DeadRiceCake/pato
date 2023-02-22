import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class User {
  @IsNumber()
  public idx!: number;

  @IsString()
  public uuid!: string;

  @IsOptional()
  @IsString()
  public description?: string;

  @IsString()
  public nickname!: string;

  @IsOptional()
  @IsNumber()
  public lv?: number;

  @IsOptional()
  @IsString()
  public birth?: string;

  @IsString()
  public gender!: string;

  @IsString()
  public country!: string;

  @IsString()
  public rcmd_code!: string;

  @IsString()
  public thumbnail!: string;

  @IsString()
  public background!: string;

  @IsOptional()
  @IsNumber()
  public permission?: number;

  @IsNumber()
  public adult!: number;

  @IsString()
  public name?: string;

  @IsString()
  public send_email!: string;

  @IsOptional()
  @IsString()
  public telephone?: string;

  @IsBoolean()
  public email_agree!: boolean;

  @IsBoolean()
  public sms_agree!: boolean;

  @IsBoolean()
  public quit!: boolean;

  @IsBoolean()
  public is_ai!: boolean;

  @IsDate()
  public created_at!: Date;

  @IsDate()
  public updated_at!: Date;

  @IsOptional()
  @IsDate()
  public quitdate?: Date;

  @IsString()
  public join_type!: string;
}
