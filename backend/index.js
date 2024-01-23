'use strict'

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const Person = require('./models/person')

const app = express();

morgan.token('payload', (request) => {
  const requestBody = request.body;
  return JSON.stringify(requestBody)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :payload'))
app.use(cors())
// Used to serve static files in express. Check documentation: https://expressjs.com/en/starter/static-files.html
app.use(express.static('dist'))


mongoose.set('strictQuery', false)

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
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

  const nameExists = persons.some(person => person.name === request.body.name)

  if (!person.name || !person.number) {
    return response.status(404).json({
      error: 'missing name or numbber'
    })
  }
  if (nameExists) {
    return response.status(404).json({
      error: 'name already exists in phonebook'
    })
  }
  else {
    persons.push(person)
    return response.json(person)
  }
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})