export interface JSendSuccess<T> {
  status: 'success';
  data: T;
}

// NOTE: JSendFailは利用しない事とする。
// export interface JSendFail<T> {
//   status: 'fail';
//   data: T;
// }

export interface JSendError {
  status: 'error';
  message: string;
  code?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export type JSendResponse<T> = JSendSuccess<T> | JSendError;
