import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PUNTOS, MENSAJE_FINAL } from './config.js';
import { iniciarPixelArt, abrirPixelArt } from './pixelart.js';

const movil = matchMedia('(max-width: 700px)').matches;
const escena = new THREE.Scene();
escena.background = new THREE.Color(0x080d0e);
escena.fog = new THREE.FogExp2(0x0b1415, 0.032);

const camara = new THREE.PerspectiveCamera(
  movil ? 60 : 52,
  innerWidth / innerHeight,
  0.1,
  100
);
const posicionInicial = new THREE.Vector3(
  movil ? 10.5 : 11.5,
  movil ? 6.5 : 6,
  movil ? 18.5 : 17
);
const objetivoInicial = new THREE.Vector3(0, 1.45, -1);
camara.position.copy(posicionInicial);

const render = new THREE.WebGLRenderer({
  antialias: !movil,
  powerPreference: 'high-performance'
});
render.setPixelRatio(Math.min(devicePixelRatio, movil ? 1.3 : 1.8));
render.setSize(innerWidth, innerHeight);
render.outputColorSpace = THREE.SRGBColorSpace;
render.toneMapping = THREE.ACESFilmicToneMapping;
render.toneMappingExposure = 1.35;
render.shadowMap.enabled = true;
render.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById('escena').appendChild(render.domElement);

iniciarPixelArt();

const controles = new OrbitControls(camara, render.domElement);
controles.enableDamping = true;
controles.dampingFactor = 0.055;
controles.target.copy(objetivoInicial);
controles.minDistance = 6;
controles.maxDistance = 30;
controles.minPolarAngle = Math.PI * 0.15;
controles.maxPolarAngle = Math.PI * 0.47;
controles.enablePan = false;
controles.update();

const ambiente = new THREE.HemisphereLight(
  0xa8bed1,
  0x122419,
  1.12
);
escena.add(ambiente);

const luna = new THREE.DirectionalLight(0xb8cbe0, 2.55);
luna.position.set(-10, 15, -8);
luna.castShadow = true;
luna.shadow.mapSize.set(
  movil ? 1024 : 2048,
  movil ? 1024 : 2048
);
luna.shadow.camera.left = -19;
luna.shadow.camera.right = 19;
luna.shadow.camera.top = 19;
luna.shadow.camera.bottom = -19;
luna.shadow.camera.near = 1;
luna.shadow.camera.far = 50;
luna.shadow.normalBias = 0.035;
escena.add(luna);

const luzFuente = new THREE.PointLight(0x9cbec7, 7, 10, 2);
luzFuente.position.set(0, 2.15, -2.5);
escena.add(luzFuente);

const material = {
  cesped: new THREE.MeshStandardMaterial({
    color: 0x6f866b,
    roughness: 1
  }),
  tierra: new THREE.MeshStandardMaterial({
    color: 0x504a38,
    roughness: 1
  }),
  madera: new THREE.MeshStandardMaterial({
    color: 0x6a503e,
    roughness: 0.93
  }),
  maderaClara: new THREE.MeshStandardMaterial({
    color: 0x8b6b4c,
    roughness: 0.91
  }),
  hojas: new THREE.MeshStandardMaterial({
    color: 0x284d32,
    roughness: 1
  }),
  hojasClaras: new THREE.MeshStandardMaterial({
    color: 0x436a3e,
    roughness: 1
  }),
  piedra: new THREE.MeshStandardMaterial({
    color: 0x737b77,
    roughness: 0.93
  }),
  piedraClara: new THREE.MeshStandardMaterial({
    color: 0x9c9b8e,
    roughness: 1,
    flatShading: true
  }),
  piedraOscura: new THREE.MeshStandardMaterial({
    color: 0x626964,
    roughness: 1,
    flatShading: true
  }),
  agua: new THREE.MeshStandardMaterial({
    color: 0x356b76,
    emissive: 0x123b47,
    emissiveIntensity: 0.3,
    metalness: 0.22,
    roughness: 0.25,
    transparent: true,
    opacity: 0.88,
    side: THREE.DoubleSide
  }),
  rosa: new THREE.MeshStandardMaterial({
    color: 0xb96377,
    roughness: 0.73,
    side: THREE.DoubleSide
  }),
  rosaClara: new THREE.MeshStandardMaterial({
    color: 0xd19a9f,
    roughness: 0.75,
    side: THREE.DoubleSide
  }),
  metal: new THREE.MeshStandardMaterial({
    color: 0x3d4546,
    metalness: 0.65,
    roughness: 0.43
  }),
  grava: new THREE.MeshStandardMaterial({
    color: 0x555348,
    roughness: 1
  })
};

