import { Usuario } from './usuario';

export class UsuariosLista {

    private lista: Usuario[] = [];

    constructor() {

    }

    // <----- Agregar un usuario ----->
    public agregar( usuario: Usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    };
    // <------- Actualizar nombre de usuario ----->
    public actualizarNombre( id: string, nombre: string ){
        this.lista.forEach( usuario => {
            if( usuario.id === id ){
                usuario.nombre = nombre;
            }
            console.log('<-------- Actualizando Usuario ------------>');
            console.log(this.lista);
        });

    };
    
    // <--- Obtener lista de usuario --->
    public getLista(){
        return this.lista;
    }

    // <----- Obtener un usuario ----->
    public getUsuario( id: string ) {
        return this.lista.find( usuario => {
            return usuario.id === id;
        });
    }

    // <----- Obtener usuarios de una sala en particular ----->
    public getUsuarioEnSala( sala: string ) {
        return this.lista.filter( usuario => {
            return usuario.sala === sala;
        });
    }

    // <------ Borrar usuario ------>
    public borrarUsuario( id: string ) {
        const tempUsuario = this.getUsuario( id );
        // Borrar
        this.lista = this.lista.filter( usuario => {
            return usuario.id !== id;
        });

       // console.log(this.lista);
        return tempUsuario;
    }
    
}