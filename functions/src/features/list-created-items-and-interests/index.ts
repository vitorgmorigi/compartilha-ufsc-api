import { ListCreatedItemsAndInterestsController } from "./list-created-items-and-interests-controller";
import { ListCreatedItemsAndInterestsRepository } from "./list-created-items-and-interests-repository";
import { ListCreatedItemsAndInterestsUsecase } from "./list-created-items-and-interests-usecase";
import { databaseInstance as database } from "../../database";

const listCreatedItemsAndInterestsRepository = new ListCreatedItemsAndInterestsRepository(database);

const listCreatedItemsAndInterestsUsecase = 
    new ListCreatedItemsAndInterestsUsecase(listCreatedItemsAndInterestsRepository);

export const listCreatedItemsAndInterestsController = 
    new ListCreatedItemsAndInterestsController(listCreatedItemsAndInterestsUsecase);