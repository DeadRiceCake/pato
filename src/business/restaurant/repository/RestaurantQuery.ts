import { IMAGE_FILE_PATH } from '../../../config/Constant';

export const restaurantQuery = {
  searchRestaurantByName: `
    SELECT 
      r.id,
      IF(ri.imageName IS NULL,
        '',
        CONCAT('${IMAGE_FILE_PATH.RESTAURANT}', ri.imageName)) AS restaurantThumbnail,
      r.restaurantName,
      r.restaurantType,
      IF(r.addressStreet IS NULL, r.address, r.addressStreet) AS address,
      IFNULL((
        SELECT
          ROUND(AVG(rr1.parkingScore), 1)
        FROM
          Restaurant_Review AS rr1
        WHERE
          rr1.restaurantId = r.id
        GROUP BY
          rr1.restaurantId
      ), 0) AS parkingScore,
      IFNULL((
        SELECT
          ROUND(AVG(rr2.toiletScore), 1)
        FROM
          Restaurant_Review AS rr2
        WHERE
          rr2.restaurantId = r.id
        GROUP BY
          rr2.restaurantId
      ), 0) AS toiletScore
    FROM 
      Restaurant AS r LEFT JOIN
      Restaurant_Image AS ri ON r.id = ri.restaurantId
    WHERE 
      r.restaurantName LIKE ?
    LIMIT
      ?, ?
  `,

  insertRestaurant: `
    INSERT INTO
      Restaurant
        (addressStreet, restaurantName, locationX, locationY)
    VALUES
      (?, ?, ?, ?)
  `,

  insertRestaurantConvenience: `
    INSERT INTO
      Restaurant_Convenience
        (restaurantId, isParkingLot, parkingCapacity, isToilet, toiletCleanliness, isSoap, isPaperTowel, reporter)
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?)
  `,

  insertRestaurantReview: `
    INSERT INTO
      Restaurant_Review
      (restaurantId, parkingScore, toiletScore, content, imageName)
    VALUES
      (?,?,?,?,?)
  `,

  selectRestaurantDetailByRestautantId: `
  SELECT 
    r.id AS restaurantId,
    r.restaurantName,
    r.restaurantType,
    IF(r.addressStreet IS NULL, r.address, r.addressStreet) AS address,
    rc.isParkingLot,
    rc.parkingCapacity,
    rc.isToilet,
    rc.toiletCleanliness,
    rc.isSoap,
    rc.isPaperTowel,
    IFNULL((
      SELECT
        ROUND(AVG(rr1.parkingScore), 1)
      FROM
        Restaurant_Review AS rr1
      WHERE
        rr1.restaurantId = r.id
      GROUP BY
        rr1.restaurantId
    ), 0) AS parkingScore,
    IFNULL((
      SELECT
        ROUND(AVG(rr2.toiletScore), 1)
      FROM
        Restaurant_Review AS rr2
      WHERE
        rr2.restaurantId = r.id
      GROUP BY
        rr2.restaurantId
    ), 0) AS toiletScore
  FROM 
    Restaurant AS r 
  LEFT JOIN
    Restaurant_Convenience AS rc ON r.id = rc.restaurantId 
  WHERE 
    r.id = ?
  `,

  selectRestaurantReviewsByRestaurantId: `
  SELECT 
    rr.id AS reviewId,
    rr.parkingScore,
    rr.toiletScore,
    rr.title,
    rr.content,
    IFNULL(
      rr.imageName,
      NULL) AS imageNames,
    rr.createdAt
  FROM 
    Restaurant_Review AS rr
  WHERE 
    rr.restaurantId = ?
  ORDER BY
    rr.createdAt DESC
  `,

  upsertRestaurantConvenience: `
    INSERT INTO
      PATO.Restaurant_Convenience
      (restaurantId, isParkingLot, parkingCapacity, isToilet, toiletCleanliness, isSoap, isPaperTowel)
    VALUES
      (?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY
    UPDATE
      isParkingLot = ?,
      parkingCapacity = ?,
      isToilet = ?,
      toiletCleanliness = ?,
      isSoap = ?,
      isPaperTowel = ?
  `,
};
