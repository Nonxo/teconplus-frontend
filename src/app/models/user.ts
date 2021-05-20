export class User {
  countryCode: string;
  email: string;
  fullName: string;
  gender: string;
  imageUrl: string;
  nin: string;
  otherName: string;
  password: string;
  phoneNumber: string;
  role: Role;
  defaultRole: string;
  tempRole: Date;
  username: string;
}

export class Role {
  id: string;
  name: string;
  privileges: any[];
}
