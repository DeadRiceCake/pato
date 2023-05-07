import {
  JsonController,
  Get,
  HttpCode,
  QueryParams,
  Post,
  Body,
  UseBefore,
  ContentType,
  Req,
  Param,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Service, Inject } from 'typedi';
import { RestaurantService } from '../application/RestaurantService';
import { RESPONSE_CODE } from '../../../config/StatusCode';
import { RESPONSE_DESCRIPTION } from '../../../config/Description';
import { RegisterRestaurantConvenienceResponse } from '../response/RestaurantResponse';
import { RegisterRestaurantConvenienceDto, SearchRestaurantDto } from '../model/dto/RestaurantDto';
import { RESTAURANT_API_DESCRIPTION } from '../../../../docs/openApi/description/Restaurant';
import { uploadImageToS3 } from '../../../common/module/S3';
import { BUCKET_PATH_CONFIG } from '../../../config/Env';
import { Request } from 'express';
import { InsertRestaurantReviewDto } from '../model/dto/RestaurantReviewDto';
import { SearchedRestaurant } from '../model/sqlResult/RestaurantSqlResult';
import { RestaurantReviewDetailDto } from '../model/dto/RestaurantReviewDto';

@JsonController('/rt')
@Service()
export class RestaurantController {
  private restaurantService: RestaurantService;

  constructor(@Inject() restaurantService: RestaurantService) {
    this.restaurantService = restaurantService;
  }

  @HttpCode(RESPONSE_CODE.SUCCESS.OK)
  @Get('')
  @OpenAPI({
    summary: '식당 검색',
    statusCode: RESPONSE_CODE.SUCCESS.OK,
    description: RESTAURANT_API_DESCRIPTION['[get] /'],
    responses: {
      [RESPONSE_CODE.SUCCESS.OK]: {
        description: RESPONSE_DESCRIPTION.SUCCESS.NO_CONTENT,
      },
    },
  })
  @ResponseSchema(SearchedRestaurant, { isArray: true })
  public async getRestaurantsByName(@QueryParams() searchRestaurantDto: SearchRestaurantDto) {
    return await this.restaurantService.searchRestaurantByName(searchRestaurantDto);
  }

  @HttpCode(RESPONSE_CODE.SUCCESS.CREATED)
  @Post('')
  @OpenAPI({
    summary: '식당 제보',
    statusCode: RESPONSE_CODE.SUCCESS.CREATED,
    description: RESTAURANT_API_DESCRIPTION['[post] /'],
  })
  @ResponseSchema(RegisterRestaurantConvenienceResponse)
  public async registerRestaurantConvenience(
    @Body() registerRestaurantConvenienceDto: RegisterRestaurantConvenienceDto,
  ) {
    return await this.restaurantService.registerRestaurantConvenience(registerRestaurantConvenienceDto);
  }

  @HttpCode(RESPONSE_CODE.SUCCESS.CREATED)
  @Post('/reviews')
  @ContentType('multipart/form-data')
  @OpenAPI({
    summary: '식당 리뷰 등록',
    statusCode: RESPONSE_CODE.SUCCESS.CREATED,
    description: RESTAURANT_API_DESCRIPTION['[post] /reviews'],
  })
  @ResponseSchema(RegisterRestaurantConvenienceResponse)
  @UseBefore(uploadImageToS3(BUCKET_PATH_CONFIG.REVIEW_IMAGE).single('reviewImage'))
  public async registerRestaurantReview(
    @Req() req: Request,
    @Body() InsertRestaurantReviewDto: InsertRestaurantReviewDto,
  ) {
    return await this.restaurantService.registerRestaurantReview(req, InsertRestaurantReviewDto);
  }

  @HttpCode(RESPONSE_CODE.SUCCESS.OK)
  @Get('/:restaurantId')
  @OpenAPI({
    summary: '식당 상세 정보',
    statusCode: RESPONSE_CODE.SUCCESS.OK,
    description: RESTAURANT_API_DESCRIPTION['[get] /:restaurantId'],
  })
  @ResponseSchema(RestaurantReviewDetailDto)
  public async getRestaurantDetails(@Param('restaurantId') restaurantId: number) {
    return await this.restaurantService.getRestaurantDetails(restaurantId);
  }
}
