import express from 'express'
import 'express-async-errors'
import 'reflect-metadata'
import './database'
import { error } from './middlewares/ErrorMiddleware'
import { router } from './routes'

const app = express()

app.use(express.json())
app.use(router)
app.use(error)

app.listen(3333, () => console.log('Server is running on port 3333'))
