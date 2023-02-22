import { NextFunction, Request } from 'express';
import { ExpiredTokenError, InvaildTokenError } from '../../../src/common/error/AuthError';
import { Auth } from '../../../src/common/middleware/Auth';
import { createDBPool, release } from '../../../src/common/module/Database';
import { TEST_CONFIG } from '../../../src/config/Env';

describe('Authorization', () => {
  beforeAll(() => createDBPool());
  afterAll(() => release());

  describe('getUserById', () => {
    it('정상 동작하여 유저 정보를 반환함', async () => {
      const userId = 32649;
      const user = await Auth['getUserById'](userId);

      expect(user.idx).toBe(userId);
    });

    it('유저가 존재하지 않을 경우 에러를 반환함', async () => {
      const userId = 0;

      await expect(Auth['getUserById'](userId)).rejects.toThrowError(InvaildTokenError);
    });
  });

  describe('isUserQuit', () => {
    it('유저가 탈퇴한 경우 에러를 반환함', async () => {
      const jwtPayload = {
        id: 32887,
        payment: 1,
        quit: 1,
        adult: 0,
        platform: 1,
        urlEnc: 'test',
        tag: 1,
      };

      await expect(Auth['isUserQuit'](jwtPayload)).rejects.toThrowError(InvaildTokenError);
    });

    it('유저가 탈퇴하지 않은 경우 에러를 반환하지 않음', async () => {
      const jwtPayload = {
        id: 32649,
        payment: 1,
        quit: 0,
        adult: 0,
        platform: 1,
        urlEnc: 'test',
        tag: 1,
      };

      await expect(Auth['isUserQuit'](jwtPayload)).resolves.toBeUndefined();
    });
  });

  describe('isJwtExpired', () => {
    it('JWT가 만료된 경우 에러를 반환함', () => {
      const jwtPayload = {
        id: 32649,
        payment: 1,
        quit: 0,
        adult: 0,
        platform: 1,
        urlEnc: 'test',
        tag: 1,
        exp: 123,
      };

      expect(() => Auth['isJwtExpired'](jwtPayload)).toThrowError(ExpiredTokenError);
    });

    it('JWT가 만료되지 않은 경우 에러를 반환하지 않음', () => {
      const jwtPayload = {
        id: 32649,
        payment: 1,
        quit: 0,
        adult: 0,
        platform: 1,
        urlEnc: 'test',
        tag: 1,
        exp: 9999999999,
      };

      expect(Auth['isJwtExpired'](jwtPayload)).toBeUndefined();
    });
  });

  describe('decryptJwt', () => {
    it('JWT가 정상적으로 복호화되어 payload를 반환함', () => {
      expect(Auth['decryptJwt'](TEST_CONFIG.JWT)).toHaveProperty(['id']);
    });
  });

  describe('extractJwtFromHeader', () => {
    it('헤더에서 jwt를 추출함', () => {
      const req = {
        headers: {
          authorization: 'Bearer jwtToken',
        },
      } as Request;

      expect(Auth['extractJwtFromHeader'](req)).toBe('jwtToken');
    });
  });

  describe('verifyJwt', () => {
    it('jwt를 정상적으로 확인함', async () => {
      const req = {
        headers: {
          authorization: TEST_CONFIG.JWT,
        },
      } as Request;
      const res = {} as never;
      const next = jest.fn() as NextFunction;

      await Auth.verifyJwt(req, res, next);

      expect(next).toBeCalled();
    });
  });
});
