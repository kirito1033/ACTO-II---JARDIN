import * as THREE from 'three';
import { escena, movimientoReducido } from './motor.js';
import { PUNTOS } from './config.js';
import { clickables } from './jardin.js';

// Recorrido ovalado alrededor del centro del jardín.
const RADIO_X = 11.5;
const RADIO_Z = 8.5;
const CENTRO_Z = -1;
const VELOCIDAD_RECORRIDO = 0.055;
const VELOCIDAD_BAILE = 0.65;
const dato = PUNTOS.find(p => p.id === 'pareja');
if (!dato) throw new Error('Falta el punto pareja en config.js');

const raiz = new THREE.Group();
raiz.name = 'Pareja con el último recuerdo';
raiz.scale.setScalar(1.25);
escena.add(raiz);
const baile = new THREE.Group();
raiz.add(baile);
const piel = new THREE.MeshStandardMaterial({color:0xe3b48f,roughness:.85});
const traje = new THREE.MeshStandardMaterial({color:0x263544,roughness:.8});
const vestido = new THREE.MeshStandardMaterial({color:0xd7849c,roughness:.75});
const cabello = new THREE.MeshStandardMaterial({color:0x35251f,roughness:1});
const zapatos = new THREE.MeshStandardMaterial({color:0x211c21,roughness:.9});
const blanco = new THREE.MeshStandardMaterial({color:0xf3e6d2,roughness:.8});
const luz = new THREE.MeshBasicMaterial({color:dato.color,toneMapped:false});
const esfera = new THREE.SphereGeometry(1,12,8);
function bola(grupo, material, posicion, escala) {
  const m=new THREE.Mesh(esfera,material);
  m.position.set(...posicion);m.scale.set(...escala);grupo.add(m);return m;
}
function cilindro(grupo, material, arriba, abajo, alto, posicion) {
  const m=new THREE.Mesh(new THREE.CylinderGeometry(arriba,abajo,alto,12),material);
  m.position.set(...posicion);grupo.add(m);return m;
}
function crearPersona(x, giro, conVestido) {
  const persona=new THREE.Group();persona.position.x=x;persona.rotation.y=giro;
  baile.add(persona);
  const cuerpo=new THREE.Group();persona.add(cuerpo);
  cilindro(cuerpo,conVestido?vestido:traje,.23,.26,.62,[0,1.27,0]);
  if (conVestido) cilindro(cuerpo,vestido,.22,.53,.64,[0,.77,0]);
  else bola(cuerpo,blanco,[0,1.44,.21],[.11,.18,.03]);
  cilindro(cuerpo,piel,.09,.1,.16,[0,1.66,0]);
  bola(cuerpo,piel,[0,1.93,0],[.23,.28,.23]);
  bola(cuerpo,cabello,[0,2.09,-.035],[.24,.17,.235]);
  if(conVestido) bola(cuerpo,cabello,[0,1.98,-.22],[.16,.16,.13]);
  for(const lado of [-1,1]) bola(cuerpo,zapatos,[lado*.075,1.94,.218],[.023,.025,.015]);
  const piernas=[];
  for(const lado of [-1,1]) {
    const pierna=new THREE.Group();pierna.position.set(lado*.14,.91,0);persona.add(pierna);
    cilindro(pierna,conVestido?piel:traje,.075,.065,.72,[0,-.36,0]);
    bola(pierna,zapatos,[0,-.78,.09],[.105,.09,.19]);piernas.push(pierna);
  }
  return {persona,cuerpo,piernas};
}
const a=crearPersona(-.48,Math.PI/2,false);
const b=crearPersona(.48,-Math.PI/2,true);
function brazo(desde,hasta,material) {
  const inicio=new THREE.Vector3(...desde),fin=new THREE.Vector3(...hasta);
  const direccion=fin.clone().sub(inicio);
  const m=new THREE.Mesh(new THREE.CylinderGeometry(.065,.075,direccion.length(),8),material);
  m.position.copy(inicio).add(fin).multiplyScalar(.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),direccion.normalize());
  baile.add(m);
}
// Brazos enlazados en una pose de baile.
for(const lado of [-1,1]) {
  const mano=[0,lado===1?1.52:1.24,lado*.35];
  brazo([-.48,1.5,lado*.24],[-.24,1.31,lado*.41],traje);
  brazo([-.24,1.31,lado*.41],mano,piel);
  brazo([.48,1.5,lado*.24],[.24,1.31,lado*.41],vestido);
  brazo([.24,1.31,lado*.41],mano,piel);
  bola(baile,piel,mano,[.1,.08,.08]);
}

// Corazón visible: acompaña a la pareja durante todo el recorrido.
const forma=new THREE.Shape();
forma.moveTo(0,.12);
forma.bezierCurveTo(-.35,.45,-.55,.08,0,-.3);
forma.bezierCurveTo(.55,.08,.35,.45,0,.12);
const corazon=new THREE.Mesh(new THREE.ExtrudeGeometry(forma,{
  depth:.07,bevelEnabled:false,curveSegments:10
}),luz);
corazon.position.set(0,2.8,0);raiz.add(corazon);

// Zona fácil de tocar; utiliza el mismo sistema de recuerdos existente.
const zona=new THREE.Mesh(new THREE.SphereGeometry(1,12,8),
  new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));
zona.position.y=1.45;zona.scale.set(1.25,1.65,1.1);
zona.userData.punto=dato;raiz.add(zona);clickables.push(zona);
let tiempo=0;
function colocar() {
  const angulo=tiempo*VELOCIDAD_RECORRIDO;
  raiz.position.set(Math.cos(angulo)*RADIO_X,0,CENTRO_Z+Math.sin(angulo)*RADIO_Z);
  raiz.rotation.y=-angulo;
  baile.rotation.y=tiempo*VELOCIDAD_BAILE;
  baile.rotation.z=Math.sin(tiempo*1.8)*.035;
  for(const [indice,p] of [a,b].entries()) {
    p.piernas.forEach((pierna,j)=>{
      pierna.rotation.x=Math.sin(tiempo*2.3+indice*Math.PI+j*Math.PI)*.14;
    });
  }
  corazon.position.y=2.8+Math.sin(tiempo*1.7)*.09;
  corazon.rotation.y=tiempo*.7;
}
colocar();
export function actualizarPareja(deltaSegundos) {
  if(movimientoReducido) return;
  tiempo+=deltaSegundos;
  colocar();
}