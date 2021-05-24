export class User {
  id: string;
  countryCode: string;
  email: string;
  fullName: string;
  gender: string;
  imageUrl: string;
  nin: string;
  createdOn: Date;
  otherName: string;
  password: string;
  createdById: number;
  phoneNumber: string;
  role: Role;
  defaultRole: string;
  tempRole: boolean;
  tempRoleExpiryDate: string;
  username: string;

  constructor() {
    this.countryCode = "123";
    this.tempRole = false;
  }
}

export class Role {
  id: string;
  name: string;
  description: string;
  designation: string;
  defaultRole: string;
  createdOn: Date;
  createdBy: string;
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
