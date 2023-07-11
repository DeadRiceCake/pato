export const RESTAURANT_REQUEST_BODY = {
  '[post] /reviews': {
    content: {
      'application/json': {
        example: {
          restaurantId: 1004,
          parkingScore: 0,
          toiletScore: 3,
          reviewContent: '좋아요',
        },
      },
    },
  },
};
