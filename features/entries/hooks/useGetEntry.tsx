import { mockEntriesFull } from '../../../database/__mocks__/EntriesMock'

interface useGetEntryParams {
  id: number
}

export const useGetEntry = ({ id }: useGetEntryParams) => {
  const entry = mockEntriesFull.find((entry) => entry.id === id)

  return { entry }
}
