const DIBUJOS = {
  'flor-amarilla': {
    nombre: 'Flor amarilla',
    subtitulo: 'Un color para cada pequeño detalle',
    mensajeFinal:
      'Terminaste esta flor. Ahora también forma parte de nuestro jardín.',
    columnas: 13,
    filas: 15,
    colores: {
      negro: '#1b1b1b',
      amarillo: '#f3bb22',
      verde: '#2e8736'
    },
    pixeles: [
      [null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, 'negro', 'negro', null, 'negro', 'negro', null, null, null, null],
      [null, null, null, 'negro', null, null, 'negro', null, null, 'negro', null, null, null],
      [null, null, 'negro', null, 'negro', 'negro', 'amarillo', 'negro', 'negro', null, 'negro', null, null],
      [null, 'negro', null, 'negro', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'negro', null, null, 'negro', null],
      [null, 'negro', null, 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', null, 'negro', null, null],
      [null, null, 'negro', null, 'amarillo', 'amarillo', 'amarillo', 'amarillo', null, 'negro', null, null, null],
      [null, null, null, 'negro', null, 'negro', 'amarillo', 'negro', null, null, null, null, null],
      [null, null, 'negro', 'negro', null, null, 'verde', null, null, 'negro', 'negro', null, null],
      [null, 'negro', null, null, 'negro', 'negro', 'verde', 'negro', 'negro', null, null, 'negro', null],
      [null, 'negro', null, 'amarillo', 'amarillo', 'amarillo', 'verde', 'amarillo', 'amarillo', null, 'negro', null, null],
      [null, null, 'negro', null, 'amarillo', 'amarillo', 'verde', 'amarillo', null, 'negro', null, null, null],
      [null, null, null, 'negro', null, 'negro', 'verde', 'negro', null, null, null, null, null],
      [null, null, null, null, null, 'verde', 'verde', 'verde', null, null, null, null, null],
      [null, null, null, null, 'verde', 'verde', 'verde', 'verde', 'verde', null, null, null, null]
    ]
  },

  corazon: {
    nombre: 'Corazón del jardín',
    subtitulo: 'Un pequeño recuerdo hecho con colores',
    mensajeFinal:
      'Terminaste el corazón. Cada píxel guarda un poquito de este lugar.',
    columnas: 13,
    filas: 12,
    colores: {
      borde: '#351923',
      rojo: '#b94159',
      rosa: '#e88496',
      brillo: '#ffd0d8'
    },
    pixeles: [
      [null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, 'borde', 'borde', null, null, null, 'borde', 'borde', null, null, null, null],
      [null, 'borde', 'rojo', 'rosa', 'borde', null, 'borde', 'rosa', 'rojo', 'borde', null, null, null],
      ['borde', 'rojo', 'rojo', 'brillo', 'rosa', 'borde', 'rosa', 'rojo', 'rojo', 'rojo', 'borde', null, null],
      ['borde', 'rojo', 'rojo', 'rosa', 'rojo', 'rojo', 'rojo', 'rojo', 'rosa', 'rojo', 'borde', null, null],
      [null, 'borde', 'rojo', 'rojo', 'rojo', 'rojo', 'rojo', 'rojo', 'rojo', 'borde', null, null, null],
      [null, null, 'borde', 'rojo', 'rojo', 'rojo', 'rojo', 'rojo', 'borde', null, null, null, null],
      [null, null, null, 'borde', 'rojo', 'rojo', 'rojo', 'borde', null, null, null, null, null],
      [null, null, null, null, 'borde', 'rojo', 'borde', null, null, null, null, null, null],
      [null, null, null, null, null, 'borde', null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null]
    ]
  },

  estrella: {
    nombre: 'Estrella nocturna',
    subtitulo: 'Una luz pequeña para una noche especial',
    mensajeFinal:
      'La estrella está completa. Que siempre encuentres luz incluso en las noches más oscuras.',
    columnas: 13,
    filas: 13,
    colores: {
      borde: '#2a303e',
      oro: '#d9a94e',
      luz: '#ffe09a'
    },
    pixeles: [
      [null, null, null, null, null, null, 'borde', null, null, null, null, null, null],
      [null, null, null, null, null, 'borde', 'oro', 'borde', null, null, null, null, null],
      [null, null, null, null, 'borde', 'oro', 'luz', 'oro', 'borde', null, null, null, null],
      [null, null, null, 'borde', 'oro', 'oro', 'luz', 'oro', 'oro', 'borde', null, null, null],
      [null, null, 'borde', 'oro', 'oro', 'oro', 'luz', 'oro', 'oro', 'oro', 'borde', null, null],
      [null, 'borde', 'oro', 'oro', 'oro', 'oro', 'luz', 'oro', 'oro', 'oro', 'oro', 'borde', null],
      ['borde', 'oro', 'oro', 'oro', 'oro', 'oro', 'luz', 'oro', 'oro', 'oro', 'oro', 'oro', 'borde'],
      [null, null, 'borde', 'oro', 'oro', 'oro', 'luz', 'oro', 'oro', 'oro', 'borde', null, null],
      [null, null, null, 'borde', 'oro', 'oro', 'luz', 'oro', 'oro', 'borde', null, null, null],
      [null, null, null, null, 'borde', 'oro', 'oro', 'oro', 'borde', null, null, null, null],
      [null, null, null, null, null, 'borde', 'oro', 'borde', null, null, null, null, null],
      [null, null, null, null, null, null, 'borde', null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null]
    ]
  },
  asta: {
    nombre: 'black',
    subtitulo: 'Una luz pequeña para una noche especial',
    mensajeFinal:
      'La estrella está completa. Que siempre encuentres luz incluso en las noches más oscuras.',
    columnas: 13,
    filas: 13,
    colores: {
      borde: '#2a303e',
      oro: '#d9a94e',
      luz: '#ffe09a'
    },
    pixeles: [
      [null, null, null, null, null, null, 'borde', null, null, null, null, null, null],
      [null, null, null, null, null, 'borde', 'oro', 'borde', null, null, null, null, null],
      [null, null, null, null, 'borde', 'oro', 'luz', 'oro', 'borde', null, null, null, null],
      [null, null, null, 'borde', 'oro', 'oro', 'luz', 'oro', 'oro', 'borde', null, null, null],
      [null, null, 'borde', 'oro', 'oro', 'oro', 'luz', 'oro', 'oro', 'oro', 'borde', null, null],
      [null, 'borde', 'oro', 'oro', 'oro', 'oro', 'luz', 'oro', 'oro', 'oro', 'oro', 'borde', null],
      ['borde', 'oro', 'oro', 'oro', 'oro', 'oro', 'luz', 'oro', 'oro', 'oro', 'oro', 'oro', 'borde'],
      [null, null, 'borde', 'oro', 'oro', 'oro', 'luz', 'oro', 'oro', 'oro', 'borde', null, null],
      [null, null, null, 'borde', 'oro', 'oro', 'luz', 'oro', 'oro', 'borde', null, null, null],
      [null, null, null, null, 'borde', 'oro', 'oro', 'oro', 'borde', null, null, null, null],
      [null, null, null, null, null, 'borde', 'oro', 'borde', null, null, null, null, null],
      [null, null, null, null, null, null, 'borde', null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null]
    ]
  }
};

let dibujoActual = null;
let colorSeleccionado = null;
let celdasColoreadas = new Set();
let abierto = false;
let pintando = false;

const obtenerModal = () =>
  document.getElementById('pixelart-modal');

const obtenerCanvas = () =>
  document.getElementById('pixelart-canvas');

const obtenerContexto = () =>
  obtenerCanvas().getContext('2d');

function esMovil() {
  return matchMedia('(max-width: 650px)').matches;
}

function totalCeldasDibujo() {
  return dibujoActual.pixeles
    .flat()
    .filter(Boolean)
    .length;
}

function coloresUsados(dibujo) {
  const usados = new Set(
    dibujo.pixeles.flat().filter(Boolean)
  );

  return Object.entries(dibujo.colores).filter(
    ([nombre]) => usados.has(nombre)
  );
}

function configurarTamanoCanvas() {
  const canvas = obtenerCanvas();
  const lado = esMovil() ? 420 : 560;

  canvas.width = lado;
  canvas.height = lado;
}

function obtenerCelda(clientX, clientY) {
  const canvas = obtenerCanvas();
  const rect = canvas.getBoundingClientRect();

  const x = (clientX - rect.left) * canvas.width / rect.width;
  const y = (clientY - rect.top) * canvas.height / rect.height;

  return {
    columna: Math.floor(
      x / (canvas.width / dibujoActual.columnas)
    ),
    fila: Math.floor(
      y / (canvas.height / dibujoActual.filas)
    )
  };
}

function pintarTablero() {
  const canvas = obtenerCanvas();
  const ctx = obtenerContexto();

  const anchoCelda =
    canvas.width / dibujoActual.columnas;

  const altoCelda =
    canvas.height / dibujoActual.filas;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ece5d8';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const numeracion = new Map(
    coloresUsados(dibujoActual).map(
      ([nombre], indice) => [nombre, indice + 1]
    )
  );

  for (let fila = 0; fila < dibujoActual.filas; fila++) {
    for (
      let columna = 0;
      columna < dibujoActual.columnas;
      columna++
    ) {
      const tipo =
        dibujoActual.pixeles[fila][columna];

      const clave = `${fila}-${columna}`;
      const x = columna * anchoCelda;
      const y = fila * altoCelda;

      if (!tipo) {
        ctx.fillStyle = '#f0eadf';
      } else if (celdasColoreadas.has(clave)) {
        ctx.fillStyle = dibujoActual.colores[tipo];
      } else {
        ctx.fillStyle = '#d2cabd';
      }

      ctx.fillRect(x, y, anchoCelda, altoCelda);

      if (tipo && !celdasColoreadas.has(clave)) {
        ctx.fillStyle = '#615c54';
        ctx.font = `700 ${Math.max(
          10,
          anchoCelda * 0.40
        )}px Trebuchet MS`;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillText(
          numeracion.get(tipo),
          x + anchoCelda / 2,
          y + altoCelda / 2
        );
      }

      ctx.strokeStyle = 'rgba(60, 52, 41, .20)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, anchoCelda, altoCelda);
    }
  }
}

