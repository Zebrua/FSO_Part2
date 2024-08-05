import { useState } from 'react'
const Phonebook = (props) => {
  const list = props.persons
  return(
    <div>
      {list.map((person) => (
        <p key={person.id}>{person.name}</p>
      ))}
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { id: 1,
      name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const tracking = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const copy = [...persons]
    const Name = {
      id: (persons.length + 1),
      name: newName
    }
    console.log(Name.id)
    copy.push(Name)
    setPersons(copy)
    setNewName("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value ={newName}
          onChange={tracking}
          />
        <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <Phonebook persons={persons} />
      </div>
    </div>
  )
}

export default App
