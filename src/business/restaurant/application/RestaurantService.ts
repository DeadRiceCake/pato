import { Service, Inject } from 'typedi';
import { RestaurantRepository } from '../repository/RestaurantRepository';
import { NoContentException } from '../../../common/error/NoContentsException';
import { SearchRestaurantByNameResponse } from '../response/RestaurantResponse';
import { SearchRestaurantDto } from '../model/dto/RestaurantDto';
import { Utils } from '../../../common/utils/Util';

@Service()
export class RestaurantService {
  private restaurantRepository: RestaurantRepository;

  constructor(@Inject() restaurantRepository: RestaurantRepository) {
    this.restaurantRepository = restaurantRepository;
  }

  public async searchRestaurantByName(
    searchRestaurantDto: SearchRestaurantDto,
  ): Promise<SearchRestaurantByNameResponse> {
    const searchingRestaurant = new SearchRestaurantDto(
      searchRestaurantDto.name,
      searchRestaurantDto.offset,
      searchRestaurantDto.limit,
    );
    const { name, offset, limit } = searchingRestaurant;

    const searchedRestaurants = await this.restaurantRepository.searchRestaurantByName(
      Utils.makeKeywordForLike(name),
      offset,
      limit,
    );

    if (!searchedRestaurants.length) {
      throw new NoContentException();
    }

    return new SearchRestaurantByNameResponse(searchedRestaurants);
  }
}
