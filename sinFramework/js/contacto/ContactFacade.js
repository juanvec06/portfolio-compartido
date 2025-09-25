/* =================================================================
   CONTACT FACADE - CAPA DE NEGOCIO
   Clase que implementa la lógica de negocio para el sistema de contactos
   ================================================================= */

class ContactFacade {
    
    // =============================================================
    // CONSTRUCTOR
    // =============================================================
    
    constructor() {
        this.repository = new ContactRepository();
    }

    // =============================================================
    // MÉTODOS PRINCIPALES
    // =============================================================
    
    /**
     * Guarda un contacto (nuevo o actualización)
     * @param {Object} datosFormulario - Datos del formulario de contacto
     */
    guardarContacto(datosFormulario) {
        if (datosFormulario.id) {
            this._actualizarContacto(datosFormulario);
        } else {
            this._crearNuevoContacto(datosFormulario);
        }
    }

    /**
     * Obtiene la lista completa de contactos
     * @returns {Array} Lista de todos los contactos
     */
    listarContactos() {
        return this.repository.getAll();
    }

    /**
     * Elimina un contacto específico
     * @param {number} id - ID del contacto a eliminar
     */
    eliminarContacto(id) {
        if (confirm("¿Estás seguro de que deseas eliminar este contacto?")) {
            this.repository.remove(id);
        }
    }

    /**
     * Elimina todos los contactos
     */
    borrarTodo() {
        if (confirm("¿Estás seguro de que deseas eliminar TODOS los contactos? Esta acción es irreversible.")) {
            this.repository.clear();
        }
    }

    // =============================================================
    // MÉTODOS PRIVADOS
    // =============================================================
    
    /**
     * Actualiza un contacto existente
     * @private
     * @param {Object} datosFormulario - Datos del formulario
     */
    _actualizarContacto(datosFormulario) {
        const contactoExistente = this.repository.getById(parseInt(datosFormulario.id));
        
        if (contactoExistente) {
            // Actualizar campos del contacto existente
            contactoExistente.nombre = datosFormulario.nombre;
            contactoExistente.email = datosFormulario.email;
            contactoExistente.telefono = datosFormulario.telefono;
            contactoExistente.motivo = datosFormulario.motivo;
            contactoExistente.mensaje = datosFormulario.mensaje;
            contactoExistente.aceptaTerminos = datosFormulario.terminos;
            contactoExistente.preferenciaContacto = datosFormulario.preferencia;
            
            this.repository.update(contactoExistente);
        }
    }

    /**
     * Crea un nuevo contacto
     * @private
     * @param {Object} datosFormulario - Datos del formulario
     */
    _crearNuevoContacto(datosFormulario) {
        const nuevoContacto = new Contacto(
            null, // ID se generará automáticamente en el constructor
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