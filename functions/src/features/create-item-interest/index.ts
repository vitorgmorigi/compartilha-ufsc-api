import { databaseInstance as database } from "../../database";
import { mailerServiceInstance } from "../../services/mailer";
import { CreateItemInterestController } from "./create-item-interest-controller";
import { CreateItemInterestRepository } from "./create-item-interest-repository";
import { CreateItemInterestUsecase } from "./create-item-interest-usecase";

const createItemInterestRepository = new CreateItemInterestRepository(database);
const createItemInterestUsecase = new CreateItemInterestUsecase(createItemInterestRepository, mailerServiceInstance);
export const createItemInterestController = new CreateItemInterestController(createItemInterestUsecase);