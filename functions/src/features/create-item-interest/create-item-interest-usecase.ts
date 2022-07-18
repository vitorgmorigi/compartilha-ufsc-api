/* eslint-disable max-len */
import { v4 as uuidv4 } from "uuid";
import { ItemInterest, ItemInterestStatus } from "../../models/item-interest";
import { UserProfile } from "../../services/login/contracts";
import { MailerService } from "../../services/mailer/mailer-service";
import { CreateItemInterestRepository } from "./create-item-interest-repository";
import { CreateItemInterestRequest } from "./create-item-interest-utils";

export class CreateItemInterestUsecase {

  constructor(
    public readonly createItemInterestRepository: CreateItemInterestRepository, 
    public readonly mailerService: MailerService
  ) {}

  async execute(requestData: CreateItemInterestRequest, user: UserProfile): Promise<void> {
    const itemInterest: ItemInterest = {
      id: uuidv4(),
      interested: {
        birthday: user.birthday,
        email: user.email,
        id: user.id,
        institutionalEmail: user.institutionalEmail,
        login: user.login,
        name: user.name
      },
      item: requestData.item,
      status: ItemInterestStatus.PENDING
    };

    await this.createItemInterestRepository.create(itemInterest);

    await this.mailerService.sendMail(
      `${itemInterest.item.createdBy.email}, ${itemInterest.interested.email}`, 
      `Interesse no item ${itemInterest.item.name}`,
      // eslint-disable-next-line max-len
      `Criada conversa de e-mail para tratativa de interesse do item ${itemInterest.item.name} demostrado pelo usuário ${itemInterest.interested.name} (login: ${itemInterest.interested.login}).
      
      Para aceitar ou recusar o interesse basta o anunciante acessar "Meus itens publicados" > procurar pelo item > clicar em "Visualizar Interessados" > Clicar em "Aceitar" ou "Recusar"
      `
    );
  }
}