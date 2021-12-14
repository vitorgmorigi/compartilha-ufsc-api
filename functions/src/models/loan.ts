import { Item } from "./item";
import { User } from "./user";

export interface Loan {
    item: Item,
    borrower: User,
    borrowedBy: User,
    beginDate: Date,
    endDate: Date,
}