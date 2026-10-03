const DIBUJOS = {
  flor: {
    nombre: 'Una flor para ti',
    mensajeFinal: 'Terminaste tu primera flor. Ahora este jardín tiene un recuerdo más hecho por ti.',
    columnas: 14,
    filas: 14,
    colores: {
      hoja: '#527f4b',
      tallo: '#3f6f42',
      rosa: '#c96177',
      rosaClara: '#e3a0aa',
      centro: '#e8bd68',
      maceta: '#a96342',
      macetaSombra: '#75402d'
    },
    pixeles: [
      [0, 0, null, null, null, null, null, null, null, null, null, null, null, null],
      [0, 0, null, null, null, null, 'rosa', 'rosa', null, null, null, null, null, null],
      [0, 0, null, null, null, 'rosa', 'rosaClara', 'rosaClara', 'rosa', null, null, null, null, null],
      [0, 0, null, null, 'rosa', 'rosaClara', 'centro', 'centro', 'rosaClara', 'rosa', null, null, null, null],
      [0, 0, null, null, 'rosa', 'rosaClara', 'centro', 'centro', 'rosaClara', 'rosa', null, null, null, null],
      [0, 0, null, null, null, 'rosa', 'rosaClara', 'rosaClara', 'rosa', null, null, null, null, null],
      [0, 0, null, null, null, null, 'rosa', 'rosa', null, null, null, null, null, null],
      [0, 0, null, null, null, null, 'tallo', 'tallo', null, null, null, null, null, null],
      [0, 0, null, null, null, 'hoja', 'hoja', 'tallo', 'hoja', 'hoja', null, null, null, null],
      [0, 0, null, null, null, null, 'tallo', 'tallo', null, null, null, null, null, null],
      [0, 0, null, null, null, 'macetaSombra', 'maceta', 'maceta', 'macetaSombra', null, null, null, null, null],
      [0, 0, null, null, null, 'macetaSombra', 'maceta', 'maceta', 'macetaSombra', null, null, null, null, null],
      [0, 0, null, null, null, null, 'macetaSombra', 'macetaSombra', null, null, null, null, null, null],
      [0, 0, null, null, null, null, null, null, null, null, null, null, null, null]
    ]
  }
};

let dibujoActual;
let colorSeleccionado = null;
let celdasColoreadas = new Set();
let abierto = false;

const modal = () => document.getElementById('pixelart-modal');
const canvas = () => document.getElementById('pixelart-canvas');
const contexto = () => canvas().getContext('2d');

function obtenerCelda(x, y) {
  const rect = canvas().getBoundingClientRect();
  const escalaX = canvas().width / rect.width;
  const escalaY = canvas().height / rect.height;

  return {
    columna: Math.floor((x - rect.left) * escalaX / (canvas().width / dibujoActual.columnas)),
    fila: Math.floor((y - rect.top) * escalaY / (canvas().height / dibujoActual.filas))
  };
}

function pintarTablero() {
  const ctx = contexto();
  const anchoCelda = canvas().width / dibujoActual.columnas;
  const altoCelda = canvas().height / dibujoActual.filas;

  ctx.clearRect(0, 0, canvas().width, canvas().height);
  ctx.fillStyle = '#e9e1d2';
  ctx.fillRect(0, 0, canvas().width, canvas().height);

  for (let fila = 0; fila < dibujoActual.filas; fila++) {
    for (let columna = 0; columna < dibujoActual.columnas; columna++) {
      const tipo = dibujoActual.pixeles[fila][columna];
      const clave = `${fila}-${columna}`;
      const x = columna * anchoCelda;
      const y = fila * altoCelda;

      ctx.fillStyle = tipo && celdasColoreadas.has(clave)
        ? dibujoActual.colores[tipo]
        : tipo
          ? '#d0c8ba'
          : '#ece5d8';

      ctx.fillRect(x, y, anchoCelda, altoCelda);

      if (tipo && !celdasColoreadas.has(clave)) {
        ctx.fillStyle = '#6f6a61';
        ctx.font = `600 ${Math.max(11, anchoCelda * 0.38)}px Trebuchet MS`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
          Object.keys(dibujoActual.colores).indexOf(tipo) + 1,
          x + anchoCelda / 2,
          y + altoCelda / 2
        );
      }

      ctx.strokeStyle = 'rgba(72, 61, 48, .18)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, anchoCelda, altoCelda);
    }
  }
}

