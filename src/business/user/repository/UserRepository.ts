import { Service } from 'typedi';
import { execute } from '../../../common/module/Database';
import { User } from '../model/entity/UserModel';
import { userQuery } from './UserQuery';

@Service()
export class UserRepository {
  /**
   * 유저 id를 기준으로 유저를 조회한다.
   * @param userId 유저 id
   */
  public async selectUserById(userId: number): Promise<User[]> {
    const query = userQuery.selectUserById;

    const executeQueryResult = await execute<User[]>(query, [userId]);

    return executeQueryResult;
  }
}
