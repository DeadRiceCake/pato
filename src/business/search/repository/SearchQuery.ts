export const searchQuery = {
  searchRestaurantByName: `
    SELECT 
      restaurantName,
      restaurantType,
      IF(addressStreet = '없음', address, addressStreet) AS address,
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
      )) AS toiletScore
  FROM 
    Restaurant AS r
  WHERE 
    r.restaurantName LIKE "%대호%"
  `,
};
