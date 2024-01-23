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
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end();
    }
  })
  .catch(error => {
    console.log(error)
    response.status(400).send({error: 'malformatted id'});
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      console.log('Error happaned', error.message)
    })
})

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(404).json({
      error: 'missing name or number'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPersonData => {
    response.json(savedPersonData)
  })
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})