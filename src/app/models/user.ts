export class User {
  id: number;
  locked: boolean;
  countryCode: string;
  email: string;
  fullName: string;
  gender: string;
  imageUrl: string;
  nin: string;
  createdOn: Date;
  otherName: string;
  designation: string;
  password: string;
  createdById: number;
  phoneNumber: string;
  role: any;
  defaultRole: any;
  tempRole: boolean;
  tempRoleExpiryDate: Date;
  username: string;

  constructor() {
    this.countryCode = "+234";
    this.tempRole = false;
  }
}

export class Role {
  id: number;
  name: string;
  description: string;
  designation: string;
  defaultRole: string;
  createdOn: Date;
  createdBy: string;
  createdByEmail: string;
  privileges: string[];
}

export class Privilege {
  id: string;
  name: string;
  designation: string;
  description: string;
  createdOn: Date;
  createdBy: string;
  privilegeEnum: string;
}
