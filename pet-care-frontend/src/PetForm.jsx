import { useMutation} from '@apollo/client'
import { useState } from 'react'
import { ALL_PETS } from './pets/graphql-queries'
import { CREATE_PET } from './pets/graphql-mutations.js'

export const PetForm = ( { notifyError } ) => {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [race, setRace] = useState('')
    const [age, setAge] = useState('')
    const [size, setSize] = useState('')

    const [ createPet ] = useMutation(CREATE_PET, {
        refetchQueries: [ { query: ALL_PETS } ],
        onError: (error) => {
            notifyError( error.graphQLErrors[0].message )
        }
    })

    const handleSubmit = e => {
        e.preventDefault()

        createPet({ variables: { name, image, race, age, size } })

        setName('')
        setImage('')
        setRace('')
        setAge('')
        setSize('')
    }

    return (
        <div>
            <h2>Create new Pet</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="name" value={name} onChange={ evt => setName(evt.target.value) } />
                <input placeholder="image" value={image} onChange={ evt => setImage(evt.target.value) } />
                <input placeholder="race" value={race} onChange={ evt => setRace(evt.target.value) } />
                <input placeholder="age" value={age} onChange={ evt => setAge(evt.target.value) } />
                <input placeholder="size" value={size} onChange={ evt => setSize(evt.target.value) } />
                <button>Add Pet</button>
            </form>
        </div>
    )
}