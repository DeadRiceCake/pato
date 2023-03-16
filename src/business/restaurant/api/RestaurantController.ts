import { JsonController, Get, HttpCode, QueryParams, Post, Body } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Service, Inject } from 'typedi';
import { RestaurantService } from '../application/RestaurantService';
import { RESPONSE_CODE } from '../../../config/StatusCode';
import { RESPONSE_DESCRIPTION } from '../../../config/Description';
import { RegisterRestaurantConvenienceResponse, SearchRestaurantByNameResponse } from '../response/RestaurantResponse';
import { RegisterRestaurantConvenienceDto, SearchRestaurantDto } from '../model/dto/RestaurantDto';

@JsonController('/restaurants')
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
    responses: {
      [RESPONSE_CODE.SUCCESS.OK]: {
        description: RESPONSE_DESCRIPTION.SUCCESS.NO_CONTENT,
      },
    },
  })
  @ResponseSchema(SearchRestaurantByNameResponse)
  public async getRestaurantsByName(@QueryParams() searchRestaurantDto: SearchRestaurantDto) {
    return await this.restaurantService.searchRestaurantByName(searchRestaurantDto);
  }

  @HttpCode(RESPONSE_CODE.SUCCESS.CREATED)
  @Post('')
  @OpenAPI({
    summary: '식당 제보',
    statusCode: RESPONSE_CODE.SUCCESS.CREATED,
  })
  @ResponseSchema(RegisterRestaurantConvenienceResponse)
  public async registerRestaurantConvenience(
    @Body() registerRestaurantConvenienceDto: RegisterRestaurantConvenienceDto,
  ) {
    return await this.restaurantService.registerRestaurantConvenience(registerRestaurantConvenienceDto);
  }
}
