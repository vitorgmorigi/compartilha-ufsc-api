import { UserProfile } from "../../services/login/contracts";

export interface UserLoginResponse {
    success: boolean,
    message: string,
    data: UserProfile
}