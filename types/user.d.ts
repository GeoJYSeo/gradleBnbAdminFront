export type UserType = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  birthday: string;
  status: string;
  access: string;
}

export type UserValidationType = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  birthMonth: string | undefined;
  birthDay: string | undefined;
  birthYear: string | undefined;
}
