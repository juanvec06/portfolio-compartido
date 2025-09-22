class ContactFacade {
    constructor() {
        this.repository = new ContactRepository();
    }

    guardarContacto(datosFormulario) {
        // Si hay un ID, es una actualización; si no, es uno nuevo
        if (datosFormulario.id) {
             const contactoExistente = this.repository.getById(parseInt(datosFormulario.id));
             if (contactoExistente) {
                // Actualizamos los campos
                contactoExistente.nombre = datosFormulario.nombre;
                contactoExistente.email = datosFormulario.email;
                contactoExistente.telefono = datosFormulario.telefono;
                contactoExistente.motivo = datosFormulario.motivo;
                contactoExistente.mensaje = datosFormulario.mensaje;
                contactoExistente.aceptaTerminos = datosFormulario.terminos;
                contactoExistente.preferenciaContacto = datosFormulario.preferencia;
                
                this.repository.update(contactoExistente);
             }
        } else {
            const nuevoContacto = new Contacto(
                null, // ID se generará en el constructor
                datosFormulario.nombre,
                datosFormulario.email,
                datosFormulario.telefono,
                datosFormulario.motivo,
                datosFormulario.mensaje,
                datosFormulario.terminos,
                datosFormulario.preferencia
            );
            this.repository.add(nuevoContacto);
        }
    }

    listarContactos() {
        return this.repository.getAll();
    }

    eliminarContacto(id) {
        if (confirm("¿Estás seguro de que deseas eliminar este contacto?")) {
            this.repository.remove(id);
        }
    }



    borrarTodo() {
         if (confirm("¿Estás seguro de que deseas eliminar TODOS los contactos? Esta acción es irreversible.")) {
            this.repository.clear();
        }
    }
}