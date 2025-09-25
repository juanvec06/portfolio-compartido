// Evento para la pantalla de carga
window.addEventListener("load", function() {
    const preLoad = document.getElementById('pre-load');
    const load = document.querySelector('.load');

    
    setTimeout(() => {
        preLoad.classList.add("hidden");
        load.classList.add("visible");
    }, 1500);
    
});

document.addEventListener("DOMContentLoaded", function() {
    // --- Carga inicial del portafolio ---
    const savedPortfolio = localStorage.getItem('currentPortfolio') || 'companero1';

    // --- LÓGICA DEL FORMULARIO DE CONTACTO ---
    const contactForm = document.getElementById('contact-form');
    const contactList = document.getElementById('contact-list');
    const messagesDiv = document.getElementById('messages');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const contactIdInput = document.getElementById('contact-id');

    const facade = new ContactFacade();

    function showMessage(message, type) {
        messagesDiv.textContent = message;
        messagesDiv.className = type === 'success' ? 'success-message' : 'error-message';
    }

    function renderContacts() {
        const contacts = facade.listarContactos();
        contactList.innerHTML = '';
        if(contacts.length === 0){
             contactList.innerHTML = '<p class="text-center">No hay contactos guardados.</p>';
        } else {
            contacts.forEach(contact => {
                const contactDiv = document.createElement('div');
                contactDiv.className = 'contact-item';
                contactDiv.innerHTML = `
                    <p><strong>Nombre:</strong> ${contact.nombre}</p>
                    <p><strong>Email:</strong> ${contact.email}</p>
                    <p><strong>Teléfono:</strong> ${contact.telefono}</p>
                    <p><strong>Motivo:</strong> ${contact.motivo}</p>
                    <div class="contact-item-actions mt-2">
                        <button class="btn btn-sm edit-btn" data-id="${contact.id}">Editar</button>
                        <button class="btn btn-sm delete-btn" data-id="${contact.id}">Eliminar</button>
                    </div>
                `;
                contactList.appendChild(contactDiv);
            });
        }
    }
    // Manejo del envío del formulario
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        const terminos = document.getElementById('terminos').checked;

        if (!nombre || !email || !telefono || !mensaje) {
            showMessage('Todos los campos son obligatorios.', 'error');
            return;
        }
        if (!terminos) {
            showMessage('Debes aceptar los términos y condiciones.', 'error');
            return;
        }

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

        facade.guardarContacto(formData);
        
        showMessage(formData.id ? 'Contacto actualizado con éxito.' : 'Contacto guardado con éxito.', 'success');
        contactForm.reset();
        contactIdInput.value = '';
        renderContacts();
    });
    // Manejo de eventos para editar y eliminar contactos
    contactList.addEventListener('click', function(e) {
        const id = parseInt(e.target.dataset.id);

        if (e.target.classList.contains('delete-btn')) {
            facade.eliminarContacto(id);
            renderContacts();
            showMessage('Contacto eliminado.', 'success');
        }

        if (e.target.classList.contains('edit-btn')) {
            const contact = facade.repository.getById(id);
            if (contact) {
                contactIdInput.value = contact.id;
                document.getElementById('nombre').value = contact.nombre;
                document.getElementById('email').value = contact.email;
                document.getElementById('telefono').value = contact.telefono;
                document.getElementById('motivo').value = contact.motivo;
                document.getElementById('mensaje').value = contact.mensaje;
                document.getElementById('terminos').checked = contact.aceptaTerminos;
                document.querySelector(`input[name="preferencia"][value="${contact.preferenciaContacto}"]`).checked = true;
                
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

    renderContacts();
});