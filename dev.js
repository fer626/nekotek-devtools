/**
 * WebDevTools Pro v1.0
 * Herramienta de desarrollo para frameworks modernos
 * Carga desde CDN: https://cdn.jsdelivr.net/gh/tu-usuario/tu-repo@main/webdevtools.js
 */

(function() {
  'use strict';

  // Evitar múltiples instancias
  if (window.WebDevTools) {
    console.warn('WebDevTools ya está cargado');
    return;
  }

  class WebDevTools {
    constructor() {
      this.version = '1.0.0';
      this.framework = this.detectFramework();
      this.panel = null;
      this.isOpen = false;
      this.init();
    }

    init() {
      console.log(`%c🚀 WebDevTools Pro v${this.version} cargado`, 'color: #00ff88; font-size: 14px; font-weight: bold;');
      console.log(`%c📦 Framework detectado: ${this.framework}`, 'color: #00aaff; font-size: 12px;');
      this.createPanel();
      this.addShortcuts();
    }

    // Detectar framework en uso
    detectFramework() {
      if (window.Vue || document.querySelector('[data-v-]')) return 'Vue.js';
      if (window.$nuxt || window.__NUXT__) return 'Nuxt.js';
      if (window.React || document.querySelector('[data-reactroot], [data-reactid]')) return 'React';
      if (window.angular) return 'Angular';
      if (window.Svelte) return 'Svelte';
      if (window.Alpine) return 'Alpine.js';
      return 'Vanilla JS';
    }

    // Crear panel de herramientas
    createPanel() {
      const panel = document.createElement('div');
      panel.id = 'webdevtools-panel';
      panel.innerHTML = `
        <style>
          #webdevtools-panel {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 400px;
            max-height: 600px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 999999;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: none;
            overflow: hidden;
          }
          #webdevtools-panel.open { display: flex; flex-direction: column; }
          .wdt-header {
            background: rgba(0,0,0,0.2);
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: move;
          }
          .wdt-title {
            color: white;
            font-weight: bold;
            font-size: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .wdt-close {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            transition: all 0.3s;
          }
          .wdt-close:hover { background: rgba(255,255,255,0.3); transform: rotate(90deg); }
          .wdt-content {
            background: white;
            flex: 1;
            overflow-y: auto;
            padding: 20px;
          }
          .wdt-section {
            margin-bottom: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #667eea;
          }
          .wdt-section-title {
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
            font-size: 14px;
          }
          .wdt-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            margin: 5px;
            font-size: 13px;
            transition: all 0.3s;
          }
          .wdt-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(102,126,234,0.4); }
          .wdt-input {
            width: 100%;
            padding: 10px;
            border: 2px solid #e0e0e0;
            border-radius: 6px;
            margin: 5px 0;
            font-size: 13px;
            box-sizing: border-box;
          }
          .wdt-input:focus { outline: none; border-color: #667eea; }
          .wdt-result {
            margin-top: 10px;
            padding: 12px;
            background: white;
            border-radius: 6px;
            font-size: 13px;
            line-height: 1.6;
            border: 2px solid #e0e0e0;
          }
          .wdt-success { color: #28a745; font-weight: bold; }
          .wdt-error { color: #dc3545; font-weight: bold; }
          .wdt-info { color: #17a2b8; }
          .wdt-toggle-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 5px 20px rgba(102,126,234,0.5);
            z-index: 999998;
            transition: all 0.3s;
          }
          .wdt-toggle-btn:hover { transform: scale(1.1); }
        </style>
        
        <div class="wdt-header">
          <div class="wdt-title">
            <span>🛠️</span>
            <span>WebDevTools Pro</span>
          </div>
          <button class="wdt-close" onclick="WebDevTools.instance.toggle()">×</button>
        </div>
        
        <div class="wdt-content">
          <div class="wdt-section">
            <div class="wdt-section-title">📊 Información del Sistema</div>
            <div id="system-info"></div>
          </div>

          <div class="wdt-section">
            <div class="wdt-section-title">📏 Comparador de Anchos (clientWidth)</div>
            <input type="text" class="wdt-input" id="selector1" placeholder="Selector CSS del primer elemento (ej: #container1)">
            <input type="text" class="wdt-input" id="selector2" placeholder="Selector CSS del segundo elemento (ej: .wrapper)">
            <button class="wdt-btn" onclick="WebDevTools.instance.compareWidths()">Comparar Anchos</button>
            <div id="width-result"></div>
          </div>

          <div class="wdt-section">
            <div class="wdt-section-title">🔍 Inspector de Elementos</div>
            <button class="wdt-btn" onclick="WebDevTools.instance.highlightElements()">Resaltar Elementos Interactivos</button>
            <button class="wdt-btn" onclick="WebDevTools.instance.showComponentTree()">Ver Árbol de Componentes</button>
          </div>

          <div class="wdt-section">
            <div class="wdt-section-title">⚡ Performance</div>
            <button class="wdt-btn" onclick="WebDevTools.instance.measurePerformance()">Medir Performance</button>
            <div id="performance-result"></div>
          </div>

          <div class="wdt-section">
            <div class="wdt-section-title">🎨 Utilidades CSS</div>
            <button class="wdt-btn" onclick="WebDevTools.instance.showColorPalette()">Extraer Paleta de Colores</button>
            <button class="wdt-btn" onclick="WebDevTools.instance.listFonts()">Listar Fuentes Usadas</button>
          </div>

          <div class="wdt-section">
            <div class="wdt-section-title">📱 Responsive</div>
            <button class="wdt-btn" onclick="WebDevTools.instance.testResponsive()">Test Responsive</button>
            <div id="responsive-result"></div>
          </div>
        </div>
      `;

      document.body.appendChild(panel);
      this.panel = panel;
      this.updateSystemInfo();
      this.makeDraggable();
      this.createToggleButton();
    }

    createToggleButton() {
      const btn = document.createElement('button');
      btn.className = 'wdt-toggle-btn';
      btn.innerHTML = '🛠️';
      btn.onclick = () => this.toggle();
      document.body.appendChild(btn);
    }

    toggle() {
      this.isOpen = !this.isOpen;
      this.panel.classList.toggle('open', this.isOpen);
    }

    addShortcuts() {
      document.addEventListener('keydown', (e) => {
        // Ctrl + Shift + D para abrir/cerrar
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
          e.preventDefault();
          this.toggle();
        }
      });
    }

    makeDraggable() {
      const header = this.panel.querySelector('.wdt-header');
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

      header.onmousedown = (e) => {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;

        document.onmouseup = () => {
          document.onmouseup = null;
          document.onmousemove = null;
        };

        document.onmousemove = (e) => {
          e.preventDefault();
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          this.panel.style.top = (this.panel.offsetTop - pos2) + "px";
          this.panel.style.left = (this.panel.offsetLeft - pos1) + "px";
          this.panel.style.bottom = 'auto';
          this.panel.style.right = 'auto';
        };
      };
    }

    updateSystemInfo() {
      const info = document.getElementById('system-info');
      info.innerHTML = `
        <div class="wdt-info">
          <strong>Framework:</strong> ${this.framework}<br>
          <strong>User Agent:</strong> ${navigator.userAgent.split(' ').slice(-2).join(' ')}<br>
          <strong>Viewport:</strong> ${window.innerWidth}x${window.innerHeight}px<br>
          <strong>Device Pixel Ratio:</strong> ${window.devicePixelRatio}
        </div>
      `;
    }

    // ⭐ FUNCIÓN PRINCIPAL: Comparar anchos de dos contenedores
    compareWidths() {
      const selector1 = document.getElementById('selector1').value.trim();
      const selector2 = document.getElementById('selector2').value.trim();
      const result = document.getElementById('width-result');

      if (!selector1 || !selector2) {
        result.innerHTML = '<div class="wdt-result wdt-error">⚠️ Por favor ingresa ambos selectores CSS</div>';
        return;
      }

      try {
        const el1 = document.querySelector(selector1);
        const el2 = document.querySelector(selector2);

        if (!el1) {
          result.innerHTML = `<div class="wdt-result wdt-error">❌ No se encontró el elemento: ${selector1}</div>`;
          return;
        }

        if (!el2) {
          result.innerHTML = `<div class="wdt-result wdt-error">❌ No se encontró el elemento: ${selector2}</div>`;
          return;
        }

        const width1 = el1.clientWidth;
        const width2 = el2.clientWidth;

        // Resaltar los elementos temporalmente
        this.highlightElement(el1);
        this.highlightElement(el2);

        if (width1 === width2) {
          result.innerHTML = `
            <div class="wdt-result wdt-success">
              ✅ ¡Los elementos tienen el mismo ancho!<br>
              <strong>Ancho:</strong> ${width1}px
            </div>
          `;
        } else {
          const diff = Math.abs(width1 - width2);
          result.innerHTML = `
            <div class="wdt-result wdt-error">
              ❌ Los elementos tienen diferentes anchos:<br><br>
              <strong>${selector1}:</strong> ${width1}px<br>
              <strong>${selector2}:</strong> ${width2}px<br><br>
              <strong>Diferencia:</strong> ${diff}px<br>
              ${width1 > width2 ? 
                `<em>El primer elemento es ${diff}px más ancho</em>` : 
                `<em>El segundo elemento es ${diff}px más ancho</em>`
              }
            </div>
          `;
        }
      } catch (error) {
        result.innerHTML = `<div class="wdt-result wdt-error">❌ Error: ${error.message}</div>`;
      }
    }

    highlightElement(el) {
      const original = el.style.outline;
      el.style.outline = '3px solid #ff6b6b';
      el.style.outlineOffset = '2px';
      setTimeout(() => {
        el.style.outline = original;
      }, 2000);
    }

    highlightElements() {
      const elements = document.querySelectorAll('button, a, input, select, textarea');
      elements.forEach(el => {
        el.style.outline = '2px solid #00ff88';
        el.style.outlineOffset = '2px';
      });
      setTimeout(() => {
        elements.forEach(el => el.style.outline = '');
      }, 3000);
      console.log(`Resaltados ${elements.length} elementos interactivos`);
    }

    showComponentTree() {
      const tree = this.buildComponentTree(document.body, 0);
      console.log('%c🌳 Árbol de Componentes:', 'color: #667eea; font-size: 16px; font-weight: bold;');
      console.log(tree);
    }

    buildComponentTree(node, level) {
      const indent = '  '.repeat(level);
      let tree = `${indent}${node.tagName || node.nodeName}`;
      
      if (node.id) tree += `#${node.id}`;
      if (node.className && typeof node.className === 'string') {
        tree += `.${node.className.split(' ').join('.')}`;
      }
      
      tree += '\n';
      
      if (node.children) {
        Array.from(node.children).slice(0, 5).forEach(child => {
          tree += this.buildComponentTree(child, level + 1);
        });
      }
      
      return tree;
    }

    measurePerformance() {
      const result = document.getElementById('performance-result');
      const timing = performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
      
      const memory = performance.memory ? 
        `${(performance.memory.usedJSHeapSize / 1048576).toFixed(2)} MB` : 
        'N/A';

      result.innerHTML = `
        <div class="wdt-result">
          <strong>⚡ Métricas de Performance:</strong><br><br>
          <strong>Carga Total:</strong> ${loadTime}ms<br>
          <strong>DOM Ready:</strong> ${domReady}ms<br>
          <strong>Memoria JS:</strong> ${memory}<br>
          <strong>Recursos:</strong> ${performance.getEntriesByType('resource').length}
        </div>
      `;
    }

    showColorPalette() {
      const colors = new Set();
      const elements = document.querySelectorAll('*');
      
      elements.forEach(el => {
        const styles = window.getComputedStyle(el);
        if (styles.color) colors.add(styles.color);
        if (styles.backgroundColor && styles.backgroundColor !== 'rgba(0, 0, 0, 0)') {
          colors.add(styles.backgroundColor);
        }
      });

      console.log('%c🎨 Paleta de Colores:', 'color: #667eea; font-size: 16px; font-weight: bold;');
      console.log(Array.from(colors).slice(0, 20));
    }

    listFonts() {
      const fonts = new Set();
      document.querySelectorAll('*').forEach(el => {
        const font = window.getComputedStyle(el).fontFamily;
        if (font) fonts.add(font);
      });

      console.log('%c📝 Fuentes Utilizadas:', 'color: #667eea; font-size: 16px; font-weight: bold;');
      console.log(Array.from(fonts));
    }

    testResponsive() {
      const result = document.getElementById('responsive-result');
      const breakpoints = {
        'Mobile': 375,
        'Tablet': 768,
        'Desktop': 1024,
        'Wide': 1440
      };

      let html = '<div class="wdt-result"><strong>📱 Breakpoints:</strong><br><br>';
      
      for (let [name, width] of Object.entries(breakpoints)) {
        const matches = window.matchMedia(`(min-width: ${width}px)`).matches;
        html += `<strong>${name} (${width}px):</strong> ${matches ? '✅' : '❌'}<br>`;
      }
      
      html += '</div>';
      result.innerHTML = html;
    }
  }

  // Inicializar y exponer globalmente
  window.WebDevTools = WebDevTools;
  WebDevTools.instance = new WebDevTools();

  // API de métodos útiles
  window.wdt = {
    compareWidths: (sel1, sel2) => {
      document.getElementById('selector1').value = sel1;
      document.getElementById('selector2').value = sel2;
      WebDevTools.instance.compareWidths();
      WebDevTools.instance.toggle();
    },
    getWidth: (selector) => {
      const el = document.querySelector(selector);
      return el ? el.clientWidth : null;
    },
    highlight: (selector) => {
      const el = document.querySelector(selector);
      if (el) WebDevTools.instance.highlightElement(el);
    },
    framework: () => WebDevTools.instance.framework,
    open: () => WebDevTools.instance.toggle()
  };

  console.log('%c💡 Atajos disponibles:', 'color: #00aaff; font-size: 12px;');
  console.log('- Ctrl + Shift + D: Abrir/Cerrar panel');
  console.log('- wdt.compareWidths("#el1", ".el2"): Comparar anchos');
  console.log('- wdt.getWidth("#elemento"): Obtener ancho');
  console.log('- wdt.highlight(".clase"): Resaltar elemento');

})();