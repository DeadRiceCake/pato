export class JwtPayload {
  public id!: number;
  public payment!: number;
  public quit!: number;
  public adult!: number;
  public platform!: number;
  public urlEnc!: string;
  public tag!: number;
  public verify?: boolean;
  public exp?: number;
}
