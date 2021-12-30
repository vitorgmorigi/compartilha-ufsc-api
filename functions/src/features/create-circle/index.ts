import { databaseInstance as database } from "../../database";
import { CreateCircleController } from "./create-circle-controller";
import { CreateCircleRepository } from "./create-circle-repository";
import { CreateCircleUsecase } from "./create-circle-usecase";

const createCircleRepository = new CreateCircleRepository(database);
const createCircleUsecase = new CreateCircleUsecase(createCircleRepository);
export const createCircleController = new CreateCircleController(createCircleUsecase);