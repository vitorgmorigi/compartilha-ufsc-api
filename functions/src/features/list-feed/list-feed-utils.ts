interface ListFeedCategoryResponse {
    id: string,
    name: string
}

interface ListFeedItemsResponse {
    id: string,
    name: string,
    image: string,
    category: string,
    createdBy: string,
    expirationDate: Date,
    createdAt: Date    
}

interface ListFeedFiltersResponse {
    categories: ListFeedCategoryResponse[]
}

export interface ListFeedResponse {
    items: ListFeedItemsResponse[],
    filters: ListFeedFiltersResponse
}
