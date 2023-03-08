import { IsEmail, IsEnum, IsNumber, IsOptional, IsString, Max } from 'class-validator';
import { Paging } from '../../../../common/model/PagingModel';
import {
  PaperTowel,
  PaperTowelType,
  ParkingLot,
  ParkingLotType,
  Soap,
  SoapType,
  Toilet,
  ToiletCleanliness,
  ToiletCleanlinessType,
  ToiletType,
} from '../enum/RestaurantEnum';

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

  @IsEnum(ParkingLot)
  public isParkingLot!: ParkingLotType;

  @IsNumber()
  @Max(51)
  public parkingCapacity!: number;

  @IsEnum(Toilet)
  public isToilet!: ToiletType;

  @IsEnum(ToiletCleanliness)
  public toiletCleanliness!: ToiletCleanlinessType;

  @IsEnum(Soap)
  public isSoap!: SoapType;

  @IsEnum(PaperTowel)
  public isPaperTowel!: PaperTowelType;

  @IsOptional()
  @IsEmail()
  public reporter?: string;
}
