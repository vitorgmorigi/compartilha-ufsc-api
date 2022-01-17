import { transformToArray } from "../helpers/array";
import { UserProfile } from "../services/login/contracts";

export interface User {
    id: string,
    name: string,
    birthday: string,
    login: string,
    cpf: string,
    circles: string[],
    createdAt: string,
    email: string,
    institutionalEmail: string,
}

export interface UserDatabase {
    id: string,
    created_at: string,
    login: string,
    cpf: string,
    name: string,
    name_as_array: string[],
    birthday: string,
    circles: string[],
    email: string,
    institutional_email: string,
}

export function fromDatabase(
  userDb: UserDatabase
): User {
  return { 
    id: String(userDb.id), 
    name: userDb.name, 
    birthday: userDb.birthday,
    login: userDb.login,
    cpf: userDb.cpf,
    circles: userDb.circles,
    createdAt: userDb.created_at,
    email: userDb.email,
    institutionalEmail: userDb.institutional_email,
  };
}

export function toDatabase(user: UserProfile): UserDatabase {
  return {
    id: user.id,
    created_at: new Date().toISOString(),
    name: user.name,
    name_as_array: transformToArray(user.name),
    login: user.login,
    cpf: user.cpf,
    birthday: user.birthday,
    circles: [], // TODO: Rever depois
    email: user.email,
    institutional_email: user.institutionalEmail,
  };
}