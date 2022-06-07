import { ConservationState } from "../../models/item";
import { User } from "../../models/user";

export interface PublishItemRequest {
    name: string,
    description: string,
    expiration_date: Date,
    localization: string,
    circle: string,
    created_by: User,
    conservation_state: ConservationState,
    category: string,
}