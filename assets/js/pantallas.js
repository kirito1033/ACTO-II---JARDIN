import * as THREE from 'three';
import { escena } from './motor.js';

// ======================================================
// CANCIONES EN ORDEN
// ======================================================

// Las rutas se resuelven desde la ubicación de pantallas.js.
const VIDEOS = [
  {
    nombre: 'Lasso — No pares de bailar',
    ruta: './videos/lasso-no-pares-de-bailar.mp4'
  },
  {
    nombre: 'Alex Ubago — Sin miedo a nada',
    ruta: './videos/alex-ubago-sin-miedo-a-nada.mp4'
  },
  {
    nombre: 'Andrés Cepeda — Un ratito',
    ruta: './videos/Andrés-Cepeda-Un-Ratito.mp4'
  },
  {
    nombre: 'Chayanne — Dejaría todo',
    ruta: './videos/Chayanne-Dejaría-Todo.mp4'
  },
  {
    nombre: 'Pablo Alborán — Por fin',
    ruta: './videos/pablo-alborán-por-fin.mp4'
  },
  {
    nombre: 'Sin Bandera — Te vi venir',
    ruta: './videos/Sin-Bandera-Te-Vi-Venir.mp4'
  },
  {
    nombre: 'New West — Those Eyes',
    ruta: './videos/New-West-Those-Eyes.mp4'
  }
];

// ======================================================
// TAMAÑO Y POSICIÓN
// ======================================================

const LADO = 60;
const CENTRO_Z = -3;
const ALTURA = 12;
const ANCHO = 30;
const ALTO = 20.5;

const paredes = [
  {
    nombre: 'Fondo',
    posicion: [0, ALTURA, CENTRO_Z - LADO / 2],
    giro: 0
  },
  {
    nombre: 'Derecha',
    posicion: [LADO / 2, ALTURA, CENTRO_Z],
    giro: -Math.PI / 2
  },
  {
    nombre: 'Frente',
    posicion: [0, ALTURA, CENTRO_Z + LADO / 2],
    giro: Math.PI
  },
  {
    nombre: 'Izquierda',
    posicion: [-LADO / 2, ALTURA, CENTRO_Z],
    giro: Math.PI / 2
  }
];

// ======================================================
// PANEL DE CONTROL
// ======================================================

const estilos = document.createElement('style');

estilos.textContent = `
#panel-videos {
  position: fixed;
  left: 16px;
  bottom: 68px;
  z-index: 12;
  width: min(330px, calc(100vw - 32px));
  box-sizing: border-box;
  padding: 16px;
  border: 1px solid #ffffff30;
  border-radius: 16px;
  background: #08121eee;
  color: #f4eee6;
  font: 14px/1.4 system-ui, sans-serif;
  box-shadow: 0 12px 35px #0008;
}

#panel-videos[hidden] {
  display: none;
}

#panel-videos h2 {
  margin: 0 0 8px;
  font-size: 17px;
}

#cancion-actual {
  margin: 0;
  overflow-wrap: anywhere;
}

#posicion-cancion {
  margin: 5px 0 12px;
  opacity: .65;
  font-size: 12px;
}

#panel-videos .acciones {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

#panel-videos button {
  padding: 9px 8px;
  border: 1px solid #ffffff30;
  border-radius: 8px;
  background: #1b2938;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

#panel-videos button:disabled {
  opacity: .4;
  cursor: default;
}

#panel-videos label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}

#estado-videos {
  margin: 10px 0 0;
  font-size: 12px;
  opacity: .8;
  overflow-wrap: anywhere;
}

@media (max-width: 700px) {
  #panel-videos {
    bottom: 60px;
    padding: 12px;
    max-height: 48dvh;
    overflow: auto;
  }
}
`;

document.head.append(estilos);

const panel = document.createElement('section');

panel.id = 'panel-videos';
panel.hidden = true;

panel.setAttribute(
  'aria-label',
  'Control de canciones en las cuatro pantallas'
);