function actualizarProgreso() {
  const total = dibujoActual.pixeles.flat().filter(Boolean).length;
  const actual = celdasColoreadas.size;

  document.getElementById('pixelart-progreso').textContent =
    `${actual} / ${total} píxeles`;

  if (actual === total) {
    document.getElementById('pixelart-mensaje').textContent =
      dibujoActual.mensajeFinal;
    document.getElementById('pixelart-mensaje').hidden = false;
    document.getElementById('pixelart-paleta').hidden = true;
  }
}

function colorear(columna, fila) {
  if (
    !colorSeleccionado ||
    fila < 0 ||
    columna < 0 ||
    fila >= dibujoActual.filas ||
    columna >= dibujoActual.columnas
  ) {
    return;
  }

  const tipo = dibujoActual.pixeles[fila][columna];
  const clave = `${fila}-${columna}`;

  if (!tipo || celdasColoreadas.has(clave)) return;

  if (tipo === colorSeleccionado) {
    celdasColoreadas.add(clave);
    pintarTablero();
    actualizarProgreso();
  }
}

function crearPaleta() {
  const paleta = document.getElementById('pixelart-paleta');
  paleta.innerHTML = '';

  Object.entries(dibujoActual.colores).forEach(([nombre, color], indice) => {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'color-pixel';
    boton.style.setProperty('--color-pixel', color);
    boton.dataset.color = nombre;
    boton.setAttribute('aria-label', `Color ${indice + 1}`);

    const numero = document.createElement('span');
    numero.textContent = indice + 1;
    boton.appendChild(numero);

    boton.addEventListener('click', () => {
      colorSeleccionado = nombre;

      document.querySelectorAll('.color-pixel').forEach((elemento) => {
        elemento.classList.toggle(
          'seleccionado',
          elemento.dataset.color === colorSeleccionado
        );
      });
    });

    paleta.appendChild(boton);
  });
}

function reiniciar() {
  celdasColoreadas = new Set();
  colorSeleccionado = null;
  document.getElementById('pixelart-mensaje').hidden = true;
  document.getElementById('pixelart-paleta').hidden = false;
  crearPaleta();
  pintarTablero();
  actualizarProgreso();
}

function cerrar() {
  abierto = false;
  modal().hidden = true;
}

export function iniciarPixelArt() {
  const superficie = canvas();
  let pintando = false;

  superficie.addEventListener('pointerdown', (evento) => {
    if (!abierto) return;

    pintando = true;
    superficie.setPointerCapture(evento.pointerId);

    const { columna, fila } = obtenerCelda(
      evento.clientX,
      evento.clientY
    );
    colorear(columna, fila);
  });

  superficie.addEventListener('pointermove', (evento) => {
    if (!pintando || !abierto) return;

    const { columna, fila } = obtenerCelda(
      evento.clientX,
      evento.clientY
    );
    colorear(columna, fila);
  });

  superficie.addEventListener('pointerup', () => {
    pintando = false;
  });

  superficie.addEventListener('pointercancel', () => {
    pintando = false;
  });

  document.getElementById('pixelart-cerrar').addEventListener('click', cerrar);

  document.getElementById('pixelart-reiniciar').addEventListener(
    'click',
    reiniciar
  );

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && abierto) cerrar();
  });
}

export function abrirPixelArt(id = 'flor') {
  dibujoActual = DIBUJOS[id];

  if (!dibujoActual) {
    console.error(`No existe el dibujo pixel art: ${id}`);
    return;
  }

  abierto = true;
  modal().hidden = false;

  document.getElementById('pixelart-titulo').textContent =
    dibujoActual.nombre;

  const superficie = canvas();
  const lado = movil() ? 420 : 560;
  superficie.width = lado;
  superficie.height = lado;

  reiniciar();
}

function movil() {
  return matchMedia('(max-width: 650px)').matches;
}