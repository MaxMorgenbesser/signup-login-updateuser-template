
import express from 'express'
import cors from 'cors'
import { BrowserRouter } from './src/Routes.js'

const port = 3003
const app = express()

app.use(cors())
app.use(express.json())
app.use(BrowserRouter)


app.listen(port, ()=>{
    console.log("listening on port ", port)
})