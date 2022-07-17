import { databaseInstance as database } from "../../database";
import { DeleteItemController } from "./delete-item-controller";
import { DeleteItemRepository } from "./delete-item-repository";
import { DeleteItemUsecase } from "./delete-item-usecase";

const deleteItemRepository = new DeleteItemRepository(database);
const deleteItemUsecase = new DeleteItemUsecase(deleteItemRepository);
export const deleteItemController = new DeleteItemController(deleteItemUsecase);