export const RESTAURANT_API_DESCRIPTION = {
  '[get] /': `
  ## request param
  - name: 식당 이름
  - offset: 페이지 번호
  - limit: 페이지 당 가져올 식당 개수
  ## response
  - id: 식당 아이디
  - restaurantThumbnail: 식당 썸네일
  - restaurantName: 식당 이름
  - restaurantType: 식당 타입 (예: 한식, 중식 등...)
  - address: 식당 주소
  - parkingScore: 주차장 점수
  - toiletScore: 화장실 점수
  `,

  '[post] /': `
  ## request body
  - address: 식당 주소
  - restaurantName: 식당 이름
  - locationX: 식당 위치 (경도)
  - locationY: 식당 위치 (위도)
  - isParkingLot: 주차장 유무 (0: 없음, 1: 무료, 2: 유료)
  - parkingCapacity: 주차 가능 차량 수
  - isToilet: 화장실 유무 (0: 없음, 1: 내부 남녀 구분, 2: 내부 남녀 공용, 3: 외부 남녀 구분, 4: 외부 남녀 공용)
  - toiletCleanliness: 화장실 청결도 (0: 낮음, 1: 보통, 2: 높음)
  - isSoap: 비누 유무 (0: 없음, 1: 비누, 2: 핸드워시)
  - isPaperTowel: 종이타월 유무 (0: 없음, 1: 종이타월, 2: 타월)
  - reporter: 제보자 이메일
  `,

  '[post] /reviews': `
  ## request body
  - restaurantId: 식당 아이디
  - parkingScore: 주차장 점수
  - toiletScore: 화장실 점수
  - content: 리뷰 내용
  `,

  '[get] /:restaurantId': `
  ## request param
  - restaurantId: 식당 아이디

  ## response body
  - restaurantDetails: 식당 상세 정보
    - restaurantId: 식당 아이디
    - restaurantName: 식당 이름
    - restaurantType: 식당 타입 (예: 한식, 중식 등...)
    - isParkingLot: 주차장 유무 (0: 없음, 1: 무료, 2: 유료)
    - parkingCapacity: 주차 가능 차량 수
    - isToilet: 화장실 유무 (0: 없음, 1: 내부 남녀 구분, 2: 내부 남녀 공용, 3: 외부 남녀 구분, 4: 외부 남녀 공용)
    - toiletCleanliness: 화장실 청결도 (0: 낮음, 1: 보통, 2: 높음)
    - isSoap: 비누 유무 (0: 없음, 1: 비누, 2: 핸드워시)
    - isPaperTowel: 종이타월 유무 (0: 없음, 1: 종이타월, 2: 타월)
    - parkingScore: 주차장 점수
    - toiletScore: 화장실 점수
  
  - restaurantReviews: 식당 리뷰
    - reviewId: 리뷰 아이디
    - parkingScore: 주차장 점수
    - toiletScore: 화장실 점수
    - title: 리뷰 제목
    - content: 리뷰 내용
    - imagePaths: 리뷰 이미지 경로
    - createdAt: 리뷰 생성 시간

  - restaurantImages: 식당 이미지
  `,

  '[put] /': `
  ## request body
  - restaurantId: 식당 아이디
  - isParkingLot: 주차장 유무 (0: 없음, 1: 있음(무료), 2: 있음(유료), 3:없음(공영주차장), 4:없음(갓길주차))
  - parkingCapacity: 주차 가능 차량 수
  - isToilet: 화장실 유무 (0: 없음, 1: 내부 남녀 구분, 2: 내부 남녀 공용, 3: 외부 남녀 구분, 4: 외부 남녀 공용)
  - toiletCleanliness: 화장실 청결도 (0: 낮음, 1: 보통, 2: 높음)
  - isSoap: 비누 유무 (0: 없음, 1: 비누, 2: 핸드워시)
  - isPaperTowel: 종이타월 유무 (0: 없음, 1: 종이타월, 2: 타월)
  `,
};
