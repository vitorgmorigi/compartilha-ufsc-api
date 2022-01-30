import { CategoryDatabase } from "../../models/category";
import { CircleDatabase } from "../../models/circle";
import { ConservationState } from "../../models/item";
import { User } from "../../models/user";

export interface PublishItemRequest {
    name: string,
    description: string,
    expiration_date: Date,
    localization: string,
    circle: Omit<CircleDatabase, "name_as_array">,
    created_by: User,
    conservation_state: ConservationState,
    category: Omit<CategoryDatabase, "name_as_array">,
}