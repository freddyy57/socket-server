import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { debuglog } from 'util';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/socket';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo Good!!'
    });
});

router.post('/mensajes', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;
    server.io.emit( 'mensaje-nuevo', payload);

    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: debuglog
    });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;
    server.io.in( id ).emit( 'mensaje-privado', payload);

    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: de,
        id: id
    });
});

// <------ Servicio para obtener los ID's de los usuarios ------->
router.get('/usuarios', (req:Request,res:Response) => {
    const server = Server.instance;
    // función que barre todos los clientes
    server.io.clients( ( err: any, clientes: string[] ) => {
        if (err) {
            return res.json ({
                ok: false,
                err
            })
        }
        // TODO OK
        res.json({
            ok: true,
            clientes: clientes
        })
    });
})

// <------ Obtener usuarios y sus nombres ---->
router.get('/usuarios/detalle', (req:Request,res:Response) => {

    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    })
})

export default router;