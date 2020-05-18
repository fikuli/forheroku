const mongoose = require('mongoose')

if (process.argv.length != 3 && process.argv.length != 5) {
    console.log('Please provide one of the following formats:')
    console.log('1. To add: node mongo.js <password> <name> <number>')
    console.log('2. To list: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-5bciq.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)


if(process.argv.length === 3){
    Person.find({}).then(result => {
        result.forEach(person => {
        console.log(person)
        })
        mongoose.connection.close()
    })
}
else{
    const person = new Person({
        name : process.argv[3],
        number : process.argv[4],
    })
      
      person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
      })
}