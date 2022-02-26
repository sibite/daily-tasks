export interface ActionWithPayload<T = undefined> {
  type: string,
  payload: T,
}
