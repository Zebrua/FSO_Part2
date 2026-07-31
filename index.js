const express = require('express')
const app = express()
const cors = require("cors")

app.use(express.json())

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET","POST","OPTIONS","DELETE","PUT"],
  credentials: true
}

let phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/persons',cors(corsOptions), (request, response) => {
  response.json(phonebook)
})

app.get('/persons/:id', cors(corsOptions), (request,response) => {
  const id = request.params.id
  var person = (person) => person.id == id
  var index = phonebook.findIndex(person)
  if (index == -1){
    var out = "Absent"
  } else{
    var out = phonebook[index]
  }
  response.json(out)
})

app.options('/persons',cors(corsOptions), (request,response) => {
  response.json(corsOptions)
})

app.options('/persons/:id', cors(corsOptions), (request,response) => {
  response.json(corsOptions)
})

app.post('/persons',cors(corsOptions), (request,response) => {
  const data = request.body
  var last = Number(phonebook.at(-1).id)+1
  phonebook.push({"id": String(last),"name": data.name,"number": data.number})
  response.json(phonebook)
})

app.delete('/persons/:id',cors(corsOptions), (request, response) => {
  const id = request.params.id
  var object = (object) => object.id == id
  var index = phonebook.findIndex(object)
  if (index == -1){
    response.statusCode = 404
    response.json()
  } else{
    phonebook.splice(index,1)
    response.json(phonebook)
  }
})

app.put('/persons/:id',cors(corsOptions), (request, response) => {
  const id = request.params.id
  var person = request.body
  var object = (object) => object.id == id
  var index = phonebook.findIndex(object)
  phonebook.splice(index,1,person)
  response.json(phonebook)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})