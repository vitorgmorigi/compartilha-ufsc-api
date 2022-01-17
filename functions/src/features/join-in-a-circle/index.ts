import { databaseInstance as database } from "../../database";
import { JoinInACircleController } from "./join-in-a-circle-controller";
import { JoinInACircleRepository } from "./join-in-a-circle-repository";
import { JoinInACircleUsecase } from "./join-in-a-circle-usecase";

const joinInACircleRepository = new JoinInACircleRepository(database);
const joinInACircleUsecase = new JoinInACircleUsecase(joinInACircleRepository);
export const joinInACircleController = new JoinInACircleController(joinInACircleUsecase);