function texturaSuelo() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#718064';
  ctx.fillRect(0, 0, 512, 512);

  let semilla = 27;
  const azar = () =>
    ((semilla =
      (Math.imul(1664525, semilla) + 1013904223) >>> 0) /
      4294967296);

  const colores = [
    '#546f4b', '#3e6144', '#809066',
    '#97866a', '#53674a', '#334e3b'
  ];

  for (let i = 0; i < 25000; i++) {
    ctx.fillStyle = colores[Math.floor(azar() * colores.length)];
    ctx.fillRect(
      azar() * 512,
      azar() * 512,
      1 + azar() * 3,
      1 + azar() * 4
    );
  }

  const textura = new THREE.CanvasTexture(canvas);
  textura.colorSpace = THREE.SRGBColorSpace;
  textura.wrapS = textura.wrapT = THREE.RepeatWrapping;
  textura.repeat.set(5, 5);
  textura.anisotropy = Math.min(
    8,
    render.capabilities.getMaxAnisotropy()
  );
  return textura;
}

material.cesped.map = texturaSuelo();
material.cesped.needsUpdate = true;

let semilla = 92184;
const azar = () =>
  ((semilla =
    (Math.imul(1664525, semilla) + 1013904223) >>> 0) /
    4294967296);

const esfera = new THREE.SphereGeometry(1, 10, 8);

function bola(
  x, y, z, ancho, alto, fondo, mat,
  padre = escena, sombra = true
) {
  const objeto = new THREE.Mesh(esfera, mat);
  objeto.position.set(x, y, z);
  objeto.scale.set(ancho, alto, fondo);
  objeto.castShadow = sombra;
  objeto.receiveShadow = true;
  padre.add(objeto);
  return objeto;
}

function caja(
  x, y, z, ancho, alto, fondo, mat,
  padre = escena
) {
  const objeto = new THREE.Mesh(
    new THREE.BoxGeometry(ancho, alto, fondo),
    mat
  );
  objeto.position.set(x, y, z);
  objeto.castShadow = true;
  objeto.receiveShadow = true;
  padre.add(objeto);
  return objeto;
}

function cilindro(
  x, y, z, radioSuperior, radioInferior,
  alto, mat, padre = escena, lados = 12
) {
  const objeto = new THREE.Mesh(
    new THREE.CylinderGeometry(
      radioSuperior,
      radioInferior,
      alto,
      lados
    ),
    mat
  );
  objeto.position.set(x, y, z);
  objeto.castShadow = true;
  objeto.receiveShadow = true;
  padre.add(objeto);
  return objeto;
}

// Suelo amplio: evita que parezca una maqueta circular flotante.
const suelo = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  material.cesped
);
suelo.rotation.x = -Math.PI / 2;
suelo.position.y = -0.11;
suelo.receiveShadow = true;
escena.add(suelo);

// Camino de piedras con piezas separadas y bordes de grava.
const geometriaPiedra = new THREE.CylinderGeometry(
  1, 1.08, 0.10, 7
);
const tierraCamino = new THREE.Mesh(
  new THREE.PlaneGeometry(3.35, 17.4),
  material.grava
);
tierraCamino.rotation.x = -Math.PI / 2;
tierraCamino.position.set(0, -0.098, 2.4);
escena.add(tierraCamino);

for (let i = 0; i < 15; i++) {
  const z = 10.4 - i * 1.08;
  const x = Math.sin(i * 0.48) * 0.87;

  for (let j = 0; j < 3; j++) {
    const laja = new THREE.Mesh(
      geometriaPiedra,
      (i + j) % 3
        ? material.piedraClara
        : material.piedraOscura
    );
    laja.position.set(
      x + (j - 1) * 0.49,
      -0.025,
      z + ((i + j) % 2) * 0.13
    );
    laja.scale.set(
      0.28 + ((i + j) % 3) * 0.06,
      1,
      0.38
    );
    laja.rotation.y = (i * 2 + j) * 0.4;
    laja.castShadow = true;
    laja.receiveShadow = true;
    escena.add(laja);
  }
}

