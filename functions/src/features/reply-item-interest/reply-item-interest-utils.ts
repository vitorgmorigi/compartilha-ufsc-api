import { ItemInterestStatus } from "../../models/item-interest";

export enum errorCodes {
    InvalidAnswer = 'invalid_answer',
  }

export interface ReplyItemInterestRequest {
    answer: Omit<ItemInterestStatus, "pending">,
    itemId: string
}