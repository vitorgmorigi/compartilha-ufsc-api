import { CustomError } from "../../helpers/error";
import { UsecaseResponse } from "../../helpers/usecase-response";
import { LoginService } from "../../services/login/login-service";
import { UserLoginRepository } from "./user-login-repository";
import { errorCodes, UserLoginResponse } from "./user-login-utils";


export class UserLoginUsecase {
  constructor(
    private readonly userLoginRepository: UserLoginRepository, 
    private readonly loginService: LoginService
  ) {}

  async execute(token: string): Promise<UsecaseResponse<UserLoginResponse>> {
    let idUfscProfile;
    try {
      idUfscProfile = await this.loginService.getProfile(token);
    } catch (error) {
      throw new CustomError(errorCodes.TokenInvalidOrExpired, "Token inválido ou expirado");
    }

    const user = await this.userLoginRepository.get(idUfscProfile.login);

    if (user.isEmpty) {
      await this.userLoginRepository.create(idUfscProfile);

      const profileWithoutCPF: UserLoginResponse = { 
        id: idUfscProfile.id,
        birthday: idUfscProfile.birthday,
        email: idUfscProfile.email,
        institutionalEmail: idUfscProfile.institutionalEmail,
        login: idUfscProfile.login,
        name: idUfscProfile.name,
        privateCircles: []
      };

      return {  
        success: true,
        message: "Usuário criado com sucesso",
        data: profileWithoutCPF,
      };
    }

    return {
      success: true,
      message: "Usuário logado com sucesso",
      data: { ...user.get(), privateCircles: user.get().privateCircles.map((circle) => circle.id) },
    };
  }

}