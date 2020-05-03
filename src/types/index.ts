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

export interface BaseOwner {
  name: string;
  type: string;
  idNum: string;
  comments: string;
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
  collaterals: Collateral[];

  // assetProperties: "parking" | "storage"
  // collaterals: "bankCollateral" | "bankCheck"

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

export type TaskType = "depositCheck" | "outOfChecks" | "endOfContract";
type TaskStatus = "active" | "done" | "snoozed" | "deleted";

export interface PopulatedTask extends Task {
  contract: PopulatedContract;
}
export interface Task extends BaseTask {
  id: string;
}
export interface BaseTask {
  contractId: string;
  taskType: TaskType;
  deadline: string;
  status: TaskStatus;
}

export enum CollateralType {
  bankCollateral = "bankCollateral",
  bankCheck = "bankCheck",
  personalCheck = "personalCheck",
  deposit = "deposit",
  other = "other",
}

export interface BaseCollateral {
  type: CollateralType;
  amount: number;
}

export interface BankCollateral extends BaseCollateral {
  type: CollateralType.bankCollateral;
  expirationDate: string;
}

export interface OtherCollateral extends BaseCollateral {
  type: CollateralType.other;
  description: string;
}

export interface personalCheck {
  type: CollateralType.personalCheck;
}

export type Collateral =
  | BaseCollateral
  | BankCollateral
  | OtherCollateral
  | personalCheck;
