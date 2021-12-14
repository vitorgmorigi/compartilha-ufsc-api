enum CircleVisibility {
    Public = "public",
    Private = "private"
}

export interface Circle {
    id: string
    name: string,
    createdBy: string,
    password?: string,
    visibility: CircleVisibility
}