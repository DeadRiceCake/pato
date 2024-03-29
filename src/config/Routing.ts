import { APP_CONFIG } from './Env';
import { CustomErrorHandler } from '../common/middleware/ErrorHandler';
import { SecurityMiddleware } from '../common/middleware/Security';
import { RestaurantController } from '../business/restaurant/api/RestaurantController';

export const routingControllerOptions = {
  cors: true,
  defaultErrorHandler: false,
  routePrefix: APP_CONFIG.API_PREFIX,
  controllers: [RestaurantController],
  middlewares: [CustomErrorHandler, SecurityMiddleware],
};
