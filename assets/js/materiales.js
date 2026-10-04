import * as THREE from 'three';
import { escena } from './motor.js';

// ======================================================
// MATERIALES Y GEOMETRÍAS REUTILIZADAS
// ======================================================
const cargadorTexturas = new THREE.TextureLoader();

function cargarTextura(nombre, repeticionesX = 1, repeticionesY = 1) {
  const ruta = new URL(`./texturas/${nombre}`, import.meta.url).href;

  const textura = cargadorTexturas.load(
    ruta,
    undefined,
    undefined,
    (error) => console.error(`Error cargando ${nombre}`, error)
  );

  textura.colorSpace = THREE.SRGBColorSpace;
  textura.wrapS = THREE.RepeatWrapping;
  textura.wrapT = THREE.RepeatWrapping;
  textura.repeat.set(repeticionesX, repeticionesY);

  return textura;
}

const texturas = {
  hierba: cargarTextura('hierba.jpg', 30, 30),
  camino: cargarTextura('camino.jpg', 2, 12),
  piedra: cargarTextura('piedra.jpg', 2, 2),
  madera: cargarTextura('madera.jpg', 2, 2),
  hojas: cargarTextura('hojas.jpg', 1, 1),
  agua: cargarTextura('agua.jpg', 2, 2),
  pastoAlto: cargarTextura('pasto.png', 2, 2)
};


export const materiales = {
  suelo: new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: texturas.hierba
  }),

  grava: new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: texturas.camino
  }),

  piedra: new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: texturas.piedra
  }),

  piedraOscura: new THREE.MeshLambertMaterial({
    color: 0x858585,
    map: texturas.piedra
  }),

  madera: new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: texturas.madera
  }),

  maderaClara: new THREE.MeshLambertMaterial({
    color: 0xd8b892,
    map: texturas.madera
  }),

  hojas: new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: texturas.hojas
  }),

  hojasOscuras: new THREE.MeshLambertMaterial({
    color: 0x8ca38d,
    map: texturas.hojas
  }),

  flores: new THREE.MeshLambertMaterial({
    color: 0xbf7385
  }),

  floresClaras: new THREE.MeshLambertMaterial({
    color: 0xf0c6a3
  }),

  floresMoradas: new THREE.MeshLambertMaterial({
    color: 0xa783c9
  }),

  pastoAlto: new THREE.MeshLambertMaterial({
    color: 0x4d7a43,
    map: texturas.pastoAlto
  }),

  arbusto: new THREE.MeshLambertMaterial({
    color: 0x2c5939,
    map: texturas.hojas
  }),

  arbustoClaro: new THREE.MeshLambertMaterial({
    color: 0x4f7b45,
    map: texturas.hojas
  }),

  hongoTallo: new THREE.MeshLambertMaterial({
    color: 0xd8c6ac
  }),

  hongoRojo: new THREE.MeshLambertMaterial({
    color: 0xb94c47
  }),

  agua: new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: texturas.agua,
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

export const cajaGeo = new THREE.BoxGeometry(1, 1, 1);
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

export const piedraGeo = new THREE.CylinderGeometry(
  1,
  1,
  0.12,
  6
);

export const arbolCopaGeo = new THREE.SphereGeometry(
  1,
  7,
  5
);

let semilla = 17391;

export function azar() {
  semilla = (
    Math.imul(1664525, semilla) +
    1013904223
  ) >>> 0;

  return semilla / 4294967296;
}

export function caja(
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

export function bola(
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

export function cilindro(
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