export class ApiError extends Error {
  name: string;
  statusCode: number;
  errorMessage: string;
  errorCode: string;
  statusMessage: string | undefined;
  data: { [key: string]: any } | undefined;

  constructor(
    name: string,
    statusCode?: number,
    errorMessage?: string,
    errorCode?: string,
    statusMessage?: string,
    data?: { [key: string]: any },
  ) {
    super(errorMessage);
    this.name = name;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
    this.statusMessage = statusMessage;
    this.data = data;
  }
}
