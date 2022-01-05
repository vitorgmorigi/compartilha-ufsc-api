import { CustomError } from "../../helpers/error";
import { IdUfscLoginService } from "../../services/login/id-ufsc/id-ufsc-login-service";
import { UserLoginRepository } from "./user-login-repository";
import { UserLoginResponse } from "./user-login-response";
import { errorCodes } from "./user-login-utils";


export class UserLoginUsecase {

  constructor(
    private readonly userLoginRepository: UserLoginRepository, 
    private readonly idUfscLoginService: IdUfscLoginService
  ) {}

  async execute(token: string): Promise<UserLoginResponse> {
    let idUfscProfile;
    try {
      idUfscProfile = await this.idUfscLoginService.getProfile(token);
    } catch (error) {
      throw new CustomError(errorCodes.TokenInvalidOrExpired, "Token inválido ou expirado");
    }

    const user = await this.userLoginRepository.get(idUfscProfile.login);

    if (user.isEmpty) {
      await this.userLoginRepository.create(idUfscProfile);

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