function actualizarProgreso() {
  const total = totalCeldasDibujo();
  const actual = celdasColoreadas.size;

  document.getElementById(
    'pixelart-progreso'
  ).textContent = `${actual} / ${total} píxeles`;

  if (actual === total && total > 0) {
    document.getElementById(
      'pixelart-mensaje'
    ).textContent = dibujoActual.mensajeFinal;

    document.getElementById(
      'pixelart-mensaje'
    ).hidden = false;

    document.getElementById(
      'pixelart-paleta'
    ).hidden = true;
  }
}

function crearPaleta() {
  const paleta = document.getElementById(
    'pixelart-paleta'
  );

  paleta.innerHTML = '';

  coloresUsados(dibujoActual).forEach(
    ([nombre, color], indice) => {
      const boton = document.createElement('button');

      boton.type = 'button';
      boton.className = 'color-pixel';
      boton.dataset.color = nombre;
      boton.style.setProperty('--color-pixel', color);
      boton.setAttribute(
        'aria-label',
        `Elegir color ${indice + 1}`
      );

      const numero = document.createElement('span');
      numero.textContent = indice + 1;
      boton.appendChild(numero);

      boton.addEventListener('click', () => {
        colorSeleccionado = nombre;

        document
          .querySelectorAll('.color-pixel')
          .forEach((elemento) => {
            elemento.classList.toggle(
              'seleccionado',
              elemento.dataset.color === colorSeleccionado
            );
          });
      });

      paleta.appendChild(boton);
    }
  );
}

