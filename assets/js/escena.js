import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PUNTOS, MENSAJE_FINAL } from './config.js';
import { iniciarPixelArt, abrirPixelArt } from './pixelart.js';

// ======================================================
// CONFIGURACIÓN DE RENDIMIENTO
// ======================================================

const movil = matchMedia('(max-width: 700px)').matches;
const movimientoReducido = matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const CALIDAD = {
  pixelRatio: movil ? 0.75 : 1,
  fps: movil ? 24 : 30,
  piedras: movil ? 13 : 18,
  flores: movil ? 35 : 85,
  arbolesFondo: movil ? 4 : 8
};

const escena = new THREE.Scene();
escena.background = new THREE.Color(0x0a1112);
escena.fog = new THREE.FogExp2(0x0b1515, 0.036);

const camara = new THREE.PerspectiveCamera(
  movil ? 62 : 53,
  innerWidth / innerHeight,
  0.1,
  90
);

const posicionInicial = new THREE.Vector3(
  movil ? 10.5 : 11.5,
  movil ? 6.6 : 6,
  movil ? 18 : 17
);

const objetivoInicial = new THREE.Vector3(
  0,
  1.45,
  -1
);

camara.position.copy(posicionInicial);

const render = new THREE.WebGLRenderer({
  antialias: false,
  alpha: false,
  powerPreference: movil ? 'low-power' : 'high-performance'
});

function ajustarResolucion() {
  const ratio = Math.min(
    window.devicePixelRatio || 1,
    CALIDAD.pixelRatio
  );

  render.setPixelRatio(ratio);
  render.setSize(innerWidth, innerHeight);
}

ajustarResolucion();

render.outputColorSpace = THREE.SRGBColorSpace;
render.toneMapping = THREE.ACESFilmicToneMapping;
render.toneMappingExposure = 1.25;

// Se desactivan todas las sombras, incluso en computador.
render.shadowMap.enabled = false;

document.getElementById('escena').appendChild(
  render.domElement
);

iniciarPixelArt();

const controles = new OrbitControls(
  camara,
  render.domElement
);

controles.enableDamping = true;
controles.dampingFactor = 0.08;
controles.target.copy(objetivoInicial);
controles.minDistance = 6;
controles.maxDistance = 28;
controles.minPolarAngle = Math.PI * 0.15;
controles.maxPolarAngle = Math.PI * 0.47;
controles.enablePan = false;
controles.update();

// Solo dos luces generales; las luces decorativas
// del jardín se simulan con materiales emisivos.
escena.add(
  new THREE.HemisphereLight(
    0xa9c3c5,
    0x183225,
    1.75
  )
);

const luna = new THREE.DirectionalLight(
  0xc5d5df,
  2
);

luna.position.set(-10, 15, -8);
escena.add(luna);

// ======================================================
// MATERIALES Y GEOMETRÍAS REUTILIZADAS
// ======================================================

const materiales = {
  suelo: new THREE.MeshLambertMaterial({
    color: 0x314c34
  }),

  grava: new THREE.MeshLambertMaterial({
    color: 0x514e45
  }),

  piedra: new THREE.MeshLambertMaterial({
    color: 0x8e938a
  }),

  piedraOscura: new THREE.MeshLambertMaterial({
    color: 0x666f6a
  }),

  madera: new THREE.MeshLambertMaterial({
    color: 0x805c40
  }),

  maderaClara: new THREE.MeshLambertMaterial({
    color: 0xaa7951
  }),

  hojas: new THREE.MeshLambertMaterial({
    color: 0x31543a
  }),

  hojasOscuras: new THREE.MeshLambertMaterial({
    color: 0x1c382b
  }),

  flores: new THREE.MeshLambertMaterial({
    color: 0xbf7385
  }),

  agua: new THREE.MeshLambertMaterial({
    color: 0x477e86,
    emissive: 0x123039,
    emissiveIntensity: 0.25
  }),

  metal: new THREE.MeshLambertMaterial({
    color: 0x525c5a
  }),

  farol: new THREE.MeshBasicMaterial({
    color: 0xf0bf87
  }),

  lienzo: new THREE.MeshLambertMaterial({
    color: 0xece1cf
  }),

  zonaInvisible: new THREE.MeshBasicMaterial({
    visible: false,
    side: THREE.DoubleSide
  })
};

