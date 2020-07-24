const express = require('express')

const server = express()

server.use(express.json())

const projetos = []



server.get('/projects', (req, res) =>{
  res.json(projetos)
})


server.post('/projects', (req, res) =>{
  const {id, title} = req.body
  
  projetos.push({
    id,
    title,
    tasks: []
  })

  return res.json(projetos)
})



server.get('/projects/:id', (req, res) =>{
  const {id} = req.params

  return res.json(projetos[id - 1])
})


server.put('/projects/:id', (req, res) =>{
  const {title} = req.body
  const {id} = req.params

  projetos[id -1].title = title

  return res.json(projetos)
})


server.delete('/projects/:id', (req, res) =>{

  const {id} = req.params

  projetos.splice(id - 1, 1)

  return res.json({Message: `Projeto com o id ${id} deletado com sucesso!`})
})

server.listen(3000, () =>{
  console.log("servidor rodando na porta 3000")
})