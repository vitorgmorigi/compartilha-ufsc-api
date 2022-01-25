import { CustomError, handleError } from "../../helpers/error";
import { HttpResponse } from "../../helpers/http-response";
import { Status } from "../../helpers/status-codes";
import { CreateCategoryUsecase } from "./create-category-usecase";
import { errorCodes } from "./create-category-utils";

export class CreateCategoryController {

  constructor(private readonly createCategoryUsecase: CreateCategoryUsecase) {}

  private errorTranslator = {
    [errorCodes.CategoryAlreadyExists]: {
      statusCode: Status.Conflict,
    },
  };

  async handle(name: string, createdBy: string): Promise<HttpResponse> {
    try {
      await this.createCategoryUsecase.execute(name, createdBy);

      const response = {  
        success: true,
        message: `Categoria ${name} criada com sucesso`,
      };

      return new HttpResponse(Status.OK, response);
    } catch (error) {
      return handleError(error as CustomError, this.errorTranslator);
    }
  }

}