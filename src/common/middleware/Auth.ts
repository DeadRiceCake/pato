import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { ExpiredTokenError, InvaildTokenError } from '../error/AuthError';
import { JWT_CONFIG } from '../../config/Env';
import { JwtPayload } from '../model/JwtPayloadModel';
import { UserRepository } from '../../business/user/repository/UserRepository';

export class Auth {
  /**
   * JWT 토큰유효성 검사를 수행합니다.
   * @param req request
   * @param res response
   * @param next next function
   */
  public static verifyJwt = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jwtToken = this.extractJwtFromHeader(req);
      const jwtPayload = this.decryptJwt(jwtToken);

      this.isJwtExpired(jwtPayload);
      await this.isUserQuit(jwtPayload);

      res.locals.jwtPayload = jwtPayload;

      next();
    } catch (error) {
      next(error);
    }
  };

  /**
   * 요청 헤더에서 JWT 토큰을 추출합니다.
   * @param req request
   * @returns JWT 토큰
   */
  private static extractJwtFromHeader = (req: Request) => {
    const token = req.headers.authorization || '';

    return token.replace('Bearer ', '');
  };

  /**
   * jwt 토큰을 복호화합니다.
   * @param token JWT 토큰
   * @returns 토큰 payload
   */
  private static decryptJwt = (token: string) => {
    try {
      const buffer = Buffer.alloc(16, JWT_CONFIG.BUFFER);
      const keys = crypto.scryptSync(JWT_CONFIG.PASSWORD, JWT_CONFIG.SECRET_KEY, 32);
      const decipher = crypto.createDecipheriv('aes-256-cbc', keys, buffer);
      const decode = jwt.verify(token, JWT_CONFIG.SALT) as jwt.JwtPayload;

      let decryptedToken = decipher.update(decode.iss as string, 'base64', 'utf8');
      decryptedToken += decipher.final('utf8');

      return JSON.parse(decryptedToken);
    } catch (error) {
      throw new InvaildTokenError();
    }
  };

  /**
   * 토큰 유효기간을 확인합니다.
   * @param jwtPayload jwt payload
   */
  private static isJwtExpired = (jwtPayload: JwtPayload): void => {
    const exp = jwtPayload.exp;

    if (exp && exp * 1000 < Date.now()) {
      throw new ExpiredTokenError();
    }
  };

  /**
   * 탈퇴한 유저인지 확인합니다.
   * @param jwtPayload jwt payload
   */
  private static isUserQuit = async (jwtPayload: JwtPayload): Promise<void> => {
    const user = await this.getUserById(jwtPayload.id);
    if (user.quit) {
      throw new InvaildTokenError('탈퇴한 유저입니다.');
    }
  };

  /**
   * 유저 id를 기준으로 유저를 조회합니다.
   * @param userId 유저 id
   * @returns 유저 정보
   */
  private static getUserById = async (userId: number) => {
    const userRepository = new UserRepository();
    const user = await userRepository.selectUserById(userId);

    if (!user.length) {
      throw new InvaildTokenError('유저가 존재하지 않습니다.');
    }

    return user[0];
  };
}
