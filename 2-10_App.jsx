import { useState } from 'react'
const Newport = (props) => {
  const addName = (event) => {
    event.preventDefault()
    const copy = [...props.persons]
    if (copy.find(({name}) => name === props.newName)) {
      alert(`${props.newName} is already added to phonebook.`)
    }
    else{
      const Name = {
        id: (props.persons.length + 1),
        name: props.newName,
        number: props.newNumber
      }
      console.log(Name.id)
      copy.push(Name)
      props.setPersons(copy)
      props.setNewName("")
      props.setNewNumber("")
    }
  }

  const nametracking = (event) =>{
    // console.log(event.target.value)
    props.setNewName(event.target.value)
  }
  const numbertracking = (event) =>{
    // console.log(event.target.value)
    props.setNewNumber(event.target.value)
  }

  return(
    <form onSubmit={addName}>
        <div>
          name: <input 
          value={props.newName}
          onChange={nametracking}
          />
        </div>
        <div>
          number: <input
          value={props.newNumber}
          onChange={numbertracking}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
const Filtering = (props) => {
  const filternames = (event) =>{
    // console.log(event.target.value)
    props.setFilterName(event.target.value)
  }

  return(
      <form>
        <div>
          filter names with<input
          value={props.filterName}
          onChange={filternames}/>
        </div>
      </form>
  )
}
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
  
  

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filtering filterName={filterName} setFilterName={setFilterName} />
      </div>
      <h2>Add a new</h2>
      <div>
        <Newport persons={persons} newName={newName} filterName={filterName} newNumber={newNumber} setPersons={setPersons}
          setNewName={setNewName} setNewNumber={setNewNumber} 
          />
      </div>
      <h2>Numbers</h2>
      <div>
        <Phonebook persons={persons} filter={filterName} />
      </div>
    </div>
  )
}

export default App
