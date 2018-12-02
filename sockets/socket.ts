import { Socket } from "socket.io";
import * as socketIO from 'socket.io';


export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
}
// Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (payload: { de: String, cuerpo: String } ) => {
        console.log('Mensaje recibido', payload);
        // EMITIR MENSAJE RECIBIDO
        io.emit( 'mensaje-nuevo', payload );
    })
}

