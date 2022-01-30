import { ListFeedController } from "./list-feed-controller";
import { ListFeedRepository } from "./list-feed-repository";
import { ListFeedUsecase } from "./list-feed-usecase";
import { databaseInstance as database } from "../../database";

const listFeedRepository = new ListFeedRepository(database);
const listFeedUsecase = new ListFeedUsecase(listFeedRepository);
export const listFeedController = new ListFeedController(listFeedUsecase);