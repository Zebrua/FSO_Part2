import { useEffect, useState } from 'react'
import axios from 'axios'
import phonebook_service from "./services/phonebook"
import Notification from "./components/Notification"


const Newport = (props) => {
  const addName = async(event) => {
    event.preventDefault()
    const copy = [...props.persons]
    if (copy.find(({name}) => name === props.newName)) {
      const newcon = confirm(`${props.newName} is already added to phonebook, replace the old number with new?`)
      if (newcon === true){
        const Name = copy.find(({name}) => name === props.newName)
        Name.number = props.newNumber
        phonebook_service.updateAction(Name, props)
        await props.setMessage(`Updated ${props.newName}`)
        setTimeout(() => {
          props.setMessage(null)
        }, 3000)
        await window.location.reload()
        
      }
    }
    else{
      const Name = {
        name: props.newName,
        number: props.newNumber,
        id: String(props.persons.length + 1)
      }
      phonebook_service.createNew(Name)
      props.setMessage(`Added ${props.newName}`)
      setTimeout(() => {
        props.setMessage(null)
      }, 3000)
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
  const removePerson = async (person) => {
    phonebook_service.removeAction(person.id)
    props.setMessage(`Deleted ${person.name}`)
    setTimeout(() => {
      props.setMessage(null)
    }, 3000)
    await window.location.reload()
  }
  if (props.filter === ""){
    const list = props.persons
    return(
      <div>
        {list.map((person) => (
          <>
          <p key={person.id}>{person.name} {person.number}</p>
          <button onClick={() => removePerson(person)}>Delete</button>
          </>
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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)

  
  useEffect(() => {
    phonebook_service.getAll()
    .then(Persons => {
      setPersons(Persons)
    })
  }, [])
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <div>
        <Filtering filterName={filterName} setFilterName={setFilterName} />
      </div>
      <h2>Add a new</h2>
      <div>
        <Newport persons={persons} newName={newName} filterName={filterName} newNumber={newNumber} setPersons={setPersons}
          setNewName={setNewName} setNewNumber={setNewNumber} message={message} setMessage={setMessage}
          />
      </div>
      <h2>Numbers</h2>
      <div>
        <Phonebook persons={persons} filter={filterName} message={message} setMessage={setMessage} />
      </div>
    </div>
  )

}

export default App