function colorear(columna, fila) {
  if (!colorSeleccionado) return;

  if (
    fila < 0 ||
    columna < 0 ||
    fila >= dibujoActual.filas ||
    columna >= dibujoActual.columnas
  ) {
    return;
  }

  const tipo =
    dibujoActual.pixeles[fila][columna];

  const clave = `${fila}-${columna}`;

  if (
    !tipo ||
    celdasColoreadas.has(clave) ||
    tipo !== colorSeleccionado
  ) {
    return;
  }

  celdasColoreadas.add(clave);
  pintarTablero();
  actualizarProgreso();
}

function reiniciarDibujo() {
  celdasColoreadas = new Set();
  colorSeleccionado = null;

  document.getElementById(
    'pixelart-mensaje'
  ).hidden = true;

  document.getElementById(
    'pixelart-paleta'
  ).hidden = false;

  crearPaleta();
  pintarTablero();
  actualizarProgreso();
}

function crearGaleria() {
  const galeria = document.getElementById(
    'pixelart-galeria'
  );

  galeria.innerHTML = '';

  Object.entries(DIBUJOS).forEach(([id, dibujo]) => {
    const boton = document.createElement('button');

    boton.type = 'button';
    boton.className = 'pixelart-opcion';

    boton.innerHTML = `
      <span class="pixelart-miniatura">${id === 'flor-amarilla' ? '✿' : id === 'corazon' ? '♥' : '✦'}</span>
      <span>
        <strong>${dibujo.nombre}</strong>
        <small>${dibujo.columnas} × ${dibujo.filas} píxeles</small>
      </span>
    `;

    boton.addEventListener('click', () => {
      cargarDibujo(id);
    });

    galeria.appendChild(boton);
  });
}

