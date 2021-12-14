import { Category } from "./category";
import { Circle } from "./circle";
import { User } from "./user";

enum ConservationState {
    New = "Novo",
    NewCondition = "Estado de novo",
    GoodCondition = "Em boas condições",
    ReasonableCondition = "Em condições razoáveis"
}

export interface Item {
    name: string,
    description: string,
    expirationDate: Date,
    localization: string,
    circle: Circle,
    createdBy: User,
    conservationState: ConservationState,
    category: Category,
}