const cajaGeo = new THREE.BoxGeometry(1, 1, 1);
const esferaGeo = new THREE.SphereGeometry(
  1,
  7,
  5
);

const cilindroGeo = new THREE.CylinderGeometry(
  1,
  1,
  1,
  8
);

const piedraGeo = new THREE.CylinderGeometry(
  1,
  1,
  0.12,
  6
);

const arbolCopaGeo = new THREE.SphereGeometry(
  1,
  7,
  5
);

let semilla = 17391;

function azar() {
  semilla = (
    Math.imul(1664525, semilla) +
    1013904223
  ) >>> 0;

  return semilla / 4294967296;
}

function caja(
  x,
  y,
  z,
  ancho,
  alto,
  fondo,
  material,
  padre = escena
) {
  const objeto = new THREE.Mesh(
    cajaGeo,
    material
  );

  objeto.position.set(x, y, z);
  objeto.scale.set(
    ancho,
    alto,
    fondo
  );

  padre.add(objeto);
  return objeto;
}

function bola(
  x,
  y,
  z,
  ancho,
  alto,
  fondo,
  material,
  padre = escena
) {
  const objeto = new THREE.Mesh(
    esferaGeo,
    material
  );

  objeto.position.set(x, y, z);
  objeto.scale.set(
    ancho,
    alto,
    fondo
  );

  padre.add(objeto);
  return objeto;
}

function cilindro(
  x,
  y,
  z,
  ancho,
  alto,
  fondo,
  material,
  padre = escena
) {
  const objeto = new THREE.Mesh(
    cilindroGeo,
    material
  );

  objeto.position.set(x, y, z);
  objeto.scale.set(
    ancho,
    alto,
    fondo
  );

  padre.add(objeto);
  return objeto;
}

// ======================================================
// SUELO Y CAMINO
// ======================================================

const suelo = new THREE.Mesh(
  new THREE.PlaneGeometry(85, 85),
  materiales.suelo
);

suelo.rotation.x = -Math.PI / 2;
suelo.position.y = -0.12;
escena.add(suelo);

const caminoBase = new THREE.Mesh(
  new THREE.PlaneGeometry(2.9, 18),
  materiales.grava
);

caminoBase.rotation.x = -Math.PI / 2;
caminoBase.position.set(
  0,
  -0.105,
  2.4
);

escena.add(caminoBase);

// Todas las piedras comparten una geometría.
// Se separan en dos instancias por color.
const cantidadPiedras = CALIDAD.piedras * 2;

const piedrasClaras = new THREE.InstancedMesh(
  piedraGeo,
  materiales.piedra,
  cantidadPiedras
);

const piedrasOscuras = new THREE.InstancedMesh(
  piedraGeo,
  materiales.piedraOscura,
  cantidadPiedras
);

const dummy = new THREE.Object3D();

let contadorClaras = 0;
let contadorOscuras = 0;

for (let i = 0; i < CALIDAD.piedras; i++) {
  const z = 10.4 - i * 0.9;
  const x = Math.sin(i * 0.48) * 0.75;

  for (const lado of [-1, 1]) {
    const objeto = (i + lado) % 3 === 0
      ? piedrasOscuras
      : piedrasClaras;

    const indice = objeto === piedrasOscuras
      ? contadorOscuras++
      : contadorClaras++;

    dummy.position.set(
      x + lado * 0.38,
      -0.02,
      z
    );

    dummy.rotation.set(
      0,
      i * 0.4 + lado,
      0
    );

    dummy.scale.set(
      0.38,
      1,
      0.43
    );

    dummy.updateMatrix();
    objeto.setMatrixAt(indice, dummy.matrix);
  }
}

