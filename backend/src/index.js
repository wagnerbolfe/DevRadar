const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebSocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect('mongodb+srv://devradar:W4Gn3R@b@cluster0-ngmla.mongodb.net/devradar?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set('useCreateIndex', true);

app.use(cors());
//Para o express entender as requisições no formato JSON
app.use(express.json());

//Métodos HTTP: GET, POST, PUT, DELETE

//Tipos de Parâmetros:
//Query Params: request.query (Filtros, ordenação, paginação ...)
//Route Params: request.params (Identificar um recurso na alteraçào ou remoção)
//Body: request.body (Dados para criação ou alteração de um registro)

app.use(routes);

server.listen('3333');