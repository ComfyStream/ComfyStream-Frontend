import { Usuario } from './usuario';

export class Suscripcion {
    suscriptor?:Usuario;
    profesional?:Usuario;
    pagoPaypalUrl?:string;
    fecha_compra?:Date;
    fecha_expiracion?:Date;
}