// Arco lateral con vegetación.
for (const x of [-9.2, -6.1]) {
  cilindro(x, 1.65, 6.2, 0.11, 0.16, 3.3, material.madera);

  for (let j = 0; j < 9; j++) {
    bola(
      x + Math.sin(j * 2) * 0.23,
      0.5 + j * 0.34,
      6.2,
      0.24, 0.14, 0.26,
      j % 2 ? material.hojas : material.hojasClaras
    );
  }
}

const arco = new THREE.Mesh(
  new THREE.TorusGeometry(1.58, 0.12, 9, 32, Math.PI),
  material.madera
);
arco.position.set(-7.65, 3.28, 6.2);
arco.castShadow = true;
escena.add(arco);

for (let i = 0; i < 19; i++) {
  const angulo = Math.PI * i / 18;
  const hoja = bola(
    -7.65 + Math.cos(angulo) * 1.6,
    3.28 + Math.sin(angulo) * 1.6,
    6.2,
    0.2, 0.13, 0.27,
    i % 5 ? material.hojas : material.rosa
  );
  hoja.rotation.z = angulo;
}

// Fuente central.
const fuente = new THREE.Group();
fuente.position.set(0, 0, -2.5);
escena.add(fuente);

cilindro(
  0, 0.30, 0,
  2.12, 2.24, 0.68,
  material.piedra, fuente, 32
);
cilindro(
  0, 0.68, 0,
  1.84, 1.84, 0.09,
  material.agua, fuente, 36
);

const borde = new THREE.Mesh(
  new THREE.TorusGeometry(1.99, 0.15, 10, 48),
  material.piedraClara
);
borde.rotation.x = Math.PI / 2;
borde.position.y = 0.76;
borde.castShadow = true;
fuente.add(borde);

cilindro(
  0, 1.04, 0,
  0.36, 0.53, 0.71,
  material.piedra, fuente
);

const plato = bola(
  0, 1.5, 0,
  0.52, 0.15, 0.52,
  material.piedraClara, fuente
);
plato.castShadow = true;

const chorro = bola(
  0, 1.96, 0,
  0.10, 0.46, 0.10,
  material.agua, fuente, false
);

const ondulaciones = [];
for (let i = 0; i < 3; i++) {
  const aroAgua = new THREE.Mesh(
    new THREE.TorusGeometry(0.42 + i * 0.37, 0.012, 4, 48),
    new THREE.MeshBasicMaterial({
      color: 0xa7d0d3,
      transparent: true,
      opacity: 0.25 - i * 0.05,
      depthWrite: false
    })
  );
  aroAgua.rotation.x = Math.PI / 2;
  aroAgua.position.set(0, 0.755 + i * 0.003, 0);
  fuente.add(aroAgua);
  ondulaciones.push(aroAgua);
}

// Banco de tablones individuales.
const banco = new THREE.Group();
banco.position.set(4.6, 0, 0.4);
banco.rotation.y = -0.5;
escena.add(banco);

for (let i = 0; i < 5; i++) {
  caja(
    0, 0.85, -0.34 + i * 0.17,
    2.5, 0.09, 0.14,
    i % 2 ? material.madera : material.maderaClara,
    banco
  );
}

for (let i = 0; i < 5; i++) {
  caja(
    0, 1.13 + i * 0.15, -0.38 - i * 0.025,
    2.5, 0.11, 0.12,
    i % 2 ? material.maderaClara : material.madera,
    banco
  );
}

for (const x of [-1.05, 1.05]) {
  caja(
    x, 0.43, -0.28,
    0.13, 0.83, 0.13,
    material.madera, banco
  );
  caja(
    x, 0.43, 0.27,
    0.13, 0.83, 0.13,
    material.madera, banco
  );
}

// Árbol y ramas.
const arbol = new THREE.Group();
arbol.position.set(7.1, 0, -4.8);
escena.add(arbol);

const tronco = cilindro(
  0, 1.92, 0,
  0.34, 0.58, 3.84,
  material.madera, arbol, 9
);
tronco.rotation.z = 0.08;

