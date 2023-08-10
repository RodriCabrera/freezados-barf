// import { useEffect, useState } from 'react'

// import UbicationDAO, {
//   type Ubication
// } from '../../../database/DAOs/Ubication.dao'
import { mockUbications } from '../../../database/__mocks__/UbicationMock'

export const useUbications = () => {
  //   const [ubications, setUbications] = useState<Ubication[]>()
  //   const ubicationDAO = new UbicationDAO()

  //   useEffect(() => {
  //     ubicationDAO.getAll().then((ubications) => {
  //       setUbications(ubications)
  //     })
  //   }, [])

  return { ubications: mockUbications }
}
