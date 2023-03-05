import { IsString } from 'class-validator';
import { Paging } from '../../../../common/model/PagingModel';

export class SearchRestaurantDto extends Paging {
  @IsString()
  public name!: string;

  constructor(name: string, offset: number, limit: number) {
    super(offset, limit);
    this.name = name;
  }
}
