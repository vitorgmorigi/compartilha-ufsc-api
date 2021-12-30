import { CircleVisibility } from "../../models/circle";
import { CreateCircleUsecase } from "./create-circle-usecase";

export class CreateCircleController {

  constructor(private readonly createCircleUsecase: CreateCircleUsecase) {}

  async handle(name: string, password: string, visibility: CircleVisibility, createdBy: string): Promise<void> {
    return this.createCircleUsecase.execute(name, password, visibility, createdBy);
  }

}