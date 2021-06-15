const express = require('express');
const app = express()
const port = 3000

const pool = require('./models/ticket');
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Diana Evangelista Ramirez - API REST "SISTEMA DE TICKETS"')
})

//Despliega todos los tickets
app.get('/tickets', (request, response) => {
    pool.query('SELECT * FROM ticket', (error, result) => {
      if(error){
        response.status(500);
        response.json({
        mensaje :"Error al consultar"
        });
      }
      response.send(result);
    });
});

 //Despliega ticket by id
 app.get('/ticket/:id', (request, response) => {
  const id = request.params.id;

  pool.query('SELECT * FROM ticket WHERE id = ?', id, (error, result) => {
    if(error){
      response.status(500);
      response.json({
      mensaje :"Error al consultar"
      });
    }

      response.send(result);
  });
});

 // Agregar ticket
 app.post('/ticket', (request, response) => {

  pool.query('INSERT INTO ticket SET ?', request.body, (error, result) => {
      if(error){
      response.status(500);
      response.json({
      mensaje :"Error al insertar",
      insertado:false
      });
      }else{
        response.status(200);
        response.json({
          mensaje :`Ticket agregado ID: ${result.insertId}`,
          insertado:true
          });
      }
  });
});


// Actualizar ticket
app.put('/ticket/:id', (request, response) => {
  const id = request.params.id;

  pool.query('UPDATE ticket SET ? WHERE id = ?', [request.body, id], (error, result) => {
    if(error){
      response.status(500);
      response.json({
      mensaje :"Error al actualizar",
      actualizar:false
      });
      }else{
        response.status(200);
        response.json({
          actualizar:true
        });
      }
  });
});

// Borrar ticket
app.delete('/ticket/:id', (request, response) => {
  const id = request.params.id;

  pool.query('DELETE FROM ticket WHERE id = ?', id, (error, result) => {
    if(error){
      response.status(500);
      response.json({
      mensaje :"Error al eliminar",
      eliminar:false
      });
      }else{
        response.status(200);
        response.json({
          eliminar:true
        });
      }
  });
});


app.listen(port, () => {
  //console.log(`Example app listening at http://localhost:${port}`)
})