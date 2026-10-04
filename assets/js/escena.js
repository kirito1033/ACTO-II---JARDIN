import { iniciarPixelArt } from './pixelart.js';
import { escena, camara, render, controles, CALIDAD, movil, movimientoReducido, ajustarResolucion } from './motor.js';
import { chorro, marcadores } from './jardin.js';
import './interaccion.js';
import { actualizarAmbiente } from './ambiente.js';

iniciarPixelArt();

const modalPixelArt = document.getElementById('pixelart-modal');
const modalCartas = document.getElementById('cartas-modal');
// ======================================================
// RENDERIZADO BAJO DEMANDA
// ======================================================

let ultimoFotograma = 0;
let ultimaInteraccion = performance.now();

function activarMovimiento() {
  ultimaInteraccion = performance.now();
}

controles.addEventListener(
  'start',
  activarMovimiento
);

controles.addEventListener(
  'change',
  activarMovimiento
);

addEventListener('resize', () => {
  camara.aspect =
    innerWidth / innerHeight;

  camara.updateProjectionMatrix();
  ajustarResolucion();
});

document.addEventListener(
  'visibilitychange',
  () => {
    }
);

document.getElementById(
  'pixelart-cerrar'
).addEventListener(
  'click',
  () => {
    }
);

document.addEventListener(
  'keydown',
  evento => {
    if (evento.key === 'Escape') {
        }
  }
);

function animar(ms) {
  if (
    document.hidden ||
    !modalPixelArt.hidden ||
    !modalCartas.hidden
  ) {
    return;
  }

  if (
    ms - ultimoFotograma <
    1000 / CALIDAD.fps
  ) {
    return;
  }

  ultimoFotograma = ms;

  // Los controles solo necesitan actualizarse
  // si hubo interacción reciente.
  const moviendo =
    ms - ultimaInteraccion < 900;

  if (moviendo) {
    controles.update();
  }

  if (!movimientoReducido && moviendo){
    const t = ms * 0.001;

    marcadores.forEach(
      ({ grupo, altura }, i) => {
        grupo.position.y =
          altura +
          Math.sin(t * 1.1 + i) *
          0.045;
      }
    );

    chorro.scale.y =
      1 + Math.sin(t * 1.2) * 0.04;
  }

  actualizarAmbiente(ms);

  render.render(
    escena,
    camara
  );

}

render.setAnimationLoop(animar);