import { gql } from '@apollo/client'

export const CREATE_PET = gql`
    mutation Mutation($name: String!, $image: String, $race: String!, $age: String!, $size: String!) {
        registPet(name: $name, image: $image, race: $race, age: $age, size: $size) {
        name
        image
        race
        age
        size
        }
    }
`

export const EDIT_PET =gql`
    mutation editPet($name: String!, $race: String!, $age: String!, $size: String!, $editPetId: String!) {
        editPet(name: $name, race: $race, age: $age, size: $size, id: $editPetId) {
        name
        image
        race
        age
        size
        }
    }
`