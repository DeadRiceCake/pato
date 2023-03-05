import { Service } from 'typedi';
import { execute } from '../../../common/module/Database';
import { restaurantQuery } from './RestaurantQuery';
import { SearchedRestaurant } from '../model/sqlResult/RestaurantSqlResult';

@Service()
export class RestaurantRepository {
  public async searchRestaurantByName(name: string, offset: number, limit: number): Promise<SearchedRestaurant[]> {
    return await execute<SearchedRestaurant[]>(restaurantQuery.searchRestaurantByName, [name, offset, limit]);
  }
}