piedrasClaras.count = contadorClaras;
piedrasOscuras.count = contadorOscuras;
piedrasClaras.instanceMatrix.needsUpdate = true;
piedrasOscuras.instanceMatrix.needsUpdate = true;

escena.add(piedrasClaras, piedrasOscuras);

// ======================================================
// ARCO DE ENTRADA
// ======================================================

for (const x of [-9.2, -6.1]) {
  cilindro(
    x,
    1.65,
    6.2,
    0.14,
    3.3,
    0.14,
    materiales.madera
  );

  for (let i = 0; i < 3; i++) {
    bola(
      x + Math.sin(i * 2) * 0.2,
      1 + i * 0.75,
      6.2,
      0.4,
      0.34,
      0.4,
      materiales.hojas
    );
  }
}

const arco = new THREE.Mesh(
  new THREE.TorusGeometry(
    1.58,
    0.13,
    6,
    20,
    Math.PI
  ),
  materiales.madera
);

arco.position.set(
  -7.65,
  3.28,
  6.2
);

escena.add(arco);

for (let i = 0; i < 6; i++) {
  const angulo = Math.PI * i / 5;

  bola(
    -7.65 + Math.cos(angulo) * 1.6,
    3.28 + Math.sin(angulo) * 1.6,
    6.2,
    0.25,
    0.2,
    0.3,
    i % 3
      ? materiales.hojas
      : materiales.flores
  );
}

// ======================================================
// FUENTE CENTRAL
// ======================================================

const fuente = new THREE.Group();
fuente.position.set(0, 0, -2.5);
escena.add(fuente);

const baseFuente = new THREE.Mesh(
  new THREE.CylinderGeometry(
    2.15,
    2.22,
    0.65,
    18
  ),
  materiales.piedra
);

baseFuente.position.y = 0.3;
fuente.add(baseFuente);

const aguaFuente = new THREE.Mesh(
  new THREE.CylinderGeometry(
    1.83,
    1.83,
    0.06,
    20
  ),
  materiales.agua
);

aguaFuente.position.y = 0.67;
fuente.add(aguaFuente);

const bordeFuente = new THREE.Mesh(
  new THREE.TorusGeometry(
    1.98,
    0.16,
    6,
    24
  ),
  materiales.piedraOscura
);

bordeFuente.rotation.x = Math.PI / 2;
bordeFuente.position.y = 0.72;
fuente.add(bordeFuente);

cilindro(
  0,
  1,
  0,
  0.45,
  0.7,
  0.45,
  materiales.piedra,
  fuente
);

const chorro = bola(
  0,
  1.68,
  0,
  0.11,
  0.55,
  0.11,
  materiales.agua,
  fuente
);

// ======================================================
// BANCO
// ======================================================

const banco = new THREE.Group();
banco.position.set(
  4.6,
  0,
  0.4
);

banco.rotation.y = -0.5;
escena.add(banco);

for (let i = 0; i < 3; i++) {
  caja(
    0,
    0.85,
    -0.22 + i * 0.22,
    2.5,
    0.11,
    0.18,
    materiales.maderaClara,
    banco
  );

  caja(
    0,
    1.2 + i * 0.2,
    -0.43 - i * 0.035,
    2.5,
    0.12,
    0.15,
    materiales.madera,
    banco
  );
}

for (const x of [-1, 1]) {
  caja(
    x,
    0.4,
    0,
    0.15,
    0.8,
    0.15,
    materiales.madera,
    banco
  );
}

// ======================================================
// ÁRBOL PRINCIPAL
// ======================================================

const arbol = new THREE.Group();
arbol.position.set(
  7.1,
  0,
  -4.8
);
escena.add(arbol);

const tronco = cilindro(
  0,
  1.8,
  0,
  0.55,
  3.6,
  0.55,
  materiales.madera,
  arbol
);

tronco.rotation.z = 0.07;

