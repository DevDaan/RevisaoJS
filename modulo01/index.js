const express = require('express');
const server = express();

server.use(express.json())



const users = ["Daniel", "Diogo", "Thainá"]


server.get('/users', (req, res) =>{
  res.json(users)
})

server.get('/users/:index', (req, res) =>{
  // const nome = req.query.nome
  // res.json({message: `Hello ${nome}`})
  const {index} = req.params
  res.json(users[index])

})


server.post('/users', (req, res) =>{
  const {name} = req.body
  users.push(name)
  return res.json(users)
})



server.put('/users/:index', (req, res) =>{

  const {name} = req.body
  const {index} = req.params

  users[index] = name

  return res.json(users)
})


server.delete('/users/:index', (req, res) =>{

  const {index} = req.params
  users.splice(index, 1)

  return res.send("User deletado com sucesso!")

})


server.listen(3000, () =>{
  console.log('Server is running on port 3030')
})