panel.innerHTML = `
  <h2>Música del jardín</h2>

  <p id="cancion-actual"></p>
  <p id="posicion-cancion"></p>

  <div class="acciones">
    <button id="stop-video" type="button">
      ■ Parar
    </button>

    <button id="pausa-video" type="button">
      Ⅱ Pausar
    </button>

    <button id="anterior-video" type="button">
      ⏮ Anterior
    </button>

    <button id="siguiente-video" type="button">
      Siguiente ⏭
    </button>
  </div>

  <label>
    <input id="silencio-video" type="checkbox">
    Sin sonido
  </label>

  <p
    id="estado-videos"
    role="status"
    aria-live="polite"
  ></p>
`;

document.body.append(panel);

const el = id => panel.querySelector(`#${id}`);

function mensaje(texto) {
  el('estado-videos').textContent = texto;
}

// ======================================================
// UN VIDEO COMPARTIDO POR LAS CUATRO PANTALLAS
// ======================================================

const video = document.createElement('video');

video.playsInline = true;
video.muted = false;
video.loop = false;
video.preload = 'auto';

let indiceActual = -1;
let textura = null;
let versionReproduccion = 0;
let esperandoInteraccion = false;

const materialVideo = new THREE.MeshBasicMaterial({
  color: 0x05080c,
  side: THREE.FrontSide,
  toneMapped: false,
  fog: false
});

const materialMarco = new THREE.MeshBasicMaterial({
  color: 0x101820,
  fog: false
});

// ======================================================
// MATERIALES DECORATIVOS
// ======================================================

const decoracionMadera = new THREE.MeshStandardMaterial({
  color: 0x493025,
  roughness: 0.9
});

const decoracionDorada = new THREE.MeshStandardMaterial({
  color: 0xc9a66b,
  metalness: 0.45,
  roughness: 0.4
});

const decoracionHojas = new THREE.MeshStandardMaterial({
  color: 0x426346,
  roughness: 0.95,
  side: THREE.DoubleSide
});

const decoracionTallo = new THREE.MeshStandardMaterial({
  color: 0x304733,
  roughness: 1
});

const decoracionFlor = new THREE.MeshStandardMaterial({
  color: 0xe5a6b5,
  roughness: 0.8
});

const decoracionLuz = new THREE.MeshBasicMaterial({
  color: 0xffdf9b,
  toneMapped: false,
  fog: false
});

const decoracionCable = new THREE.MeshBasicMaterial({
  color: 0x322b24
});

// Geometrías compartidas.
const geometriaHoja = new THREE.SphereGeometry(1, 8, 6);
const geometriaFlor = new THREE.SphereGeometry(0.16, 8, 6);
const geometriaBombilla = new THREE.SphereGeometry(0.14, 10, 8);
const geometriaAdorno = new THREE.OctahedronGeometry(0.28);

// ======================================================
// FUNCIONES DE DECORACIÓN
// ======================================================

function agregarBarra(
  grupoDestino,
  ancho,
  alto,
  profundidad,
  x,
  y,
  z,
  material
) {
  const barra = new THREE.Mesh(
    new THREE.BoxGeometry(ancho, alto, profundidad),
    material
  );

  barra.position.set(x, y, z);
  grupoDestino.add(barra);

  return barra;
}

