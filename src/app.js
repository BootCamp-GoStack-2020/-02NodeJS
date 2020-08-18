const express = require("express");
const cors = require("cors");

//const { v4: uuid } = require('uuid');
//const { uuid } = require('uuidv4');
const { uuid } = require("uuidv4");


const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// Médoto Get [OK]-----------------------------------------------------------------
app.get("/repositories", (request, response) => {
  // TODO


  return response.json(repositories);
});

// Médoto Post [OK]-----------------------------------------------------------------

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    url,
    title,
    techs,
    likes:0
  };

  repositories.push(repository);

  return response.json(repository);

});


// Médoto Put -----------------------------------------------------------------

app.put("/repositories/:id", (request, response) => {
  // TODO Put
  const { id } = request.params;
  const { url, title, techs } = request.body;
//  const liked = likes;
  const repositoryIndex = repositories.findIndex( repository => repository.id === id );
  
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Project not found.'})
  }


  const repository = {
    id,
    url,
    title,
    techs,
    likes: 0
  };

//  repository.likes = liked;

  repositories[repositoryIndex] = repository;

  
//  console.log(':ids', params);
  return response.json(repository)
});

// Médoto Delete [OK] -----------------------------------------------------------------

app.delete("/repositories/:id", (request, response) => {
  // TODO

  const { id } = request.params;
  
  
  const repositoryIndex = repositories.findIndex( repository => repository.id === id );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.'})
  }

  repositories.splice(repositoryIndex, 1);

  
  return response.status(204).send();



});


// Médoto Post/Like [OK] -----------------------------------------------------------------

app.post("/repositories/:id/like", (request, response) => {
  // TODO

  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id);

  if (!repository){
    return response.status(400).send();
  }

  repository.likes +=1;
    
//  repositories.push(repository);

  return response.json(repository);

});

module.exports = app;

/*
app.listen(3333, () => {
  console.log('👍👍 Backend Server...')
});
*/