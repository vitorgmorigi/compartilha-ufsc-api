import { v4 as uuidv4 } from "uuid";
import { ItemInterest, ItemInterestStatus } from "../../models/item-interest";
import { UserProfile } from "../../services/login/contracts";
import { CreateItemInterestRepository } from "./create-item-interest-repository";
import { CreateItemInterestRequest } from "./create-item-interest-utils";

export class CreateItemInterestUsecase {

  constructor(
    public readonly createItemInterestRepository: CreateItemInterestRepository, 
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

    return this.createItemInterestRepository.create(itemInterest);
  }
}