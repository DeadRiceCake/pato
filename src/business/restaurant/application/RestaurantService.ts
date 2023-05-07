import { Service, Inject } from 'typedi';
import { RestaurantRepository } from '../repository/RestaurantRepository';
import { NoContentException } from '../../../common/error/NoContentsException';
import {
  RegisterRestaurantConvenienceResponse,
  RegisterRestaurantReviewResponse,
} from '../response/RestaurantResponse';
import { RegisterRestaurantConvenienceDto, SearchRestaurantDto } from '../model/dto/RestaurantDto';
import { Utils } from '../../../common/utils/Util';
import { Request } from 'express';
import { InsertRestaurantReviewDto, RestaurantReviewDetailDto } from '../model/dto/RestaurantReviewDto';
import { CustomRequestFile } from '../../../common/model/CustomRequestFileInterface';
import { SearchedRestaurant } from '../model/sqlResult/RestaurantSqlResult';
import { IMAGE_FILE_PATH } from '../../../config/Constant';

@Service()
export class RestaurantService {
  private restaurantRepository: RestaurantRepository;

  constructor(@Inject() restaurantRepository: RestaurantRepository) {
    this.restaurantRepository = restaurantRepository;
  }

  public async searchRestaurantByName(searchRestaurantDto: SearchRestaurantDto): Promise<SearchedRestaurant[]> {
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

    return searchedRestaurants;
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

    await this.restaurantRepository.insertRestaurantConvenience(
      insertRestaurantResult.insertId,
      isParkingLot,
      parkingCapacity,
      isToilet,
      toiletCleanliness,
      isSoap,
      isPaperTowel,
      reporter,
    );

    return new RegisterRestaurantConvenienceResponse();
  }

  public async registerRestaurantReview(req: Request, InsertRestaurantReviewDto: InsertRestaurantReviewDto) {
    const { restaurantId, parkingScore, toiletScore, reviewContent } = InsertRestaurantReviewDto;
    const uploadedFile = req.file ? (req.file as CustomRequestFile) : null;

    await this.restaurantRepository.insertRestaurantReview(
      Number(restaurantId),
      Number(parkingScore),
      Number(toiletScore),
      reviewContent,
      uploadedFile ? Utils.getFileNameFromPath(uploadedFile.key) : null,
    );

    return new RegisterRestaurantReviewResponse();
  }

  public async getRestaurantDetails(restaurantId: number): Promise<RestaurantReviewDetailDto> {
    const restaurantDetails = await this.restaurantRepository.selectRestaurantDetailByRestautantId(restaurantId);
    const restaurantReviews = await this.restaurantRepository.selectRestaurantReviewsByRestaurantId(restaurantId);
    const restaurantImages: string[] = [];

    for (const restaurantReview of restaurantReviews) {
      if (restaurantReview.imagePath) {
        restaurantImages.push(`${IMAGE_FILE_PATH.REVIEW}${restaurantReview.imagePath}`);
      }

      if (restaurantImages.length === 5) {
        break;
      }
    }

    return new RestaurantReviewDetailDto(restaurantDetails, restaurantReviews, restaurantImages);
  }
}
