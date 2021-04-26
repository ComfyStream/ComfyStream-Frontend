export class Valoracion {
    constructor(
    public _id?: string,
    public autor?: string,
    public nombreAutor?: string,
    public nombreProfesional?: string,
    public profesional?: string,
    public mensaje?: string,
    public estrellas?: number,
    public fecha?: Date,

    ){}
}