for (let i = 0; i < (movil ? 25 : 42); i++) {
  const angulo = i * 2.399;
  const radio = 0.7 + azar() * 1.6;

  const hoja = bola(
    Math.cos(angulo) * radio,
    3.45 + azar() * 1.85,
    Math.sin(angulo) * radio,
    0.58 + azar() * 0.39,
    0.42 + azar() * 0.32,
    0.62 + azar() * 0.4,
    i % 3 ? material.hojas : material.hojasClaras,
    arbol,
    !movil && i < 11
  );
  hoja.rotation.z = azar() - 0.5;
}

// Flores pequeñas junto al camino y en el rosal.
const petaloGeo = new THREE.SphereGeometry(1, 8, 6);
const hojaGeo = new THREE.SphereGeometry(1, 7, 5);
const talloGeo = new THREE.CylinderGeometry(
  0.018, 0.028, 0.45, 5
);

function flor(x, z, mat, escala = 1) {
  const tallo = new THREE.Mesh(talloGeo, material.hojas);
  tallo.position.set(x, 0.19 * escala, z);
  tallo.scale.y = escala;
  escena.add(tallo);

  const hoja = new THREE.Mesh(hojaGeo, material.hojasClaras);
  hoja.position.set(
    x + 0.10 * escala,
    0.19 * escala,
    z
  );
  hoja.scale.set(
    0.16 * escala,
    0.045 * escala,
    0.085 * escala
  );
  hoja.rotation.z = 0.4;
  escena.add(hoja);

  for (let j = 0; j < 5; j++) {
    const angulo = j * Math.PI * 2 / 5;
    const petalo = new THREE.Mesh(petaloGeo, mat);
    petalo.position.set(
      x + Math.cos(angulo) * 0.12 * escala,
      0.44 * escala,
      z + Math.sin(angulo) * 0.12 * escala
    );
    petalo.scale.set(
      0.105 * escala,
      0.05 * escala,
      0.15 * escala
    );
    petalo.rotation.y = angulo;
    escena.add(petalo);
  }

  bola(
    x, 0.46 * escala, z,
    0.07 * escala,
    0.05 * escala,
    0.07 * escala,
    material.maderaClara,
    escena,
    false
  );
}

for (let i = 0; i < (movil ? 85 : 160); i++) {
  const angulo = azar() * Math.PI * 2;
  const radio = 3.2 + azar() * 12;
  const x = Math.cos(angulo) * radio;
  const z = Math.sin(angulo) * radio;

  if (
    Math.hypot(x, z + 2.5) < 2.65 ||
    (Math.abs(x) < 2 && z > -5 && z < 11)
  ) {
    continue;
  }

  if (azar() < 0.48) {
    flor(
      x,
      z,
      azar() < 0.5
        ? material.rosa
        : material.rosaClara,
      0.65 + azar() * 0.65
    );
  } else {
    bola(
      x, 0.12, z,
      0.2 + azar() * 0.25,
      0.14 + azar() * 0.15,
      0.21 + azar() * 0.23,
      azar() < 0.5
        ? material.hojas
        : material.hojasClaras,
      escena,
      false
    );
  }
}

for (let i = 0; i < 27; i++) {
  const angulo = azar() * Math.PI * 2;
  const radio = azar() * 1.45;
  flor(
    -5.2 + Math.cos(angulo) * radio,
    -1.9 + Math.sin(angulo) * radio,
    i % 3 ? material.rosa : material.rosaClara,
    0.8 + azar() * 0.6
  );
}

// Hierba fina con InstancedMesh: más detalle sin miles de draw calls.
const hierbaGeo = new THREE.ConeGeometry(0.035, 0.48, 3);
const hierbaMat = new THREE.MeshStandardMaterial({
  color: 0x547147,
  roughness: 1,
  side: THREE.DoubleSide
});
const cantidadHierba = movil ? 1100 : 2700;
const hierba = new THREE.InstancedMesh(
  hierbaGeo,
  hierbaMat,
  cantidadHierba
);
const dummy = new THREE.Object3D();

