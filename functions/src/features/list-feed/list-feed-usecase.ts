import { Circle } from "../../models/circle";
import { Item } from "../../models/item";
import { ListFeedRepository } from "./list-feed-repository";

export class ListFeedUsecase {

  constructor(public readonly listFeedRepository: ListFeedRepository) {}

  async execute(circles: Circle[]): Promise<Item[]> {
    return this.listFeedRepository.list(circles);
  }

}