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
    id?: string,
    created_by: string,
    name: string,
    password?: string,
    visibility: string
}