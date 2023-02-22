/**
 * supertest 요청의 헤더를 설정한다
 * @param token jwt 토큰
 */
export const setHeader = (token: string): { Authorization: string; Accept: string } => ({
  Authorization: `Bearer ${token}`,
  Accept: 'application/json',
});