for (let i = 0; i < cantidadHierba; i++) {
  const angulo = azar() * Math.PI * 2;
  const radio = Math.sqrt(azar()) * 18;
  const x = Math.cos(angulo) * radio;
  const z = Math.sin(angulo) * radio;

  dummy.position.set(x, 0.1, z);
  dummy.rotation.set(
    (azar() - 0.5) * 0.3,
    azar() * Math.PI * 2,
    (azar() - 0.5) * 0.27
  );
  const escala = 0.5 + azar() * 0.7;
  dummy.scale.set(escala, escala, escala);
  dummy.updateMatrix();
  hierba.setMatrixAt(i, dummy.matrix);
  hierba.setColorAt(
    i,
    new THREE.Color().setHSL(
      0.26 + azar() * 0.04,
      0.22 + azar() * 0.17,
      0.17 + azar() * 0.10
    )
  );
}

hierba.instanceMatrix.needsUpdate = true;
hierba.computeBoundingSphere();
escena.add(hierba);

// Árboles lejanos en varias capas para dar profundidad.
function arbolLejano(x, z, escala, color) {
  const grupo = new THREE.Group();
  grupo.position.set(x, 0, z);
  grupo.scale.setScalar(escala);
  escena.add(grupo);

  cilindro(
    0, 1.3, 0,
    0.15, 0.23, 2.6,
    material.madera, grupo, 7
  );

  for (let i = 0; i < 6; i++) {
    const angulo = i * Math.PI * 2 / 6;
    bola(
      Math.cos(angulo) * 0.8,
      2.6 + (i % 2) * 0.35,
      Math.sin(angulo) * 0.65,
      0.9, 0.85, 0.9,
      color,
      grupo,
      false
    );
  }
}

const arbolesFondo = new THREE.MeshStandardMaterial({
  color: 0x183529,
  roughness: 1
});
const arbolesMedios = new THREE.MeshStandardMaterial({
  color: 0x244934,
  roughness: 1
});

for (let i = 0; i < (movil ? 18 : 26); i++) {
  const angulo = i * Math.PI * 2 / (movil ? 18 : 26);
  const radio = 16.5 + azar() * 7;
  arbolLejano(
    Math.cos(angulo) * radio,
    Math.sin(angulo) * radio,
    0.85 + azar() * 0.8,
    i % 3 ? arbolesFondo : arbolesMedios
  );
}

// Faroles: luces cálidas controladas.
const farolCristal = new THREE.MeshStandardMaterial({
  color: 0xffd7aa,
  emissive: 0xffa85d,
  emissiveIntensity: 1.6
});

for (const [x, z] of [
  [-2.4, 5.6],
  [3.0, 4.0],
  [-9.3, -3.1],
  [9.6, 2.8]
]) {
  cilindro(
    x, 1.12, z,
    0.06, 0.09, 2.24,
    material.metal
  );
  caja(
    x, 2.39, z,
    0.42, 0.48, 0.42,
    farolCristal
  );

  const luz = new THREE.PointLight(0xe9b47c, 11, 5.3, 2);
  luz.position.set(x, 2.39, z);
  escena.add(luz);
}

// Estrellas discretas y luciérnagas.
const totalEstrellas = movil ? 160 : 290;
const posiciones = new Float32Array(totalEstrellas * 3);

for (let i = 0; i < totalEstrellas; i++) {
  const angulo = azar() * Math.PI * 2;
  const radio = 20 + azar() * 28;
  posiciones[i * 3] = Math.cos(angulo) * radio;
  posiciones[i * 3 + 1] = 10 + azar() * 25;
  posiciones[i * 3 + 2] = Math.sin(angulo) * radio;
}

const estrellasGeo = new THREE.BufferGeometry();
estrellasGeo.setAttribute(
  'position',
  new THREE.BufferAttribute(posiciones, 3)
);
escena.add(
  new THREE.Points(
    estrellasGeo,
    new THREE.PointsMaterial({
      color: 0xb8c6c8,
      size: 0.12,
      transparent: true,
      opacity: 0.55,
      depthWrite: false
    })
  )
);

const luciernagas = [];
const luciernagaMat = new THREE.MeshBasicMaterial({
  color: 0xf0d6a5
});

for (let i = 0; i < (movil ? 13 : 25); i++) {
  const x = (azar() - 0.5) * 24;
  const z = (azar() - 0.5) * 24;

  const luciernaga = bola(
    x,
    0.65 + azar() * 2.5,
    z,
    0.045, 0.045, 0.045,
    luciernagaMat,
    escena,
    false
  );

  luciernagas.push({
    objeto: luciernaga,
    altura: luciernaga.position.y,
    fase: azar() * 6.28
  });
}

