import * as THREE from 'three';
import { PUNTOS, MENSAJE_FINAL } from './config.js';
import { abrirPixelArt } from './pixelart.js';
import { abrirCartas, iniciarCartas } from './cartas.js';
import { camara, render, controles, posicionInicial, objetivoInicial } from './motor.js';
import { clickables, zonaCaballete, zonaSombreroMago } from './jardin.js';

// ======================================================
// INTERFAZ E INTERACCIÓN
// ======================================================

const inicio = document.getElementById('inicio');
const tarjeta = document.getElementById('tarjeta');
const modalPixelArt = document.getElementById(
  'pixelart-modal'
);

const modalCartas = document.getElementById('cartas-modal');
iniciarCartas();

const descubiertos = new Set();
const raycaster = new THREE.Raycaster();
const puntero = new THREE.Vector2();

let avisoTemporizador;
let inicioPointer = null;

const recuerdos = PUNTOS.filter(
  dato => dato.id !== 'caballete'
);

const totalRecuerdos = recuerdos.length;

const progreso = document.getElementById('progreso');

if (progreso) {
  progreso.textContent =
    `00 / ${String(totalRecuerdos).padStart(2, '0')}`;
}

function avisar(texto) {
  const aviso = document.getElementById('aviso');

  aviso.textContent = texto;
  aviso.hidden = false;

  clearTimeout(avisoTemporizador);

  avisoTemporizador = setTimeout(() => {
    aviso.hidden = true;
  }, 6500);
}

function abrirRecuerdo(dato) {
  document.getElementById(
    'tarjeta-etiqueta'
  ).textContent = dato.etiqueta;

  document.getElementById(
    'tarjeta-titulo'
  ).textContent = dato.nombre;

  document.getElementById(
    'tarjeta-texto'
  ).textContent = dato.texto;

  tarjeta.hidden = false;

  if (!descubiertos.has(dato.id)) {
    descubiertos.add(dato.id);

    const actual = String(
      descubiertos.size
    ).padStart(2, '0');

    const total = String(
      totalRecuerdos
    ).padStart(2, '0');

    progreso.textContent =
      `${actual} / ${total}`;

    if (
      descubiertos.size ===
      totalRecuerdos
    ) {
      avisar(MENSAJE_FINAL);
    }
  }
}

document.getElementById('empezar').addEventListener(
  'click',
  () => {
    inicio.classList.add('oculto');
  }
);

document.getElementById('reiniciar').addEventListener(
  'click',
  () => {
    tarjeta.hidden = true;
    inicio.classList.remove('oculto');

    camara.position.copy(
      posicionInicial
    );

    controles.target.copy(
      objetivoInicial
    );

    controles.update();
  }
);

document.getElementById('cerrar').addEventListener(
  'click',
  () => {
    tarjeta.hidden = true;
  }
);

document.addEventListener('keydown', evento => {
  if (evento.key === 'Escape') {
    tarjeta.hidden = true;
  }
});

render.domElement.addEventListener(
  'pointerdown',
  evento => {
    inicioPointer = {
      x: evento.clientX,
      y: evento.clientY
    };
  }
);

render.domElement.addEventListener(
  'pointerup',
  evento => {
    if (!inicioPointer) {
      return;
    }

    const distancia = Math.hypot(
      evento.clientX - inicioPointer.x,
      evento.clientY - inicioPointer.y
    );

    inicioPointer = null;

    if (
      distancia > 12 ||
      !inicio.classList.contains('oculto') ||
      !modalPixelArt.hidden ||
      !modalCartas.hidden
    ) {
      return;
    }

    const rect =
      render.domElement.getBoundingClientRect();

    puntero.set(
      (
        (evento.clientX - rect.left) /
        rect.width
      ) * 2 - 1,

      -(
        (evento.clientY - rect.top) /
        rect.height
      ) * 2 + 1
    );

    raycaster.setFromCamera(
      puntero,
      camara
    );

    const sombreroTocado = raycaster.intersectObject(zonaSombreroMago, false);
    if (sombreroTocado.length) {
      tarjeta.hidden = true;
      abrirCartas();
      return;
    }

    // Comprobamos primero el caballete.
    const caballeteTocado =
      raycaster.intersectObject(
        zonaCaballete,
        false
      );

    if (caballeteTocado.length) {
      tarjeta.hidden = true;
      abrirPixelArt();
      return;
    }

    const impactos =
      raycaster.intersectObjects(
        clickables,
        false
      );

    if (
      impactos.length &&
      impactos[0].object.userData.punto
    ) {
      abrirRecuerdo(
        impactos[0].object.userData.punto
      );
    }
  }
);