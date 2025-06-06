import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDb } from './database/db'
import urlRoutes from './routes/url-routes'
import { PORT } from './config/load-env'

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/api', urlRoutes)

app.use('/', (req, res) => {
  res.send('URL Shortener API is up and running.')
})

const startServer = async (): Promise<void> => {
  try {
    await connectDb()
    const LOADED_PORT = PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${LOADED_PORT}`)
    })
  } catch (error) {
    console.error('Error starting server: ', error)
  }
}

startServer()
