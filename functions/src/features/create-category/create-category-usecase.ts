import { v4 as uuidv4 } from "uuid";
import { CustomError } from "../../helpers/error";
import { Category } from "../../models/category";
import { errorCodes } from "./create-category-utils";

import { CreateCategoryRepository } from "./create-category-repository";

export class CreateCategoryUsecase {

  constructor(public readonly createCategoryRepository: CreateCategoryRepository) {}

  async execute(name: string, createdBy: string): Promise<void> {
    const categoryAlreadyExists = (await this.createCategoryRepository.check(name)).isDefined;

    if (categoryAlreadyExists) {
      throw new CustomError(errorCodes.CategoryAlreadyExists, "A categoria já existe");
    }

    const category: Category = {
      id: uuidv4(),
      name,
      createdBy
    };

    return this.createCategoryRepository.create(category);
  }

}