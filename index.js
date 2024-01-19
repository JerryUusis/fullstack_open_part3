'use strict'

const { response } = require('express');
const express = require('express');
const app = express();

app.use(express.json())

const persons = [
    { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      }
]


app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const date = new Date().toString();
    const message = 
    `<p>The phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`
    response.send(message);
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const person = request.body;
  // Creates a random integer between persons length and 30
  const generateId = Math.floor(Math.random() * (30 - persons.length + 1)) + persons.length;
  person.id = generateId;
  response.json(person)
})

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})