function agregarEnredadera(grupoDestino, lado) {
  const puntos = [];
  const cantidad = 30;

  for (let i = 0; i <= cantidad; i++) {
    const t = i / cantidad;

    puntos.push(
      new THREE.Vector3(
        lado * (ANCHO / 2 + 0.56) +
          Math.sin(t * Math.PI * 5) * 0.22,

        -ALTO / 2 + t * ALTO,

        0.48 + Math.cos(t * Math.PI * 4) * 0.08
      )
    );
  }

  const curva = new THREE.CatmullRomCurve3(puntos);

  const tallo = new THREE.Mesh(
    new THREE.TubeGeometry(
      curva,
      48,
      0.065,
      5,
      false
    ),
    decoracionTallo
  );

  grupoDestino.add(tallo);

  for (let i = 1; i < cantidad; i++) {
    const punto = curva.getPoint(i / cantidad);
    const direccion = i % 2 === 0 ? 1 : -1;

    const hoja = new THREE.Mesh(
      geometriaHoja,
      decoracionHojas
    );

    hoja.position.copy(punto);
    hoja.position.x += direccion * 0.22;
    hoja.position.z += 0.06;

    hoja.scale.set(0.18, 0.42, 0.07);
    hoja.rotation.z = direccion * -0.7;

    grupoDestino.add(hoja);

    if (i % 4 === 0) {
      const flor = new THREE.Group();

      flor.position.copy(punto);
      flor.position.z += 0.18;

      for (let petalo = 0; petalo < 5; petalo++) {
        const angulo = petalo * Math.PI * 2 / 5;

        const pieza = new THREE.Mesh(
          geometriaFlor,
          decoracionFlor
        );

        pieza.position.set(
          Math.cos(angulo) * 0.19,
          Math.sin(angulo) * 0.19,
          0
        );

        pieza.scale.z = 0.45;
        flor.add(pieza);
      }

      const centro = new THREE.Mesh(
        geometriaFlor,
        decoracionLuz
      );

      centro.scale.setScalar(0.55);
      centro.position.z = 0.07;

      flor.add(centro);
      grupoDestino.add(flor);
    }
  }
}

function agregarGuirnalda(grupoDestino) {
  const puntos = [];

  for (let i = 0; i <= 40; i++) {
    const t = i / 40;

    puntos.push(
      new THREE.Vector3(
        -ANCHO / 2 + t * ANCHO,

        ALTO / 2 + 1.25 -
          Math.sin(t * Math.PI) * 0.85,

        0.42
      )
    );
  }

  const curva = new THREE.CatmullRomCurve3(puntos);

  const cable = new THREE.Mesh(
    new THREE.TubeGeometry(
      curva,
      48,
      0.025,
      4,
      false
    ),
    decoracionCable
  );

  grupoDestino.add(cable);

  for (let i = 0; i <= 18; i++) {
    const punto = curva.getPoint(i / 18);

    const bombilla = new THREE.Mesh(
      geometriaBombilla,
      decoracionLuz
    );

    bombilla.position.copy(punto);
    bombilla.position.y -= 0.12;
    bombilla.scale.y = 1.3;

    grupoDestino.add(bombilla);
  }
}

// ======================================================
// CUATRO PANTALLAS DECORADAS Y SINCRONIZADAS
// ======================================================

const grupo = new THREE.Group();

grupo.name = 'Pantallas decoradas del jardín';
escena.add(grupo);

