# Portafolio Personal Compartido - Proyecto Colaborativo

Un proyecto de portafolio web desarrollado como trabajo académico para la asignatura de **Ingeniería del Software III** de la Universidad del Cauca. Este proyecto presenta **dos implementaciones diferentes** de portafolios, demostrando diversos enfoques en el desarrollo web frontend.

El proyecto exhibe la aplicación de principios de ingeniería de software, patrones de diseño, metodologías de desarrollo, y mejores prácticas en arquitectura web moderna.

**Autores:**  
- Juan David Perdomo Ramos *(sinFramework)*  
- Juan David Vela Coronado *(conFramework)*  

**Universidad:** Universidad del Cauca  
**Asignatura:** Ingeniería del Software III  
**Año:** 2025

---

## Tecnologías Utilizadas

### Frontend Core
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con variables CSS y gradientes
- **JavaScript ES6+**: Interactividad y lógica de negocio
- **Bootstrap 5.3.3**: Framework CSS para diseño responsive *(conFramework)*

### Diseño Visual
- **Paleta de colores personalizada**: Esquema de colores neón (cian/turquesa)
- **Tipografía**: Fuentes del sistema y tipografías web
- **Efectos visuales**: Sombras neón, transiciones y animaciones CSS
- **Layout responsive**: Navegación suave y adaptable
- **Glassmorphism**: Efectos de cristal y blur *(conFramework)*

### Arquitectura de Software
- **Patrón Repository**: Gestión de persistencia de datos
- **Patrón Facade**: Simplificación de la lógica de negocio
- **Atomic Design**: Metodología de componentes *(conFramework)*
- **Separación de responsabilidades**: Código organizado en módulos
- **LocalStorage**: Persistencia de datos en el cliente

---

## Instalación y Uso

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- No se requieren dependencias adicionales

