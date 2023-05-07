import { AWS_CONFIG } from './Env';

export const IMAGE_FILE_PATH = {
  RESTAURANT: `${AWS_CONFIG.CDN_URL}ResaurantThumbnail/`,
  REVIEW: `${AWS_CONFIG.CDN_URL}ReviewImage/`,
  DEFAULT: `default.jpeg`,
};
