export class Evento {
    constructor(
    public titulo?: string,
    public descripcion?: string,
    public categoria?: string,
    public precio?: number,
    public esPersonal?: boolean,
    public fecha?: Date,
    public duracion?: Date,
    public enlace?: string,
    public profesional?: string,
    public _id?: string,
    public subCategoria?: string,
    public img?: string
    ){}
}