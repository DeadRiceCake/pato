import { Service, Inject } from 'typedi';
import { RestaurantRepository } from '../repository/RestaurantRepository';
import { NoContentException } from '../../../common/error/NoContentsException';
import {
  RegisterRestaurantConvenienceResponse,
  RegisterRestaurantReviewResponse,
} from '../response/RestaurantResponse';
import {
  RegisterRestaurantConvenienceDto,
  SearchRestaurantDto,
  UpdateRestaurantDetailDto,
} from '../model/dto/RestaurantDto';
import { Utils } from '../../../common/utils/Util';
import { Request } from 'express';
import {
  InsertRestaurantReviewDto,
  RestaurantReviewDetailDto,
  RestaurantReviewDto,
} from '../model/dto/RestaurantReviewDto';
import { CustomRequestFile } from '../../../common/model/CustomRequestFileInterface';
import { SearchedRestaurant } from '../model/sqlResult/RestaurantSqlResult';
import { CustomError } from '../../../common/error/CustomError';
import { RESPONSE_CODE } from '../../../config/StatusCode';
import { RESPONSE_STATUS } from '../../../config/Status';
import { ResponseBody } from '../../../common/response/Response';
import { RestaurantReviewDao } from '../model/dao/RestaurantDao';

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
    const uploadedFiles = req.files ? (req.files as CustomRequestFile[]) : null;

    const uploadedFileNames: string[] = [];
    if (uploadedFiles) {
      uploadedFiles.forEach((uploadedFile) => {
        uploadedFileNames.push(Utils.getFileNameFromPath(uploadedFile.key));
      });
    }

    await this.restaurantRepository.insertRestaurantReview(
      Number(restaurantId),
      Number(parkingScore),
      Number(toiletScore),
      reviewContent,
      uploadedFiles ? uploadedFileNames.join() : null,
    );

    return new RegisterRestaurantReviewResponse();
  }

  public async getRestaurantDetails(restaurantId: number): Promise<RestaurantReviewDetailDto> {
    const restaurantDetails = await this.restaurantRepository.selectRestaurantDetailByRestautantId(restaurantId);
    const restaurantReviewDaos = await this.restaurantRepository.selectRestaurantReviewsByRestaurantId(restaurantId);
    const restaurantReviews = restaurantReviewDaos.map((restaurantReviewDao: RestaurantReviewDao) => {
      return new RestaurantReviewDto(
        restaurantReviewDao.reviewId,
        restaurantReviewDao.parkingScore,
        restaurantReviewDao.toiletScore,
        restaurantReviewDao.title,
        restaurantReviewDao.content,
        restaurantReviewDao.imageNames,
        restaurantReviewDao.createdAt,
      );
    });

    const restaurantImages: string[] = [];

    for (const restaurantReview of restaurantReviews) {
      if (restaurantReview.images.length) {
        restaurantImages.push(...restaurantReview.images);
      }

      if (restaurantImages.length >= 5) {
        restaurantImages.splice(5);
        break;
      }
    }

    return new RestaurantReviewDetailDto(restaurantDetails, restaurantReviews, restaurantImages);
  }

  public async updateRestaurantDetails(updateRestaurantDetailDto: UpdateRestaurantDetailDto) {
    const { restaurantId, isParkingLot, parkingCapacity, isToilet, toiletCleanliness, isSoap, isPaperTowel } =
      updateRestaurantDetailDto;

    const updatedResaurant = await this.restaurantRepository.upsertRestaurantConvenience(
      restaurantId,
      isParkingLot,
      parkingCapacity,
      isToilet,
      toiletCleanliness,
      isSoap,
      isPaperTowel,
    );

    if (!updatedResaurant.changedRows && !updatedResaurant.affectedRows) {
      throw new CustomError(
        RESPONSE_CODE.CLIENT_ERROR.NOT_FOUND,
        RESPONSE_STATUS.CLIENT_ERROR.NOT_FOUND,
        '해당 식당이 없습니다.',
      );
    }

    return new ResponseBody(RESPONSE_STATUS.SUCCESS.OK, '식당 정보가 수정되었습니다.');
  }
}
