import { IsIn, IsString } from 'class-validator';

export class RestaurantReviewDto {
  @IsString()
  public restaurantId!: string;

  @IsIn(['1', '2', '3', '4', '5'])
  public parkingScore!: string;

  @IsIn(['1', '2', '3', '4', '5'])
  public toiletScore!: string;

  @IsString()
  public reviewContent!: string;
}
