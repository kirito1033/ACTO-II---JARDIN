import * as THREE from 'three';
import { escena, CALIDAD, movimientoReducido, hemisferica, luna } from './motor.js';
import { materiales, azar } from './materiales.js';

const DURACION_CICLO = 240000;
const inicioCiclo = performance.now();
const cieloDia = new THREE.Color(0x89bfd0);
const cieloOcaso = new THREE.Color(0xd28d70);
const cieloNoche = new THREE.Color(0x192e42);
const cieloEclipse = new THREE.Color(0x251b36);
const fondoActual = new THREE.Color();
const colorPrincipalDia = new THREE.Color(0xffddb3);
const colorPrincipalNoche = new THREE.Color(0xb1cee7);
const colorPrincipalEclipse = new THREE.Color(0x9d82b9);
const colorCieloDia = new THREE.Color(0xcfe8ee);
const colorCieloNoche = new THREE.Color(0x8da9be);
const colorSueloDia = new THREE.Color(0x49613f);
const colorSueloNoche = new THREE.Color(0x3f5549);
const verdeDia = new THREE.Color(0x496e43);
const verdeNoche = new THREE.Color(0x365544);
const hojasDia = new THREE.Color(0x436d45);
const hojasNoche = new THREE.Color(0x355744);
const hojasSombraDia = new THREE.Color(0x2a5735);
const hojasSombraNoche = new THREE.Color(0x294536);
const aguaDia = new THREE.Color(0x4c9eae);
const aguaNoche = new THREE.Color(0x398193);
const farolDia = new THREE.Color(0x7f6645);
const farolNoche = new THREE.Color(0xffd38a);

function suave(valor) {
  const n = THREE.MathUtils.clamp(valor, 0, 1);
  return n * n * (3 - 2 * n);
}

function crearParticulas(cantidad, color, tamano) {
  const posiciones = new Float32Array(cantidad * 3);
  const origenes = [];
  const fases = [];
  for (let i = 0; i < cantidad; i++) {
    const angulo = azar() * Math.PI * 2;
    const radio = 2 + azar() * 11;
    const x = Math.cos(angulo) * radio;
    const y = 0.8 + azar() * 3;
    const z = Math.sin(angulo) * radio - 1;
    origenes.push([x, y, z]);
    fases.push(azar() * Math.PI * 2);
    posiciones.set([x, y, z], i * 3);
  }
  const geometria = new THREE.BufferGeometry();
  geometria.setAttribute('position', new THREE.BufferAttribute(posiciones, 3));
  const material = new THREE.PointsMaterial({
    color, size: tamano, transparent: true, opacity: 0,
    depthWrite: false, sizeAttenuation: true
  });
  const puntos = new THREE.Points(geometria, material);
  puntos.frustumCulled = false;
  escena.add(puntos);
  return { puntos, material, origenes, fases };
}

const mariposas = crearParticulas(CALIDAD.mariposas, 0xffd9a0, 0.16);
const luciernagas = crearParticulas(CALIDAD.luciernagas, 0xffe57a, 0.12);

function moverParticulas(datos, t, intensidad, velocidad) {
  datos.puntos.visible = intensidad > 0.015;
  if (!datos.puntos.visible || movimientoReducido) return;
  const atributo = datos.puntos.geometry.attributes.position;
  for (let i = 0; i < datos.origenes.length; i++) {
    const [x, y, z] = datos.origenes[i];
    const fase = datos.fases[i];
    atributo.setXYZ(i,
      x + Math.sin(t * velocidad + fase) * 0.7,
      y + Math.sin(t * velocidad * 2 + fase) * 0.35,
      z + Math.cos(t * velocidad * 0.8 + fase) * 0.6
    );
  }
  atributo.needsUpdate = true;
}

const radioOrbita = 34;
const alturaHorizonte = -1.2;
const fondoAstros = -32;
const geometriaSol = new THREE.SphereGeometry(1.75, 12, 8);
const geometriaLuna = new THREE.SphereGeometry(1.35, 12, 8);
const sol = new THREE.Mesh(geometriaSol,
  new THREE.MeshBasicMaterial({ color: 0xffde91, fog: false }));
const lunaVisible = new THREE.Mesh(geometriaLuna,
  new THREE.MeshBasicMaterial({ color: 0xe6efff, fog: false }));
sol.renderOrder = 1;
lunaVisible.renderOrder = 1;
escena.add(sol, lunaVisible);

export function actualizarAmbiente(ms) {
  const fase = ((ms - inicioCiclo) % DURACION_CICLO) / DURACION_CICLO;
  const angulo = fase * Math.PI * 2;
  const alturaSol = Math.sin(angulo);
  const dia = suave((alturaSol + 0.08) / 0.32);
  const noche = 1 - dia;
  const eclipse = suave((fase - 0.43) / 0.04) *
    (1 - suave((fase - 0.54) / 0.04));
  const ocaso = Math.max(0, 1 - Math.abs(alturaSol) * 3) * (fase < 0.58 ? 1 : 0.35);
  sol.position.set(-radioOrbita * Math.cos(angulo),
    alturaHorizonte + radioOrbita * alturaSol, fondoAstros);
  lunaVisible.position.set(radioOrbita * Math.cos(angulo),
    alturaHorizonte - radioOrbita * alturaSol, fondoAstros);
  sol.visible = sol.position.y > 0.2;
  lunaVisible.visible = lunaVisible.position.y > 0.2;
  fondoActual.copy(cieloNoche).lerp(cieloDia, dia)
    .lerp(cieloOcaso, ocaso * 0.5).lerp(cieloEclipse, eclipse);
  escena.background.copy(fondoActual);
  escena.fog.color.copy(fondoActual).lerp(cieloNoche, 0.12);
  escena.fog.density = 0.022 + noche * 0.004 + eclipse * 0.008;
  hemisferica.color.copy(colorCieloNoche).lerp(colorCieloDia, dia)
    .lerp(colorPrincipalEclipse, eclipse);
  hemisferica.groundColor.copy(colorSueloNoche).lerp(colorSueloDia, dia);
  hemisferica.intensity = 1.45 + dia * 0.7 - eclipse * 0.45;
  luna.color.copy(colorPrincipalNoche).lerp(colorPrincipalDia, dia)
    .lerp(colorPrincipalEclipse, eclipse);
  luna.intensity = 1.35 + dia * 1.1 - eclipse * 0.5;
  materiales.suelo.color.copy(verdeNoche).lerp(verdeDia, dia)
  .lerp(cieloEclipse, eclipse * 0.35);
  materiales.hojas.color.copy(hojasNoche).lerp(hojasDia, dia);
  materiales.hojasOscuras.color.copy(hojasSombraNoche).lerp(hojasSombraDia, dia);
  materiales.agua.color.copy(aguaNoche).lerp(aguaDia, dia);
  materiales.farol.color.copy(farolDia).lerp(farolNoche, noche);
  const diaVisible = dia * (1 - eclipse);
  const nocheVisible = Math.max(noche, eclipse);
  mariposas.material.opacity = diaVisible * 0.9;
  luciernagas.material.opacity = nocheVisible * 0.68;
  moverParticulas(mariposas, ms * 0.001, diaVisible, 0.7);
  moverParticulas(luciernagas, ms * 0.001, nocheVisible, 0.35);
}