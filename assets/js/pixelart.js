const DIBUJOS = {
  'flor-amarilla': {
    nombre: 'Flor amarilla',
    subtitulo: 'Un color para cada pequeño detalle',
    mensajeFinal:
      'Terminaste esta flor. Ahora también forma parte de nuestro jardín.',
    columnas: 13,
    filas: 15,
    colores: {
      negro: '#1b1b1b',
      amarillo: '#f3bb22',
      verde: '#2e8736'
    },
    pixeles: [
      [null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, 'negro', 'negro', null, 'negro', 'negro', null, null, null, null],
      [null, null, null, 'negro', null, null, 'negro', null, null, 'negro', null, null, null],
      [null, null, 'negro', null, 'negro', 'negro', 'amarillo', 'negro', 'negro', null, 'negro', null, null],
      [null, 'negro', null, 'negro', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'negro', null, null, 'negro', null],
      [null, 'negro', null, 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', null, 'negro', null, null],
      [null, null, 'negro', null, 'amarillo', 'amarillo', 'amarillo', 'amarillo', null, 'negro', null, null, null],
      [null, null, null, 'negro', null, 'negro', 'amarillo', 'negro', null, null, null, null, null],
      [null, null, 'negro', 'negro', null, null, 'verde', null, null, 'negro', 'negro', null, null],
      [null, 'negro', null, null, 'negro', 'negro', 'verde', 'negro', 'negro', null, null, 'negro', null],
      [null, 'negro', null, 'amarillo', 'amarillo', 'amarillo', 'verde', 'amarillo', 'amarillo', null, 'negro', null, null],
      [null, null, 'negro', null, 'amarillo', 'amarillo', 'verde', 'amarillo', null, 'negro', null, null, null],
      [null, null, null, 'negro', null, 'negro', 'verde', 'negro', null, null, null, null, null],
      [null, null, null, null, null, 'verde', 'verde', 'verde', null, null, null, null, null],
      [null, null, null, null, 'verde', 'verde', 'verde', 'verde', 'verde', null, null, null, null]
    ]
  },

  corazon: {
  nombre: 'Corazón del jardín',
  subtitulo: 'Un pequeño recuerdo hecho con colores',
  mensajeFinal: 'Terminaste el corazón. Cada píxel guarda un poquito de este lugar.',
  pixeles: [
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, '#e43b44', '#e43b44', '#e43b44', null, null, null, null, '#e43b44', '#e43b44', '#e43b44', null, null, null],
    [null, null, '#e43b44', '#ffffff', '#ffffff', '#e43b44', '#e43b44', null, null, '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', null, null],
    [null, '#e43b44', '#e43b44', '#ffffff', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', null],
    [null, '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', null],
    [null, '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', null],
    [null, null, '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', null, null],
    [null, null, null, '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', '#e43b44', null, null, null],
    [null, null, null, null, '#a22633', '#a22633', '#a22633', '#a22633', '#a22633', '#a22633', '#a22633', '#a22633', null, null, null, null],
    [null, null, null, null, null, '#a22633', '#a22633', '#a22633', '#a22633', '#a22633', '#a22633', null, null, null, null, null],
    [null, null, null, null, null, null, '#a22633', '#a22633', '#a22633', '#a22633', null, null, null, null, null, null],
    [null, null, null, null, null, null, null, '#a22633', '#a22633', null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  ]
},

estrella: {
    nombre: 'Estrella nocturna',
    subtitulo: 'Una luz pequeña para una noche especial',
    mensajeFinal:
      'La estrella está completa. Que siempre encuentres luz incluso en las noches más oscuras.',
    columnas: 13,
    filas: 13,
    colores: {
      borde: '#2a303e',
      oro: '#d9a94e',
      luz: '#ffe09a'
    },
    pixeles : [
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, "#fee761", "#fee761", null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, "#fee761", "#fee761", null, null, null, null, null, null, null],
    [null, null, null, null, null, null, "#fee761", "#fee761", "#fee761", "#fee761", null, null, null, null, null, null],
    [null, null, null, null, null, null, "#fee761", "#fee761", "#fee761", "#fee761", null, null, null, null, null, null],
    [null, "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", null],
    [null, null, "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", null, null],
    [null, null, null, "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", null, null, null],
    [null, null, null, null, "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", null, null, null, null],
    [null, null, null, null, "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", "#fee761", null, null, null, null],
    [null, null, null, "#fee761", "#fee761", "#fee761", "#fee761", null, null, "#fee761", "#fee761", "#fee761", "#fee761", null, null, null],
    [null, null, "#fee761", "#fee761", "#fee761", "#fee761", null, null, null, null, "#fee761", "#fee761", "#fee761", "#fee761", null, null],
    [null, null, "#fee761", "#fee761", "#fee761", null, null, null, null, null, null, "#fee761", "#fee761", "#fee761", null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  ]
},

'manzana': {
  nombre: 'manzana',
  subtitulo: 'Un dibujo para colorear',
  mensajeFinal: '¡Terminaste!',
   pixeles : [
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "#0a0000", null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "#0a0000", "#9d6b3e", "#0a0000", null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "#0a0000", "#9d6b3e", "#674623", "#0a0000", null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "#0a0000", "#674623", "#0a0000", null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, "#0a0000", "#0a0000", "#0a0000", "#0a0000", "#674623", "#0a0000", "#0a0000", "#0a0000", "#0a0000", null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, "#0a0000", "#0a0000", "#a82027", "#a82027", "#a82027", "#0a0000", "#674623", "#0a0000", "#a82027", "#a82027", "#a82027", "#0a0000", "#0a0000", null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, "#0a0000", "#a82027", "#a82027", "#e9272d", "#e9272d", "#a82027", "#a82027", "#a82027", "#a82027", "#e9272d", "#e9272d", "#e9272d", "#a82027", "#a82027", "#0a0000", null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, "#0a0000", "#e9272d", "#e9272d", "#e9272d", "#f27f83", "#f27f83", "#f27f83", "#e9272d", "#e9272d", "#e9272d", "#e9272d", "#e9272d", "#a82027", "#a82027", "#0a0000", null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, "#0a0000", "#a82027", "#e9272d", "#e9272d", "#f27f83", "#fffeff", "#fffeff", "#fffeff", "#f27f83", "#e9272d", "#e9272d", "#e9272d", "#e9272d", "#a82027", "#a82027", "#a82027", "#0a0000", null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, "#0a0000", "#a82027", "#e9272d", "#f27f83", "#f27f83", "#fffeff", "#fffeff", "#f27f83", "#f27f83", "#f27f83", "#e9272d", "#e9272d", "#e9272d", "#a82027", "#a82027", "#a82027", "#0a0000", null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, "#0a0000", "#a82027", "#f27f83", "#f27f83", "#fffeff", "#fffeff", "#f27f83", "#e9272d", "#e9272d", "#e9272d", "#e9272d", "#e9272d", "#e9272d", "#a82027", "#a82027", "#a82027", "#0a0000", null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, "#0a0000", "#a82027", "#e9272d", "#e9272d", "#f27f83", "#fffeff", "#f27f83", "#e9272d", "#e9272d", "#e9272d", "#e9272d", "#e9272d", "#e9272d", "#a82027", "#a82027", "#a82027", "#0a0000", null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, "#0a0000", "#a82027", "#e9272d", "#e9272d", "#e9272d", "#e9272d", "#e9272d", "#e9272d", "#e9272d", "#e9272d", "#e9272d", "#e9272d", "#a82027", "#a82027", "#a82027", "#a82027", "#0a0000", null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, "#0a0000", "#a82027", "#e9272d", "#f27f83", "#f27f83", "#e9272d", "#e9272d", "#e9272d", "#e9272d", "#e9272d", "#a82027", "#a82027", "#a82027", "#a82027", "#0a0000", null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, "#0a0000", "#a82027", "#a82027", "#e9272d", "#e9272d", "#e9272d", "#e9272d", "#e9272d", "#e9272d", "#a82027", "#a82027", "#a82027", "#a82027", "#a82027", "#0a0000", null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, "#0a0000", "#a82027", "#e9272d", "#e9272d", "#e9272d", "#e9272d", "#e9272d", "#a82027", "#a82027", "#a82027", "#a82027", "#a82027", "#0a0000", null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, "#0a0000", "#a82027", "#a82027", "#a82027", "#a82027", "#a82027", "#a82027", "#a82027", "#a82027", "#a82027", "#a82027", "#a82027", "#0a0000", null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, "#0a0000", "#0a0000", "#a82027", "#a82027", "#0a0000", "#0a0000", "#0a0000", "#a82027", "#a82027", "#0a0000", "#0a0000", null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, "#0a0000", "#0a0000", null, null, null, "#0a0000", "#0a0000", null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
]
},

'Asta': {
  nombre: 'Asta',
  subtitulo: 'Un dibujo para colorear',
  mensajeFinal: '¡Terminaste!',
   pixeles : [
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, "#b2b6bc", null, null, null, null, "#b2b6bc", null, "#b2b6bc", null, null, null, null, null, "#b2b6bc", null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, "#b2b6bc", "#fbfafa", "#b2b6bc", "#b2b6bc", "#b2b6bc", "#b2b6bc", "#fbfafa", "#b2b6bc", "#fbfafa", "#b2b6bc", "#b2b6bc", "#b2b6bc", null, "#b2b6bc", "#fbfafa", "#b2b6bc", null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, "#b2b6bc", "#cfced3", "#fbfafa", "#fbfafa", "#b2b6bc", "#fbfafa", "#cfced3", "#cfced3", "#cfced3", "#fbfafa", "#fbfafa", "#fbfafa", "#b2b6bc", "#fbfafa", "#cfced3", "#b2b6bc", null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, "#b2b6bc", "#fbfafa", "#cfced3", "#464253", "#464253", "#b2b6bc", "#464253", "#b2b6bc", "#b2b6bc", "#b2b6bc", "#b2b6bc", "#464253", "#cfced3", "#b2b6bc", null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, "#b2b6bc", "#b2b6bc", "#fbfafa", "#cfced3", "#464253", "#464253", "#464253", "#464253", "#464253", "#464253", "#464253", "#464253", "#464253", "#cac195", "#464253", "#fbfafa", "#b2b6bc", null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, "#b2b6bc", "#cfced3", "#464253", "#464253", "#fbfafa", "#b2b6bc", "#cfced3", "#cfced3", "#fbfafa", "#fbfafa", "#b2b6bc", "#fbfafa", "#464253", "#464253", "#464253", "#fbfafa", "#b2b6bc", null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, "#464253", "#464253", "#fbfafa", "#ffd2cb", "#ffd2cb", "#b2b6bc", "#cfced3", "#b2b6bc", "#b2b6bc", "#ffd2cb", "#ffd2cb", "#fbfafa", "#464253", "#464253", "#b2b6bc", null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, "#b2b6bc", "#464253", "#fbfafa", "#ffd2cb", "#050000", "#050000", "#ffd2cb", "#b2b6bc", "#ffd2cb", "#ffd2cb", "#050000", "#050000", "#ffd2cb", "#fbfafa", "#464253", "#b2b6bc", null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, "#b2b6bc", "#cfced3", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#050000", "#050000", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#050000", "#050000", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#b2b6bc", null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, "#b2b6bc", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#54a363", "#54a363", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#54a363", "#54a363", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#b2b6bc", null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, "#ac796f", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ac796f", null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, "#cfced3", "#ac796f", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ac796f", null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, "#cfced3", "#ac796f", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ffd2cb", "#ac796f", null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, "#cfced3", "#ac796f", "#e5bcad", "#fed3cb", "#fed3cb", "#fed3cb", "#fed3cb", "#fed3cb", "#fed3cb", "#e5bcad", "#ac796f", null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, "#2e272a", "#443949", "#443949", "#443949", "#e5bcad", "#e5bcad", "#443949", "#443949", "#443949", "#2e272a", null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, "#2e272a", "#443949", "#443949", "#c6b999", "#443949", "#443949", "#443949", "#443949", "#ceb78e", "#ceb78e", "#443949", "#2e272a", null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, "#2e272a", "#443949", "#443949", "#443949", "#d7cce1", "#443949", "#443949", "#443949", "#443949", "#443949", "#443949", "#443949", "#443949", "#2e272a", null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, "#181425", null, "#b7b4b1", "#fbf8ff", "#373c6c", "#373c6c", "#e0d7da", "#fef8f0", "#fef8f0", "#fef8f0", "#fef8f0", "#fef8f0", "#fef8f0", "#e0d7da", "#373c6c", "#373c6c", "#fbf8ff", "#b7b4b1", null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, "#181425", "#181425", "#c28569", "#faddcd", "#faddcd", "#a7775c", "#7f4e3a", "#7f4e3a", "#7f4e3a", "#7f4e3a", "#d8b695", "#7f4e3a", "#7f4e3a", "#7f4e3a", "#a7775c", "#f4d6c3", "#f4d6c3", "#a7775c", null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, "#181425", "#181425", "#181425", "#faddcd", "#a7775c", "#38468b", "#fef8f0", "#fef8f0", "#fef8f0", "#fef8f0", "#fef8f0", "#fef8f0", "#e0d7da", "#a7775c", "#ecb5a3", "#f4d6c3", "#a7775c", null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, "#181425", "#181425", "#181425", "#181425", "#a7775c", "#332d5e", "#38468b", "#38468b", "#38468b", "#38468b", "#38468b", "#38468b", "#38468b", "#332d5e", null, "#a7775c", "#a7775c", null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, "#181425", "#181425", "#181425", "#181425", "#181425", "#181425", "#332d5e", "#38468b", "#38468b", "#38468b", "#332d5e", "#38468b", "#38468b", "#38468b", "#332d5e", null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, "#181425", "#181425", "#181425", "#181425", "#181425", null, "#181425", "#9c7867", "#f8cbbe", "#f8cbbe", "#9c7867", null, "#9c7867", "#f8cbbe", "#f8cbbe", "#9c7867", null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, "#181425", "#181425", "#181425", "#181425", null, null, null, null, "#342c34", "#342c34", "#342c34", "#342c34", null, "#342c34", "#342c34", "#342c34", "#342c34", null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, "#181425", "#181425", "#181425", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
]
},

'polar': {
  nombre: 'polar',
  subtitulo: 'Un dibujo para colorear',
  mensajeFinal: '¡Terminaste!',
    pixeles : [
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, "#f9d9e4", "#f9d9e4", "#f9d9e4", null, null, null, "#f9d9e4", null, null, null, "#f9d9e4", "#f9d9e4", "#f9d9e4", null, "#f9d9e4", null, null, null, "#f9d9e4", null, "#f9d9e4", "#f9d9e4", "#f9d9e4", null, null, null, "#f9d9e4", null, "#f9d9e4", null],
    [null, null, null, "#f9d9e4", null, null, null, null, "#f9d9e4", null, null, null, "#f9d9e4", null, "#f9d9e4", null, "#f9d9e4", null, null, null, "#f9d9e4", null, "#f9d9e4", null, null, null, null, null, "#f9d9e4", null, "#f9d9e4", null],
    [null, null, null, "#f9d9e4", null, null, null, null, "#f9d9e4", null, null, null, "#f9d9e4", null, "#f9d9e4", null, null, "#f9d9e4", null, "#f9d9e4", null, null, "#f9d9e4", "#f9d9e4", null, null, null, null, "#f9d9e4", null, "#f9d9e4", null],
    [null, null, null, "#f9d9e4", null, null, null, null, "#f9d9e4", null, null, null, "#f9d9e4", null, "#f9d9e4", null, null, "#f9d9e4", null, "#f9d9e4", null, null, "#f9d9e4", null, null, null, null, null, "#f9d9e4", null, "#f9d9e4", null],
    [null, null, "#f9d9e4", "#f9d9e4", "#f9d9e4", null, null, null, "#f9d9e4", "#f9d9e4", "#f9d9e4", null, "#f9d9e4", "#f9d9e4", "#f9d9e4", null, null, null, "#f9d9e4", null, null, null, "#f9d9e4", "#f9d9e4", "#f9d9e4", null, null, null, "#f9d9e4", "#f9d9e4", "#f9d9e4", null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", null, "#000000", "#000000", null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, "#000000", "#000000", "#000000", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#000000", "#ffffff", "#ffffff", "#000000", null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, "#000000", "#000000", null, "#000000", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#000000", null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, "#000000", "#d4d4d4", "#ffffff", "#000000", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#000000", null, null, null, null, null, null, null, null, null, null],
    [null, null, null, "#000000", "#d4d4d4", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#000000", null, null, null, null, null, null, null, null, null],
    [null, null, null, null, "#000000", "#d4d4d4", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#000000", null, null, null, null, null, null, null, null, null],
    [null, null, null, "#000000", "#d4d4d4", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#000000", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#000000", null, null, null, null, null, null, null, null],
    [null, null, null, "#000000", "#d4d4d4", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#000000", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#d2d2d2", "#ffffff", "#ffffff", "#ffffff", "#000000", null, null, null, null, null, null, null, null],
    [null, null, "#000000", "#d4d4d4", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#000000", "#000000", "#000000", "#ffffff", "#ffffff", "#d2d2d2", "#f7dbe4", "#f7dbe4", "#000000", null, null, null, null, null, null, null, null],
    [null, null, "#000000", "#d4d4d4", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#000000", "#000000", "#000000", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#d2d2d2", "#f7dbe4", "#000000", null, null, null, null, null, "#000000", "#000000", "#000000"],
    [null, null, "#000000", "#d4d4d4", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#d2d2d2", "#ffffff", "#ffffff", "#000000", null, null, null, "#000000", "#ffffff", "#ffffff", "#ffffff"],
    [null, null, "#000000", "#d4d4d4", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#f7dbe4", "#f7dbe4", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#d2d2d2", "#ffffff", "#ffffff", "#000000", null, null, "#000000", "#ffffff", "#b4b4b4", "#ffffff", "#b4b4b4"],
    [null, null, "#000000", "#d4d4d4", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#f7dbe4", "#f7dbe4", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#f37ba7", "#f37ba7", "#f37ba7", "#f37ba7", "#ffffff", "#ffffff", "#000000", "#f37ba7", "#f37ba7", "#f37ba7", "#f37ba7", "#d2d2d2", "#d2d2d2", "#ffffff"],
    [null, "#000000", "#d4d4d4", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#b1b1b1", "#b1b1b1", "#f37ba7", "#f2aac6", "#f2aac6", "#f2aac6", "#f2aac6", "#f37ba7", "#ffffff", "#f37ba7", "#f2aac6", "#f2aac6", "#f2aac6", "#f2aac6", "#f37ba7", "#d2d2d2", "#b4b4b4"],
    [null, "#000000", "#d4d4d4", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#f37ba7", "#f2aac6", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#f2aac6", "#f37ba7", "#f2aac6", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#f2aac6", "#f37ba7", "#ffffff"],
    [null, "#000000", "#d4d4d4", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#000000", "#000000", "#000000", "#000000", "#f2aac6", "#fcdce7", "#fcdce7", "#fdffff", "#fcdce7", "#f2aac6", "#f37ba7", "#f2aac6", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#f2aac6", "#f37ba7", "#ffffff"],
    [null, "#000000", "#d4d4d4", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#010101", "#010101", "#010101", "#ffffff", "#ffffff", "#ffffff", "#b1b1b1", "#000000", "#fcdce7", "#fdffff", "#fcdce7", "#fcdce7", "#fcdce7", "#f2aac6", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#f2aac6", "#f37ba7", "#ffffff"],
    [null, "#000000", "#d4d4d4", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#010101", "#010101", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#b1b1b1", "#ffffff", "#ffffff", "#000000", "#fcdce7", "#fdffff", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#f2aac6", "#f37ba7", "#ffffff"],
    [null, "#000000", "#d4d4d4", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#010101", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#b1b1b1", "#000000", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#f2aac6", "#f37ba7", "#ffffff"],
    [null, "#000000", "#d4d4d4", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#b1b1b1", "#b1b1b1", "#000000", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#f2aac6", "#f37ba7", "#d0d4d3", "#000000"],
    [null, "#000000", "#d4d4d4", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#b1b1b1", "#b1b1b1", "#000000", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#f2aac6", "#f37ba7", "#d0d4d3", "#000000", null],
    [null, "#000000", "#d4d4d4", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#b1b1b1", "#b1b1b1", "#000000", "#ffffff", "#f37ba7", "#f2aac6", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#fcdce7", "#f2aac6", "#f37ba7", "#d0d4d3", "#000000", null, null],
    [null, "#000000", "#d4d4d4", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#b1b1b1", "#b1b1b1", "#000000", "#ffffff", "#ffffff", "#ffffff", "#f37ba7", "#f2aac6", "#fcdce7", "#fcdce7", "#fcdce7", "#f2aac6", "#f37ba7", "#000000", "#000000", null, null, null],
    [null, "#000000", "#d4d4d4", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#b1b1b1", "#b1b1b1", "#000000", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#f37ba7", "#f2aac6", "#f2aac6", "#f2aac6", "#f37ba7", "#ffffff", "#000000", null, null, null, null],
    [null, "#000000", "#d4d4d4", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#b1b1b1", "#b1b1b1", "#000000", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#f37ba7", "#f37ba7", "#f37ba7", "#ffffff", "#ffffff", "#000000", null, null, null, null],
]
},

};

// Cada dibujo acepta pixeles: matriz de hex, nombres de colores o null.
// El tamaño y la paleta se calculan automáticamente a partir de la matriz.
function prepararDibujo(id, dibujo) {
  const matriz = dibujo.pixeles;
  if (!Array.isArray(matriz) || !matriz.length || !Array.isArray(matriz[0]) || !matriz[0].length) {
    throw new Error(`El dibujo ${id} necesita una matriz pixeles no vacía`);
  }
  const columnas = matriz[0].length;
  if (matriz.some(fila => !Array.isArray(fila) || fila.length !== columnas)) {
    throw new Error(`Todas las filas de ${id} deben tener ${columnas} columnas`);
  }
  const colores = dibujo.colores || {};
  const pixeles = matriz.map(fila => fila.map(valor => {
    if (valor == null || valor === 'none' || valor === 'None') return null;
    if (typeof valor !== 'string') throw new Error(`Píxel inválido en ${id}: ${valor}`);
    if (/^#[0-9a-f]{6}$/i.test(valor)) return valor.toLowerCase();
    if (Object.hasOwn(colores, valor) && /^#[0-9a-f]{6}$/i.test(colores[valor])) {
      return colores[valor].toLowerCase();
    }
    throw new Error(`Color no reconocido en ${id}: ${valor}`);
  }));
  const paleta = [...new Set(pixeles.flat().filter(Boolean))];
  return { ...dibujo, pixeles, columnas, filas: pixeles.length, paleta,
    total: pixeles.flat().filter(Boolean).length };
}

const dibujos = Object.fromEntries(
  Object.entries(DIBUJOS).map(([id, dibujo]) => [id, prepararDibujo(id, dibujo)])
);

let dibujoActual = null;
let colorSeleccionado = null;
let celdasColoreadas = new Set();
let abierto = false;
let pintando = false;

const obtenerModal = () => document.getElementById('pixelart-modal');
const obtenerCanvas = () => document.getElementById('pixelart-canvas');
const obtenerContexto = () => obtenerCanvas().getContext('2d');
const esMovil = () => matchMedia('(max-width: 650px)').matches;

function configurarTamanoCanvas() {
  const canvas = obtenerCanvas();
  const lado = esMovil() ? 420 : 560;
  canvas.width = lado;
  canvas.height = lado;
}

function obtenerCelda(clientX, clientY) {
  const canvas = obtenerCanvas();
  const rect = canvas.getBoundingClientRect();
  return {
    columna: Math.floor((clientX - rect.left) * canvas.width / rect.width / (canvas.width / dibujoActual.columnas)),
    fila: Math.floor((clientY - rect.top) * canvas.height / rect.height / (canvas.height / dibujoActual.filas))
  };
}

function pintarTablero() {
  const canvas = obtenerCanvas();
  const ctx = obtenerContexto();
  const anchoCelda = canvas.width / dibujoActual.columnas;
  const altoCelda = canvas.height / dibujoActual.filas;
  const numeracion = new Map(dibujoActual.paleta.map((color, indice) => [color, indice + 1]));
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ece5d8';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let fila = 0; fila < dibujoActual.filas; fila++) {
    for (let columna = 0; columna < dibujoActual.columnas; columna++) {
      const color = dibujoActual.pixeles[fila][columna];
      const clave = `${fila}-${columna}`;
      const x = columna * anchoCelda;
      const y = fila * altoCelda;
      ctx.fillStyle = color === null ? '#f0eadf'
        : celdasColoreadas.has(clave) ? color : '#d2cabd';
      ctx.fillRect(x, y, anchoCelda, altoCelda);
      if (color !== null && !celdasColoreadas.has(clave)) {
        ctx.fillStyle = '#615c54';
        ctx.font = `700 ${Math.max(10, Math.min(anchoCelda, altoCelda) * 0.40)}px Trebuchet MS`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(numeracion.get(color), x + anchoCelda / 2, y + altoCelda / 2);
      }
      ctx.strokeStyle = 'rgba(60, 52, 41, .20)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, anchoCelda, altoCelda);
    }
  }
}

function actualizarProgreso() {
  const total = dibujoActual.total;
  const actual = celdasColoreadas.size;
  document.getElementById('pixelart-progreso').textContent = `${actual} / ${total} píxeles`;
  if (actual === total && total > 0) {
    document.getElementById('pixelart-mensaje').textContent = dibujoActual.mensajeFinal;
    document.getElementById('pixelart-mensaje').hidden = false;
    document.getElementById('pixelart-paleta').hidden = true;
  }
}

function crearPaleta() {
  const paleta = document.getElementById('pixelart-paleta');
  paleta.replaceChildren();
  dibujoActual.paleta.forEach((color, indice) => {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'color-pixel';
    boton.dataset.color = color;
    boton.style.setProperty('--color-pixel', color);
    boton.setAttribute('aria-label', `Elegir color ${indice + 1}: ${color}`);
    const numero = document.createElement('span');
    numero.textContent = indice + 1;
    boton.appendChild(numero);
    boton.addEventListener('click', () => {
      colorSeleccionado = color;
      paleta.querySelectorAll('.color-pixel').forEach(elemento => {
        elemento.classList.toggle('seleccionado', elemento.dataset.color === color);
      });
    });
    paleta.appendChild(boton);
  });
}

function colorear(columna, fila) {
  if (!colorSeleccionado || fila < 0 || columna < 0 ||
      fila >= dibujoActual.filas || columna >= dibujoActual.columnas) return;
  const color = dibujoActual.pixeles[fila][columna];
  const clave = `${fila}-${columna}`;
  if (color === null || celdasColoreadas.has(clave) || color !== colorSeleccionado) return;
  celdasColoreadas.add(clave);
  pintarTablero();
  actualizarProgreso();
}

function reiniciarDibujo() {
  celdasColoreadas = new Set();
  colorSeleccionado = null;
  document.getElementById('pixelart-mensaje').hidden = true;
  document.getElementById('pixelart-paleta').hidden = false;
  crearPaleta();
  pintarTablero();
  actualizarProgreso();
}

function crearGaleria() {
  const galeria = document.getElementById('pixelart-galeria');
  galeria.replaceChildren();
  Object.entries(dibujos).forEach(([id, dibujo]) => {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'pixelart-opcion';
    boton.innerHTML = `
      <span class="pixelart-miniatura">${id === 'flor-amarilla' ? '✿' : id === 'corazon' ? '♥' : '✦'}</span>
      <span><strong></strong><small></small></span>`;
    boton.querySelector('strong').textContent = dibujo.nombre;
    boton.querySelector('small').textContent = `${dibujo.columnas} × ${dibujo.filas} píxeles`;
    boton.addEventListener('click', () => cargarDibujo(id));
    galeria.appendChild(boton);
  });
}

function cargarDibujo(id) {
  dibujoActual = dibujos[id];
  document.getElementById('pixelart-titulo').textContent = dibujoActual.nombre;
  document.getElementById('pixelart-instruccion').textContent = dibujoActual.subtitulo;
  document.getElementById('pixelart-galeria-contenedor').hidden = true;
  document.getElementById('pixelart-juego').hidden = false;
  configurarTamanoCanvas();
  reiniciarDibujo();
}

function volverAGaleria() {
  dibujoActual = null;
  colorSeleccionado = null;
  celdasColoreadas = new Set();
  document.getElementById('pixelart-titulo').textContent = 'Elige un dibujo';
  document.getElementById('pixelart-instruccion').textContent =
    'Cada dibujo guarda un pequeño recuerdo para colorear.';
  document.getElementById('pixelart-juego').hidden = true;
  document.getElementById('pixelart-galeria-contenedor').hidden = false;
  crearGaleria();
}

function cerrar() {
  abierto = false;
  pintando = false;
  obtenerModal().hidden = true;
}

export function iniciarPixelArt() {
  const canvas = obtenerCanvas();
  canvas.addEventListener('pointerdown', evento => {
    if (!abierto || !dibujoActual) return;
    pintando = true;
    canvas.setPointerCapture(evento.pointerId);
    const { columna, fila } = obtenerCelda(evento.clientX, evento.clientY);
    colorear(columna, fila);
  });
  canvas.addEventListener('pointermove', evento => {
    if (!pintando || !abierto || !dibujoActual) return;
    const { columna, fila } = obtenerCelda(evento.clientX, evento.clientY);
    colorear(columna, fila);
  });
  canvas.addEventListener('pointerup', () => { pintando = false; });
  canvas.addEventListener('pointercancel', () => { pintando = false; });
  document.getElementById('pixelart-cerrar').addEventListener('click', cerrar);
  document.getElementById('pixelart-reiniciar').addEventListener('click', reiniciarDibujo);
  document.getElementById('pixelart-volver').addEventListener('click', volverAGaleria);
  document.addEventListener('keydown', evento => {
    if (evento.key === 'Escape' && abierto) cerrar();
  });
}

export function abrirPixelArt() {
  abierto = true;
  obtenerModal().hidden = false;
  volverAGaleria();
}