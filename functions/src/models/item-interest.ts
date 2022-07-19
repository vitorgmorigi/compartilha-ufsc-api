import { v4 as uuidv4 } from "uuid";
import { UserProfile } from "../services/login/contracts";
import { Item, ItemDatabase, fromDatabase as itemFromDatabase, toDatabase as itemToDatabase } from "./item";
import { User, UserDatabase, fromDatabase as userFromDatabase, toDatabase as userToDatabase } from "./user";

export enum ItemInterestStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REFUSED = "refused"
}

export interface ItemInterest {
  id: string,
  item: Item,
  interested: Omit<User, "privateCircles" | "createdAt" | "score">,
  status: ItemInterestStatus
}

export interface ItemInterestDatabase {
  id: string,
  item: ItemDatabase,
  interested: Omit<UserDatabase, "name_as_array" | "private_circles" | "created_at" | "score">,
  status: ItemInterestStatus
}

export function fromDatabase(
  itemInterestDb: ItemInterestDatabase
): ItemInterest {
  return { 
    id: String(itemInterestDb.id), 
    interested: userFromDatabase(itemInterestDb.interested as UserDatabase), 
    status: itemInterestDb.status,
    item: itemFromDatabase(itemInterestDb.item)
  };
}
    
export function toDatabase(
  itemInterest: ItemInterest): ItemInterestDatabase {
  
  return { 
    id: uuidv4(), 
    interested: userToDatabase(itemInterest.interested as UserProfile), 
    status: itemInterest.status,
    item: itemToDatabase(itemInterest.item, itemInterest.item.createdBy as UserProfile)
  };
}