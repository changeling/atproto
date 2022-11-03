export interface DidHandle {
  did: string
  handle: string
}

export const tableName = 'did_handle'

export type PartialDB = { [tableName]: DidHandle }
