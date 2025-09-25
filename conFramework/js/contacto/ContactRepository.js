class ContactRepository {
    constructor() {
        this.storageKey = "contactos1";
    }

    getAll() {
        const contactos = localStorage.getItem(this.storageKey);
        return contactos ? JSON.parse(contactos) : [];
    }

    getById(id) {
        const contactos = this.getAll();
        return contactos.find(contacto => contacto.id === id);
    }

    add(contacto) {
        const contactos = this.getAll();
        contactos.push(contacto);
        localStorage.setItem(this.storageKey, JSON.stringify(contactos));
    }

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

    remove(id) {
        let contactos = this.getAll();
        contactos = contactos.filter(contacto => contacto.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(contactos));
    }

    clear() {
        localStorage.removeItem(this.storageKey);
    }
}