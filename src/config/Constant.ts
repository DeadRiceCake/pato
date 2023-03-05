import { AWS_CONFIG } from './Env';

export const IMAGE_FILE_PATH = {
  RESTAURANT: `${AWS_CONFIG.CDN_URL}ResaurantThumbnail/`,
  DEFAULT: `default.jpeg`,
};
