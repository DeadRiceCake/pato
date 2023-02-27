import { APP_CONFIG } from './Env';
import { TeamController } from '../business/team/api/TeamController';
import { CustomErrorHandler } from '../common/middleware/ErrorHandler';
import { SecurityMiddleware } from '../common/middleware/Security';

export const routingControllerOptions = {
  cors: true,
  defaultErrorHandler: false,
  routePrefix: APP_CONFIG.API_PREFIX,
  controllers: [TeamController],
  middlewares: [CustomErrorHandler, SecurityMiddleware],
};
