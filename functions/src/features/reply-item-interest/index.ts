import { databaseInstance as database } from "../../database";
import { mailerServiceInstance } from "../../services/mailer";
import { ReplyItemInterestController } from "./reply-item-interest-controller";
import { ReplyItemInterestRepository } from "./reply-item-interest-repository";
import { ReplyItemInterestUsecase } from "./reply-item-interest-usecase";

const replyItemInterestRepository = new ReplyItemInterestRepository(database);
const replyItemInterestUsecase = new ReplyItemInterestUsecase(replyItemInterestRepository, mailerServiceInstance);
export const replyItemInterestController = new ReplyItemInterestController(replyItemInterestUsecase);