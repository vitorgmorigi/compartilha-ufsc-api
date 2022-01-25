import { databaseInstance as database } from "../../database";
import { CreateCategoryController } from "./create-category-controller";
import { CreateCategoryUsecase } from "./create-category-usecase";
import { CreateCategoryRepository } from "./create-category-repository";

const createCategoryRepository = new CreateCategoryRepository(database);
const createCategoryUsecase = new CreateCategoryUsecase(createCategoryRepository);
export const createCategoryController = new CreateCategoryController(createCategoryUsecase);