import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ======================================================
// CONFIGURACIÓN DE RENDIMIENTO
// ======================================================

const movil = matchMedia('(max-width: 700px)').matches;
const movimientoReducido = matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const CALIDAD = {
  pixelRatio: 1.75,
  fps: 60,
  piedras: 18,
  flores: 85,
  arbolesFondo: 8,
  mariposas: 18,
  luciernagas: 48,
  pastoDecorativo: 150,
  arbustos: 38,
  piedrasDecorativas: 46,
  setas: 30,
  floresSilvestres: 120
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
  antialias: true,
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
const hemisferica = new THREE.HemisphereLight(0xa9c3c5, 0x183225, 1.75);
escena.add(hemisferica);

const luna = new THREE.DirectionalLight(
  0xc5d5df,
  2
);

luna.position.set(-10, 15, -8);
escena.add(luna);

export { movil, movimientoReducido, CALIDAD, escena, camara, posicionInicial, objetivoInicial, render, controles, hemisferica, luna, ajustarResolucion };