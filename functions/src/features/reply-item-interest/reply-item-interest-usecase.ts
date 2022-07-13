import { CustomError } from "../../helpers/error";
import { ItemInterestStatus } from "../../models/item-interest";
import { ReplyItemInterestRepository } from "./reply-item-interest-repository";
import { errorCodes, ReplyItemInterestRequest } from "./reply-item-interest-utils";

export class ReplyItemInterestUsecase {

  constructor(
    public readonly replyItemInterestRepository: ReplyItemInterestRepository, 
  ) {}

  async execute(itemInterestId: string, requestData: ReplyItemInterestRequest): Promise<void> {

    if (requestData.answer !== ItemInterestStatus.ACCEPTED && requestData.answer !== ItemInterestStatus.REFUSED) {
      throw new CustomError(
        errorCodes.InvalidAnswer, 
        "A resposta precisa ser de aceito ou recusado"
      );
    }

    await this.replyItemInterestRepository.updateItemInterest(itemInterestId, requestData.answer);

    if (requestData.answer === ItemInterestStatus.ACCEPTED) {
      await this.replyItemInterestRepository.updateItemToDonatedStatus(requestData.itemId);
    }

    return;
  }
}