import { v4 as uuidv4 } from "uuid";
import { CustomError } from "../../helpers/error";
import { CategoryDatabase, fromDatabase as categoryFromDatabase } from "../../models/category";
import { CircleDatabase, fromDatabase as circleFromDatabase } from "../../models/circle";
import { Item } from "../../models/item";
import { User } from "../../models/user";
import { UserProfile } from "../../services/login/contracts";
import { PublishItemRepository } from "./publish-item-repository";
import { PublishItemRequest } from "./publish-item-request";
import { errorCodes } from "./publish-item-utils";

export class PublishItemUsecase {

  constructor(
    public readonly publishItemRepository: PublishItemRepository, 
  ) {}

  async execute(requestData: PublishItemRequest, userProfile: UserProfile, image?: string): Promise<void> {
    const expirationDate = new Date(requestData.expiration_date).getTime();

    if (expirationDate < Date.now()) {
      throw new CustomError(
        errorCodes.ExpirationDateLessThanNow, 
        "A data de expiração precisa ser posterior à data atual"
      );
    }

    const item: Item = {
      id: uuidv4(),
      name: requestData.name,
      createdBy: userProfile as Omit<User, "circle">,
      category: categoryFromDatabase(JSON.parse(requestData.category) as CategoryDatabase),
      circle: circleFromDatabase(JSON.parse(requestData.circle) as CircleDatabase),
      conservationState: requestData.conservation_state,
      description: requestData.description,
      expirationDate: requestData.expiration_date,
      localization: requestData.localization,
      image: image || ""
    };

    return this.publishItemRepository.create(item, userProfile);
  }
}