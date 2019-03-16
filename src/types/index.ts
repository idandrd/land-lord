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

export interface Tenant extends BaseTenant {
  id: string;
}

export interface BaseTenant {
  name: string;
  type: string;
  isBusiness: boolean;
  idNum: string;
  comments: string;
  contacts: Contact[];
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface PopulatedContract extends Contract {
  tenant: Tenant;
  asset: Asset;
}

export interface Contract {
  id: string;
  tenantId: string;
  assetId: string;
  unitIds: string[];
  signingDate: string;
  startLeaseDate: string;
  leaseLength: number;
  gracePeriodLength: number;
  optionPeriods: Option[];
  paymentEveryMonths: number;
  monthDayOfPayment: number;
  paymentMethod: "check" | "cash" | "bankTransfer" | "other";
  paymentIndexLink: "madad" | "madadUps" | "dolar" | "other";
  checkBundles: CheckBundle[];
  paymentPeriods: PaymentPeriod[];

  // assetProperties: "parking" | "storage"
  // guarantees: "bankGuarantee" | "bankCheck"

  comments: string;
}

export interface Option {
  leaseLength: number;
  noticeAhead: number;
}

export interface PaymentPeriod {
  lengthInMonths: number;
  amountPerMonth: number;
}

export interface CheckBundle {
  amountOfChecks: number;
  dateOfFirstCheck: string;
  checkForHowManyMonths: number;
}

type TaskType = "depositCheck";
type TaskStatus = "active" | "done" | "snoozed" | "deleted";

export interface Task {
  contractId: string;
  taskType: TaskType;
  deadline: string;
  status: TaskStatus;
}
