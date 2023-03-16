import dotenv from 'dotenv';
import path from 'path';

const ENV = process.env.NODE_ENV || 'development';

dotenv.config({
  path: path.join(__dirname, `../../${ENV}.env`),
});

export const APP_CONFIG = {
  API_PREFIX: process.env.API_PREFIX || '/api',
  PORT: Number(process.env.PORT) || 3000,
};

export const SWAGGER_CONFIG = {
  ROUTE: String(process.env.SWAGGER_ROUTE) || '/api-docs',
};

export const DB_CONFIG = {
  DB_HOST: String(process.env.DB_HOST),
  DB_USER: String(process.env.DB_USER),
  DB_PASSWORD: String(process.env.DB_PASSWORD),
  DB_PORT: String(process.env.DB_PORT),
  DB_DATABASE: String(process.env.DB_DATABASE),
  DB_CONNECTION_LIMIT: Number(process.env.DB_CONNECTION_LIMIT),
};

export const AWS_CONFIG = {
  CDN_URL: String(process.env.AWS_CDN_URL),
  ACCESS_KEY: String(process.env.AWS_ACCESS_KEY),
  SECRET_KEY: String(process.env.AWS_SECRET_KEY),
  BUCKET: String(process.env.AWS_S3_BUCKET),
  REGION: 'ap-northeast-2',
};

export const BUCKET_PATH_CONFIG = {
  REVIEW_IMAGE: 'ReviewImage',
};
