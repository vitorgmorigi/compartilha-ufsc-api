import { Circle } from "../../models/circle";
import { ListCirclesUsecase } from "./list-circles-usecase";

export class ListCirclesController {

  constructor(private readonly listCirclesUsecase: ListCirclesUsecase) {}

  async handle(name?: string): Promise<Circle[]> {
    return this.listCirclesUsecase.execute(name);
  }

}