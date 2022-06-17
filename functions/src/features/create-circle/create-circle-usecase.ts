import { v4 as uuidv4 } from "uuid";
import { createHash } from "../../helpers/crypto";

import { Circle, CircleVisibility } from "../../models/circle";
import { CreateCircleRepository } from "./create-circle-repository";

export class CreateCircleUsecase {

  constructor(public readonly createCircleRepository: CreateCircleRepository) {}

  async execute(name: string, visibility: CircleVisibility, createdBy: string, password?: string): Promise<void> {
    const circle: Circle = {
      id: uuidv4(),
      name,
      password: password ? createHash(password): undefined,
      visibility,
      createdBy
    };

    return this.createCircleRepository.create(circle);
  }

}