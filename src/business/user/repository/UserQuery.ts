export const userQuery = {
  selectUserById: `
    SELECT 
      *
    FROM
      indj_service.user
    WHERE
      idx = ?
  `,
};
