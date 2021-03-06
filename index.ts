import Server from './classes/server';
import  router  from './routes/router';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';


const server = Server.instance;

// Body Parser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

// CORS
server.app.use( cors({ origin: true, credentials: true }) );

// Rutas de servicio
server.app.use('/', router);

server.start(() => {
    console.log(`Servidor corriendo en el puerto ${ server.port }`);
});