for (let i = 0; i < (movil ? 5 : 8); i++) {
  const angulo = i * 2.399;

  const copa = new THREE.Mesh(
    arbolCopaGeo,
    i % 2
      ? materiales.hojas
      : materiales.hojasOscuras
  );

  copa.position.set(
    Math.cos(angulo) * 1.15,
    3.8 + (i % 3) * 0.43,
    Math.sin(angulo) * 0.95
  );

  copa.scale.set(
    1.15,
    0.9,
    1.1
  );

  arbol.add(copa);
}

// ======================================================
// FLORES Y ÁRBOLES DE FONDO
// ======================================================

// En vez de pétalos, tallos y hojas individuales,
// cada flor lejana es una sola instancia.
const florGeo = new THREE.SphereGeometry(
  1,
  5,
  4
);

const flores = new THREE.InstancedMesh(
  florGeo,
  materiales.flores,
  CALIDAD.flores
);

for (let i = 0; i < CALIDAD.flores; i++) {
  let x;
  let z;

  do {
    const angulo = azar() * Math.PI * 2;
    const radio = 3.5 + azar() * 12;

    x = Math.cos(angulo) * radio;
    z = Math.sin(angulo) * radio;
  } while (
    Math.hypot(x, z + 2.5) < 2.7 ||
    (
      Math.abs(x) < 1.8 &&
      z > -5 &&
      z < 11
    )
  );

  dummy.position.set(
    x,
    0.3,
    z
  );

  dummy.rotation.set(0, 0, 0);

  const escala = 0.11 + azar() * 0.09;

  dummy.scale.set(
    escala,
    escala * 0.8,
    escala
  );

  dummy.updateMatrix();
  flores.setMatrixAt(
    i,
    dummy.matrix
  );
}

flores.instanceMatrix.needsUpdate = true;
flores.computeBoundingSphere();
escena.add(flores);

// Rosales cerca del marcador correspondiente.
for (let i = 0; i < (movil ? 5 : 10); i++) {
  const angulo = azar() * Math.PI * 2;
  const radio = azar() * 1.3;

  bola(
    -5.2 + Math.cos(angulo) * radio,
    0.55,
    -1.9 + Math.sin(angulo) * radio,
    0.22,
    0.2,
    0.22,
    i % 3
      ? materiales.flores
      : materiales.hojas
  );
}

// Siluetas lejanas sencillas: tronco + una copa.
for (let i = 0; i < CALIDAD.arbolesFondo; i++) {
  const angulo =
    i * Math.PI * 2 / CALIDAD.arbolesFondo;

  const radio = 18 + azar() * 3;

  const x = Math.cos(angulo) * radio;
  const z = Math.sin(angulo) * radio;

  cilindro(
    x,
    1.4,
    z,
    0.3,
    2.8,
    0.3,
    materiales.madera
  );

  bola(
    x,
    3.15,
    z,
    1.45,
    1.3,
    1.4,
    materiales.hojasOscuras
  );
}

// ======================================================
// FAROLES SIN LUCES DINÁMICAS
// ======================================================

for (const [x, z] of [
  [-2.4, 5.6],
  [3, 4],
  [-9.3, -3.1],
  [9.6, 2.8]
]) {
  cilindro(
    x,
    1.1,
    z,
    0.08,
    2.2,
    0.08,
    materiales.metal
  );

  caja(
    x,
    2.35,
    z,
    0.4,
    0.46,
    0.4,
    materiales.farol
  );
}

// ======================================================
// MARCADORES INTERACTIVOS
// ======================================================

const clickables = [];
const marcadores = [];

const marcadorGeo = new THREE.SphereGeometry(
  0.16,
  7,
  5
);

const zonaGeo = new THREE.SphereGeometry(
  0.92,
  7,
  5
);

for (const dato of PUNTOS) {
  if (dato.id === 'caballete') {
    continue;
  }

  const grupo = new THREE.Group();
  grupo.position.set(
    ...dato.posicion
  );

  escena.add(grupo);

  const punto = new THREE.Mesh(
    marcadorGeo,
    new THREE.MeshBasicMaterial({
      color: dato.color
    })
  );

  grupo.add(punto);

  const zona = new THREE.Mesh(
    zonaGeo,
    materiales.zonaInvisible
  );

  zona.userData.punto = dato;
  grupo.add(zona);
  clickables.push(zona);

  marcadores.push({
    grupo,
    altura: dato.posicion[1]
  });
}

