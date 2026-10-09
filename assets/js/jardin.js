import * as THREE from 'three';
import { PUNTOS } from './config.js';
import { escena, CALIDAD, movil } from './motor.js';
import { materiales, cajaGeo, piedraGeo, arbolCopaGeo, azar, caja, bola, cilindro } from './materiales.js';

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

export const chorro = bola(
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

for (let i = 0; i < 8; i++) {
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
for (let i = 0; i < 10; i++) {
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
// DECORACIÓN AMBIENTAL OPTIMIZADA
// ======================================================

// Todas estas decoraciones usan InstancedMesh. Cada grupo
// reutiliza una geometría y un material, por lo que no crea
// cientos de draw calls ni cientos de objetos independientes.

const decoracionDummy = new THREE.Object3D();

function posicionDecorativa() {
  let x;
  let z;

  do {
    const angulo = azar() * Math.PI * 2;
    const radio = 4.5 + azar() * 15;

    x = Math.cos(angulo) * radio;
    z = Math.sin(angulo) * radio;
  } while (
    // Evita invadir la fuente.
    Math.hypot(x, z + 2.5) < 3.2 ||

    // Evita el camino central.
    (
      Math.abs(x) < 2.1 &&
      z > -6 &&
      z < 12
    ) ||

    // Evita que cubra el banco.
    Math.hypot(x - 4.6, z - 0.4) < 2.4 ||

    // Evita el rosal y el caballete.
    Math.hypot(x + 5.2, z + 1.9) < 1.9 ||
    Math.hypot(x + 2.9, z - 1.1) < 1.8
  );

  return { x, z };
}


// ------------------------------------------------------
// HIERBA ALTA
// ------------------------------------------------------

const pastoGeo = new THREE.PlaneGeometry(
  0.32,
  0.68
);

const pastoDecorativo = new THREE.InstancedMesh(
  pastoGeo,
  materiales.pastoAlto,
  CALIDAD.pastoDecorativo
);

for (let i = 0; i < CALIDAD.pastoDecorativo; i++) {
  const { x, z } = posicionDecorativa();
  const escala = 0.55 + azar() * 1.15;

  decoracionDummy.position.set(
    x,
    0.19 + escala * 0.2,
    z
  );

  decoracionDummy.rotation.set(
    0,
    azar() * Math.PI,
    (azar() - 0.5) * 0.18
  );

  decoracionDummy.scale.set(
    escala * 0.8,
    escala,
    1
  );

  decoracionDummy.updateMatrix();

  pastoDecorativo.setMatrixAt(
    i,
    decoracionDummy.matrix
  );
}

pastoDecorativo.instanceMatrix.needsUpdate = true;
pastoDecorativo.computeBoundingSphere();
escena.add(pastoDecorativo);


// ------------------------------------------------------
// ARBUSTOS
// ------------------------------------------------------

const arbustoGeo = new THREE.SphereGeometry(
  1,
  6,
  5
);

const arbustosOscuros = new THREE.InstancedMesh(
  arbustoGeo,
  materiales.arbusto,
  CALIDAD.arbustos
);

const arbustosClaros = new THREE.InstancedMesh(
  arbustoGeo,
  materiales.arbustoClaro,
  CALIDAD.arbustos
);

let totalArbustosOscuros = 0;
let totalArbustosClaros = 0;

for (let i = 0; i < CALIDAD.arbustos; i++) {
  const { x, z } = posicionDecorativa();

  const escalaX = 0.45 + azar() * 0.55;
  const escalaY = 0.32 + azar() * 0.42;
  const escalaZ = 0.45 + azar() * 0.55;

  decoracionDummy.position.set(
    x,
    escalaY,
    z
  );

  decoracionDummy.rotation.set(
    0,
    azar() * Math.PI,
    0
  );

  decoracionDummy.scale.set(
    escalaX,
    escalaY,
    escalaZ
  );

  decoracionDummy.updateMatrix();

  if (i % 3 === 0) {
    arbustosClaros.setMatrixAt(
      totalArbustosClaros++,
      decoracionDummy.matrix
    );
  } else {
    arbustosOscuros.setMatrixAt(
      totalArbustosOscuros++,
      decoracionDummy.matrix
    );
  }
}

arbustosOscuros.count = totalArbustosOscuros;
arbustosClaros.count = totalArbustosClaros;

arbustosOscuros.instanceMatrix.needsUpdate = true;
arbustosClaros.instanceMatrix.needsUpdate = true;

arbustosOscuros.computeBoundingSphere();
arbustosClaros.computeBoundingSphere();

escena.add(arbustosOscuros, arbustosClaros);


// ------------------------------------------------------
// PIEDRAS DECORATIVAS
// ------------------------------------------------------

const piedraDecorativaGeo = new THREE.DodecahedronGeometry(
  1,
  0
);

const piedrasDecorativasClaras = new THREE.InstancedMesh(
  piedraDecorativaGeo,
  materiales.piedra,
  CALIDAD.piedrasDecorativas
);

const piedrasDecorativasOscuras = new THREE.InstancedMesh(
  piedraDecorativaGeo,
  materiales.piedraOscura,
  CALIDAD.piedrasDecorativas
);

let totalPiedrasClaras = 0;
let totalPiedrasOscuras = 0;

for (let i = 0; i < CALIDAD.piedrasDecorativas; i++) {
  const { x, z } = posicionDecorativa();
  const escala = 0.12 + azar() * 0.28;

  decoracionDummy.position.set(
    x,
    escala * 0.45,
    z
  );

  decoracionDummy.rotation.set(
    azar() * Math.PI,
    azar() * Math.PI,
    azar() * Math.PI
  );

  decoracionDummy.scale.set(
    escala * (0.7 + azar() * 0.5),
    escala * 0.6,
    escala * (0.7 + azar() * 0.5)
  );

  decoracionDummy.updateMatrix();

  if (i % 4 === 0) {
    piedrasDecorativasOscuras.setMatrixAt(
      totalPiedrasOscuras++,
      decoracionDummy.matrix
    );
  } else {
    piedrasDecorativasClaras.setMatrixAt(
      totalPiedrasClaras++,
      decoracionDummy.matrix
    );
  }
}

piedrasDecorativasClaras.count = totalPiedrasClaras;
piedrasDecorativasOscuras.count = totalPiedrasOscuras;

piedrasDecorativasClaras.instanceMatrix.needsUpdate = true;
piedrasDecorativasOscuras.instanceMatrix.needsUpdate = true;

piedrasDecorativasClaras.computeBoundingSphere();
piedrasDecorativasOscuras.computeBoundingSphere();

escena.add(
  piedrasDecorativasClaras,
  piedrasDecorativasOscuras
);


// ------------------------------------------------------
// FLORES SILVESTRES
// ------------------------------------------------------

const florSilvestreGeo = new THREE.SphereGeometry(
  1,
  5,
  4
);

const floresRosas = new THREE.InstancedMesh(
  florSilvestreGeo,
  materiales.flores,
  CALIDAD.floresSilvestres
);

const floresDurazno = new THREE.InstancedMesh(
  florSilvestreGeo,
  materiales.floresClaras,
  CALIDAD.floresSilvestres
);

const floresVioletas = new THREE.InstancedMesh(
  florSilvestreGeo,
  materiales.floresMoradas,
  CALIDAD.floresSilvestres
);

let totalRosas = 0;
let totalDurazno = 0;
let totalVioletas = 0;

for (let i = 0; i < CALIDAD.floresSilvestres; i++) {
  const { x, z } = posicionDecorativa();
  const escala = 0.05 + azar() * 0.1;

  decoracionDummy.position.set(
    x,
    0.21,
    z
  );

  decoracionDummy.rotation.set(
    0,
    azar() * Math.PI,
    0
  );

  decoracionDummy.scale.set(
    escala,
    escala * 0.8,
    escala
  );

  decoracionDummy.updateMatrix();

  const tipo = i % 5;

  if (tipo === 0) {
    floresVioletas.setMatrixAt(
      totalVioletas++,
      decoracionDummy.matrix
    );
  } else if (tipo === 1) {
    floresDurazno.setMatrixAt(
      totalDurazno++,
      decoracionDummy.matrix
    );
  } else {
    floresRosas.setMatrixAt(
      totalRosas++,
      decoracionDummy.matrix
    );
  }
}

floresRosas.count = totalRosas;
floresDurazno.count = totalDurazno;
floresVioletas.count = totalVioletas;

floresRosas.instanceMatrix.needsUpdate = true;
floresDurazno.instanceMatrix.needsUpdate = true;
floresVioletas.instanceMatrix.needsUpdate = true;

floresRosas.computeBoundingSphere();
floresDurazno.computeBoundingSphere();
floresVioletas.computeBoundingSphere();

escena.add(
  floresRosas,
  floresDurazno,
  floresVioletas
);

// ======================================================
// MARCADORES INTERACTIVOS
// ======================================================

export const clickables = [];
export const marcadores = [];

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
  -3.9,
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

export const zonaCaballete = new THREE.Mesh(
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
// Sombrero escondido tras el rosal, más alejado que el caballete.
// Se deja un marcador discreto cerca del camino para encontrarlo.
const sombreroMago = new THREE.Group();
sombreroMago.position.set(9.1, 0, -9.1);
sombreroMago.rotation.y = 0.35;
escena.add(sombreroMago);
const telaSombrero = new THREE.MeshLambertMaterial({ color: 0x312448, side: THREE.DoubleSide });
const oroSombrero = new THREE.MeshBasicMaterial({ color: 0xffd77e });
const alaSombrero = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.12, 12), telaSombrero);
alaSombrero.position.y = 0.34;
sombreroMago.add(alaSombrero);
const copaSombrero = new THREE.Mesh(new THREE.ConeGeometry(0.75, 2.15, 12), telaSombrero);
copaSombrero.position.y = 1.43;
copaSombrero.rotation.z = -0.12;
sombreroMago.add(copaSombrero);
const cinta = new THREE.Mesh(new THREE.CylinderGeometry(0.73, 0.81, 0.17, 12), oroSombrero);
cinta.position.y = 0.68;
sombreroMago.add(cinta);
const varita = new THREE.Group();
varita.position.set(1.16, 0.67, 0.16);
varita.rotation.z = -0.68;
sombreroMago.add(varita);
const mango = new THREE.Mesh(new THREE.CylinderGeometry(0.047, 0.07, 1.65, 8), materiales.maderaClara);
mango.position.y = 0.72;
varita.add(mango);
const punta = new THREE.Mesh(new THREE.OctahedronGeometry(0.19, 0), oroSombrero);
punta.position.y = 1.6;
varita.add(punta);
export const zonaSombreroMago = new THREE.Mesh(
  new THREE.CylinderGeometry(1.6, 1.6, 3.2, 12), materiales.zonaInvisible
);
zonaSombreroMago.position.set(0.35, 1.55, 0);
sombreroMago.add(zonaSombreroMago);

