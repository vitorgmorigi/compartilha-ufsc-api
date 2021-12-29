import { ListCirclesController } from "./list-circles-controller";
import { ListCirclesRepository } from "./list-circles-repository";
import { ListCirclesUsecase } from "./list-circles-usecase";

const listCirclesRepository = new ListCirclesRepository();
const listCirclesUsecase = new ListCirclesUsecase(listCirclesRepository);
export const listCirclesController = new ListCirclesController(listCirclesUsecase);