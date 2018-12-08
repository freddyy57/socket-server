import { Socket } from "socket.io";
import * as socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

// <-------- Conectar un cliente ----------->
export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {
    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );
}
// <--------- Desconectar un cliente ------------->
export const desconectar = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario( cliente.id );
        io.emit('usuarios-activos', usuariosConectados.getLista() );
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
        io.emit('usuarios-activos', usuariosConectados.getLista() );
        // EMITIR NUEVO USUARIO
        // io.emit( 'usuario-nuevo', payload );
        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre } configurado`
        });
    });
}

// <--------- Obtener Usuarios ------------>
export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('obtener-usuarios', (  ) => {
        io.to( cliente.id ).emit( 'usuarios-activos', usuariosConectados.getLista() );
 
    });
}


