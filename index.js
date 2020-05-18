require('dotenv').config()

const express = require('express')
var morgan = require('morgan')
const app = express()
const Person = require('./models/person')

app.use(express.json())


morgan.token('type', function (req, res) {
    if(req.method==='POST')
        return JSON.stringify(req.body)
    else return ""
})



app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))


const cors = require('cors')

app.use(cors())

app.use(express.static('build'))


app.get('/', (req, res) => {
  res.send('<h1>Phone Book!</h1>')
})

app.get('/info', (req, res) => {
    const len = persons.length
    const date = new Date()
    res.send(`
            <p>Phonebook has info for ${len} people</p>
            <p>${date}</p>`)
  })
  

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {


  Person.findById(request.params.id).then(person => {
    response.json(person)
  })

})


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })

})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
