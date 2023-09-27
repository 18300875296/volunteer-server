export interface GlobalResponse<T> {
  message: string;
  status: number;
  code: number;
  data: T;
}
