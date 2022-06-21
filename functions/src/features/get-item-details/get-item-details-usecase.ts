import { CustomError } from "../../helpers/error";
import { Item } from "../../models/item";
import { GetItemDetailsRepository } from "./get-item-details-repository";
import { errorCodes } from "./get-item-details-utils";

export class GetItemDetailsUsecase {

  constructor(public readonly listFeedRepository: GetItemDetailsRepository) {}

  async execute(id: string): Promise<Item> {
    const itemOption = await this.listFeedRepository.get(id);

    if (itemOption.isEmpty) {
      throw new CustomError(errorCodes.ItemNotFound, "Item não encontrado");
    }

    const item = itemOption.get(); 

    return item;
  }

}