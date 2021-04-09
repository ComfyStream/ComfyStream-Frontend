import { Usuario } from './usuario';
import { Chat } from './chat';

export interface Mensaje{
    _id?:string,
    chat?:string,
    autor?:string,
    cuerpo?:string,
    fecha?:Date
}