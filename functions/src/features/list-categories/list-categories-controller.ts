import { Category } from "../../models/category";
import { ListCategoriesUsecase } from "./list-categories-usecase";

export class ListCategoriesController {

  constructor(private readonly listCirclesUsecase: ListCategoriesUsecase) {}

  async handle(): Promise<Category[]> {
    return this.listCirclesUsecase.execute();
  }

}