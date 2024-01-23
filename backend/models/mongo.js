const mongoose = require('mongoose');

const password = process.argv[2]

const personName = process.argv[3]

const personNumber = process.argv[4]

const url = `mongodb+srv://jerryuusitalo:${password}@part3.gu0vkem.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

const newPerson = new Person({
    name: personName,
    number: personNumber
})

if (process.argv.length === 5) {
    newPerson.save().then(result => {
        console.log(`Added ${newPerson.name} number ${newPerson.number} to phonebook`)
        mongoose.connection.close()
    })
}

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}