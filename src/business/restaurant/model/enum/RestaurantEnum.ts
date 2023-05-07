export type ParkingLotType = 'no' | 'free' | 'paid';
export enum ParkingLot {
  no = 0,
  free = 1,
  paid = 2,
}

export type ToiletType = 'no' | 'insideSeparate' | 'insideShared' | 'outsideSeparate' | 'outsideShared';
export enum Toilet {
  no = 0,
  insideSeparate = 1,
  insideShared = 2,
  outsideSeparate = 3,
  outsideShared = 4,
}

export type ToiletCleanlinessType = 'low' | 'medium' | 'high';
export enum ToiletCleanliness {
  low = 0,
  medium = 1,
  high = 2,
}

export type SoapType = 'no' | 'soap' | 'handwash';
export enum Soap {
  no = 0,
  soap = 1,
  handwash = 2,
}

export type PaperTowelType = 'no' | 'paperTowel' | 'towel';
export enum PaperTowel {
  no = 0,
  paperTowel = 1,
  towel = 2,
}
