/* =================================================================
   SCRIPT PRINCIPAL - PORTAFOLIO PERSONAL
   ================================================================= */

document.addEventListener("DOMContentLoaded", function() {
    
    // =============================================================
    // CARRUSEL DE PASATIEMPOS
    // =============================================================
    
    // Elementos del carrusel
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    let currentIndex = 0;

    /**
     * Muestra un slide específico del carrusel
     * @param {number} index - Índice del slide a mostrar
     */
    function showSlide(index) {
        items.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) {
                item.classList.add('active');
            }
        });
    }

    // Event listeners para navegación del carrusel
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % items.length;
            showSlide(currentIndex);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            showSlide(currentIndex);
        });
    }

    // =============================================================
    // SISTEMA DE CONTACTOS
    // =============================================================
    
    // Elementos del DOM
    const contactForm = document.getElementById('contact-form');
    const contactList = document.getElementById('contact-list');
    const messagesDiv = document.getElementById('messages');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const contactIdInput = document.getElementById('contact-id');

    // Inicializar el sistema de contactos
    const facade = new ContactFacade();

    // =============================================================
    // FUNCIONES AUXILIARES
    // =============================================================
    
    /**
     * Muestra mensajes al usuario en la interfaz
     * @param {string} message - Mensaje a mostrar
     * @param {string} type - Tipo de mensaje ('success' o 'error')
     */
    function showMessage(message, type) {
        if (messagesDiv) {
            messagesDiv.textContent = message;
            messagesDiv.className = type === 'success' ? 'success-message' : 'error-message';
        }
    }

    /**
     * Renderiza la lista de contactos en el DOM
     */
    function renderContacts() {
        const contacts = facade.listarContactos();
        contactList.innerHTML = '';
        
        if (contacts.length === 0) {
            contactList.innerHTML = '<p>No hay contactos guardados.</p>';
        } else {
            contacts.forEach(contact => {
                const contactDiv = document.createElement('div');
                contactDiv.className = 'contact-item';
                contactDiv.innerHTML = `
                    <p><strong>Nombre:</strong> ${contact.nombre}</p>
                    <p><strong>Email:</strong> ${contact.email}</p>
                    <p><strong>Teléfono:</strong> ${contact.telefono}</p>
                    <p><strong>Motivo:</strong> ${contact.motivo}</p>
                    <div class="contact-item-actions">
                        <button class="edit-btn" data-id="${contact.id}">Editar</button>
                        <button class="delete-btn" data-id="${contact.id}">Eliminar</button>
                    </div>
                `;
                contactList.appendChild(contactDiv);
            });
        }
    }

    // =============================================================
    // EVENT LISTENERS
    // =============================================================
    
    // Manejo del formulario de contacto
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Obtener y validar datos del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        const terminos = document.getElementById('terminos').checked;

        // Validaciones
        if (!nombre || !email || !telefono || !mensaje) {
            showMessage('Todos los campos son obligatorios.', 'error');
            return;
        }
        if (!terminos) {
            showMessage('Debes aceptar los términos y condiciones.', 'error');
            return;
        }

        // Preparar datos para guardar
        const formData = {
            id: contactIdInput.value,
            nombre: nombre,
            email: email,
            telefono: telefono,
            motivo: document.getElementById('motivo').value,
            mensaje: mensaje,
            terminos: terminos,
            preferencia: document.querySelector('input[name="preferencia"]:checked').value
        };

        // Guardar contacto y mostrar mensaje
        facade.guardarContacto(formData);
        showMessage(formData.id ? 'Contacto actualizado con éxito.' : 'Contacto guardado con éxito.', 'success');
        
        // Limpiar formulario y actualizar lista
        contactForm.reset();
        contactIdInput.value = '';
        renderContacts();
    });

    // Manejo de acciones en la lista de contactos (editar/eliminar)
    contactList.addEventListener('click', function(e) {
        const id = parseInt(e.target.dataset.id);

        // Eliminar contacto
        if (e.target.classList.contains('delete-btn')) {
            facade.eliminarContacto(id);
            renderContacts();
            showMessage('Contacto eliminado.', 'success');
        }

        // Editar contacto
        if (e.target.classList.contains('edit-btn')) {
            const contact = facade.repository.getById(id);
            if (contact) {
                // Cargar datos del contacto en el formulario
                contactIdInput.value = contact.id;
                document.getElementById('nombre').value = contact.nombre;
                document.getElementById('email').value = contact.email;
                document.getElementById('telefono').value = contact.telefono;
                document.getElementById('motivo').value = contact.motivo;
                document.getElementById('mensaje').value = contact.mensaje;
                document.getElementById('terminos').checked = contact.aceptaTerminos;
                document.querySelector(`input[name="preferencia"][value="${contact.preferenciaContacto}"]`).checked = true;
                
                // Desplazar hacia el formulario
                contactForm.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
    
    // Botón para borrar todos los contactos
    clearAllBtn.addEventListener('click', () => {
        facade.borrarTodo();
        renderContacts();
        showMessage('Todos los contactos han sido eliminados.', 'success');
    });

    // =============================================================
    // INICIALIZACIÓN
    // =============================================================
    
    // Cargar datos iniciales
    renderContacts();
    showSlide(currentIndex);
});