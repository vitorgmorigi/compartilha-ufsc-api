import { databaseInstance as database } from "../../database";
import { mailerServiceInstance } from "../../services/mailer";
import { ReplyItemInterestController } from "./reply-item-interest-controller";
import { ReplyItemInterestRepository } from "./reply-item-interest-repository";
import { ReplyItemInterestUsecase } from "./reply-item-interest-usecase";
import { UpdateScoreUserRepository } from "../shared/update-score-user-repository";

const updateScoreUserRepository = new UpdateScoreUserRepository(database);
const replyItemInterestRepository = new ReplyItemInterestRepository(database);
const replyItemInterestUsecase = new ReplyItemInterestUsecase(
  replyItemInterestRepository, 
  updateScoreUserRepository, 
  mailerServiceInstance
);
export const replyItemInterestController = new ReplyItemInterestController(replyItemInterestUsecase);