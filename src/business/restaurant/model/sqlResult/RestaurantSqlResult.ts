import { IsNumber, IsString } from 'class-validator';

export class SearchedRestaurant {
  @IsNumber()
  public id!: number;

  @IsString()
  public restaurantName!: string;

  @IsString()
  public restaurantType!: string;

  @IsString()
  public address!: string;

  @IsNumber()
  public parkingScore!: number;

  @IsNumber()
  public toiletScore!: number;
}
