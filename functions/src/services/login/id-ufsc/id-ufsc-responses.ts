interface IdUfscUserProfileAttributes {
    adminIgnorarPendencias: string
    bloqueado: string
    cadastroVerificado: string
    cpf: string
    credentialType: string
    dataNascimento: string
    email: string
    emailInstitucional: string
    idPessoa: string
    login: string
    metodoDeAutenticacao: string
    multifatorHabilitado: string
    nome: string
    nomeSocial: string
    personName: string
    samlAuthenticationStatementAuthMethod: string
    senhaRedefinida: string
    usernameOriginal: string
    userType: string
  }

export interface IdUfscGetProfileResponse {
    attributes: IdUfscUserProfileAttributes
    id: string
  }
  

export interface IdUfscGetAccessTokenResponse {
    access_token: string
    token_type: string
    expires_in: number
  }