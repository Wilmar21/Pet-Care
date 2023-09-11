import { gql } from '@apollo/client'

export const ALL_PETS = gql`
  query {
    allPets {
      _id
      name
      race
      age
      size
    }
  }
`