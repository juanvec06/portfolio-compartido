class Contacto {
    constructor(id, nombre, email, telefono, motivo, mensaje, terminos, preferencia) {
        this.id = id || Date.now();
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.motivo = motivo;
        this.mensaje = mensaje;
        this.aceptaTerminos = terminos;
        this.preferenciaContacto = preferencia;
        this.fechaCreacion = new Date();
        this.fechaActualizacion = new Date();
    }
}