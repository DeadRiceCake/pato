import { Service } from 'typedi';
import { DMLResult } from '../../../common/model/DMLResultModel';
import { execute } from '../../../common/module/Database';
import { sensorQuery } from './SensorQuery';

@Service()
export class SensorRepository {
  /**
   * 자기장과 기압 데이터를 DB에 저장한다.
   * @param userId 유저 id
   * @param xAxis x축 자기장
   * @param yAxis y축 자기장
   * @param zAxiz z축 자기장
   * @param atmoPressure 기압
   */
  public async insertMagneticFieldAndAtmosphericPressureData(
    userId: number,
    xAxis: number,
    yAxis: number,
    zAxis: number,
    atmoPressure: number,
  ): Promise<DMLResult> {
    const query = sensorQuery.insertMagneticFieldAndAtmosphericPressureData;

    const executeQueryResult = await execute<DMLResult>(query, [userId, xAxis, yAxis, zAxis, atmoPressure]);

    return executeQueryResult;
  }

  /**
   * 자기장과 조도 데이터를 DB에 저장한다.
   * @param userId 유저 id
   * @param xAxis x축 자기장
   * @param yAxis y축 자기장
   * @param zAxis z축 자기장
   * @param lux 조도
   */
  public async insertMagneticFieldAndLuxData(
    userId: number,
    xAxis: number,
    yAxis: number,
    zAxis: number,
    lux: number,
  ): Promise<DMLResult> {
    const query = sensorQuery.insertMagneticFieldAndLuxData;

    const executeQueryResult = await execute<DMLResult>(query, [userId, xAxis, yAxis, zAxis, lux]);

    return executeQueryResult;
  }
}
