export interface CustomRequestFile extends Express.Multer.File {
  key: string;
}
