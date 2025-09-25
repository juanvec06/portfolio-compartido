/* =================================================================
   CONTACT REPOSITORY - GESTIÓN DE PERSISTENCIA
   Clase responsable de manejar el almacenamiento local de contactos
   ================================================================= */

class ContactRepository {
    
    // =============================================================
    // CONSTRUCTOR
    // =============================================================
    
    constructor() {
        this.storageKey = "contactos";
    }

    // =============================================================
    // MÉTODOS DE CONSULTA
    // =============================================================
    
    /**
     * Obtiene todos los contactos almacenados
     * @returns {Array} Lista de contactos
     */
    getAll() {
        const contactos = localStorage.getItem(this.storageKey);
        return contactos ? JSON.parse(contactos) : [];
    }

    /**
     * Busca un contacto específico por ID
     * @param {number} id - ID del contacto a buscar
     * @returns {Object|undefined} Contacto encontrado o undefined
     */
    getById(id) {
        const contactos = this.getAll();
        return contactos.find(contacto => contacto.id === id);
    }

    // =============================================================
    // MÉTODOS DE MODIFICACIÓN
    // =============================================================
    
    /**
     * Agrega un nuevo contacto al almacenamiento
     * @param {Object} contacto - Datos del contacto a agregar
     */
    add(contacto) {
        const contactos = this.getAll();
        contactos.push(contacto);
        localStorage.setItem(this.storageKey, JSON.stringify(contactos));
    }

    /**
     * Actualiza un contacto existente
     * @param {Object} contactoActualizado - Datos actualizados del contacto
     */
    update(contactoActualizado) {
        let contactos = this.getAll();
        
        contactos = contactos.map(contacto => {
            if (contacto.id === contactoActualizado.id) {
                contactoActualizado.fechaActualizacion = new Date();
                return contactoActualizado;
            }
            return contacto;
        });
        
        localStorage.setItem(this.storageKey, JSON.stringify(contactos));
    }

    /**
     * Elimina un contacto por ID
     * @param {number} id - ID del contacto a eliminar
     */
    remove(id) {
        let contactos = this.getAll();
        contactos = contactos.filter(contacto => contacto.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(contactos));
    }

    /**
     * Elimina todos los contactos del almacenamiento
     */
    clear() {
        localStorage.removeItem(this.storageKey);
    }
}