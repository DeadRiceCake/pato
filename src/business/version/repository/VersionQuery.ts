export const versionQuery = {
  getCurrentIOSVersionForced: `
    SELECT 
        version 
    FROM
        indj_service.server_version_ios
    WHERE 
        force_update = 1
    ORDER BY 
        created_at DESC
    LIMIT 1`,
  getCurrentAndroidVersionForced: `
    SELECT 
        version 
    FROM
        indj_service.server_version_android
    WHERE 
        force_update = 1
    ORDER BY 
        created_at DESC
    LIMIT 1`,
  getCurrentIOSVersion: `
    SELECT
      version
    FROM 
      indj_service.server_version_ios
    ORDER BY 
      created_at DESC
    LIMIT 1
  `,
  getCurrentAndroidVersion: `
    SELECT
      version
    FROM 
      indj_service.server_version_android
    ORDER BY 
      created_at DESC
    LIMIT 1
  `,
};
