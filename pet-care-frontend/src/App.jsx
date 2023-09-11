import { useState }from 'react'
import './App.css'
import {Pets} from './Pet'
import { PetForm } from './PetForm'
import { usePets } from './pets/custom-hooks'
import { Notify } from './Notify'
import { EditPetForm } from './EditPetForm'

function App() {
  const {data, error, loading} = usePets()
  const [errorMassage, setErrorMassage] = useState(null)

  if (error) return <span style='color= red'>{error}</span>

  const notifyError = massage => {
    setErrorMassage(massage)
    setTimeout( () => setErrorMassage(null), 5000 )
  }

  return (
    <>
      <Notify errorMassage={errorMassage} />
      {loading
        ? <p>Loading...</p>
        : <Pets pets={data?.allPets}/> 
      }
      <PetForm notifyError={notifyError} />
      <EditPetForm />
    </>
  )
}

export default App