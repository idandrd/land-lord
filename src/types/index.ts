export interface Unit {
  id: string;
  name: string;
  type: string;
  owner: string;
  mainSize: string;
  gardenSize: string;
  balconySize: string;
  storageSize: string;
  parkings: string;
  parkingIndexes: string;
}

export interface BaseAsset {
  name: string;
  city: string;
  address: string;
  year: number;
  floors: number;
  type: string;
  storageSize: string;
  parkings: string;
  parkingIndexes: string;
  units: Unit[];
}

export interface Asset extends BaseAsset {
  id: string;
}

export interface BaseContract {
  tenantId: string;
  assetId: string;
  unitIds: string[];
  signingDate: string;
  startLeaseDate: string;
  leaseLength: number;
  gracePeriodLength: number;
  optionPeriods: Option[];
  paymentEveryMonths: number;
  paymentAmount: number;
  
  // firstCheckDate: string;
  // amountOfChecksRecieved: string;
}

export interface Option {
  leaseLength: number;
  noticeAhead: number;
}
