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
  phoneNumber: string;
  role: Role;
  defaultRole: string;
  tempRole: Date;
  username: string;

  constructor() {
    this.role = new Role();
  }
}

export class Role {
  id: string;
  name: string;
  privileges: any[];
}