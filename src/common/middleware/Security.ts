import { Request, Response, NextFunction } from 'express';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import helmet from 'helmet';
import { Service } from 'typedi';

/**
 * 헤더 보안을 위한 Helmet을 적용하도록 하는 전역 미들웨어
 */
@Service()
@Middleware({ type: 'before' })
export class SecurityMiddleware implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction) {
    return helmet()(req, res, next);
  }
}
