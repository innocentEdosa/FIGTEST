import cors from 'cors'
import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import logger from 'morgan'
import connect from './database'
import usersRouter from './routes/user.routes'
import eventRouter from './routes/event.routes'
import categoryRouter from './routes/category.routes'
import errorHandler from './middlewares/error.middleware'

dotenv.config()

const port = process.env.PORT || 3001

const app = express()
app.set('port', port)
const mongooseConnection = connect()

function listen() {
  app.listen(port)
  console.log(`Express app started on port ${port}`)
}

mongooseConnection
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen)

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/events', eventRouter)
app.use('/users', usersRouter)
app.use('/category', categoryRouter)
app.use(errorHandler)

export default app