function cargarDibujo(id) {
  dibujoActual = DIBUJOS[id];

  document.getElementById(
    'pixelart-titulo'
  ).textContent = dibujoActual.nombre;

  document.getElementById(
    'pixelart-instruccion'
  ).textContent = dibujoActual.subtitulo;

  document.getElementById(
    'pixelart-galeria-contenedor'
  ).hidden = true;

  document.getElementById(
    'pixelart-juego'
  ).hidden = false;

  configurarTamanoCanvas();
  reiniciarDibujo();
}

function volverAGaleria() {
  dibujoActual = null;
  colorSeleccionado = null;
  celdasColoreadas = new Set();

  document.getElementById(
    'pixelart-titulo'
  ).textContent = 'Elige un dibujo';

  document.getElementById(
    'pixelart-instruccion'
  ).textContent =
    'Cada dibujo guarda un pequeño recuerdo para colorear.';

  document.getElementById(
    'pixelart-juego'
  ).hidden = true;

  document.getElementById(
    'pixelart-galeria-contenedor'
  ).hidden = false;

  crearGaleria();
}

function cerrar() {
  abierto = false;
  pintando = false;
  obtenerModal().hidden = true;
}

export function iniciarPixelArt() {
  const canvas = obtenerCanvas();

  canvas.addEventListener('pointerdown', (evento) => {
    if (!abierto || !dibujoActual) return;

    pintando = true;
    canvas.setPointerCapture(evento.pointerId);

    const { columna, fila } = obtenerCelda(
      evento.clientX,
      evento.clientY
    );

    colorear(columna, fila);
  });

  canvas.addEventListener('pointermove', (evento) => {
    if (!pintando || !abierto || !dibujoActual) return;

    const { columna, fila } = obtenerCelda(
      evento.clientX,
      evento.clientY
    );

    colorear(columna, fila);
  });

  canvas.addEventListener('pointerup', () => {
    pintando = false;
  });

  canvas.addEventListener('pointercancel', () => {
    pintando = false;
  });

  document.getElementById(
    'pixelart-cerrar'
  ).addEventListener('click', cerrar);

  document.getElementById(
    'pixelart-reiniciar'
  ).addEventListener('click', reiniciarDibujo);

  document.getElementById(
    'pixelart-volver'
  ).addEventListener('click', volverAGaleria);

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && abierto) {
      cerrar();
    }
  });
}

export function abrirPixelArt() {
  abierto = true;
  obtenerModal().hidden = false;
  volverAGaleria();
}