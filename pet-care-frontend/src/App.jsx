import { useState }from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
      <div>
        <a href="https://vitejs.dev">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
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