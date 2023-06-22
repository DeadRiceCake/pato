import { Service } from 'typedi';
import { execute } from '../../../common/module/Database';
import { restaurantQuery } from './RestaurantQuery';
import { SearchedRestaurant } from '../model/sqlResult/RestaurantSqlResult';
import { DMLResult } from '../../../common/model/DMLResultModel';
import { RestaurantDetailDto } from '../model/dto/RestaurantDto';
import { RestaurantReviewDto } from '../model/dto/RestaurantReviewDto';

@Service()
export class RestaurantRepository {
  public async searchRestaurantByName(name: string, offset: number, limit: number): Promise<SearchedRestaurant[]> {
    return await execute<SearchedRestaurant[]>(restaurantQuery.searchRestaurantByName, [name, offset, limit]);
  }

  public async insertRestaurant(
    address: string,
    restaurantName: string,
    locationX: number,
    locationY: number,
  ): Promise<DMLResult> {
    return await execute<DMLResult>(restaurantQuery.insertRestaurant, [address, restaurantName, locationX, locationY]);
  }

  public async insertRestaurantConvenience(
    restaurantId: number,
    isParkingLot: number,
    parkingCapacity: number,
    isToilet: number,
    toiletCleanliness: number,
    isSoap: number,
    isPaperTowel: number,
    reporter?: string,
  ): Promise<DMLResult> {
    return await execute<DMLResult>(restaurantQuery.insertRestaurantConvenience, [
      restaurantId,
      isParkingLot,
      parkingCapacity,
      isToilet,
      toiletCleanliness,
      isSoap,
      isPaperTowel,
      reporter,
    ]);
  }

  public async insertRestaurantReview(
    restaurantId: number,
    parkingScore: number,
    toiletScore: number,
    content: string,
    imageName: string | null,
  ): Promise<DMLResult> {
    return await execute<DMLResult>(restaurantQuery.insertRestaurantReview, [
      restaurantId,
      parkingScore,
      toiletScore,
      content,
      imageName,
    ]);
  }

  public async selectRestaurantDetailByRestautantId(restaurantId: number): Promise<RestaurantDetailDto> {
    return (
      await execute<RestaurantDetailDto[]>(restaurantQuery.selectRestaurantDetailByRestautantId, [restaurantId])
    )[0];
  }

  public async selectRestaurantReviewsByRestaurantId(restaurantId: number): Promise<RestaurantReviewDto[]> {
    return await execute<RestaurantReviewDto[]>(restaurantQuery.selectRestaurantReviewsByRestaurantId, [restaurantId]);
  }

  public async updateRestaurantConvenience(
    restaurantId: number,
    isParkingLot: number,
    parkingCapacity: number,
    isToilet: number,
    toiletCleanliness: number,
    isSoap: number,
    isPaperTowel: number,
  ) {
    return await execute<DMLResult>(restaurantQuery.updateRestaurantConvenience, [
      isParkingLot,
      parkingCapacity,
      isToilet,
      toiletCleanliness,
      isSoap,
      isPaperTowel,
      restaurantId,
    ]);
  }
}