const pantallas = paredes.map(pared => {
  const pantalla = new THREE.Mesh(
    new THREE.PlaneGeometry(ANCHO, ALTO),
    materialVideo
  );

  pantalla.name = `Pantalla ${pared.nombre}`;

  const soporte = new THREE.Group();

  soporte.name = `Marco decorado ${pared.nombre}`;
  soporte.position.set(...pared.posicion);
  soporte.rotation.y = pared.giro;

  // Fondo oscuro detrás del video.
  const fondo = new THREE.Mesh(
    new THREE.BoxGeometry(
      ANCHO + 0.1,
      ALTO + 0.1,
      0.2
    ),
    materialMarco
  );

  fondo.position.z = -0.16;
  soporte.add(fondo, pantalla);

  for (const lado of [-1, 1]) {
    // Laterales de madera.
    agregarBarra(
      soporte,
      0.8,
      ALTO + 1.6,
      0.55,
      lado * (ANCHO / 2 + 0.4),
      0,
      0,
      decoracionMadera
    );

    // Parte superior e inferior de madera.
    agregarBarra(
      soporte,
      ANCHO + 1.6,
      0.8,
      0.55,
      0,
      lado * (ALTO / 2 + 0.4),
      0,
      decoracionMadera
    );

    // Filetes dorados verticales.
    agregarBarra(
      soporte,
      0.08,
      ALTO + 0.2,
      0.06,
      lado * (ANCHO / 2 + 0.12),
      0,
      0.32,
      decoracionDorada
    );

    // Filetes dorados horizontales.
    agregarBarra(
      soporte,
      ANCHO + 0.32,
      0.08,
      0.06,
      0,
      lado * (ALTO / 2 + 0.12),
      0.32,
      decoracionDorada
    );
  }

  // Adornos de las esquinas.
  for (const x of [-1, 1]) {
    for (const y of [-1, 1]) {
      const adorno = new THREE.Mesh(
        geometriaAdorno,
        decoracionDorada
      );

      adorno.position.set(
        x * (ANCHO / 2 + 0.4),
        y * (ALTO / 2 + 0.4),
        0.4
      );

      adorno.scale.z = 0.5;
      soporte.add(adorno);
    }
  }

  // Repisa inferior.
  agregarBarra(
    soporte,
    ANCHO + 2,
    0.3,
    1.1,
    0,
    -ALTO / 2 - 0.92,
    0.12,
    decoracionMadera
  );

  agregarEnredadera(soporte, -1);
  agregarEnredadera(soporte, 1);
  agregarGuirnalda(soporte);

  grupo.add(soporte);

  return pantalla;
});

// Ajusta solamente el video: la decoración mantiene su tamaño.
video.addEventListener('loadedmetadata', () => {
  const aspecto = video.videoWidth / video.videoHeight;

  if (!Number.isFinite(aspecto) || aspecto <= 0) {
    return;
  }

  const ancho = Math.min(ANCHO, ALTO * aspecto);
  const alto = ancho / aspecto;

  pantallas.forEach(pantalla => {
    pantalla.scale.set(
      ancho / ANCHO,
      alto / ALTO,
      1
    );
  });
});

// ======================================================
// ACTUALIZAR INTERFAZ
// ======================================================

function refrescar() {
  const hayCancion = indiceActual >= 0;

  el('stop-video').disabled = !hayCancion;
  el('pausa-video').disabled = !hayCancion;

  el('anterior-video').disabled =
    !hayCancion || indiceActual === 0;

  el('siguiente-video').disabled =
    !hayCancion || indiceActual >= VIDEOS.length - 1;

  el('silencio-video').disabled = !hayCancion;
  el('silencio-video').checked = video.muted;

  el('pausa-video').textContent = video.paused
    ? '▶ Reanudar'
    : 'Ⅱ Pausar';

  el('cancion-actual').textContent = hayCancion
    ? VIDEOS[indiceActual].nombre
    : 'No hay canciones configuradas';

  el('posicion-cancion').textContent = hayCancion
    ? `Canción ${indiceActual + 1} de ${VIDEOS.length}`
    : '';
}

// ======================================================
// REPRODUCCIÓN
// ======================================================

async function reproducir() {
  if (indiceActual < 0) {
    return;
  }

  const solicitud = ++versionReproduccion;

  esperandoInteraccion = false;

  try {
    await video.play();

    if (solicitud !== versionReproduccion) {
      return;
    }

    refrescar();

    mensaje(
      `Reproduciendo en las cuatro: ${
        VIDEOS[indiceActual].nombre
      }`
    );
  } catch (error) {
    if (solicitud !== versionReproduccion) {
      return;
    }

    refrescar();

    if (error.name === 'NotAllowedError') {
      esperandoInteraccion = true;

      mensaje(
        'El navegador bloqueó el inicio automático. ' +
        'Pulsa Reanudar o entra al jardín.'
      );
    } else if (error.name !== 'AbortError') {
      mensaje(
        'No se pudo reproducir. Revisa la ruta y el formato.'
      );
    }
  }
}

