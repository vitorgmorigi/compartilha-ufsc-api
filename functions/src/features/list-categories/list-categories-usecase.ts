import { Category } from "../../models/category";
import { ListCategoriesRepository } from "./list-categories-repository";

export class ListCategoriesUsecase {

  constructor(public readonly listCategoriesRepository: ListCategoriesRepository) {}

  async execute(): Promise<Category[]> {
    return this.listCategoriesRepository.list();
  }

}