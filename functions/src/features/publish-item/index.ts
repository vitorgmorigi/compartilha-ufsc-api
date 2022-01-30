import { databaseInstance as database } from "../../database";
import { PublishItemController } from "./publish-item-controller";
import { PublishItemRepository } from "./publish-item-repository";
import { PublishItemUsecase } from "./publish-item-usecase";

const publishItemRepository = new PublishItemRepository(database);
const publishItemUsecase = new PublishItemUsecase(publishItemRepository);
export const publishItemController = new PublishItemController(publishItemUsecase);