### Instalación
1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/juanvec06/portfolio-compartido.git
   cd portfolio-compartido
   ```

2. **Ejecutar la aplicación:**
   - **Versión sin Framework:** Navegar a `sinFramework/` y abrir `index.html`
   - **Versión con Framework:** Navegar a `conFramework/` y abrir `index.html`

3. **Abrir en navegador:**
   ```bash
   # Opción 1: Doble clic en index.html
   # Opción 2: Servir con servidor local (recomendado)
   python -m http.server 8000
   # Luego abrir http://localhost:8000
   ```

### Demo en Vivo
Puedes ver el portafolio en funcionamiento visitando: [URL del proyecto desplegado]

---

## Estructura del Proyecto

```
portfolio-compartido/
│
├── sinFramework/                    # Versión Vanilla (Juan David Perdomo)
│   ├── index.html                   # Página principal - CSS puro
│   ├── css/
│   │   └── estilo.css              # Estilos organizados y optimizados
│   ├── js/
│   │   ├── script.js               # Lógica principal de la aplicación
│   │   └── contacto/               # Sistema de Contactos
│   │       ├── Contacto.js         # Modelo de datos (Domain)
│   │       ├── ContactRepository.js # Persistencia (Repository Pattern)
│   │       └── ContactFacade.js    # Lógica de negocio (Facade Pattern)
│   └── assets/
│       └── images/                 # Imágenes del portafolio
│           ├── fotoperfil.jpg
│           ├── pasatiempo1.jpg
│           ├── pasatiempo2.jpg
│           └── pasatiempo3.jpg
│
├── conFramework/                    # Versión Bootstrap + Atomic Design (Juan David Vela)
│   ├── index.html                   # Página principal con Bootstrap 5.3.3
│   ├── css/
│   │   ├── main.css                # Archivo principal de estilos
│   │   ├── atoms/                  # Elementos básicos
│   │   │   ├── _colors.css         # Variables de color neón
│   │   │   ├── _typography.css     # Tipografías y efectos de texto
│   │   │   └── _buttons.css        # Estilos de botones
│   │   ├── molecules/              # Componentes pequeños
│   │   │   ├── _nav.css           # Navegación con glassmorphism
│   │   │   ├── _form.css          # Formularios y controles
│   │   │   ├── _carousel.css      # Carrusel de pasatiempos
│   │   │   └── _tables.css        # Tablas de información
│   │   ├── organisms/              # Componentes complejos
│   │   │   ├── _preloader.css     # Pantalla de carga animada
│   │   │   ├── _sections.css      # Secciones principales
│   │   │   └── _footer.css        # Pie de página
│   │   ├── templates/              # Plantillas de página
│   │   │   └── _layout.css        # Layout general
│   │   └── pages/                  # Estilos específicos de página
│   │       └── _home.css          # Página principal
│   ├── js/
│   │   ├── funciones.js           # Lógica principal con preloader
│   │   └── contacto/              # Sistema de contactos (misma estructura)
│   │       ├── Contacto.js
│   │       ├── ContactRepository.js
│   │       └── ContactFacade.js
│   └── assets/
│       └── images/                # Recursos visuales espaciales
│           ├── galaxia-bg.jpg
│           ├── galaxia-bg2.jpg
│           ├── moon.jpg
│           └── tu-foto.png
│
└── README.md                       # Documentación del proyecto
```

---

## Características Principales

### Secciones del Portafolio (Ambas Versiones)
- **Inicio**: Presentación personal con foto de perfil y expectativas profesionales
- **Estudios**: Tabla informativa con formación académica (bachillerato y universidad)
- **Pasatiempos**: Carrusel interactivo con actividades personales (ejercicio, entretenimiento, vida social)
- **Proyectos**: Showcase de proyectos desarrollados (JuiceStock, TodoApp)
- **Contacto**: Sistema completo de gestión de contactos

### Características Exclusivas conFramework
- **Preloader animado**: Pantalla de carga con logo giratorio y efectos neón
- **Tema espacial**: Fondos de galaxia y efectos visuales cósmicos
- **Glassmorphism**: Efectos de cristal y transparencias con blur
- **Efectos neón**: Colores cian/turquesa con resplandor y sombras
- **Atomic Design**: Componentes organizados en atoms/molecules/organisms

### Funcionalidades Técnicas

#### Carrusel Interactivo
- Navegación fluida entre slides
- Controles de navegación (anterior/siguiente)
- Transiciones suaves con CSS
- Contenido descriptivo para cada slide

#### Sistema de Contactos Avanzado
- **Formulario validado**: Campos obligatorios y validación de email/teléfono
- **CRUD completo**: Crear, leer, actualizar y eliminar contactos
- **Persistencia local**: Datos guardados en localStorage del navegador
- **Interfaz intuitiva**: Botones de edición y eliminación por contacto
- **Confirmaciones**: Diálogos de confirmación para acciones destructivas

#### Experiencia de Usuario
- **Navegación suave**: Scroll automático a secciones con offset para header fijo
- **Diseño cohesivo**: Paleta de colores consistente en toda la aplicación
- **Feedback visual**: Mensajes de éxito/error para acciones del usuario
- **Header sticky**: Barra de navegación siempre visible

---

## Arquitectura y Patrones

### Patrones de Diseño Implementados

#### Repository Pattern
- **ContactRepository.js**: Maneja toda la lógica de persistencia
- Abstrae el acceso a localStorage del resto de la aplicación
- Métodos CRUD bien definidos (getAll, getById, add, update, remove, clear)

#### Facade Pattern  
- **ContactFacade.js**: Simplifica las operaciones complejas
- Coordina entre el modelo de datos y el repositorio
- Separa la lógica de negocio de la presentación

#### Separación de Responsabilidades
- **Contacto.js**: Modelo de datos con validaciones
- **script.js**: Controlador de la interfaz de usuario
- **estilo.css**: Presentación visual organizada en secciones

### Organización del Código
- Código documentado con JSDoc
- Funciones bien definidas con responsabilidades específicas  
- Manejo de errores y validaciones
- Código modular y reutilizable

---

## Diferencias entre Versiones

### **sinFramework** - Versión Vanilla CSS (Juan David Perdomo)

**Explicación breve:**  
Implementación pura usando HTML5, CSS3 y JavaScript vanilla sin dependencias externas. Enfocada en demostrar dominio de tecnologías web fundamentales con código optimizado y personalizado.

**Tecnologías:**
- **HTML5** semántico y accesible
- **CSS3 puro** con variables, flexbox y grid
- **JavaScript ES6+** modular y documentado
- **localStorage** para persistencia
- **Patrones Repository y Facade**

**Instrucciones de uso:**
1. Navegar a la carpeta `sinFramework/`
2. Abrir `index.html` en cualquier navegador moderno
3. Explorar las secciones del portafolio usando la navegación
4. Probar el sistema de contactos (agregar, editar, eliminar)
5. No requiere instalación ni dependencias

---

### **conFramework** - Versión Bootstrap + Atomic Design (Juan David Vela)

**Explicación breve:**  
Implementación moderna usando Bootstrap 5.3.3 y metodología Atomic Design. Incluye efectos visuales avanzados, preloader animado, y arquitectura de componentes escalable con tema espacial neón.

**Tecnologías:**
- **HTML5** con componentes Bootstrap
- **Bootstrap 5.3.3** para layout responsive
- **Atomic Design** (atoms, molecules, organisms, templates, pages)
- **CSS3** con efectos neón y glassmorphism
- **JavaScript ES6+** con preloader y animaciones
- **localStorage** para persistencia
- **CDN de Bootstrap** para recursos

**Instrucciones de uso:**
1. Navegar a la carpeta `conFramework/`
2. Abrir `index.html` en navegador (requiere conexión a internet para CDN)
3. Esperar la animación del preloader (1.5 segundos)
4. Explorar las secciones con efectos visuales mejorados
5. Probar funcionalidades del sistema de contactos
6. Observar efectos glassmorphism y animaciones neón

---

### Comparación Técnica

| Característica | sinFramework | conFramework |
|----------------|--------------|--------------|
| **Autor** | Juan David Perdomo | Juan David Vela |
| **Enfoque** | Vanilla CSS puro | Bootstrap + Atomic Design |
| **Dependencias** | Ninguna | Bootstrap 5.3.3 (CDN) |
| **Metodología** | Modular tradicional | Atomic Design |
| **Tema visual** | Azul-turquesa limpio | Espacial neón |
| **Efectos** | Transiciones CSS básicas | Glassmorphism + neón |
| **Preloader** | No incluye | Animación de carga |
| **Arquitectura CSS** | Un archivo organizado | Múltiples archivos por componente |
| **Responsive** | Flexbox/Grid manual | Sistema Bootstrap |
| **Complejidad** | Baja-Media | Media-Alta |

---

## Tecnologías y Herramientas

| Categoría | Tecnología | sinFramework | conFramework |
|-----------|------------|--------------|-------------|
| **Frontend** | HTML5 | ✅ Semántico | ✅ + Bootstrap components |
| | CSS3 | ✅ Puro + Variables | ✅ + Atomic Design |
| | JavaScript ES6+ | ✅ Vanilla | ✅ + Preloader |
| | Bootstrap | ❌ | ✅ v5.3.3 (CDN) |
| **Arquitectura** | Repository Pattern | ✅ | ✅ |
| | Facade Pattern | ✅ | ✅ |
| | Atomic Design | ❌ | ✅ Completo |
| | MVC | ✅ Básico | ✅ Avanzado |
| **Efectos** | Transiciones CSS | ✅ Básicas | ✅ Avanzadas |
| | Glassmorphism | ❌ | ✅ |
| | Efectos Neón | ❌ | ✅ |
| | Preloader | ❌ | ✅ Animado |
| **Persistencia** | localStorage | ✅ | ✅ |
| **Metodología** | Organización | ✅ Modular | ✅ Atomic Design |
| **Versionado** | Git | ✅ | ✅ |
| **IDE** | VS Code | ✅ | ✅ |

---

## Objetivos de Aprendizaje Alcanzados

- **Desarrollo Frontend Moderno**  
- **Implementación de Patrones de Diseño**  
- **Gestión de Estado en el Cliente**  
- **Validación de Formularios**  
- **Persistencia de Datos**  
- **Experiencia de Usuario (UX)**  
- **Código Limpio y Documentado**  
- **Organización de Proyectos**

---

## Autores

### - Juan David Perdomo Ramos
- GitHub: [@JuanDv1](https://github.com/JuanDv1)

### - Juan David Vela Coronado
- GitHub: [@juanvec06](https://github.com/juanvec06)

---

## Licencia

Este proyecto fue desarrollado con fines académicos para la asignatura de Ingeniería del Software III. 

**Fecha de desarrollo:** Septiembre 2025