interface ListFeedFiltersFieldResponse {
    id: string,
    name: string
}

interface ListFeedItemsResponse {
    id: string,
    name: string,
    image: string,
    category: string,
    circle: string,
    createdBy: string,
    expirationDate: Date,
    createdAt: Date    
}

interface ListFeedFiltersResponse {
    categories: ListFeedFiltersFieldResponse[],
    circles: ListFeedFiltersFieldResponse[],
}

export interface ListFeedResponse {
    items: ListFeedItemsResponse[],
    filters: ListFeedFiltersResponse
}
