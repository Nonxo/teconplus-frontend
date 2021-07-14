import {Role} from "../../../models/user";

export class Equipment {
  actionItemList: number;
  actionPointMen: number;
  assetNumber: string;
  cocexpirationDate: Date;
  dateOfLastCertification: Date;
  description: string;
  equipmentGroup: number;
  equipmentName: string;
  equipmentState: string;
  equipmentType: number;
  heightInCm: string;
  imageUrl: string;
  lengthInCm: string;
  location: number;
  model: string;
  oemreferenceManualUrl: string;
  parentEquipment: number;
  preventionGroup: string;
  primaryCheckInterval: string;
  purchaseDate: string;
  quantityAcquired: number;
  secondaryCheckInterval: string;
  serialNumber: string;
  subsidiary: number;
  supportingDocUrl: string;
  weightInGrams: string;
  widthInCm: string;
  yearOfManufacture: number;
}

export class Request {
  id: string;
  approvalActivity: string;
  approvalDate: Date;
  approvalLevels: number;
  approvalStatus: string;
  approvalRole: Role;
  approver: string;
  comment: string;
  createdById: number;
  createdOn: Date
  currentApprovalLevel: number
  tpEquipment: Equipment
}
