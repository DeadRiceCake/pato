import { execute } from '../../src/common/module/Database';

export class TruncateTeamsTable {
  /**
   * 테이브를 초기화한다.
   * @param table 테이블 이름
   */
  public async truncateTable(table: string): Promise<void> {
    try {
      await execute(`TRUNCATE TABLE ${table}`, []);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 테이블에 데이터를 삽입한다.
   */
  public async insertDatas(): Promise<void> {
    try {
      await execute(
        `
        INSERT INTO 
          tmp.teams (id, name, league, isActive)
        VALUES
          (1, 'Real Madrid', 'La Liga', 1),
          (2, 'Barcelona', 'La Liga', 1),
          (3, 'Manchester United', 'Premier League', 1),
          (4, 'Liverpool', 'Premier League', 1),
          (5, 'Arsenal', 'Premier League', 1),
          (6, 'Inter', 'Serie A', 1),
          (7, 'Milan', 'Serie A', 1),
          (8, 'Juventus', 'Serie A', 1)
        `,
        [],
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export class TruncateSensorTable {
  /**
   * 테이브를 초기화한다.
   * @param table 테이블 이름
   */
  public async truncateTable(): Promise<void> {
    try {
      await execute(`TRUNCATE TABLE indj_client_log.Cli_Magnetic_Lux_Log`, []);
      await execute(`TRUNCATE TABLE indj_client_log.Cli_Magnetic_Atmo_Log`, []);
    } catch (error) {
      console.log(error);
    }
  }
}