// ======================================================
// CABALLETE CON PINCEL
// ======================================================

const caballete = new THREE.Group();
caballete.position.set(
  -2.9,
  0,
  1.1
);
caballete.rotation.y = 0.3;
escena.add(caballete);

for (const x of [-0.72, 0.72]) {
  const pata = caja(
    x,
    1.1,
    0.12,
    0.14,
    2.25,
    0.14,
    materiales.maderaClara,
    caballete
  );

  pata.rotation.z = x < 0
    ? 0.22
    : -0.22;
}

const pataTrasera = caja(
  0,
  1.08,
  -0.5,
  0.14,
  2.3,
  0.14,
  materiales.madera,
  caballete
);

pataTrasera.rotation.x = -0.26;

caja(
  0,
  3.24,
  0,
  2.12,
  0.13,
  0.13,
  materiales.maderaClara,
  caballete
);

caja(
  0,
  1.45,
  0,
  2.3,
  0.15,
  0.2,
  materiales.maderaClara,
  caballete
);

caja(
  0,
  2.33,
  -0.015,
  1.78,
  1.67,
  0.07,
  materiales.lienzo,
  caballete
);

caja(
  0,
  3.7,
  0.03,
  0.13,
  1.05,
  0.13,
  materiales.madera,
  caballete
);

caja(
  0,
  1.18,
  0.2,
  2.25,
  0.13,
  0.25,
  materiales.madera,
  caballete
);

const pincel = caja(
  -0.42,
  1.48,
  0.31,
  0.055,
  0.75,
  0.055,
  materiales.maderaClara,
  caballete
);

pincel.rotation.z = -0.72;

bola(
  -0.18,
  1.76,
  0.31,
  0.07,
  0.12,
  0.07,
  materiales.piedraOscura,
  caballete
);

const zonaCaballete = new THREE.Mesh(
  cajaGeo,
  materiales.zonaInvisible
);

zonaCaballete.position.set(
  0,
  2.08,
  0
);

zonaCaballete.scale.set(
  2.5,
  4.2,
  1
);

caballete.add(zonaCaballete);

// ======================================================
// INTERFAZ E INTERACCIÓN
// ======================================================

const inicio = document.getElementById('inicio');
const tarjeta = document.getElementById('tarjeta');
const modalPixelArt = document.getElementById(
  'pixelart-modal'
);

const descubiertos = new Set();
const raycaster = new THREE.Raycaster();
const puntero = new THREE.Vector2();

let avisoTemporizador;
let inicioPointer = null;
let necesitaDibujar = true;

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
    necesitaDibujar = true;
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
    necesitaDibujar = true;
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
      !modalPixelArt.hidden
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

// ======================================================
// RENDERIZADO BAJO DEMANDA
// ======================================================

let ultimoFotograma = 0;
let ultimaInteraccion = performance.now();

function activarMovimiento() {
  ultimaInteraccion = performance.now();
  necesitaDibujar = true;
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
  necesitaDibujar = true;
});

document.addEventListener(
  'visibilitychange',
  () => {
    necesitaDibujar = true;
  }
);

document.getElementById(
  'pixelart-cerrar'
).addEventListener(
  'click',
  () => {
    necesitaDibujar = true;
  }
);

document.addEventListener(
  'keydown',
  evento => {
    if (evento.key === 'Escape') {
      necesitaDibujar = true;
    }
  }
);

function animar(ms) {
  if (
    document.hidden ||
    !modalPixelArt.hidden
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

  if (
    !necesitaDibujar &&
    !moviendo
  ) {
    return;
  }

  if (
    !movimientoReducido &&
    !movil &&
    moviendo
  ) {
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

  render.render(
    escena,
    camara
  );

  necesitaDibujar = false;
}

render.setAnimationLoop(animar);