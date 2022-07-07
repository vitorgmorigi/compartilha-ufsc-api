import { ListCategoriesController } from "./list-categories-controller";
import { ListCategoriesRepository } from "./list-categories-repository";
import { ListCategoriesUsecase } from "./list-categories-usecase";
import { databaseInstance as database } from "../../database";

const listCategoriesRepository = new ListCategoriesRepository(database);
const listCategoriesUsecase = new ListCategoriesUsecase(listCategoriesRepository);
export const listCategoriesController = new ListCategoriesController(listCategoriesUsecase);