export interface SecurityLevel{
  SecurityRole: RoleDTO[];
  SecurityUrl: SecurityRoleFunctionDTO[];
  UserData: AccountInfoData;
}

export interface RoleDTO{
  RoleID: string;
  RoleName: string;
  Description: string;
}

export interface SecurityRoleFunctionDTO{
  RoleName: string;
  Url: string;
  Description: string;
}

export interface AccountInfoData{
  UserId: string;
  AccountName: string;
  UserName: string;
  Password: string;
  Message: string;
}

