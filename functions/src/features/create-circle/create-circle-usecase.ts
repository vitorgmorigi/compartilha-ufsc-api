import { v4 as uuidv4 } from "uuid";

import { Circle, CircleVisibility } from "../../models/circle";
import { CreateCircleRepository } from "./create-circle-repository";

export class CreateCircleUsecase {

  constructor(public readonly createCircleRepository: CreateCircleRepository) {}

  async execute(name: string, password: string, visibility: CircleVisibility, createdBy: string): Promise<void> {
    const circle: Circle = {
      id: uuidv4(),
      name,
      password,
      visibility,
      createdBy
    };

    return this.createCircleRepository.create(circle);
  }

}