import { v4 as uuidv4 } from "uuid";
import { transformToArray } from "../helpers/array";

export interface Category {
    id: string,
    name: string,
    createdBy: string
}

export interface CategoryDatabase {
    id: string,
    name: string,
    name_as_array: string[],
    created_by: string
}

export function fromDatabase(
  categoryDb: CategoryDatabase
): Category {
  return { 
    id: String(categoryDb.id), 
    createdBy: categoryDb.created_by, 
    name: categoryDb.name, 
  };
}
  
export function toDatabase(category: Category): CategoryDatabase {
  return {
    id: uuidv4(),
    created_by: category.createdBy,
    name: category.name,
    name_as_array: transformToArray(category.name),
  };
}