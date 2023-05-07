import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { ResponseBody } from '../../../common/response/Response';
import { RESPONSE_DESCRIPTION } from '../../../config/Description';
import { RESPONSE_STATUS } from '../../../config/Status';
import { SearchedRestaurant } from '../model/sqlResult/RestaurantSqlResult';

export class SearchRestaurantByNameResponse extends ResponseBody<SearchedRestaurant[]> {
  @ValidateNested({ each: true })
  @Type(() => SearchedRestaurant)
  public data!: SearchedRestaurant[];

  constructor(searchedRestaurants: SearchedRestaurant[]) {
    super(RESPONSE_STATUS.SUCCESS.OK, RESPONSE_DESCRIPTION.SUCCESS.OK, searchedRestaurants);
  }
}

export class RegisterRestaurantConvenienceResponse extends ResponseBody<string> {
  @IsString()
  public data!: string;

  constructor() {
    super(RESPONSE_STATUS.SUCCESS.CREATED, RESPONSE_DESCRIPTION.SUCCESS.CREATED, '식당 제보 완료');
  }
}

export class RegisterRestaurantReviewResponse extends ResponseBody<string> {
  @IsString()
  public data!: string;

  constructor() {
    super(RESPONSE_STATUS.SUCCESS.CREATED, RESPONSE_DESCRIPTION.SUCCESS.CREATED, '리뷰 등록 완료');
  }
}
