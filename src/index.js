import express from 'express'
import mongoose from 'mongoose'
import usersController from './controllers/users.js'
import databaseConnection from './utils/database.js'

const app = express()
app.use(express.json())
const port = 3000

app.get("/", (request, response) => {
  response.status(200).send("Bem vindo à API de Usuários!")
})

app.use('/user', usersController)

app.listen(port, async () => {
  await databaseConnection()
  console.log(`App running in http://localhost:${port}`)
})

function IsEmail(email){
  var exclude='/[^@-.w]|^[_@.-]|[._-]{2}|[@.]{2}|(@)[^@]*1/';
  var check='/@[w-]+./';
  var checkend='/.[a-zA-Z]{2,3}$/';
  if(((email.search(exclude) != -1)||(email.search(check)) == -1)||(email.search(checkend) == -1)){return false;}
  else {return true;}
}