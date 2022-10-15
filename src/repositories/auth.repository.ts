import client from "./client";
import { UserModel } from "../common/user.model";

export interface loginDTO {
  email: string;
  password: string;
}

export const login = async ({ email, password }: loginDTO) => {
  const { data } = await client.post<UserModel>("/sessions", { email, password });
  return data;
};
