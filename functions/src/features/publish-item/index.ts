import { databaseInstance as database } from "../../database";
import { UpdateScoreUserRepository } from "../shared/update-score-user-repository";
import { PublishItemController } from "./publish-item-controller";
import { PublishItemRepository } from "./publish-item-repository";
import { PublishItemUsecase } from "./publish-item-usecase";

const updateScoreUserRepository = new UpdateScoreUserRepository(database);
const publishItemRepository = new PublishItemRepository(database);
const publishItemUsecase = new PublishItemUsecase(publishItemRepository, updateScoreUserRepository);
export const publishItemController = new PublishItemController(publishItemUsecase);