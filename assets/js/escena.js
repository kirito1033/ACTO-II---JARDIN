import { iniciarPixelArt } from './pixelart.js';


import {
  escena,
  camara,
  render,
  controles,
  CALIDAD,
  movimientoReducido,
  ajustarResolucion
} from './motor.js';

import { chorro, marcadores } from './jardin.js';
import './interaccion.js';
import './pantallas.js';
import { actualizarAmbiente } from './ambiente.js';

iniciarPixelArt();

const modalPixelArt = document.getElementById('pixelart-modal');
const modalCartas = document.getElementById('cartas-modal');
const botonPantallaCompleta = document.getElementById(
  'pantalla-completa'
);

const TIEMPO_INACTIVIDAD = 20000;

// 0.12 radianes por segundo: una vuelta en unos 52 segundos.
const VELOCIDAD_ORBITA = 0.12;

let ultimoFotograma = 0;
let ultimaInteraccion = performance.now();
let orbitandoAutomaticamente = false;

function registrarInteraccion() {
  ultimaInteraccion = performance.now();
  orbitandoAutomaticamente = false;
}

function actualizarTextoPantallaCompleta() {
  if (!botonPantallaCompleta) return;

  const activa = Boolean(document.fullscreenElement);

  botonPantallaCompleta.innerHTML = activa
    ? 'Salir de pantalla <span aria-hidden="true">×</span>'
    : 'Pantalla completa <span aria-hidden="true">⛶</span>';

  botonPantallaCompleta.setAttribute(
    'aria-label',
    activa
      ? 'Salir de pantalla completa'
      : 'Activar pantalla completa'
  );
}

async function alternarPantallaCompleta() {
  registrarInteraccion();

  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }
  } catch (error) {
    console.warn(
      'El navegador no permitió activar la pantalla completa.',
      error
    );
  }
}

if (botonPantallaCompleta) {
  botonPantallaCompleta.addEventListener(
    'click',
    alternarPantallaCompleta
  );
}

document.addEventListener('fullscreenchange', () => {
  actualizarTextoPantallaCompleta();

  setTimeout(() => {
    camara.aspect = innerWidth / innerHeight;
    camara.updateProjectionMatrix();
    ajustarResolucion();
  }, 120);
});

// Solo 'start': 'change' también se dispara durante la órbita
// automática y reiniciaría el contador de inactividad.
controles.addEventListener('start', registrarInteraccion);

render.domElement.addEventListener(
  'pointerdown',
  registrarInteraccion
);

render.domElement.addEventListener(
  'wheel',
  registrarInteraccion,
  { passive: true }
);

render.domElement.addEventListener(
  'touchstart',
  registrarInteraccion,
  { passive: true }
);

document.addEventListener('keydown', registrarInteraccion);

addEventListener('resize', () => {
  camara.aspect = innerWidth / innerHeight;
  camara.updateProjectionMatrix();
  ajustarResolucion();
});

function puedeOrbitar() {
  return (
    !movimientoReducido &&
    !document.hidden &&
    modalPixelArt.hidden &&
    modalCartas.hidden
  );
}

function actualizarOrbitaAutomatica(ms, deltaSegundos) {
  if (
    ms - ultimaInteraccion < TIEMPO_INACTIVIDAD ||
    !puedeOrbitar()
  ) {
    orbitandoAutomaticamente = false;
    return;
  }

  orbitandoAutomaticamente = true;

  const objetivo = controles.target;
  const desplazamientoX = camara.position.x - objetivo.x;
  const desplazamientoZ = camara.position.z - objetivo.z;

  const distanciaHorizontal = Math.hypot(
    desplazamientoX,
    desplazamientoZ
  );

  const anguloActual = Math.atan2(
    desplazamientoZ,
    desplazamientoX
  );

  const anguloNuevo =
    anguloActual + VELOCIDAD_ORBITA * deltaSegundos;

  camara.position.x =
    objetivo.x +
    Math.cos(anguloNuevo) * distanciaHorizontal;

  camara.position.z =
    objetivo.z +
    Math.sin(anguloNuevo) * distanciaHorizontal;

  camara.lookAt(objetivo);

  // No llamamos a controles.update() aquí: la cámara ya apunta
  // al objetivo y evitamos que OrbitControls altere la órbita.
}

function animar(ms) {
  if (
    document.hidden ||
    !modalPixelArt.hidden ||
    !modalCartas.hidden
  ) {
    ultimaInteraccion = ms;
    ultimoFotograma = ms;
    orbitandoAutomaticamente = false;
    return;
  }

  if (ms - ultimoFotograma < 1000 / CALIDAD.fps) {
    return;
  }

  const deltaSegundos = Math.min(
    (ms - ultimoFotograma) / 1000,
    0.05
  );

  ultimoFotograma = ms;

  // Deja terminar la amortiguación de OrbitControls tras
  // una interacción, sin interferir con la órbita automática.
  if (
    !orbitandoAutomaticamente &&
    ms - ultimaInteraccion < 900
  ) {
    controles.update();
  }

  actualizarOrbitaAutomatica(ms, deltaSegundos);

  const huboInteraccionReciente =
    ms - ultimaInteraccion < 900;

  if (
    !movimientoReducido &&
    huboInteraccionReciente
  ) {
    const t = ms * 0.001;

    marcadores.forEach(({ grupo, altura }, i) => {
      grupo.position.y =
        altura +
        Math.sin(t * 1.1 + i) * 0.045;
    });

    chorro.scale.y =
      1 +
      Math.sin(t * 1.2) * 0.04;
  }

  actualizarAmbiente(ms);
  render.render(escena, camara);
}

render.setAnimationLoop(animar);