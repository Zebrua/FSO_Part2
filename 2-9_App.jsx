import { useState } from 'react'
const Phonebook = (props) => {
  if (props.filter === ""){
    const list = props.persons
    return(
      <div>
        {list.map((person) => (
          <p key={person.id}>{person.name} {person.number}</p>
        ))}
      </div>
    )
  }
  else{
    const list = props.persons.filter(({name}) => name.includes(props.filter) === true)
    return(
      <div>
        {list.map((person) => (
          <p key={person.id}>{person.name} {person.number}</p>
        ))}
      </div>
    )
  }
}
const App = () => {
  const [persons, setPersons] = useState([
    { id: 1,
      name: 'Arto Hellas', 
      number: '040-1234567'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const nametracking = (event) =>{
    // console.log(event.target.value)
    setNewName(event.target.value)
  }
  const numbertracking = (event) =>{
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const filternames = (event) =>{
    console.log(event.target.value)
    setFilterName(event.target.value)
  }
  const addName = (event) => {
    event.preventDefault()
    const copy = [...persons]
    if (copy.find(({name}) => name === newName)) {
      alert(`${newName} is already added to phonebook.`)
    }
    else{
      const Name = {
        id: (persons.length + 1),
        name: newName,
        number: newNumber
      }
      console.log(Name.id)
      copy.push(Name)
      setPersons(copy)
      setNewName("")
      setNewNumber("")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter names with<input
          value={filterName}
          onChange={filternames}/>
        </div>
      </form>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={nametracking}
          />
        </div>
        <div>
          number: <input
          value={newNumber}
          onChange={numbertracking}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <Phonebook persons={persons} filter={filterName} />
      </div>
    </div>
  )
}

export default App
