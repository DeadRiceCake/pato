export const restaurantQuery = {
  searchRestaurantByName: `
    SELECT 
      r.id,
      r.restaurantName,
      r.restaurantType,
      IF(r.addressStreet = '없음', r.address, r.addressStreet) AS address,
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
    WHERE 
      r.restaurantName LIKE ?
    LIMIT
      ?, ?
  `,
};
