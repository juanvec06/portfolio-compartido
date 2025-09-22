document.addEventListener("DOMContentLoaded", function() {

    // --- (NUEVO) DATOS DE LOS PORTAFOLIOS ---
    const portfolioData = {
        'companero1': {
            nombre: 'Tu Nombre Completo',
            foto: 'assets/images/tu-foto.png',
            // Puedes añadir más datos aquí si quieres expandir la funcionalidad
        },
        'companero2': {
            nombre: 'Juan David Perdomo',
            foto: 'assets/images/juanda.jpg',
        }
    };

    // --- (NUEVO) LÓGICA DEL CONMUTADOR DE PERFILES ---
    const switcher = document.getElementById('portfolio-switcher');
    
    function updatePortfolioContent(portfolioId) {
        const data = portfolioData[portfolioId];
        if (!data) return;

        // 1. Cambiar la foto principal
        document.querySelector('.personal-photo').src = data.foto;
        // Opcional: Cambiar también el nombre
        document.querySelector('.inicio-text h2').textContent = data.nombre;

        // 2. Cambiar el fondo del body
        // Primero, nos aseguramos de que la clase no esté presente
        document.body.classList.remove('portfolio-companero2-active');
        // Luego, la añadimos SOLO si es el compañero 2
        if (portfolioId === 'companero2') {
            document.body.classList.add('portfolio-companero2-active');
        }

        // 3. Actualizar el estado visual del conmutador
        document.querySelectorAll('.portfolio-option').forEach(img => {
            img.classList.remove('active');
            if (img.dataset.portfolio === portfolioId) {
                img.classList.add('active');
            }
        });

        // 4. Guardar la selección en localStorage para que sea persistente
        localStorage.setItem('currentPortfolio', portfolioId);
    }

    switcher.addEventListener('click', function(e) {
        // Usamos delegación de eventos para escuchar clics en las imágenes
        if (e.target.classList.contains('portfolio-option')) {
            const portfolioId = e.target.dataset.portfolio;
            updatePortfolioContent(portfolioId);
        }
    });

    // --- (NUEVO) Carga inicial del portafolio ---
    // Revisa si hay una selección guardada, si no, usa el 'companero1' por defecto
    const savedPortfolio = localStorage.getItem('currentPortfolio') || 'companero1';
    updatePortfolioContent(savedPortfolio);


    // --- LÓGICA DEL CARRUSEL (Tu código original) ---
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    let currentIndex = 0;

    function showSlide(index) {
        items.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) {
                item.classList.add('active');
            }
        });
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showSlide(currentIndex);
    });

    // --- LÓGICA DEL FORMULARIO DE CONTACTO (Tu código original) ---
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

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validación simple
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
        contactIdInput.value = ''; // Limpiar el ID oculto
        renderContacts();
    });

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
                
                // Mover el scroll hacia el formulario
                contactForm.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
    
    clearAllBtn.addEventListener('click', () => {
        facade.borrarTodo();
        renderContacts();
        showMessage('Todos los contactos han sido eliminados.', 'success');
    });

    // Carga inicial de tus funciones originales
    renderContacts();
    showSlide(currentIndex);
});