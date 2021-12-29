import { v4 as uuidv4 } from "uuid";

import { transformToArray } from "../helpers/array";

enum CircleVisibility {
    Public = "public",
    Private = "private"
}

export interface Circle {
    id: string,
    name: string,
    createdBy: string,
    password?: string,
    visibility: CircleVisibility
}

export interface CircleDatabase {
    id: string,
    created_by: string,
    name: string,
    name_as_array: string[],
    password?: string,
    visibility: string
}

export function fromDatabase(
  circleDb: CircleDatabase
): Circle {
  return { 
    id: String(circleDb.id), 
    createdBy: circleDb.created_by, 
    name: circleDb.name, 
    visibility: circleDb.visibility as CircleVisibility
  };
}

export function toDatabase(circle: Circle): CircleDatabase {
  return {
    id: uuidv4(),
    created_by: circle.createdBy,
    name: circle.name,
    name_as_array: transformToArray(circle.name),
    password: circle.password,
    visibility: circle.visibility
  };
}
