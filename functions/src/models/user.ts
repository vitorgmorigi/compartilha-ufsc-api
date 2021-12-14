import { Circle } from "./circle";

export interface User {
    name: string,
    birthday: string,
    login: string,
    cpf: string,
    circles: Circle[],
    createdAt: string,
    email: string,
    institutionalEmail: string,
}