/**
 * This module represent any foreign data that is fetched asynchronously
 */
export type Initial = { status: "Initial" };

export type Pending = { status: "Pending" };

export type Failure<E> = { status: "Failure"; error: E };

export type Success<T> = { status: "Success"; data: T };

export type RemoteData<E, T> = Initial | Pending | Failure<E> | Success<T>;

// Factories
export const initial = (): Initial => ({ status: "Initial" });

export const pending = (): Pending => ({ status: "Pending" });

export const failure = <E>(error: E): Failure<E> => ({
  status: "Failure",
  error,
});

export const success = <T>(data: T): Success<T> => ({
  status: "Success",
  data,
});

// Guards
export const isPending = <E, T>(rd: RemoteData<E, T>): rd is Pending =>
  rd.status === "Pending";

export const isInitial = <E, T>(rd: RemoteData<E, T>): rd is Initial =>
  rd.status === "Initial";

export const isSuccess = <E, T>(rd: RemoteData<E, T>): rd is Success<T> =>
  rd.status === "Success";

export const isFailure = <E, T>(rd: RemoteData<E, T>): rd is Failure<E> =>
  rd.status === "Failure";

// Utilities

export function getState<E, T>(remoteData: RemoteData<E, T>) {
  return remoteData.status;
}

/**
 * Apply the transform function on data only if the remoteData status is success
 */
export function map<E, T, U>(
  transform: (data: T) => U,
  remoteData: RemoteData<E, T>,
): RemoteData<E, U> {
  return isSuccess(remoteData)
    ? success(transform(remoteData.data))
    : remoteData;
}
