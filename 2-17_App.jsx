import { useEffect, useState } from 'react'
import axios from 'axios'

const ErrorMessage = ({ mess }) => {
  if (mess === null) {
    return null
  }
  return(
    <div className='error'> 
      {mess}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return ( 
    <div className='confirmation'>
      {message}
    </div>
  )
}
const createNew = (data) => {
  const request = axios.post('http://localhost:3001/persons', data)
  return request.then(response => response.data)
}

const getAll = () => {
  const request = axios.get('http://localhost:3001/persons')
  return request.then(response => response.data)
}

const removeAction = (id) => {
  const request = axios.delete(`http://localhost:3001/persons/${id}`)
  return window.location.replace('http://localhost:5173/')
}

const updateAction = (person) => {
  const request = axios.put(`http://localhost:3001/persons/${person.id}`, person)
  return request
}

const Newport = (props) => {
  const addName = (event) => {
    event.preventDefault()
    const copy = [...props.persons]
    if (copy.find(({name}) => name === props.newName)) {
      const newcon = confirm(`${props.newName} is already added to phonebook, replace the old number with new?`)
      if (newcon === true){
        const Name = copy.find(({name}) => name === props.newName)
        Name.number = props.newNumber
        updateAction(Name)
        .then(response => {
          window.location.replace('http://localhost:5173/')
        })
        .catch(error => {
        if (error.response.status === 404){
          props.setMess(`Information on ${props.newName} has already been removed from the server`)
          setTimeout(() => {
            props.setMess(null)
            window.location.replace('http://localhost:5173/')
          }, 3000)
        }
      })
      }
    }
    else{
      const Name = {
        name: props.newName,
        number: props.newNumber,
        id: String(props.persons.length + 1)
      }
      props.setMessage(`Added ${props.newName}`)
      setTimeout(() => {
        props.setMessage(null)
      }, 3000)
      createNew(Name)
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
          <>
          <p key={person.id}>{person.name} {person.number}</p>
          <button onClick={() => removeAction(person.id)}>Delete</button>
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
  const [mess, setMess] = useState(null)

  useEffect(() => {
    getAll()
    .then(Persons => {
      setPersons(Persons)
    })
  }, [])
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorMessage mess={mess} />
      <div>
        <Filtering filterName={filterName} setFilterName={setFilterName} />
      </div>
      <h2>Add a new</h2>
      <div>
        <Newport persons={persons} newName={newName} filterName={filterName} newNumber={newNumber} setPersons={setPersons}
          setNewName={setNewName} setNewNumber={setNewNumber} message={message} setMessage={setMessage} mess={mess} setMess={setMess}
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
