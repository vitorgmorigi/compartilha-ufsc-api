import { databaseInstance as database } from "../../database";
import { ReplyItemInterestController } from "./reply-item-interest-controller";
import { ReplyItemInterestRepository } from "./reply-item-interest-repository";
import { ReplyItemInterestUsecase } from "./reply-item-interest-usecase";

const replyItemInterestRepository = new ReplyItemInterestRepository(database);
const replyItemInterestUsecase = new ReplyItemInterestUsecase(replyItemInterestRepository);
export const replyItemInterestController = new ReplyItemInterestController(replyItemInterestUsecase);