// Marcadores pequeños; zona invisible amplia para tocar en móvil.
const clickables = [];
const marcadores = [];

for (const dato of PUNTOS) {
  const grupo = new THREE.Group();
  grupo.position.set(...dato.posicion);
  escena.add(grupo);

  const nucleo = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, 12, 10),
    new THREE.MeshBasicMaterial({
      color: dato.color
    })
  );
  grupo.add(nucleo);

  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(0.34, 12, 10),
    new THREE.MeshBasicMaterial({
      color: dato.color,
      transparent: true,
      opacity: 0.12,
      depthWrite: false
    })
  );
  grupo.add(halo);

  const aro = new THREE.Mesh(
    new THREE.TorusGeometry(0.29, 0.012, 5, 28),
    new THREE.MeshBasicMaterial({
      color: dato.color,
      transparent: true,
      opacity: 0.55
    })
  );
  grupo.add(aro);

  const zona = new THREE.Mesh(
    new THREE.SphereGeometry(0.9, 12, 10),
    new THREE.MeshBasicMaterial({
      visible: false
    })
  );
  zona.userData.punto = dato;
  grupo.add(zona);
  clickables.push(zona);

  marcadores.push({
    grupo,
    halo,
    aro,
    altura: dato.posicion[1]
  });

  const luz = new THREE.PointLight(dato.color, 5, 2.8, 2);
  grupo.add(luz);
}

// Interfaz e interacciones.
const inicio = document.getElementById('inicio');
const tarjeta = document.getElementById('tarjeta');
const descubiertos = new Set();
const raycaster = new THREE.Raycaster();
const puntero = new THREE.Vector2();

let avisoTemporizador;
let inicioPointer = null;

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
  document.getElementById('tarjeta-etiqueta').textContent =
    dato.etiqueta;
  document.getElementById('tarjeta-titulo').textContent =
    dato.nombre;
  document.getElementById('tarjeta-texto').textContent =
    dato.texto;
  tarjeta.hidden = false;

  if (!descubiertos.has(dato.id)) {
    descubiertos.add(dato.id);

    const actual = String(descubiertos.size).padStart(2, '0');
    const total = String(PUNTOS.length).padStart(2, '0');
    document.getElementById('progreso').textContent =
      `${actual} / ${total}`;

    if (descubiertos.size === PUNTOS.length) {
      avisar(MENSAJE_FINAL);
    }
  }
}

document.getElementById('empezar').addEventListener(
  'click',
  () => inicio.classList.add('oculto')
);

document.getElementById('reiniciar').addEventListener(
  'click',
  () => {
    tarjeta.hidden = true;
    inicio.classList.remove('oculto');
    camara.position.copy(posicionInicial);
    controles.target.copy(objetivoInicial);
    controles.update();
  }
);

document.getElementById('cerrar').addEventListener(
  'click',
  () => { tarjeta.hidden = true; }
);

document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') tarjeta.hidden = true;
});

render.domElement.addEventListener('pointerdown', (evento) => {
  inicioPointer = {
    x: evento.clientX,
    y: evento.clientY
  };
});

render.domElement.addEventListener('pointerup', (evento) => {
  if (!inicioPointer) return;

  const distancia = Math.hypot(
    evento.clientX - inicioPointer.x,
    evento.clientY - inicioPointer.y
  );
  inicioPointer = null;
  if (distancia > 12) return;

  const rect = render.domElement.getBoundingClientRect();
  puntero.set(
    ((evento.clientX - rect.left) / rect.width) * 2 - 1,
    -((evento.clientY - rect.top) / rect.height) * 2 + 1
  );

  raycaster.setFromCamera(puntero, camara);
  const impactos = raycaster.intersectObjects(
    clickables,
    false
  );

  if (!impactos.length) return;

  const objeto = impactos[0].object;

  if (objeto.userData.tipo === 'pixelart') {
    abrirPixelArt('flor');
    return;
  }

  if (objeto.userData.punto) {
    abrirRecuerdo(objeto.userData.punto);
  }
});

addEventListener('resize', () => {
  camara.aspect = innerWidth / innerHeight;
  camara.updateProjectionMatrix();
  render.setSize(innerWidth, innerHeight);
  render.setPixelRatio(
    Math.min(devicePixelRatio, movil ? 1.3 : 1.8)
  );
});

