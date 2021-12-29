import { Circle } from "../../models/circle";
import { ListCirclesRepository } from "./list-circles-repository";

export class ListCirclesUsecase {

  constructor(public readonly listCirclesRepository: ListCirclesRepository) {}

  async execute(name?: string): Promise<Circle[]> {
    return this.listCirclesRepository.list(name);
  }

}