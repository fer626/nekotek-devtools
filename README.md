# nekotek-devtools

# 🛠️ WebDevTools Pro [Work in progress]

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow.svg)

**Herramienta de desarrollo integral para debugging y análisis de aplicaciones web modernas**

[Características](#-características) • [Instalación](#-instalación) • [Uso](#-uso) • [API](#-api) • [Ejemplos](#-ejemplos)

</div>

---

## 📋 Descripción

WebDevTools Pro es una suite completa de herramientas de desarrollo que se integra perfectamente en cualquier proyecto web. Detecta automáticamente el framework que estás usando (Vue.js, Nuxt.js, React, Angular, etc.) y proporciona utilidades específicas para debugging, análisis de performance y validación de layout.

### ⚡ Características Destacadas

- **🎯 Comparador de Anchos**: Compara el `clientWidth` de dos elementos HTML y muestra diferencias en píxeles
- **🔍 Detección Automática de Frameworks**: Identifica Vue, Nuxt, React, Angular, Svelte y más
- **📊 Análisis de Performance**: Métricas detalladas de carga y rendimiento
- **🎨 Herramientas CSS**: Extracción de paletas de colores y fuentes utilizadas
- **📱 Testing Responsive**: Validación de breakpoints en tiempo real
- **🌳 Inspector de Componentes**: Visualización del árbol DOM
- **⌨️ Atajos de Teclado**: Acceso rápido con `Ctrl + Shift + D`
- **🎭 Panel Flotante**: Interfaz drag-and-drop completamente personalizable

---

## 🚀 Instalación

### Opción 1: CDN (Recomendado)

```html
<!-- Cargar desde jsDelivr -->
<script src="https://cdn.jsdelivr.net/gh/fer626/nekotek-devtools@main/index.js"></script>
```

### Opción 2: NPM (Próximamente)

```bash
npm install nekotek-devtools
```

```javascript
import WebDevTools from 'nekotek-devtools';
```

### Opción 3: Descarga Directa

```html
<!-- Archivo local -->
<script src="./path/to/index.js"></script>
```

### Opción 4: Carga Dinámica

```javascript
// Cargar en runtime
(function() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/gh/fer626/nekotek-devtools@main/index.js';
  document.head.appendChild(script);
})();
```

---

## 📖 Uso

### Inicio Rápido

Una vez cargado el script, WebDevTools se inicializa automáticamente y estará disponible globalmente:

```javascript
// El panel aparecerá automáticamente
// Presiona Ctrl + Shift + D para abrirlo

// O usa el API programáticamente
wdt.open();
```

### Interfaz Visual

1. **Abrir Panel**: Presiona `Ctrl + Shift + D` o haz clic en el botón flotante 🛠️
2. **Arrastrar Panel**: Haz clic en el header y arrastra a cualquier posición
3. **Cerrar Panel**: Click en la X o presiona `Ctrl + Shift + D` nuevamente

---

## 🎯 API

### Métodos Principales

#### `wdt.compareWidths(selector1, selector2)`

Compara el ancho de dos elementos y muestra los resultados en el panel.

```javascript
// Comparar header con sidebar
wdt.compareWidths('#header', '.sidebar');

// Resultado visual en el panel:
// ❌ Los elementos tienen diferentes anchos:
// #header: 1200px
// .sidebar: 300px
// Diferencia: 900px
```

#### `wdt.getWidth(selector)`

Obtiene el `clientWidth` de un elemento.

```javascript
const ancho = wdt.getWidth('#miContenedor');
console.log(ancho); // 1024
```

#### `wdt.highlight(selector)`

Resalta visualmente un elemento durante 2 segundos.

```javascript
wdt.highlight('.card');
```

#### `wdt.framework()`

Retorna el framework detectado.

```javascript
console.log(wdt.framework()); // "Vue.js"
```

#### `wdt.open()`

Abre el panel de herramientas.

```javascript
wdt.open();
```

### Métodos Avanzados

#### `WebDevTools.instance.measurePerformance()`

Muestra métricas detalladas de performance:

```javascript
WebDevTools.instance.measurePerformance();
// Muestra: Carga Total, DOM Ready, Memoria JS, etc.
```

#### `WebDevTools.instance.highlightElements()`

Resalta todos los elementos interactivos (botones, links, inputs):

```javascript
WebDevTools.instance.highlightElements();
```

#### `WebDevTools.instance.showComponentTree()`

Muestra en consola el árbol de componentes:

```javascript
WebDevTools.instance.showComponentTree();
```

#### `WebDevTools.instance.showColorPalette()`

Extrae todos los colores utilizados en la página:

```javascript
WebDevTools.instance.showColorPalette();
```

#### `WebDevTools.instance.listFonts()`

Lista todas las fuentes utilizadas:

```javascript
WebDevTools.instance.listFonts();
```

#### `WebDevTools.instance.testResponsive()`

Valida breakpoints responsive:

```javascript
WebDevTools.instance.testResponsive();
```

---

## 💡 Ejemplos

### Ejemplo 1: Validar Layout Responsive

```javascript
// Comparar ancho de contenedor principal con sidebar
wdt.compareWidths('.main-content', '.sidebar');

// Verificar que el footer sea del mismo ancho que el header
wdt.compareWidths('header', 'footer');
```

### Ejemplo 2: Debugging de Componentes

```javascript
// Abrir el panel
wdt.open();

// Resaltar todos los elementos clickeables
WebDevTools.instance.highlightElements();

// Ver el árbol de componentes en consola
WebDevTools.instance.showComponentTree();
```

### Ejemplo 3: Análisis de Performance

```javascript
// Medir performance de la página
WebDevTools.instance.measurePerformance();

// Ver colores utilizados
WebDevTools.instance.showColorPalette();

// Listar fuentes
WebDevTools.instance.listFonts();
```

### Ejemplo 4: Integración con Vue/React

```javascript
// En Vue 3 (Composition API)
import { onMounted } from 'vue';

onMounted(() => {
  // Validar que dos contenedores tengan el mismo ancho
  wdt.compareWidths('#container-a', '#container-b');
});

// En React
useEffect(() => {
  // Comparar anchos después del render
  wdt.compareWidths('.left-panel', '.right-panel');
}, []);
```

### Ejemplo 5: Testing Automatizado

```javascript
// Función helper para tests
function validateLayout() {
  const headerWidth = wdt.getWidth('header');
  const footerWidth = wdt.getWidth('footer');
  
  if (headerWidth !== footerWidth) {
    console.error(`Layout inconsistente: Header ${headerWidth}px vs Footer ${footerWidth}px`);
    return false;
  }
  
  return true;
}

// Ejecutar validación
if (!validateLayout()) {
  wdt.compareWidths('header', 'footer'); // Mostrar detalles visuales
}
```

---

## 🎨 Características Detalladas

### 📏 Comparador de Anchos

La funcionalidad estrella de WebDevTools Pro. Permite comparar el `clientWidth` de dos contenedores HTML de forma visual e intuitiva.

**Casos de uso:**
- Validar que dos columnas tengan el mismo ancho
- Verificar consistencia de layout en diferentes secciones
- Debugging de problemas de responsive design
- Comparar anchos antes y después de aplicar estilos

**Características:**
- ✅ Detección automática de elementos
- ✅ Mensajes de error descriptivos si no encuentra los elementos
- ✅ Resaltado visual temporal de los elementos comparados
- ✅ Cálculo automático de diferencias en píxeles
- ✅ Indicador visual de cuál elemento es más ancho

### 🔍 Detección de Frameworks

Identifica automáticamente qué framework estás usando:

| Framework | Método de Detección |
|-----------|---------------------|
| Vue.js | `window.Vue` o atributos `data-v-` |
| Nuxt.js | `window.$nuxt` o `window.__NUXT__` |
| React | `window.React` o atributos `data-reactroot` |
| Angular | `window.angular` |
| Svelte | `window.Svelte` |
| Alpine.js | `window.Alpine` |

### 📊 Métricas de Performance

Muestra información detallada sobre:
- **Carga Total**: Tiempo desde navegación hasta carga completa
- **DOM Ready**: Tiempo hasta que el DOM está listo
- **Memoria JS**: Uso de heap de JavaScript
- **Recursos**: Cantidad de recursos cargados

### 🎨 Herramientas CSS

- **Paleta de Colores**: Extrae todos los colores (color, background-color) usados
- **Fuentes**: Lista todas las familias de fuentes aplicadas
- **Inspector**: Resalta elementos interactivos (botones, links, inputs)

### 📱 Testing Responsive

Valida breakpoints comunes:
- **Mobile**: 375px
- **Tablet**: 768px
- **Desktop**: 1024px
- **Wide**: 1440px

---

## ⌨️ Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl + Shift + D` | Abrir/Cerrar panel |

---

## 🎯 Frameworks Soportados

WebDevTools Pro es compatible con:

- ✅ **Vue.js** (2.x y 3.x)
- ✅ **Nuxt.js** (2.x y 3.x)
- ✅ **React** (16.x, 17.x, 18.x)
- ✅ **Angular** (2+)
- ✅ **Svelte**
- ✅ **Alpine.js**
- ✅ **Vanilla JavaScript**
- ✅ **jQuery**

---

## 🔧 Configuración Avanzada

### Personalización del Panel

```javascript
// Acceder a la instancia
const devtools = WebDevTools.instance;

// Cambiar posición inicial
devtools.panel.style.bottom = '10px';
devtools.panel.style.right = '10px';

// Cambiar tamaño
devtools.panel.style.width = '500px';
devtools.panel.style.maxHeight = '700px';
```

### Extender Funcionalidad

```javascript
// Agregar método personalizado
WebDevTools.prototype.miMetodo = function() {
  console.log('Mi método personalizado');
};

// Usar
WebDevTools.instance.miMetodo();
```

---

## 📦 Requisitos del Sistema

- Navegadores modernos (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- JavaScript habilitado
- No requiere dependencias externas

---

## 🐛 Troubleshooting

### El panel no aparece

```javascript
// Verificar que está cargado
console.log(window.WebDevTools);

// Forzar apertura
wdt.open();
```

### Los selectores no encuentran elementos

```javascript
// Verificar que el selector es válido
document.querySelector('#tuSelector'); // null = no existe

// Esperar al DOM ready
document.addEventListener('DOMContentLoaded', () => {
  wdt.compareWidths('#el1', '#el2');
});
```

### Conflictos con otros scripts

WebDevTools verifica si ya está cargado para evitar duplicados:

```javascript
if (window.WebDevTools) {
  console.warn('WebDevTools ya está cargado');
}
```

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Roadmap

- [ ] Soporte para TypeScript
- [ ] Plugin para VSCode
- [ ] Extensión de navegador
- [ ] Modo oscuro
- [ ] Exportar reportes PDF
- [ ] Integración con testing frameworks (Jest, Cypress)
- [ ] API REST para CI/CD
- [ ] Comparación de múltiples elementos simultáneos

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

Creado con ❤️ para la comunidad de desarrolladores web.

---

## 🙏 Agradecimientos

- Inspirado por las DevTools de Chrome y Firefox
- Comunidad de desarrolladores de Vue, React y Nuxt
- Todos los contribuidores del proyecto

---

## 📞 Soporte

¿Tienes preguntas o problemas?

- 🐛 [Reportar un bug](https://github.com/fer626/nekotek-devtools/issues)
- 💡 [Solicitar una feature](https://github.com/fer626/nekotek-devtools/issues)
- 📧 Email: soporte@webdevtools.com
- 💬 Discord: [Únete a nuestra comunidad](#)

---

## ⭐ Dale una estrella

Si este proyecto te fue útil, considera darle una ⭐ en GitHub!

---

<div align="center">

**WebDevTools Pro** - Desarrollado con 💜 para desarrolladores web

[⬆️ Volver arriba](#-webdevtools-pro)
