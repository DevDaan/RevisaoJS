const express = require('express');
const server = express();

server.use(express.json())

server.use((req, res, next) =>{

  console.time('Request')
  console.log(`Método: ${req.method}; URL: ${req.url}`)

  next();

  console.timeEnd('Request')

})


function checkUserExists(req, res, next){
  if(!req.body.name){
    return res.status(400).json({error: "User name is required"})
  }
    
  return next()
  
}


function checkUserInArray(req, res, next){

  const user = users[req.params.index]

  if(!user){
    return res.status(400).json({error: "User does not exists"})
  }

  req.user = user

  next()
}


const users = ["Daniel", "Diogo", "Thainá"]


server.get('/users', (req, res) =>{
  res.json(users)
})

server.get('/users/:index', checkUserInArray, (req, res) =>{
  // const nome = req.query.nome
  // res.json({message: `Hello ${nome}`})
  const {index} = req.params
  res.json(req.user)

})


server.post('/users', checkUserExists, (req, res) =>{
  const {name} = req.body
  users.push(name)
  return res.json(users)
})



server.put('/users/:index', checkUserExists,checkUserInArray, (req, res) =>{

  const {name} = req.body
  const {index} = req.params

  users[index] = name

  return res.json(users)
})


server.delete('/users/:index',checkUserInArray, (req, res) =>{

  const {index} = req.params
  users.splice(index, 1)

  return res.send("User deletado com sucesso!")

})


server.listen(3000, () =>{
  console.log('Server is running on port 3030')
})