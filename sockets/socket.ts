import { Socket } from "socket.io";
import * as socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

// <-------- Conectar un cliente ----------->
export const conectarCliente = (cliente: Socket) => {
    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );
}
// <--------- Desconectar un cliente ------------->
export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario( cliente.id );
    });
}
// <------------ Escuchar mensajes ----------------->
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (payload: { de: String, cuerpo: String } ) => {
        console.log('Mensaje recibido', payload);
        // EMITIR MENSAJE RECIBIDO
        io.emit( 'mensaje-nuevo', payload );
    });

}

//<----------- Configurar Usuario ------------------>
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('configurar-usuario', ( payload: { nombre: string }, callback: Function ) => {
        // console.log('Configurando usuario', payload.nombre);
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre );
        // EMITIR NUEVO USUARIO
        // io.emit( 'usuario-nuevo', payload );
        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre } configurado`
        });
    });
}


