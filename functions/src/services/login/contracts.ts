export interface UserProfile {
    id: string,
    name: string,
    birthday: string,
    login: string,
    cpf: string,
    email: string,
    institutionalEmail: string,
}

export interface AccessToken {
    accessToken: string,
    tokenType: string,
    expiresIn: number
}