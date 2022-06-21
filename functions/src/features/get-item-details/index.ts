import { ListFeedController } from "./get-item-details-controller";
import { GetItemDetailsRepository } from "./get-item-details-repository";
import { GetItemDetailsUsecase } from "./get-item-details-usecase";
import { databaseInstance as database } from "../../database";

const getItemDetailsRepository = new GetItemDetailsRepository(database);
const getItemDetailsUsecase = new GetItemDetailsUsecase(getItemDetailsRepository);
export const getItemDetailsController = new ListFeedController(getItemDetailsUsecase);