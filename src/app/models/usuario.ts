export class Usuario{
    nombre?:string;
    fechaNacimiento?:Date;
    email?:string;
    password?:string;
    profesional?:boolean;
    sector?:string;
    descripcion?:string;
    cuentaBancariaIBAN?:string;
    titularCuenta?:string;
    valoracionMedia?:number;
    numeroValoraciones?: number;
    bonos?:number;
    admin?:boolean;
    img?:string;
    _id?:string
}
const usuario: Usuario = new Usuario();