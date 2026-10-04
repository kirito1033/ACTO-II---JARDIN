const PALOS = [
  { nombre: 'Picas', simbolo: '♠', tono: 'negro' },
  { nombre: 'Corazones', simbolo: '♥', tono: 'rojo' },
  { nombre: 'Tréboles', simbolo: '♣', tono: 'negro' },
  { nombre: 'Diamantes', simbolo: '♦', tono: 'rojo' }
];
const VALORES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const MENSAJES = {
  Picas: {
    A: 'Contigo aprendí que hasta el comienzo más pequeño puede cambiarlo todo.',
    2: 'Dos miradas bastan para que un día común se vuelva especial.',
    3: 'Guardo nuestras risas como quien guarda pequeñas estrellas.',
    4: 'Si el camino se complica, quiero caminarlo contigo.',
    5: 'Hay valentía en seguir creyendo en las cosas bonitas.',
    6: 'Me gusta descubrir las historias que escondes en tu manera de mirar.',
    7: 'Cada día contigo trae una sorpresa que vale la pena recordar.',
    8: 'Admiro esa fuerza tuya que aparece incluso cuando no la notas.',
    9: 'Cuando el mundo corre demasiado, tu compañía me devuelve la calma.',
    10: 'Quiero celebrar contigo tanto las victorias grandes como las pequeñas.',
    J: 'Ojalá nunca pierdas esas ganas de explorar lo inesperado.',
    Q: 'Tu confianza en ti misma merece crecer tanto como tus sueños.',
    K: 'No hace falta una corona para reconocer lo extraordinaria que eres.'
  },
  Corazones: {
    A: 'Si pudiera escoger un comienzo otra vez, volvería a encontrarte.',
    2: 'Mi momento favorito siempre mejora cuando puedo compartirlo contigo.',
    3: 'Tus palabras tienen la bonita costumbre de quedarse conmigo.',
    4: 'En los días tranquilos también encuentro motivos para quererte.',
    5: 'Una sonrisa tuya puede iluminar una tarde entera.',
    6: 'Me gusta pensar en todos los recuerdos que todavía podemos crear.',
    7: 'Hay personas que se sienten como hogar; tú eres una de ellas.',
    8: 'Te admiro por cómo cuidas los detalles que otros no ven.',
    9: 'Ojalá pueda regalarte tantas alegrías como las que despiertas en mí.',
    10: 'A tu lado, incluso el silencio tiene algo bonito que decir.',
    J: 'Conserva siempre esa chispa que hace únicos tus días.',
    Q: 'Tu forma de ser vuelve más amable el mundo que te rodea.',
    K: 'Lo más valioso de este jardín es poder compartirlo contigo.'
  },
  Tréboles: {
    A: 'Qué suerte la mía haber coincidido contigo.',
    2: 'A veces la fortuna no es ganar algo, sino encontrar a alguien.',
    3: 'Deseo que tus próximos pasos te acerquen a lo que sueñas.',
    4: 'Hay pequeños milagros escondidos en una conversación contigo.',
    5: 'Nunca subestimes todo lo bueno que puedes construir.',
    6: 'Si hoy necesitas ánimo, recuerda lo lejos que ya has llegado.',
    7: 'Mi amuleto favorito es saber que compartimos este momento.',
    8: 'La buena suerte también se parece a tenerte cerca.',
    9: 'Que nunca te falten motivos para seguir descubriendo el mundo.',
    10: 'Cada recuerdo contigo es una semilla para algo nuevo.',
    J: 'Atrévete a probar: las mejores historias suelen empezar así.',
    Q: 'Tu imaginación puede abrir puertas que todavía no conoces.',
    K: 'Que este trébol te recuerde que mereces cosas maravillosas.'
  },
  Diamantes: {
    A: 'Tu luz no necesita permiso para brillar.',
    2: 'Dos personas pueden convertir un instante sencillo en un tesoro.',
    3: 'Veo belleza en esos detalles tuyos que quizá pasan desapercibidos.',
    4: 'Me gustaría coleccionar tardes contigo, no cosas perfectas.',
    5: 'Tienes una forma única de hacer memorables los días normales.',
    6: 'Que nunca olvides el valor de lo que eres, incluso en días grises.',
    7: 'Hay tesoros que no se guardan en cajas: se recuerdan.',
    8: 'Cada sueño tuyo merece espacio, tiempo y una oportunidad.',
    9: 'Brillas más cuando haces lo que de verdad te emociona.',
    10: 'Si este momento fuera una joya, lo llevaría siempre conmigo.',
    J: 'Tu curiosidad es una chispa que vale la pena cuidar.',
    Q: 'La elegancia más bonita es ser fiel a quien eres.',
    K: 'Que la vida te devuelva toda la luz que compartes.'
  },
  JokerNegro: 'La magia a veces llega disfrazada de sorpresa: confía en lo inesperado.',
  JokerRojo: 'Si esta carta puede ser cualquier cosa, yo elijo que sea una promesa de nuevas aventuras.'
};
const CARTAS = PALOS.flatMap(palo => VALORES.map(valor => ({
  ...palo, valor, mensaje: MENSAJES[palo.nombre][valor]
})));
CARTAS.push(
  { nombre: 'Comodín', simbolo: '★', centro: '🃏', tono: 'negro', valor: 'J', mensaje: MENSAJES.JokerNegro },
  { nombre: 'Comodín', simbolo: '★', centro: '🃏', tono: 'rojo', valor: 'J', mensaje: MENSAJES.JokerRojo }
);

