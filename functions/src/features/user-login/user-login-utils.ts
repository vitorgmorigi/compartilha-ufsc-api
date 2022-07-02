export enum errorCodes {
    TokenInvalidOrExpired = 'token_invalid_or_expired',
  }

export interface UserLoginResponse {
    id: string,
    name: string,
    birthday: string,
    login: string,
    email: string,
    institutionalEmail: string,
    privateCircles: string[]
}