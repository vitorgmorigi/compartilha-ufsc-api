import { Item } from "../../models/item";
import { ListFeedRepository } from "./list-feed-repository";

export class ListFeedUsecase {

  constructor(public readonly listFeedRepository: ListFeedRepository) {}

  async execute(circleIds: string[]): Promise<Item[]> {
    return this.listFeedRepository.list(circleIds);
  }

}