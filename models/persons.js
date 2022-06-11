const mongoose = require('mongoose')

const url = process.env.MONGO_URI

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to MongoDB', err.message);
  })

personSchema = mongoose.Schema({
  name: String,
  number: String
})

module.exports = mongoose.model('Person', personSchema)
