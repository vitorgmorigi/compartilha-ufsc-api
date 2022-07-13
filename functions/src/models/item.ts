import * as admin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";
import { transformToArray } from "../helpers/array";
import { UserProfile } from "../services/login/contracts";
import { 
  Category, 
  CategoryDatabase, 
  toDatabase as categoryToDatabase, 
  fromDatabase as categoryFromDatabase 
} from "./category";
import { Circle, CircleDatabase, toDatabase as circleToDatabase, fromDatabase as circleFromDatabase } from "./circle";
import { User, UserDatabase, fromDatabase as userFromDatabase } from "./user";

export enum ItemStatus {
  DONATED = "donated",
  AVAILABLE = "available"
}

export enum ConservationState {
    New = "Novo",
    NewCondition = "Estado de novo",
    GoodCondition = "Em boas condições",
    ReasonableCondition = "Em condições razoáveis"
}

export interface Item {
    id: string,
    name: string,
    description: string,
    expirationDate: Date,
    localization: string,
    circle: Circle,
    createdBy: Omit<User, "private_circles">,
    conservationState: ConservationState,
    category: Category,
    image: string,
    createdAt: Date,
    status: ItemStatus
}

export interface ItemDatabase {
    id: string,
    name: string,
    name_as_array: string[],
    description: string,
    expiration_date: FirebaseFirestore.Timestamp,
    localization: string,
    circle: CircleDatabase,
    created_by: Omit<UserDatabase, "name_as_array" | "private_circles" | "created_at">,    
    conservation_state: ConservationState,
    category: CategoryDatabase,
    image: string,
    created_at: FirebaseFirestore.Timestamp,
    status: ItemStatus
}

export function fromDatabase(
  itemDb: ItemDatabase
): Item {
  return { 
    id: String(itemDb.id), 
    createdBy: userFromDatabase(itemDb.created_by as UserDatabase), 
    name: itemDb.name,
    category: categoryFromDatabase(itemDb.category),
    circle: circleFromDatabase(itemDb.circle),
    conservationState: itemDb.conservation_state,
    description: itemDb.description,
    expirationDate: itemDb.expiration_date.toDate(),
    localization: itemDb.localization,
    image: itemDb.image,
    createdAt: itemDb.created_at.toDate(),
    status: itemDb.status
  };
}
    
export function toDatabase(item: Item, userProfile: UserProfile): ItemDatabase {
  const createdBy: Omit<UserDatabase, "name_as_array" | "private_circles" | "created_at"> = {
    id: userProfile.id,
    birthday: userProfile.birthday,
    cpf: userProfile.cpf,
    email: userProfile.email,
    institutional_email: userProfile.institutionalEmail,
    login: userProfile.login,
    name: userProfile.name
  };

  const response = {
    id: uuidv4(),
    status: item.status,
    created_by: createdBy,
    name: item.name,
    name_as_array: transformToArray(item.name),
    category: categoryToDatabase(item.category),
    circle: circleToDatabase(item.circle),
    conservation_state: item.conservationState,
    description: item.description,
    expiration_date: admin.firestore.Timestamp.fromDate(new Date(item.expirationDate)),
    localization: item.localization,
    image: item.image,
    created_at: admin.firestore.Timestamp.fromDate(new Date(item.createdAt))
  };

  return response;
}