function animar(ms) {
  const t = ms * 0.001;

  marcadores.forEach(({ grupo, halo, aro, altura }, i) => {
    grupo.position.y =
      altura + Math.sin(t * 1.3 + i) * 0.08;
    halo.scale.setScalar(
      1 + Math.sin(t * 1.8 + i) * 0.17
    );
    aro.rotation.z = t * 0.15;
  });

  luciernagas.forEach(({ objeto, altura, fase }) => {
    objeto.position.y =
      altura + Math.sin(t * 0.9 + fase) * 0.2;
  });

  ondulaciones.forEach((onda, i) => {
    const pulso = 1 + Math.sin(t * 1.1 - i) * 0.035;
    onda.scale.set(pulso, pulso, pulso);
  });

  chorro.scale.y = 1 + Math.sin(t * 1.6) * 0.1;
  controles.update();
  render.render(escena, camara);
}

// Caballete de pintura interactivo.
const caballete = new THREE.Group();
caballete.position.set(-2.9, 0, 1.1);
caballete.rotation.y = 0.30;
escena.add(caballete);

const maderaCaballete = new THREE.MeshStandardMaterial({
  color: 0x8a5634,
  roughness: 0.8
});

const lienzoMaterial = new THREE.MeshStandardMaterial({
  color: 0xe8dfcf,
  roughness: 0.96
});

// Patas delanteras y trasera.
for (const x of [-0.72, 0.72]) {
  const pierna = caja(
    x, 1.05, 0.12,
    0.14, 2.25, 0.14,
    maderaCaballete,
    caballete
  );
  pierna.rotation.z = x < 0 ? 0.22 : -0.22;
}

const pataTrasera = caja(
  0, 1.08, -0.50,
  0.14, 2.3, 0.14,
  maderaCaballete,
  caballete
);
pataTrasera.rotation.x = -0.26;

// Marco exterior.
caja(-0.98, 2.36, 0, 0.12, 1.85, 0.12, maderaCaballete, caballete);
caja(0.98, 2.36, 0, 0.12, 1.85, 0.12, maderaCaballete, caballete);
caja(0, 3.27, 0, 2.1, 0.13, 0.13, maderaCaballete, caballete);
caja(0, 1.45, 0, 2.38, 0.16, 0.20, maderaCaballete, caballete);

// Lienzo.
const lienzo = caja(
  0, 2.34, -0.02,
  1.78, 1.67, 0.055,
  lienzoMaterial,
  caballete
);

// Soporte superior.
const soporte = caja(
  0, 3.75, 0.04,
  0.12, 1.15, 0.12,
  maderaCaballete,
  caballete
);
soporte.rotation.z = -0.05;

// Repisa inferior.
caja(
  0, 1.18, 0.16,
  2.35, 0.14, 0.28,
  maderaCaballete,
  caballete
);

// Paleta decorativa.
const paleta = bola(
  0.72, 1.46, 0.30,
  0.34, 0.045, 0.24,
  new THREE.MeshStandardMaterial({
    color: 0xb87a4b,
    roughness: 0.75
  }),
  caballete
);
paleta.rotation.z = -0.16;

// Pincel decorativo sobre la repisa.
const pincel = new THREE.Group();
pincel.position.set(-0.45, 1.46, 0.31);
pincel.rotation.z = -0.68;
caballete.add(pincel);

cilindro(
  0, 0, 0,
  0.035, 0.035, 0.86,
  new THREE.MeshStandardMaterial({
    color: 0xc28b51,
    roughness: 0.65
  }),
  pincel,
  8
);

const puntaPincel = bola(
  0, 0.48, 0,
  0.07, 0.19, 0.07,
  new THREE.MeshStandardMaterial({
    color: 0x493226,
    roughness: 0.94
  }),
  pincel
);
puntaPincel.rotation.z = -0.18;

// Zona invisible para interactuar.
const zonaCaballete = new THREE.Mesh(
  new THREE.BoxGeometry(2.45, 4.2, 0.85),
  new THREE.MeshBasicMaterial({ visible: false })
);
zonaCaballete.position.set(0, 2.08, 0);
zonaCaballete.userData.tipo = 'pixelart';
caballete.add(zonaCaballete);

clickables.push(zonaCaballete);

render.setAnimationLoop(animar);