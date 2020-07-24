const express = require('express')

const server = express()

server.use(express.json())

const projects = []


//criando um middleware global para saber quantas requisiçoes foram feitas
server.use((req, res, next) =>{

  console.count('Numero de requisições')

  next();
})


//criando o middleware de rota para verificar se um produto existe
function checkProjectInArray(req, res, next){
  const project = projects[req.params.id - 1]

  if(!project){
    return res.status(400).json({error: "Project not found!"})
  } 
  req.project = project

  next();
}


// rota para listar todos os projetos
server.get('/projects', (req, res) =>{
  res.json(projects)
})


//rota para inserir um novo projeto no array
server.post('/projects', (req, res) =>{
  const {id, title} = req.body
  
  projects.push({
    id,
    title,
    tasks: []
  })

  return res.json(projects)
})



// rota para listar um projeto especifico
server.get('/projects/:id', checkProjectInArray, (req, res) =>{
  const {id} = req.params

  return res.json(req.project)
})



// rota para alterar o titulo de um projeto especifico
server.put('/projects/:id',checkProjectInArray, (req, res) =>{
  const {title} = req.body
  const {id} = req.params

  projects[id -1].title = title

  return res.json(projects)
})


//rota para apagar um projeto especifico
server.delete('/projects/:id',checkProjectInArray, (req, res) =>{

  const {id} = req.params

  projects.splice(id - 1, 1)

  return res.json({Message: `Projeto com o id ${id} deletado com sucesso!`})
})


// rota para adicionar uma task à um projeto
server.post('/projects/:id/tasks',checkProjectInArray, (req, res) =>{
  const {id} = req.params
  const {title} = req.body


  projects[id - 1].tasks.push(title)

  return res.json({message: "Task adicionada com sucesso ao projeto de id " + id})

})

server.listen(3000, () =>{
  console.log("servidor rodando na porta 3000")
})