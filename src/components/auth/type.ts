type Role = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: boolean;
};

export type User = {
  id: number;
  email: string;
  firstname: string;
  surname: string;
  is_active: boolean;
  phone_number: string;
  role_id: number;
  permissions: string[];
  role: Role;
  created_at: Date;
  deleted_at: boolean;
  last_login_at: Date;
  last_password_updated_at: Date;
};
