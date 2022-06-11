const mongoose = require('mongoose')


if(process.argv.length < 5){
  if(process.argv.length != 3) {
    console.log('Please provide password, name and number to add to the db')
    process.exit(1)
  }
}

const password = process.argv[2]

const url = process.env.MONGO_URI
personSchema = mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const connection = mongoose.connect(url)

if (process.argv.length == 3) {
    connection.then((result) => {
      console.log('connected!!')

      Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
      })
    })
    .catch(err => console.log(err))

} else {
    connection.then((result) => {
  
      console.log('connected')
  
      const person = new Person({
        name: process.argv[3], 
        number: process.argv[4]
      })
  
      return person.save()
    })
    .then(() => {
      console.log('saved person!')
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}

