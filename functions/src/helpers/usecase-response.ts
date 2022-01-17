export interface UsecaseResponse<T> {
    success: boolean,
    message: string,
    data?: T
}