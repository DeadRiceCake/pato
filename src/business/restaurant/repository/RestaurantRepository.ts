import { Service } from 'typedi';
import { execute } from '../../../common/module/Database';
import { restaurantQuery } from './RestaurantQuery';
import { SearchedRestaurant } from '../model/sqlResult/RestaurantSqlResult';
import { DMLResult } from '../../../common/model/DMLResultModel';

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
}
