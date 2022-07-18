/* eslint-disable max-len */
import { CustomError } from "../../helpers/error";
import { ItemInterestStatus } from "../../models/item-interest";
import { MailerService } from "../../services/mailer/mailer-service";
import { ReplyItemInterestRepository } from "./reply-item-interest-repository";
import { errorCodes, ReplyItemInterestRequest } from "./reply-item-interest-utils";

export class ReplyItemInterestUsecase {

  constructor(
    public readonly replyItemInterestRepository: ReplyItemInterestRepository, 
    public readonly mailerService: MailerService
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

    const itemInterest = await this.replyItemInterestRepository.getItemInterested(itemInterestId);

    if (itemInterest.isDefined) {
      const itemInterestValue = itemInterest.get();
      const emailAnswer = requestData.answer === ItemInterestStatus.ACCEPTED ? 'aceito' : 'recusado';

      await this.mailerService.sendMail(`${itemInterestValue.interested.email}, ${itemInterestValue.item.createdBy.email}, ${itemInterestValue.interested.institutionalEmail}, ${itemInterestValue.item.createdBy.institutionalEmail}`, 
        `Interesse no item ${itemInterestValue.item.name} ${emailAnswer}`,
        `O interesse no item ${itemInterestValue.item.name} foi ${emailAnswer} pelo anunciante ${itemInterestValue.item.createdBy.name} (login: ${itemInterestValue.item.createdBy.login})`);
    }

    return;
  }
}