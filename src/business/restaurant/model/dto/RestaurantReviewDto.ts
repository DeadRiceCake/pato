import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { RestaurantDetailDto } from './RestaurantDto';
import { IMAGE_FILE_PATH } from '../../../../config/Constant';

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

  @IsArray()
  public images!: string[];

  @IsDate()
  public createdAt!: Date;

  constructor(
    reviewId: number,
    parkingScore: number,
    toiletScore: number,
    title: string,
    content: string,
    images: string | null,
    createdAt: Date,
  ) {
    this.reviewId = reviewId;
    this.parkingScore = parkingScore;
    this.toiletScore = toiletScore;
    this.title = title;
    this.content = content;
    this.images = images ? images.split(',').map((image) => `${IMAGE_FILE_PATH.REVIEW}${image}`) : [];
    this.createdAt = createdAt;
  }
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
