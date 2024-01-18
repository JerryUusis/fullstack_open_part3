'use strict'

const { response } = require('express');
const express = require('express');
const app = express();

const notes = [
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
    response.json(notes)
})

app.get('/info', (request, response) => {
    const date = new Date().toString();
    const message = 
    `<p>The phonebook has info for ${notes.length} people</p>
    <p>${date}</p>`
    response.send(message);
})

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})