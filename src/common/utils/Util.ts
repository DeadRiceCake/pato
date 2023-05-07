export class Utils {
  /**
   * DB LIKE 검색을 위한 키워드 생성
   * @param keyword 키워드
   * @returns '%{키워드}%'
   */
  public static makeKeywordForLike(keyword: string): string {
    return `%${keyword}%`;
  }

  public static getFileNameFromPath(path: string): string {
    const pathArray = path.split('/');

    return pathArray[pathArray.length - 1];
  }
}
