export interface UserProfile {
    id: string,
    name: string,
    birthday: string,
    login: string,
    cpf: string,
    email: string,
    institutionalEmail: string,
    score: number
}

export interface AccessToken {
    accessToken: string,
    tokenType: string,
    expiresIn: number
}