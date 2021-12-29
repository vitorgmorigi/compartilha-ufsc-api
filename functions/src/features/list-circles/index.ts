import { ListCirclesController } from "./list-circles-controller";
import { ListCirclesRepository } from "./list-circles-repository";
import { ListCirclesUsecase } from "./list-circles-usecase";
import { databaseInstance as database } from "../../database";

const listCirclesRepository = new ListCirclesRepository(database);
const listCirclesUsecase = new ListCirclesUsecase(listCirclesRepository);
export const listCirclesController = new ListCirclesController(listCirclesUsecase);