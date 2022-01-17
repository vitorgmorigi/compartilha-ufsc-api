import { CustomError } from "../../helpers/error";
import { UsecaseResponse } from "../../helpers/usecase-response";
import { CircleVisibility } from "../../models/circle";
import { JoinInACircleRepository } from "./join-in-a-circle-repository";
import { errorCodes } from "./join-in-a-circle-utils";

export class JoinInACircleUsecase {
  constructor(
    private readonly joinInACircleRepository: JoinInACircleRepository, 
  ) {}

  async execute(userId: string, circleId: string, circlePassword?: string): Promise<UsecaseResponse<undefined>> {
    console.log("INÍCIO DO USECASE");
    console.log("Senha digitada: ", circlePassword);

    const circleOption = await this.joinInACircleRepository.findCircle(circleId);

    if (circleOption.isEmpty) {
      throw new CustomError(errorCodes.CircleNotFound, "Círculo não encontrado");
    }

    const circle = circleOption.get();

    console.log("Senha no banco: ", circle?.password);

    if (circle.visibility === CircleVisibility.Private) {
      const isPasswordDefined = circlePassword !== undefined;

      if (!isPasswordDefined) {
        throw new CustomError(errorCodes.CirclePasswordUndefined, "É necessário informar a senha do círculo");
      }

      const isPasswordCorrect = circlePassword === circle?.password;

      console.log("Check: ", circlePassword === circle?.password);

      if (!isPasswordCorrect) {
        throw new CustomError(errorCodes.CirclePasswordIncorrect, "A senha do círculo está incorreta!");
      }
    }

    try {
      await this.joinInACircleRepository.join(userId, circleId);
    } catch (error) {
      throw new CustomError(errorCodes.JoinCircleError, "Ocorreu um erro ao tentar entrar no círculo");
    }


    return {
      success: true,
      message: `Você ingressou no círculo ${circle.name} com sucesso`,
    };
  }

}