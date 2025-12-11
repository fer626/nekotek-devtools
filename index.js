// devtools.js
(function() {
  window.devTools = {
    // Inspeccionar estado de Vue
    vueState() {
      const app = document.querySelector('[data-v-app]')?.__vue_app__;
      console.log('Vue App:', app);
      return app;
    },

    // Limpiar localStorage
    clearStorage() {
      localStorage.clear();
      sessionStorage.clear();
      console.log('✅ Storage limpiado');
    },

    // Mostrar todas las imágenes cargadas
    images() {
      const imgs = [...document.images].map(img => ({
        src: img.src,
        size: `${img.naturalWidth}x${img.naturalHeight}`,
        loaded: img.complete
      }));
      console.table(imgs);
      return imgs;
    },

    // Medir performance de un selector
    perf(selector) {
      const start = performance.now();
      const elements = document.querySelectorAll(selector);
      const time = (performance.now() - start).toFixed(2);
      console.log(`Found ${elements.length} elements in ${time}ms`);
      return elements;
    },

    // Copiar objeto al clipboard
    copy(obj) {
      navigator.clipboard.writeText(JSON.stringify(obj, null, 2));
      console.log('✅ Copiado al clipboard');
    },

    // Listar event listeners
    events(element) {
      return getEventListeners(element);
    },

    // Ayuda
    help() {
      console.log(`
🛠️ DevTools disponibles:
  devTools.vueState()      - Inspeccionar app Vue
  devTools.clearStorage()  - Limpiar localStorage/sessionStorage
  devTools.images()        - Listar todas las imágenes
  devTools.perf(selector)  - Medir performance de querySelector
  devTools.copy(obj)       - Copiar objeto al clipboard
  devTools.events(el)      - Ver event listeners de un elemento
      `);
    }
  };

  console.log('🛠️ DevTools cargadas! Escribe devTools.help() para ver comandos');
})();