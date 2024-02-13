"use strict";

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const Person = require("./models/person");

const app = express();

morgan.token("payload", (request) => {
  const requestBody = request.body;
  return JSON.stringify(requestBody);
});

// Used to serve static files in express. Check documentation: https://expressjs.com/en/starter/static-files.html
app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :payload"
  )
);
app.use(cors());

app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

app.get("/info", (request, response, next) => {
  const date = new Date().toString();

  Person.find({})
    .then((people) => {
      const phoneBookLength = people.length;
      const message = `<p>The phonebook has info for ${phoneBookLength} people</p>
        <p>${date}</p>`;
      response.send(message);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(404).json({
      error: "missing name or number",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPersonData) => {
      response.json(savedPersonData);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
    id: body.id,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPersonData) => {
      response.json(updatedPersonData);
    })
    .catch((error) => next(error));
});

// Error handling middleware

// If the endpoint is bad this middleware will trigger
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

// If the endpoint was ok, but id is bad this will trigger
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
