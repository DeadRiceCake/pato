import { APP_CONFIG } from './Env';
import { TeamController } from '../business/team/api/TeamController';
import { VersionController } from '../business/version/api/VersionController';
import { CustomErrorHandler } from '../common/middleware/ErrorHandler';
import { SecurityMiddleware } from '../common/middleware/Security';
import { SensorController } from '../business/sensor/api/SensorController';

export const routingControllerOptions = {
  cors: true,
  defaultErrorHandler: false,
  routePrefix: APP_CONFIG.API_PREFIX,
  controllers: [TeamController, VersionController, SensorController],
  middlewares: [CustomErrorHandler, SecurityMiddleware],
};
