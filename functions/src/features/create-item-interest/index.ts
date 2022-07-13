import { databaseInstance as database } from "../../database";
import { CreateItemInterestController } from "./create-item-interest-controller";
import { CreateItemInterestRepository } from "./create-item-interest-repository";
import { CreateItemInterestUsecase } from "./create-item-interest-usecase";

const createItemInterestRepository = new CreateItemInterestRepository(database);
const createItemInterestUsecase = new CreateItemInterestUsecase(createItemInterestRepository);
export const createItemInterestController = new CreateItemInterestController(createItemInterestUsecase);