const modal = document.getElementById('cartas-modal');
const panel = modal.querySelector('.cartas-panel');
const baraja = document.getElementById('cartas-baraja');
const pista = document.getElementById('cartas-mensaje');
const fondo = document.createElement('div');
fondo.className = 'cartas-fondo-seleccion';
fondo.hidden = true;
modal.appendChild(fondo);
let activa = null;
let hueco = null;
let arrastre = null;
let focoAnterior = null;
let suprimirClick = false;

function crearCarta(carta) {
  const boton = document.createElement('button');
  boton.type = 'button';
  boton.className = `carta-wrapper ${carta.tono}`;
  boton.setAttribute('aria-label', `Seleccionar ${carta.valor} de ${carta.nombre}`);
  boton.innerHTML = `
    <span class="carta-inner">
      <span class="card-front">
        <span class="card-top"><span class="card-value"></span><span class="card-suit-mini"></span></span>
        <span class="card-center"></span>
        <span class="card-bottom"><span class="card-value"></span><span class="card-suit-mini"></span></span>
      </span>
      <span class="card-back"><span class="card-back-text"></span></span>
    </span>`;
  boton.querySelectorAll('.card-value').forEach(el => { el.textContent = carta.valor; });
  boton.querySelectorAll('.card-suit-mini').forEach(el => { el.textContent = carta.simbolo; });
  boton.querySelector('.card-center').textContent = carta.centro ?? carta.simbolo;
  boton.querySelector('.card-back-text').textContent = carta.mensaje;
  boton.addEventListener('click', () => {
    if (suprimirClick) { suprimirClick = false; return; }
    if (activa !== boton) seleccionar(boton);
  });
  boton.addEventListener('pointerdown', evento => iniciarArrastre(evento, boton));
  return boton;
}

function crearSeccion(titulo, cartas) {
  const seccion = document.createElement('section');
  seccion.className = 'suit-section';
  const encabezado = document.createElement('h3');
  encabezado.className = 'suit-title';
  encabezado.textContent = titulo;
  const grid = document.createElement('div');
  grid.className = 'cards-grid';
  cartas.forEach(carta => grid.appendChild(crearCarta(carta)));
  seccion.append(encabezado, grid);
  return seccion;
}

function crearBaraja() {
  baraja.replaceChildren();
  PALOS.forEach(palo => {
    baraja.appendChild(crearSeccion(`${palo.simbolo} ${palo.nombre}`,
      CARTAS.filter(carta => carta.nombre === palo.nombre)));
  });
  baraja.appendChild(crearSeccion('🃏 Comodines', CARTAS.slice(-2)));
}

function cerrarCarta() {
  if (!activa) return;
  const boton = activa;
  activa = null;
  arrastre = null;
  boton.classList.remove('grande', 'volteada');
  boton.style.removeProperty('--giro');
  hueco.replaceWith(boton);
  hueco = null;
  fondo.hidden = true;
  pista.hidden = true;
  pista.textContent = '';
}

function seleccionar(boton) {
  cerrarCarta();
  hueco = document.createElement('span');
  hueco.className = 'carta-hueco';
  boton.replaceWith(hueco);
  modal.appendChild(boton);
  activa = boton;
  boton.classList.add('grande');
  fondo.hidden = false;
  pista.textContent = 'Arrastra hacia un lado para leer el mensaje. Haz clic fuera para volver a la baraja.';
  pista.hidden = false;
  boton.focus();
}

function iniciarArrastre(evento, boton) {
  if (boton !== activa || evento.button > 0) return;
  arrastre = { id: evento.pointerId, inicio: evento.clientX, base: boton.classList.contains('volteada') ? 180 : 0, movio: false };
  boton.setPointerCapture(evento.pointerId);
}

function moverArrastre(evento) {
  if (!activa || !arrastre || arrastre.id !== evento.pointerId) return;
  const delta = evento.clientX - arrastre.inicio;
  if (Math.abs(delta) > 6) arrastre.movio = true;
  if (arrastre.movio) activa.style.setProperty('--giro', `${arrastre.base + delta * 0.75}deg`);
}

function finalizarArrastre(evento) {
  if (!activa || !arrastre || arrastre.id !== evento.pointerId) return;
  const delta = evento.clientX - arrastre.inicio;
  const movio = arrastre.movio;
  activa.style.removeProperty('--giro');
  arrastre = null;
  if (evento.type === 'pointerup' && movio) {
    if (Math.abs(delta) > 55) activa.classList.toggle('volteada');
    suprimirClick = true;
    setTimeout(() => { suprimirClick = false; }, 0);
  }
}

function reiniciar() {
  cerrarCarta();
  suprimirClick = false;
  pista.textContent = '';
  pista.hidden = true;
  crearBaraja();
}

export function abrirCartas() {
  focoAnterior = document.activeElement;
  reiniciar();
  modal.hidden = false;
  document.getElementById('cartas-cerrar').focus();
}

export function cerrarCartas() {
  cerrarCarta();
  modal.hidden = true;
  focoAnterior?.focus?.();
}

export function iniciarCartas() {
  document.getElementById('cartas-cerrar').addEventListener('click', cerrarCartas);
  document.getElementById('cartas-reiniciar').addEventListener('click', reiniciar);
  fondo.addEventListener('click', cerrarCarta);
  modal.addEventListener('pointermove', moverArrastre);
  modal.addEventListener('pointerup', finalizarArrastre);
  modal.addEventListener('pointercancel', finalizarArrastre);
  document.addEventListener('keydown', evento => {
    if (modal.hidden) return;
    if (evento.key === 'Escape') {
      if (activa) cerrarCarta(); else cerrarCartas();
    } else if (activa && (evento.key === 'Enter' || evento.key === ' ') && document.activeElement === activa) {
      evento.preventDefault();
      activa.classList.toggle('volteada');
    }
  });
}