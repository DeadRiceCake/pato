import { Service, Inject } from 'typedi';
import { RestaurantRepository } from '../repository/RestaurantRepository';
import { NoContentException } from '../../../common/error/NoContentsException';
import { RegisterRestaurantConvenienceResponse, SearchRestaurantByNameResponse } from '../response/RestaurantResponse';
import { RegisterRestaurantConvenienceDto, SearchRestaurantDto } from '../model/dto/RestaurantDto';
import { Utils } from '../../../common/utils/Util';
import { PaperTowel, ParkingLot, Soap, Toilet, ToiletCleanliness } from '../model/enum/RestaurantEnum';

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

  public async registerRestaurantConvenience(
    registerRestaurantConvenienceDto: RegisterRestaurantConvenienceDto,
  ): Promise<RegisterRestaurantConvenienceResponse> {
    const {
      address,
      restaurantName,
      locationX,
      locationY,
      isParkingLot,
      parkingCapacity,
      isToilet,
      toiletCleanliness,
      isSoap,
      isPaperTowel,
      reporter,
    } = registerRestaurantConvenienceDto;

    const insertRestaurantResult = await this.restaurantRepository.insertRestaurant(
      address,
      restaurantName,
      locationX,
      locationY,
    );

    await this.restaurantRepository.inserRestaurantConvenience(
      insertRestaurantResult.insertId,
      ParkingLot[isParkingLot],
      parkingCapacity,
      Toilet[isToilet],
      ToiletCleanliness[toiletCleanliness],
      Soap[isSoap],
      PaperTowel[isPaperTowel],
      reporter,
    );

    return new RegisterRestaurantConvenienceResponse();
  }
}
