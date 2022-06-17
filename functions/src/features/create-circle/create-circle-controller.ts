import { CircleVisibility } from "../../models/circle";
import { CreateCircleUsecase } from "./create-circle-usecase";

export class CreateCircleController {

  constructor(private readonly createCircleUsecase: CreateCircleUsecase) {}

  async handle(name: string, visibility: CircleVisibility, createdBy: string, password?: string): Promise<void> {
    return this.createCircleUsecase.execute(name, visibility, createdBy, password);
  }

}