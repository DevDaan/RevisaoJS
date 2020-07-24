const express = require('express')

const server = express()

server.use(express.json())

const projects = []



server.get('/projects', (req, res) =>{
  res.json(projects)
})


server.post('/projects', (req, res) =>{
  const {id, title} = req.body
  
  projects.push({
    id,
    title,
    tasks: []
  })

  return res.json(projects)
})



server.get('/projects/:id', (req, res) =>{
  const {id} = req.params

  return res.json(projects[id - 1])
})


server.put('/projects/:id', (req, res) =>{
  const {title} = req.body
  const {id} = req.params

  projects[id -1].title = title

  return res.json(projects)
})


server.delete('/projects/:id', (req, res) =>{

  const {id} = req.params

  projects.splice(id - 1, 1)

  return res.json({Message: `Projeto com o id ${id} deletado com sucesso!`})
})


server.post('/projects/:id/tasks', (req, res) =>{
  const {id} = req.params
  const {title} = req.body


  projects[id - 1].tasks.push(title)

  return res.json({message: "Task adicionada com sucesso ao projeto de id " + id})

})

server.listen(3000, () =>{
  console.log("servidor rodando na porta 3000")
})