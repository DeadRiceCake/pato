export const sensorQuery = {
  insertMagneticFieldAndAtmosphericPressureData: `
    INSERT INTO 
      indj_client_log.Cli_Magnetic_Atmo_Log
        (USER_ID, X_AXIS, Y_AXIS, Z_AXIS, ATMO_PRESS)
    VALUES
      (?, ?, ?, ?, ?)
  `,
  insertMagneticFieldAndLuxData: `
    INSERT INTO 
      indj_client_log.Cli_Magnetic_Lux_Log
        (USER_ID, X_AXIS, Y_AXIS, Z_AXIS, LUX)
    VALUES
      (?, ?, ?, ?, ?)
  `,
};
