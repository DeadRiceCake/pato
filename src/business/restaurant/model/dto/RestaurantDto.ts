import { IsEmail, IsNumber, IsOptional, IsString, Max } from 'class-validator';
import { Paging } from '../../../../common/model/PagingModel';

export class SearchRestaurantDto extends Paging {
  @IsString()
  public name!: string;

  constructor(name: string, offset: number, limit: number) {
    super(offset, limit);
    this.name = name;
  }
}

export class RegisterRestaurantConvenienceDto {
  @IsString()
  public address!: string;

  @IsString()
  public restaurantName!: string;

  @IsNumber()
  public locationX!: number;

  @IsNumber()
  public locationY!: number;

  @IsNumber()
  public isParkingLot!: number;

  @IsNumber()
  @Max(51)
  public parkingCapacity!: number;

  @IsNumber()
  public isToilet!: number;

  @IsNumber()
  public toiletCleanliness!: number;

  @IsNumber()
  public isSoap!: number;

  @IsNumber()
  public isPaperTowel!: number;

  @IsOptional()
  @IsEmail()
  public reporter?: string;
}

export class RestaurantDetailDto {
  @IsNumber()
  public restaurantId!: number;

  @IsString()
  public restaurantName!: string;

  @IsString()
  public restautantType!: string;

  @IsNumber()
  public isParkingLot!: number | null;

  @IsNumber()
  public parkingCapacity!: number | null;

  @IsNumber()
  public isToilet!: number | null;

  @IsNumber()
  public toiletCleanliness!: number | null;

  @IsNumber()
  public isSoap!: number | null;

  @IsNumber()
  public isPaperTowel!: number | null;

  @IsNumber()
  public parkingScore!: number;

  @IsNumber()
  public toiletScore!: number;
}
