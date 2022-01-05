export class HttpResponse {
  constructor(public readonly statusCode: number, public readonly body: unknown) {}
}