import { CustomError } from "../../helpers/error";
import { UsecaseResponse } from "../../helpers/usecase-response";
import { UserProfile } from "../../services/login/contracts";
import { LoginService } from "../../services/login/login-service";
import { UserLoginRepository } from "./user-login-repository";
import { errorCodes } from "./user-login-utils";


export class UserLoginUsecase {
  constructor(
    private readonly userLoginRepository: UserLoginRepository, 
    private readonly loginService: LoginService
  ) {}

  async execute(token: string): Promise<UsecaseResponse<UserProfile>> {
    let idUfscProfile;
    try {
      idUfscProfile = await this.loginService.getProfile(token);
    } catch (error) {
      throw new CustomError(errorCodes.TokenInvalidOrExpired, "Token inválido ou expirado");
    }

    const user = await this.userLoginRepository.get(idUfscProfile.login);

    if (user.isEmpty) {
      const publicCircles = await this.userLoginRepository.getPublicCircles();

      await this.userLoginRepository.create(idUfscProfile, publicCircles);

      return {  
        success: true,
        message: "Usuário criado com sucesso",
        data: idUfscProfile,
      };
    }

    return {
      success: true,
      message: "Usuário logado com sucesso",
      data: idUfscProfile,
    };
  }

}