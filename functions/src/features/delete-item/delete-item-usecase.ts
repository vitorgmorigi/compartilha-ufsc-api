import { CustomError } from "../../helpers/error";
import { DeleteItemRepository } from "./delete-item-repository";
import { errorCodes } from "./delete-item-utils";

export class DeleteItemUsecase {

  constructor(
    public readonly deleteItemRepository: DeleteItemRepository, 
  ) {}

  async execute(itemId: string, userId: string): Promise<[void, void[]]> {
    const item = await this.deleteItemRepository.get(itemId);

    if (item.isEmpty) {
      throw new CustomError(
        errorCodes.ItemDoesNotExists, 
        "O item não existe"
      );
    }

    if (item.get().createdBy.id !== userId) {
      throw new CustomError(
        errorCodes.AttemptToDeleteNonOwnItem, 
        "Você não é o criador desse item"
      );
    }

    const itemInterests = await this.deleteItemRepository.getItemInterests(itemId);

    return Promise.all([
      this.deleteItemRepository.delete(itemId),
      this.deleteItemRepository.deleteItemInterests(itemInterests)  
    ]);
  }
}