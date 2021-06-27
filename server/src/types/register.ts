/* export function IgenerateJWT(
  payload: string | Buffer | object,
  time?: string | number
): string */

export interface IgenerateJWT {
  (payload: string | Buffer | object, time?: string | number): string
}
