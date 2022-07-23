require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Person = require('./models/persons')
const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(
    `<h3>Phonebook has info for ${persons.length} people</h3>
     <h3>${date}</h3>`
  )
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    if(!person) {
      response.status(404).json({
        error: 'invalid id'
      }).end()
    }
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name || !body.number) {
    response.status(404).json({
      error: 'missing content'
    }).end()
  }
  const filteredPersons = Person.find({name: body.name})
  if (filteredPersons.length > 0) {
    response.status(404).json({
      error: 'name is already found in the phonebook'
    }).end()
  }

  const person = Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})