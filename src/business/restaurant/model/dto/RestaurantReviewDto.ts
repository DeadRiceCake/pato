import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { RestaurantDetailDto } from './RestaurantDto';

export class InsertRestaurantReviewDto {
  @IsNotEmpty()
  public restaurantId!: number;

  @IsNotEmpty()
  public parkingScore!: number;

  @IsNotEmpty()
  public toiletScore!: number;

  @IsString()
  public reviewContent!: string;
}

export class RestaurantReviewDto {
  @IsNumber()
  public reviewId!: number;

  @IsNumber()
  public parkingScore!: number;

  @IsNumber()
  public toiletScore!: number;

  @IsString()
  public title!: string;

  @IsString()
  public content!: string;

  @IsString()
  public imagePath!: string | null;

  @IsDate()
  public createdAt!: Date;
}

export class RestaurantReviewDetailDto {
  @ValidateNested()
  @Type(() => RestaurantDetailDto)
  public restaurantDetails!: RestaurantDetailDto;

  @ValidateNested({ each: true })
  @Type(() => RestaurantReviewDto)
  public restaurantReviews!: RestaurantReviewDto[];

  @IsString({ each: true })
  public restaurantImages!: string[];

  constructor(
    restaurantDetails: RestaurantDetailDto,
    restaurantReviews: RestaurantReviewDto[],
    restaurantImages: string[],
  ) {
    this.restaurantDetails = restaurantDetails;
    this.restaurantReviews = restaurantReviews;
    this.restaurantImages = restaurantImages;
  }
}
