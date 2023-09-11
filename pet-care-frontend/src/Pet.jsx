import {gql, useLazyQuery} from '@apollo/client'
import { useEffect, useState } from 'react'

const FIND_PET = gql`
    query findPetById($idPet: String!){
        petById(id: $idPet) {
            name
            _id
            age
            race
            size
          }
    }
`

export const Pets = ({pets}) => {
const [getPet, result] = useLazyQuery(FIND_PET)
const [pet, setPet] = useState(null)

const showPet = id => {
    getPet({ variables: {idPet: id} })
}

useEffect(() =>{
    if(result.data){
        setPet(result.data.petById)
    }
}, [result])

if (pet) {
    return(
        <div>
            <h2>{pet.name}</h2>
            <div>{pet._id}</div>
            <div>{pet.race}</div>
            <div>{pet.age}</div>
            <div>{pet.size}</div>
            <button onClick={ ()=> setPet(null) }>Close</button>
        </div>
    )
}


if(pets === null) return null

    return (
        <div>
            <h2>Pets</h2>
            {pets.map(pet => 
                <div key={pet._id} onClick={()=> {showPet(pet._id)}}>
                    {pet._id} - {pet.name} - {pet.race} - {pet.age}    
                </div>)}
        </div>
    )
}