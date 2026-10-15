import * as THREE from 'three';

// ======================================================
// DOS GATOS SENTADOS EN EL BANCO
// ======================================================

const blanco = new THREE.MeshStandardMaterial({
  color: 0xf4f1e9,
  roughness: 0.95
});

const negro = new THREE.MeshStandardMaterial({
  color: 0x202026,
  roughness: 0.95
});

const rosa = new THREE.MeshStandardMaterial({
  color: 0xe8a4ae,
  roughness: 0.9
});

const ojos = new THREE.MeshStandardMaterial({
  color: 0xa4bc78,
  roughness: 0.5
});

const pupilas = new THREE.MeshBasicMaterial({
  color: 0x101015
});

const brillo = new THREE.MeshBasicMaterial({
  color: 0xffffff
});

const bigotes = new THREE.LineBasicMaterial({
  color: 0x8c8581
});

// Geometrías compartidas por ambos gatos.
const esfera = new THREE.SphereGeometry(1, 14, 10);
const orejaGeo = new THREE.ConeGeometry(1, 1, 3);

function agregarBola(
  grupo,
  material,
  posicion,
  escala
) {
  const pieza = new THREE.Mesh(esfera, material);

  pieza.position.set(...posicion);
  pieza.scale.set(...escala);

  grupo.add(pieza);

  return pieza;
}

function agregarOreja(grupo, lado) {
  const oreja = new THREE.Mesh(orejaGeo, negro);

  oreja.position.set(
    lado * 0.16,
    0.99,
    0.035
  );

  oreja.scale.set(0.14, 0.25, 0.12);
  oreja.rotation.y = Math.PI;
  oreja.rotation.z = -lado * 0.16;

  grupo.add(oreja);

  const interior = new THREE.Mesh(orejaGeo, rosa);

  interior.position.set(
    lado * 0.16,
    0.985,
    0.105
  );

  interior.scale.set(0.075, 0.15, 0.025);
  interior.rotation.y = Math.PI;
  interior.rotation.z = -lado * 0.16;

  grupo.add(interior);
}

function agregarBigotes(grupo) {
  for (const lado of [-1, 1]) {
    for (let i = -1; i <= 1; i++) {
      const puntos = [
        new THREE.Vector3(
          lado * 0.065,
          0.745,
          0.295
        ),
        new THREE.Vector3(
          lado * 0.32,
          0.745 + i * 0.045,
          0.31
        )
      ];

      const linea = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(puntos),
        bigotes
      );

      grupo.add(linea);
    }
  }
}

function agregarCola(grupo, material, lado) {
  const curva = new THREE.CatmullRomCurve3([
    new THREE.Vector3(lado * 0.14, 0.17, -0.13),
    new THREE.Vector3(lado * 0.31, 0.13, -0.18),
    new THREE.Vector3(lado * 0.4, 0.1, 0.02),
    new THREE.Vector3(lado * 0.35, 0.09, 0.23),
    new THREE.Vector3(lado * 0.18, 0.09, 0.28)
  ]);

  const cola = new THREE.Mesh(
    new THREE.TubeGeometry(
      curva,
      24,
      0.055,
      7,
      false
    ),
    material
  );

  grupo.add(cola);
}

function crearGato({ conManchas = false, ladoCola = -1 } = {}) {
  const gato = new THREE.Group();

  // Cuerpo sentado.
  agregarBola(
    gato,
    blanco,
    [0, 0.36, -0.035],
    [0.24, 0.35, 0.23]
  );

  // Pecho.
  agregarBola(
    gato,
    blanco,
    [0, 0.48, 0.12],
    [0.18, 0.24, 0.15]
  );

  // Patas delanteras.
  for (const lado of [-1, 1]) {
    agregarBola(
      gato,
      blanco,
      [lado * 0.1, 0.24, 0.17],
      [0.07, 0.2, 0.075]
    );

    agregarBola(
      gato,
      blanco,
      [lado * 0.1, 0.065, 0.22],
      [0.085, 0.065, 0.105]
    );
  }

  // Cabeza.
  agregarBola(
    gato,
    blanco,
    [0, 0.79, 0.075],
    [0.255, 0.235, 0.23]
  );

  agregarOreja(gato, -1);
  agregarOreja(gato, 1);

  if (conManchas) {
    // Mancha alrededor de un ojo.
    agregarBola(
      gato,
      negro,
      [-0.115, 0.825, 0.242],
      [0.11, 0.12, 0.045]
    );

    // Manchas en los dos costados.
    for (const lado of [-1, 1]) {
      agregarBola(
        gato,
        negro,
        [lado * 0.205, 0.4, -0.045],
        [0.055, 0.17, 0.15]
      );
    }

    // Mancha sobre el lomo.
    agregarBola(
      gato,
      negro,
      [0.045, 0.46, -0.23],
      [0.15, 0.16, 0.04]
    );
  }

  // Ojos.
  for (const lado of [-1, 1]) {
    agregarBola(
      gato,
      ojos,
      [lado * 0.105, 0.825, 0.282],
      [0.052, 0.057, 0.025]
    );

    agregarBola(
      gato,
      pupilas,
      [lado * 0.105, 0.825, 0.303],
      [0.013, 0.041, 0.008]
    );

    agregarBola(
      gato,
      brillo,
      [lado * 0.105 - 0.012, 0.845, 0.311],
      [0.009, 0.011, 0.005]
    );
  }

  // Hocico blanco.
  for (const lado of [-1, 1]) {
    agregarBola(
      gato,
      blanco,
      [lado * 0.055, 0.745, 0.276],
      [0.07, 0.055, 0.035]
    );
  }

  // Nariz rosada.
  const nariz = new THREE.Mesh(
    new THREE.ConeGeometry(0.027, 0.035, 3),
    rosa
  );

  nariz.position.set(0, 0.765, 0.315);
  nariz.rotation.z = Math.PI;
  gato.add(nariz);

  agregarBigotes(gato);

  agregarCola(
    gato,
    conManchas ? negro : blanco,
    ladoCola
  );

  return gato;
}

export function agregarGatosAlBanco(banco) {
  // Evita duplicarlos si se llama de nuevo.
  const existentes = banco.getObjectByName('gatos-del-banco');

  if (existentes) {
    return existentes;
  }

  const grupo = new THREE.Group();
  grupo.name = 'gatos-del-banco';

  // El asiento del banco está a unos 0.9 de altura.
  grupo.position.set(0, 0.91, 0.015);

  const gatoBlanco = crearGato({
    conManchas: false,
    ladoCola: -1
  });

  gatoBlanco.name = 'Gato blanco con orejas negras';
  gatoBlanco.position.x = -0.4;
  gatoBlanco.rotation.y = 0.14;
  gatoBlanco.rotation.z = -0.045;

  const gataManchada = crearGato({
    conManchas: true,
    ladoCola: 1
  });

  gataManchada.name = 'Gata blanca con manchas negras';
  gataManchada.position.x = 0.4;
  gataManchada.rotation.y = -0.14;
  gataManchada.rotation.z = 0.045;

  grupo.add(gatoBlanco, gataManchada);
  banco.add(grupo);

  return grupo;
}