function cargarCancion(indice) {
  if (!VIDEOS[indice]) {
    return;
  }

  versionReproduccion++;
  esperandoInteraccion = false;

  video.pause();

  materialVideo.map = null;

  if (textura) {
    textura.dispose();
    textura = null;
  }

  indiceActual = indice;

  video.src = new URL(
    VIDEOS[indice].ruta,
    import.meta.url
  ).href;

  video.load();

  textura = new THREE.VideoTexture(video);
  textura.colorSpace = THREE.SRGBColorSpace;

  materialVideo.map = textura;
  materialVideo.color.set(0xffffff);
  materialVideo.needsUpdate = true;

  refrescar();

  mensaje(
    `Cargando: ${VIDEOS[indiceActual].nombre}`
  );

  void reproducir();
}

// ======================================================
// PARAR / PAUSAR / REANUDAR
// ======================================================

function pararVideo() {
  versionReproduccion++;
  esperandoInteraccion = false;

  video.pause();

  if (video.readyState > 0) {
    video.currentTime = 0;
  }

  refrescar();

  mensaje(
    'Detenido al comienzo. Pulsa Reanudar para continuar.'
  );
}

el('stop-video').addEventListener(
  'click',
  pararVideo
);

el('pausa-video').addEventListener('click', () => {
  if (video.paused) {
    void reproducir();
    return;
  }

  versionReproduccion++;
  esperandoInteraccion = false;

  video.pause();
  refrescar();

  mensaje('Las cuatro pantallas están en pausa.');
});

// ======================================================
// SIGUIENTE / ANTERIOR
// ======================================================

el('siguiente-video').addEventListener('click', () => {
  if (indiceActual < VIDEOS.length - 1) {
    cargarCancion(indiceActual + 1);
  }
});

el('anterior-video').addEventListener('click', () => {
  if (indiceActual > 0) {
    cargarCancion(indiceActual - 1);
  }
});

video.addEventListener('ended', () => {
  if (indiceActual < VIDEOS.length - 1) {
    cargarCancion(indiceActual + 1);
    return;
  }

  refrescar();

  mensaje(
    'Terminó la última canción. No se repetirá la secuencia.'
  );
});

// ======================================================
// SONIDO
// ======================================================

el('silencio-video').addEventListener('change', () => {
  video.muted = el('silencio-video').checked;

  if (esperandoInteraccion) {
    void reproducir();
  }
});

// ======================================================
// EVENTOS DEL VIDEO
// ======================================================

video.addEventListener('play', refrescar);
video.addEventListener('pause', refrescar);

video.addEventListener('error', () => {
  versionReproduccion++;
  esperandoInteraccion = false;

  refrescar();

  mensaje(
    `No se pudo abrir ${
      VIDEOS[indiceActual]?.ruta || 'el video'
    }. Revisa su ubicación y formato.`
  );
});

// ======================================================
// VISIBILIDAD DEL PANEL
// ======================================================

function visibilidad() {
  const inicio = document.getElementById('inicio');

  const modalAbierto = [
    'pixelart-modal',
    'cartas-modal'
  ].some(id => {
    const elemento = document.getElementById(id);
    return elemento && !elemento.hidden;
  });

  panel.hidden =
    Boolean(inicio && !inicio.classList.contains('oculto')) ||
    modalAbierto;
}

const observador = new MutationObserver(visibilidad);

['inicio', 'pixelart-modal', 'cartas-modal'].forEach(id => {
  const elemento = document.getElementById(id);

  if (elemento) {
    observador.observe(elemento, {
      attributes: true,
      attributeFilter: ['class', 'hidden']
    });
  }
});

// Reintenta al entrar si se bloqueó el inicio automático.
document.getElementById('empezar')?.addEventListener(
  'click',
  () => {
    if (esperandoInteraccion) {
      void reproducir();
    }
  }
);

document.getElementById('reiniciar')?.addEventListener(
  'click',
  pararVideo
);

// ======================================================
// INICIO
// ======================================================

if (VIDEOS.length) {
  cargarCancion(0);
} else {
  refrescar();
  mensaje('Agrega las canciones al arreglo VIDEOS.');
}

visibilidad();