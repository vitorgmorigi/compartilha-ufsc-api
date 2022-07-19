import axios, { AxiosResponse } from "axios";
import { envs } from "../../../config";
import { IdUfscGetAccessTokenResponse, IdUfscGetProfileResponse } from "./id-ufsc-responses";
import { LoginService } from "../login-service";
import { IdUfscLoginParser } from "./id-ufsc-login-parser";
import { AccessToken, UserProfile } from "../contracts";

export class IdUfscLoginService implements LoginService {
  constructor(private readonly idUfscLoginParser: IdUfscLoginParser) {}

  private axiosInstance = axios.create({
    baseURL: envs.host,
    timeout: 20000,
    headers: { "X-Custom-Header": "foobar" },
  });

  private static instance: IdUfscLoginService;

  public static getInstance(): IdUfscLoginService {
    if (!IdUfscLoginService.instance) {
      IdUfscLoginService.instance = new IdUfscLoginService(new IdUfscLoginParser());
    }
    
    return IdUfscLoginService.instance;
  }
  
  async getAccessToken(authorizationCode: string): Promise<AccessToken> {
    const url = "/token?"
      .concat(`grant_type=${envs.grant_type}&`)
      .concat(`code=${authorizationCode}&`)
      .concat(`client_id=${envs.client_id}&`)
      .concat(`redirect_uri=${envs.redirect_uri}&`)
      .concat(`client_secret=${envs.client_secret}`);
  
    const httpResponse: AxiosResponse = await this.axiosInstance.get(url);
  
    const { response: idUfscResponse }: { response: IdUfscGetAccessTokenResponse } = httpResponse.data;

    const response = this.idUfscLoginParser.parseAccessToken(idUfscResponse);
  
    return response;
  }
  
  async getProfile(accessToken: string): Promise<Omit<UserProfile, "score">> {
    const url = `/profile?access_token=${accessToken}`;
    
    const httpResponse: AxiosResponse = await this.axiosInstance.get(url);

    const { data: idUfscResponse }: { data: IdUfscGetProfileResponse } = httpResponse;

    const response = this.idUfscLoginParser.parseProfile(idUfscResponse);
  
    return response;
  }
}


