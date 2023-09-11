import { useMutation} from '@apollo/client'
import { useState } from 'react'
import { EDIT_PET } from './pets/graphql-mutations.js'
import { ALL_PETS } from './pets/graphql-queries'

export const EditPetForm = () => {
    const [name, setName] = useState('')
    const [race, setRace] = useState('')
    const [age, setAge] = useState('')
    const [size, setSize] = useState('')
    const [editPetId, setId] = useState('')

    const [ changePet ] = useMutation(EDIT_PET, {
        refetchQueries: [ { query: ALL_PETS } ]
    })

    const handleSubmit = e => {
        e.preventDefault()

        changePet({ variables: { name, race, age, size, editPetId } })

        setName('')
        setRace('')
        setAge('')
        setSize('')
        setId('')
    }

    return (
        <div>
            <h2>Edit Pet</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="name" value={name} onChange={ evt => setName(evt.target.value) } />
                <input placeholder="race" value={race} onChange={ evt => setRace(evt.target.value) } />
                <input placeholder="age" value={age} onChange={ evt => setAge(evt.target.value) } />
                <input placeholder="size" value={size} onChange={ evt => setSize(evt.target.value) } />
                <input placeholder="id" value={editPetId} onChange={ evt => setId(evt.target.value) } />
                <button>Change Pet Info</button>
            </form>
        </div>
    )
}