import { mockEntriesFull } from '../../../database/__mocks__/EntriesMock'

interface useEntryParams {
  id: number
}

export const useEntry = ({ id }: useEntryParams) => {
  const entry = mockEntriesFull.find((entry) => entry.id === id)

  return { entry }
}
