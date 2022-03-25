const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const url = `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(
  process.env.DB_PASSWORD
)}@fig.zrbms.mongodb.net/${
  process.env.DB_NAME
}?retryWrites=true&w=majority&ssl=true`

const mongooseConnectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

function connect() {
  mongoose.connect(url, mongooseConnectionParams)
  return mongoose.connection
}

module.exports = connect
