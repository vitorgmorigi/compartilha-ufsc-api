import { IdUfscGetAccessTokenResponse, IdUfscGetProfileResponse } from "./id-ufsc-responses";
import { AccessToken, UserProfile } from "../contracts";

export class IdUfscLoginParser {
  parseAccessToken(idUfscAccessToken: IdUfscGetAccessTokenResponse): AccessToken {
    const response: AccessToken = {
      accessToken: idUfscAccessToken.access_token,
      tokenType: idUfscAccessToken.token_type,
      expiresIn: idUfscAccessToken.expires_in
    }; 
  
    return response;
  }
  
  parseProfile(idUfscProfile: IdUfscGetProfileResponse): Omit<UserProfile, "score"> {
    const response: Omit<UserProfile, "score"> = {
      id: idUfscProfile.id,
      cpf: idUfscProfile.attributes.cpf,
      birthday: idUfscProfile.attributes.dataNascimento,
      email: idUfscProfile.attributes.email,
      institutionalEmail: idUfscProfile.attributes.emailInstitucional,
      login: idUfscProfile.attributes.login,
      name: idUfscProfile.attributes.nomeSocial
    };
  
    return response;
  }
}


