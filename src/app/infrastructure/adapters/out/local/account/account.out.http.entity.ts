export interface AccountOutHttpEntity {
  id: number;
  email: string;
  username: string;
  name: string;
  password: string;
  last_password: string;
  tenant_code: string;
  active: 0 | 1;
  two_factor_auth: 0 | 1;
  roles: string[];
  permission: string[];

  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
