import { AccessToken, UserProfile } from "./contracts";

export abstract class LoginService {
    public abstract getAccessToken(authorizationCode: string): Promise<AccessToken>
    public abstract getProfile(accessToken: string): Promise<UserProfile>
}