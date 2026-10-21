const PALOS = [
  { nombre: 'Picas', simbolo: '♠', tono: 'negro' },
  { nombre: 'Corazones', simbolo: '♥', tono: 'rojo' },
  { nombre: 'Tréboles', simbolo: '♣', tono: 'negro' },
  { nombre: 'Diamantes', simbolo: '♦', tono: 'rojo' }
];
const VALORES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const MENSAJES = {
  "Picas": {
    "A": "Te quiero cuidar como nadie te cuidó, para que sepas lo mucho que vales.",
    "2": "Inteligente, guapa, sensible, romántica, trabajadora, divertida. Claro que mereces cosas bonitas, no lo olvides.",
    "3": "Hagamos las cosas bien: hablemos de cualquier cosa que nos incomode. Cuéntame cuando te enojes conmigo, cuando estés triste y todo lo que sientes. Tenme confianza, porque de verdad quiero durar contigo y hacer todo contigo.",
    "4": "Mis propósitos contigo son simples: llenarte el alma y traerte la calma que creíste perdida.",
    "5": "Cuando sientas que ya no puedes más, recuerda que somos un equipo. Aquí estaré para ser tu apoyo en las buenas y en las malas. Yo cuidaré de ti.",
    "6": "Si algún día piensas que nadie te entiende, voltea a verme, que yo siempre haré lo posible por escucharte y entenderte. Porque si mil veces me necesitas, mil veces voy a estar.",
    "7": "Mientras yo exista, ten por seguro que siempre tendrás a alguien que se alegre de la mínima cosa que hagas. Siempre estaré orgulloso de ti.",
    "8": "Tengo la certeza de que, a donde sea que vayas, brillarás, y yo te aplaudiré desde cualquier lugar donde me encuentre.",
    "9": "Que tengas un lindo día. Y si en algún momento se pone difícil, recuerda que aquí hay alguien que te quiere y te acompaña, aunque sea de lejitos.",
    "10": "Siempre seré la persona con la que puedes hablar de cualquier cosa, y nunca te juzgaré. Porque sé lo difícil que puede ser la vida.",
    "J": "Yo no estoy para causarte inseguridades; estoy para hacerte notar que vales el mundo entero y motivarte a ser mejor.",
    "Q": "Me siento muy orgulloso de la gran mujer que eres y de lo mucho que te esfuerzas. Aunque no todo sea sencillo, no te rindes. Siempre estaré para animarte y apoyarte.",
    "K": "Nunca te olvides de que, hasta en los días en que no nos entendamos, te seguiré eligiendo."
  },

  "Corazones": {
    "A": "Contigo encontré un lugar donde podía descansar, sin tener que fingir quién soy ni tener miedo de hablar. Tal vez no sea una casa ni un lugar que pueda tocar, pero cuando estoy contigo siento que estoy en mi hogar.",
    "2": "Si mi corazón pudiera escoger un último pensamiento cada noche, serías tú, porque hasta mis sueños más bonitos comienzan cuando te recuerdo.",
    "3": "Si pudiera convertir tu mirada en una noche, la llenaría de estrellas; y si pudiera convertir tu sonrisa en un paisaje, elegiría un jardín en primavera. Pero aun así, ninguna comparación alcanzaría para explicar lo que provocas en mí. Porque entre tantas flores que existen, tú eres la que mi corazón elige.",
    "4": "Me seguiré enamorando de ti todos los días, porque no puedo evitar sonreír cuando pienso en ti y porque, al mirarte, confirmo que eres todo lo que quiero en mi vida.",
    "5": "Adoro pasar el tiempo contigo, aunque sea por teléfono. Sin darme cuenta, te convertiste en la parte más bonita de mis días y en la razón de muchas de mis sonrisas.",
    "6": "Y si me dicen que busque lo que me haga feliz, iría corriendo hacia ti una y mil veces.",
    "7": "Me haces feliz de una manera tan sencilla que, a veces, solo necesito saber de ti para que mi día cambie por completo.",
    "8": "Me di cuenta de lo mucho que me gustas cuando, en cada lugar al que voy, no puedo evitar imaginar cómo sería ese momento si estuvieras conmigo.",
    "9": "No siempre nos vemos, pero siempre que estamos juntos te vuelves mi lugar feliz, de donde no quiero irme nunca.",
    "10": "Hay algo en ti que hace que mirarte nunca parezca suficiente. Quizás sean tus ojos, quizá tu sonrisa, o esa forma tan especial de hacer que hasta un instante sencillo parezca inolvidable. Y si mirarte es mi debilidad, quererte será siempre mi felicidad.",
    "J": "Te miro y sé que me enamoraría una y mil veces más de ti.",
    "Q": "Conocerte es, fue y seguirá siendo una de las mejores cosas que me pasó en la vida.",
    "K": "No me enamoré de ti porque necesitaba una relación. Me enamoré de ti porque, por primera vez en mucho tiempo, sentí el verdadero amor, la paz, como si estuviera en casa. Me enamoré de tu sonrisa, de la manera en que hiciste sonreír a mi corazón y de cómo siempre me haces sentir especial."
  },

  "Tréboles": {
    "A": "Ojalá pudiera esconder un besito en cada rayo de sol para que, al despertar, el mundo te acaricie y mis ganas de verte sonreír te acompañen todo el día.",
    "2": "Espero que tu mañana sea tan bonita como tu sonrisa, y que el resto de tu día sea dulce como tu mirada.",
    "3": "Dada la inmensidad del tiempo y la inmensidad del universo, es un placer inmenso para mí compartir un planeta y tiempo contigo.",
    "4": "A veces nos olvidamos de agradecer a las personas que mejoran nuestras vidas con solo estar en ellas. Así que gracias por ser tú.",
    "5": "Lo más bonito de mi día siempre será saber de ti, escuchar cómo te fue, reír contigo o simplemente compartir unos minutos de conversación que terminan alegrándome el corazón.",
    "6": "Si fuera astronauta te llevaría a la luna, pero como no lo soy, te llevo en mi corazón.",
    "7": "Cuando te conocí, no pensé que serías tan importante para mí. Solíamos ser extraños, y ahora eres alguien con quien no puedo pasar un día sin hablar.",
    "8": "Tal vez el mundo esté lleno de personas increíbles, pero mi corazón tuvo la suerte de encontrarte a ti. Y aunque la vida cambie mil veces los caminos, si algo pudiera volver a repetir, sería el día en que te conocí.",
    "9": "No llegaste cuando te buscaba, llegaste cuando ya no esperaba nada; quizá por eso te quiero sin importar lo que pase mañana.",
    "10": "Me encanta hablar contigo, así que por favor no te dejes comer por dinosaurios ni nada parecido.",
    "J": "Al final, casi todo lo que vale la pena da un poco de miedo. Pero si tengo que apostar por algo, me gusta la idea de hacerlo contigo. Porque hay personas que te hacen dudar, y otras que te hacen querer intentarlo.",
    "Q": "Uno de mis sentimientos favoritos es reírme contigo y darme cuenta de lo mucho que disfruto tu compañía y tu existencia.",
    "K": "Nunca te lo digo, pero gracias por compartir un pedacito de tu vida conmigo, por hacerme reír y por cruzarte en mi camino."
  },

  "Diamantes": {
    "A": "No te falta nada. Eres una gran mujer, un amor de persona, eres trabajadora, estás guapísima, te esfuerzas todos los días y tu corazón es noble. No dudes de ti.",
    "2": "Decirte bonita me quedaría corto. Tú eres hermosa, preciosa, bella, maravillosa, linda y única.",
    "3": "No sé si alguna vez te dijeron lo hermosa que eres cuando estás distraída, cuando te ríes sin darte cuenta o cuando hablas de algo que te apasiona. Esos son los momentos en los que más me gustas, porque no necesitas hacer nada para ser especial. Simplemente siendo tú, consigues que mi corazón te quiera cada día más.",
    "4": "Si alguna vez alguien te pregunta qué tiene de especial tu sonrisa, dile que no lo sabes, porque quizá tampoco tú te das cuenta del efecto que provoca. Hay días en los que basta con verte sonreír para que todo parezca un poco mejor. Por eso, si pudiera elegir un paisaje para contemplar toda la vida, elegiría tu alegría.",
    "5": "Si la luna pudiera elegir con quién compartir su luz, quizá te elegiría a ti; pero hasta ella tendría que reconocer que hay noches en las que tu sonrisa consigue iluminar mucho más. Y si la noche busca una estrella para brillar, yo solo te necesito a ti para soñar.",
    "6": "Si algún día te sientes insegura de ti, dímelo y te presto mis ojos para que veas, a través de ellos, lo hermosa que eres. Te amo.",
    "7": "No me importa si te veo sin maquillaje, sudada, cansada, con ojeras o despeinada. Para mí siempre serás la niña más hermosa de todas.",
    "8": "Me encanta la forma en que tu belleza no termina en tu rostro, porque mientras más te miro, más detalles encuentro para admirarte: tu sonrisa, tu mirada, tu manera de hablar y hasta esos pequeños gestos que quizá nadie nota. Y entre tanta belleza que existe, qué suerte la mía de haber encontrado una que me hace suspirar. Porque entre todas las flores, tú eres la que quisiera cuidar.",
    "9": "Si algún día me preguntas qué fue lo que vi en ti, probablemente no sepa responderte. Hay cosas que los ojos reconocen antes de que el corazón encuentre las palabras.",
    "10": "Me enamoraste sin grandes coqueteos, casi sin esfuerzo. Simplemente te vi y me gustaste, conversamos y mi corazón no se quiso alejar de ti.",
    "J": "Que nadie te haga dudar de la excelente persona que eres y del gran corazón que tienes.",
    "Q": "No sé qué estés haciendo, pero quería recordarte que mi corazoncito y yo te queremos mucho.",
    "K": "Si me pusiera a escribir sobre ti toda una noche, dudo mucho que alguna vez volviera a ser de día."
  },

  "JokerNegro": "Esta carta viene sin poderes especiales. Su único truco es darte una excusa para escribirme y decirme qué plan te gustaría que hiciéramos juntos.",
  "JokerRojo": "Ya descubriste el secreto de esta baraja: detrás de cada carta hay una manera distinta de acercarme a ti. Esta la reservé para decirlo sin rodeos: me encantas."
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