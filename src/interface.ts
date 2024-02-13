export interface IUser {
}

export interface IListUsers {
  skip?: number;
  take?: number;
}

export interface ICreateUser {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface IGetUser {
  id: string;
}

export interface IGetUserBy<T = string, R = string> {
  field: T;
  value: R;
}

export type IUpdateUser = IGetUser & Partial<ICreateUser>;

export type IDeleteUser = IGetUser;

export type ILogin = Pick<ICreateUser, "email" | "password">;

export type IRegister = ICreateUser;

export interface IRefreshToken {
  token: string;
}