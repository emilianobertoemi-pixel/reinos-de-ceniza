import { useState } from 'react'
import './App.css'

const reinoInicial = {
  nombre: 'Reino de Ceniza',
  ayuntamiento: 1,
  recursos: {
    madera: 1000,
    piedra: 800,
    hierro: 500,
    comida: 1200,
    oro: 300,
  },
  ejercito: {
    espadachines: 20,
    arqueros: 10,
    jinetes: 3,
  },
  heroes: {
    rey: {
      nombre: 'Rey Aldric',
      nivel: 1,
    },
    reina: {
      nombre: 'Reina Elara',
      nivel: 1,
    },
  },
  inventario: {
    espadaRota: 0,
    maderaAstillada: 0,
    cueroDanado: 0,
    escudoPartido: 0,
    engranajeTorre: 0,
    fragmentoAcero: 0,
    planoMuralla: 0,
    engranajeReforzado: 0,
    reliquiaMenor: 0,
  },
  mejoras: {
    espadachines: 1,
    arqueros: 1,
    muralla: 1,
  },
}

const nombresItems = {
  espadaRota: 'Espada rota',
  maderaAstillada: 'Madera astillada',
  cueroDanado: 'Cuero dañado',
  escudoPartido: 'Escudo partido',
  engranajeTorre: 'Engranaje de torre',
  fragmentoAcero: 'Fragmento de acero',
  planoMuralla: 'Plano de muralla',
  engranajeReforzado: 'Engranaje reforzado',
  reliquiaMenor: 'Reliquia menor',
}

const costosTropas = {
  espadachines: {
    nombre: 'Espadachín',
    comida: 50,
    hierro: 25,
  },
  arqueros: {
    nombre: 'Arquero',
    madera: 30,
    comida: 40,
    oro: 10,
  },
  jinetes: {
    nombre: 'Jinete',
    comida: 120,
    hierro: 80,
    oro: 40,
  },
}

const aldeasEnemigas = [
  {
    id: 1,
    nombre: 'Puesto de Roble',
    dificultad: 'Fácil',
    defensa: 260,
    muralla: 1,
    torres: 1,
    riesgo: 20,
    botin: {
      madera: 320,
      piedra: 140,
      hierro: 90,
      comida: 260,
      oro: 40,
    },
    restos: ['espadaRota', 'maderaAstillada', 'cueroDanado'],
  },
  {
    id: 2,
    nombre: 'Fortaleza del Vado',
    dificultad: 'Media',
    defensa: 480,
    muralla: 2,
    torres: 2,
    riesgo: 35,
    botin: {
      madera: 450,
      piedra: 360,
      hierro: 220,
      comida: 300,
      oro: 90,
    },
    restos: ['escudoPartido', 'engranajeTorre', 'fragmentoAcero'],
  },
  {
    id: 3,
    nombre: 'Bastión de Piedra Negra',
    dificultad: 'Difícil',
    defensa: 760,
    muralla: 3,
    torres: 3,
    riesgo: 55,
    botin: {
      madera: 600,
      piedra: 650,
      hierro: 420,
      comida: 380,
      oro: 160,
    },
    restos: ['planoMuralla', 'engranajeReforzado', 'reliquiaMenor'],
  },
]

const tiposRecoleccion = {
  rapida: {
    nombre: 'Recolección rápida',
    porcentajeRecursos: 0.35,
    chanceItems: 0.35,
    riesgoModificador: 0.5,
  },
  profunda: {
    nombre: 'Recolección profunda',
    porcentajeRecursos: 0.85,
    chanceItems: 0.8,
    riesgoModificador: 1,
  },
  escolta: {
    nombre: 'Recolección con escolta',
    porcentajeRecursos: 0.75,
    chanceItems: 0.7,
    riesgoModificador: 0.45,
  },
}

const mejorasDisponibles = {
  espadachines2: {
    nombre: 'Espadachines II',
    descripcion: 'Los espadachines aumentan su poder de ataque.',
    tipo: 'espadachines',
    nivelActualNecesario: 1,
    nuevoNivel: 2,
    costoRecursos: {
      hierro: 150,
      oro: 100,
    },
    costoItems: {
      espadaRota: 2,
      fragmentoAcero: 1,
    },
  },
  arqueros2: {
    nombre: 'Arqueros II',
    descripcion: 'Los arqueros disparan con más precisión y daño.',
    tipo: 'arqueros',
    nivelActualNecesario: 1,
    nuevoNivel: 2,
    costoRecursos: {
      madera: 180,
      oro: 80,
    },
    costoItems: {
      maderaAstillada: 2,
      cueroDanado: 1,
    },
  },
  muralla2: {
    nombre: 'Muralla Reforzada I',
    descripcion: 'La muralla del reino sube de nivel defensivo.',
    tipo: 'muralla',
    nivelActualNecesario: 1,
    nuevoNivel: 2,
    costoRecursos: {
      piedra: 300,
      hierro: 180,
    },
    costoItems: {
      planoMuralla: 1,
      engranajeReforzado: 1,
    },
  },
}
const escoltaInicial = {
  espadachines: 0,
  arqueros: 0,
  jinetes: 0,
  }
  const ataqueInicial = {
  espadachines: 0,
  arqueros: 0,
  jinetes: 0,
}

function App() {
  const [reino, setReino] = useState(reinoInicial)
  const [mostrarEntrenamiento, setMostrarEntrenamiento] = useState(false)
  const [mostrarAtaques, setMostrarAtaques] = useState(false)
  const [mostrarCampos, setMostrarCampos] = useState(false)
  const [mostrarMejoras, setMostrarMejoras] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [resultadoBatalla, setResultadoBatalla] = useState(null)
  const [resultadoRecoleccion, setResultadoRecoleccion] = useState(null)
  const [camposCeniza, setCamposCeniza] = useState([])
  const [campoSeleccionado, setCampoSeleccionado] = useState(null)
  const [escoltaSeleccionada, setEscoltaSeleccionada] = useState(escoltaInicial)
  const [aldeaSeleccionada, setAldeaSeleccionada] = useState(null)
const [tropasAtaque, setTropasAtaque] = useState(ataqueInicial)

  function puedePagar(costo) {
    return Object.entries(costo).every(([recurso, cantidad]) => {
      if (recurso === 'nombre') return true
      return reino.recursos[recurso] >= cantidad
    })
  }

  function entrenarTropa(tipo) {
    const costo = costosTropas[tipo]

    if (!puedePagar(costo)) {
      setMensaje(`No tenés recursos suficientes para entrenar ${costo.nombre}.`)
      return
    }

    setReino((reinoActual) => {
      const nuevosRecursos = { ...reinoActual.recursos }

      Object.entries(costo).forEach(([recurso, cantidad]) => {
        if (recurso !== 'nombre') {
          nuevosRecursos[recurso] -= cantidad
        }
      })

      return {
        ...reinoActual,
        recursos: nuevosRecursos,
        ejercito: {
          ...reinoActual.ejercito,
          [tipo]: reinoActual.ejercito[tipo] + 1,
        },
      }
    })

    setMensaje(`Entrenaste 1 ${costo.nombre}.`)
  }

  function calcularPoderAtaque() {
    const poderEspadachin = reino.mejoras.espadachines === 2 ? 14 : 10
    const poderArquero = reino.mejoras.arqueros === 2 ? 11 : 8

    return (
      reino.ejercito.espadachines * poderEspadachin +
      reino.ejercito.arqueros * poderArquero +
      reino.ejercito.jinetes * 22 +
      reino.heroes.rey.nivel * 35 +
      reino.heroes.reina.nivel * 20
    )
  }
function prepararAtaque(aldea) {
  setAldeaSeleccionada(aldea)
  setTropasAtaque(ataqueInicial)
  setResultadoBatalla(null)
  setMensaje(`Preparando ataque contra ${aldea.nombre}.`)
}

function cambiarTropasAtaque(tipo, valor) {
  const numero = Math.max(0, Math.floor(Number(valor) || 0))
  const maximo = reino.ejercito[tipo]

  setTropasAtaque((ataqueActual) => ({
    ...ataqueActual,
    [tipo]: Math.min(numero, maximo),
  }))
}

function calcularPoderAtaqueSeleccionado() {
  const poderEspadachin = reino.mejoras.espadachines === 2 ? 14 : 10
  const poderArquero = reino.mejoras.arqueros === 2 ? 11 : 8

  return (
    tropasAtaque.espadachines * poderEspadachin +
    tropasAtaque.arqueros * poderArquero +
    tropasAtaque.jinetes * 22 +
    reino.heroes.rey.nivel * 35 +
    reino.heroes.reina.nivel * 20
  )
}

function calcularCargaAtaqueSeleccionado() {
  return (
    tropasAtaque.espadachines * 10 +
    tropasAtaque.arqueros * 8 +
    tropasAtaque.jinetes * 25
  )
}

function calcularDefensaAldeaDespuesAtaque() {
  const espadachinesEnAldea =
    reino.ejercito.espadachines - tropasAtaque.espadachines

  const arquerosEnAldea =
    reino.ejercito.arqueros - tropasAtaque.arqueros

  const jinetesEnAldea =
    reino.ejercito.jinetes - tropasAtaque.jinetes

  return (
    espadachinesEnAldea * 8 +
    arquerosEnAldea * 11 +
    jinetesEnAldea * 18 +
    reino.mejoras.muralla * 120 +
    reino.heroes.rey.nivel * 30 +
    reino.heroes.reina.nivel * 20
  )
}
  function atacarAldea(aldea) {
    const poderBase = calcularPoderAtaque()
    const factorAzar = 0.85 + Math.random() * 0.3
    const poderFinal = Math.round(poderBase * factorAzar)

    const defensaTotal =
      aldea.defensa + aldea.muralla * 60 + aldea.torres * 80

    let tipoResultado = 'Derrota'
    let porcentajeBotin = 0.05
    let porcentajePerdidas = 0.25
    let destruccion = Math.round((poderFinal / defensaTotal) * 60)

    if (poderFinal >= defensaTotal) {
      tipoResultado = 'Victoria'
      porcentajeBotin = 0.35
      porcentajePerdidas = 0.1
      destruccion = Math.min(100, Math.round((poderFinal / defensaTotal) * 75))
    } else if (poderFinal >= defensaTotal * 0.65) {
      tipoResultado = 'Victoria parcial'
      porcentajeBotin = 0.2
      porcentajePerdidas = 0.15
      destruccion = Math.min(75, destruccion)
    }

    const perdidas = {
      espadachines: Math.min(
        reino.ejercito.espadachines,
        Math.ceil(reino.ejercito.espadachines * porcentajePerdidas)
      ),
      arqueros: Math.min(
        reino.ejercito.arqueros,
        Math.ceil(reino.ejercito.arqueros * porcentajePerdidas)
      ),
      jinetes: Math.min(
        reino.ejercito.jinetes,
        Math.ceil(reino.ejercito.jinetes * porcentajePerdidas)
      ),
    }

    const botinGanado = {
      madera: Math.round(aldea.botin.madera * porcentajeBotin),
      piedra: Math.round(aldea.botin.piedra * porcentajeBotin),
      hierro: Math.round(aldea.botin.hierro * porcentajeBotin),
      comida: Math.round(aldea.botin.comida * porcentajeBotin),
      oro: Math.round(aldea.botin.oro * porcentajeBotin),
    }

    const nuevoCampo = {
      id: Date.now(),
      origen: aldea.nombre,
      riesgo: aldea.riesgo,
      duracion: '2 horas',
      recursos: {
        madera: Math.round(aldea.botin.madera * 0.45),
        piedra: Math.round(aldea.botin.piedra * 0.45),
        hierro: Math.round(aldea.botin.hierro * 0.45),
        comida: Math.round(aldea.botin.comida * 0.25),
        oro: Math.round(aldea.botin.oro * 0.3),
      },
      restos: aldea.restos,
    }

    setReino((reinoActual) => ({
      ...reinoActual,
      recursos: {
        madera: reinoActual.recursos.madera + botinGanado.madera,
        piedra: reinoActual.recursos.piedra + botinGanado.piedra,
        hierro: reinoActual.recursos.hierro + botinGanado.hierro,
        comida: reinoActual.recursos.comida + botinGanado.comida,
        oro: reinoActual.recursos.oro + botinGanado.oro,
      },
      ejercito: {
        espadachines: reinoActual.ejercito.espadachines - perdidas.espadachines,
        arqueros: reinoActual.ejercito.arqueros - perdidas.arqueros,
        jinetes: reinoActual.ejercito.jinetes - perdidas.jinetes,
      },
    }))

    setCamposCeniza((camposActuales) => [nuevoCampo, ...camposActuales])

    setResultadoBatalla({
      aldea: aldea.nombre,
      tipoResultado,
      poderBase,
      poderFinal,
      defensaTotal,
      destruccion,
      botinGanado,
      perdidas,
      campo: nuevoCampo,
    })

    setResultadoRecoleccion(null)
    setMensaje(`Atacaste ${aldea.nombre}. Resultado: ${tipoResultado}.`)
  }
  function prepararRecoleccion(campo) {
  setCampoSeleccionado(campo)
  setEscoltaSeleccionada(escoltaInicial)
  setResultadoRecoleccion(null)
  setMensaje(`Preparando recolección en ${campo.origen}.`)
}

function cambiarEscolta(tipo, valor) {
  const numero = Math.max(0, Math.floor(Number(valor) || 0))
  const maximo = reino.ejercito[tipo]

  setEscoltaSeleccionada((escoltaActual) => ({
    ...escoltaActual,
    [tipo]: Math.min(numero, maximo),
  }))
}

function calcularPoderEscolta() {
  return (
    escoltaSeleccionada.espadachines * 12 +
    escoltaSeleccionada.arqueros * 10 +
    escoltaSeleccionada.jinetes * 26
  )
}

function calcularDefensaAldeaConEscolta() {
  const espadachinesEnAldea =
    reino.ejercito.espadachines - escoltaSeleccionada.espadachines

  const arquerosEnAldea =
    reino.ejercito.arqueros - escoltaSeleccionada.arqueros

  const jinetesEnAldea =
    reino.ejercito.jinetes - escoltaSeleccionada.jinetes

  return (
    espadachinesEnAldea * 8 +
    arquerosEnAldea * 11 +
    jinetesEnAldea * 18 +
    reino.mejoras.muralla * 120 +
    reino.heroes.rey.nivel * 30 +
    reino.heroes.reina.nivel * 20
  )
}

function calcularRiesgoFinalConEscolta() {
  if (!campoSeleccionado) return 0

  const riesgoBase = campoSeleccionado.riesgo
  const poderEscolta = calcularPoderEscolta()

  const reduccionPorEscolta = Math.min(40, Math.floor(poderEscolta / 25))

  return Math.max(5, riesgoBase - reduccionPorEscolta)
}

  function recolectarCampo(campo, tipo, escolta = escoltaInicial) {
  const configuracion = tiposRecoleccion[tipo]

  const poderEscolta =
    escolta.espadachines * 12 +
    escolta.arqueros * 10 +
    escolta.jinetes * 26

  const riesgoBase = Math.round(campo.riesgo * configuracion.riesgoModificador)
  const reduccionPorEscolta = Math.min(40, Math.floor(poderEscolta / 25))
  const riesgoFinal = Math.max(5, riesgoBase - reduccionPorEscolta)

  const fueInterceptado = Math.random() * 100 < riesgoFinal

  let multiplicadorRecursos = configuracion.porcentajeRecursos
  let chanceItems = configuracion.chanceItems
  let mensajeIntercepcion = 'La caravana llegó sin problemas.'

  let porcentajePerdidasEscolta = 0

  if (fueInterceptado) {
    const poderEmboscada = Math.round(
      campo.riesgo * 5 + (tipo === 'profunda' ? 100 : 60)
    )

    if (poderEscolta === 0) {
      multiplicadorRecursos *= 0.15
      chanceItems *= 0.05
      mensajeIntercepcion =
        'La caravana no tenía escolta y fue saqueada casi por completo.'
    } else if (poderEscolta >= poderEmboscada) {
      multiplicadorRecursos *= 0.85
      chanceItems *= 0.75
      porcentajePerdidasEscolta = 0.1
      mensajeIntercepcion =
        'La escolta ganó la intercepción y protegió gran parte del botín.'
    } else if (poderEscolta >= poderEmboscada * 0.65) {
      multiplicadorRecursos *= 0.45
      chanceItems *= 0.35
      porcentajePerdidasEscolta = 0.22
      mensajeIntercepcion =
        'La escolta resistió y la caravana escapó con parte del botín.'
    } else {
      multiplicadorRecursos *= 0.2
      chanceItems *= 0.1
      porcentajePerdidasEscolta = 0.4
      mensajeIntercepcion =
        'La escolta fue derrotada y la caravana perdió casi todo.'
    }
  }

  const perdidasEscolta = {
    espadachines: Math.min(
      escolta.espadachines,
      Math.ceil(escolta.espadachines * porcentajePerdidasEscolta)
    ),
    arqueros: Math.min(
      escolta.arqueros,
      Math.ceil(escolta.arqueros * porcentajePerdidasEscolta)
    ),
    jinetes: Math.min(
      escolta.jinetes,
      Math.ceil(escolta.jinetes * porcentajePerdidasEscolta)
    ),
  }

  const recursosRecuperados = {
    madera: Math.round(campo.recursos.madera * multiplicadorRecursos),
    piedra: Math.round(campo.recursos.piedra * multiplicadorRecursos),
    hierro: Math.round(campo.recursos.hierro * multiplicadorRecursos),
    comida: Math.round(campo.recursos.comida * multiplicadorRecursos),
    oro: Math.round(campo.recursos.oro * multiplicadorRecursos),
  }

  let itemsRecuperados = campo.restos.filter(() => Math.random() < chanceItems)

  if (!fueInterceptado && itemsRecuperados.length === 0 && Math.random() < 0.5) {
    const itemAleatorio =
      campo.restos[Math.floor(Math.random() * campo.restos.length)]
    itemsRecuperados = [itemAleatorio]
  }

  setReino((reinoActual) => {
    const nuevoInventario = { ...reinoActual.inventario }

    itemsRecuperados.forEach((item) => {
      nuevoInventario[item] += 1
    })

    return {
      ...reinoActual,
      recursos: {
        madera: reinoActual.recursos.madera + recursosRecuperados.madera,
        piedra: reinoActual.recursos.piedra + recursosRecuperados.piedra,
        hierro: reinoActual.recursos.hierro + recursosRecuperados.hierro,
        comida: reinoActual.recursos.comida + recursosRecuperados.comida,
        oro: reinoActual.recursos.oro + recursosRecuperados.oro,
      },
      ejercito: {
        espadachines:
          reinoActual.ejercito.espadachines - perdidasEscolta.espadachines,
        arqueros: reinoActual.ejercito.arqueros - perdidasEscolta.arqueros,
        jinetes: reinoActual.ejercito.jinetes - perdidasEscolta.jinetes,
      },
      inventario: nuevoInventario,
    }
  })

  setCamposCeniza((camposActuales) =>
    camposActuales.filter((campoActual) => campoActual.id !== campo.id)
  )

  setResultadoRecoleccion({
    tipo: configuracion.nombre,
    origen: campo.origen,
    fueInterceptado,
    riesgoFinal,
    recursosRecuperados,
    itemsRecuperados,
    perdidasEscolta,
    escoltaEnviada: escolta,
    poderEscolta,
    mensajeIntercepcion,
  })

  setCampoSeleccionado(null)
  setEscoltaSeleccionada(escoltaInicial)
  setMensaje(`${configuracion.nombre} completada en ${campo.origen}.`)
}

  function puedeMejorar(mejora) {
    const cumpleNivel =
      reino.mejoras[mejora.tipo] === mejora.nivelActualNecesario

    const tieneRecursos = Object.entries(mejora.costoRecursos).every(
      ([recurso, cantidad]) => reino.recursos[recurso] >= cantidad
    )

    const tieneItems = Object.entries(mejora.costoItems).every(
      ([item, cantidad]) => reino.inventario[item] >= cantidad
    )

    return cumpleNivel && tieneRecursos && tieneItems
  }

  function comprarMejora(idMejora) {
    const mejora = mejorasDisponibles[idMejora]

    if (!puedeMejorar(mejora)) {
      setMensaje(`Todavía no tenés lo necesario para desbloquear ${mejora.nombre}.`)
      return
    }

    setReino((reinoActual) => {
      const nuevosRecursos = { ...reinoActual.recursos }
      const nuevoInventario = { ...reinoActual.inventario }

      Object.entries(mejora.costoRecursos).forEach(([recurso, cantidad]) => {
        nuevosRecursos[recurso] -= cantidad
      })

      Object.entries(mejora.costoItems).forEach(([item, cantidad]) => {
        nuevoInventario[item] -= cantidad
      })

      return {
        ...reinoActual,
        recursos: nuevosRecursos,
        inventario: nuevoInventario,
        mejoras: {
          ...reinoActual.mejoras,
          [mejora.tipo]: mejora.nuevoNivel,
        },
      }
    })

    setMensaje(`Mejora desbloqueada: ${mejora.nombre}.`)
  }

  function mostrarCostoRecursos(costoRecursos) {
    return Object.entries(costoRecursos)
      .map(([recurso, cantidad]) => `${cantidad} ${recurso}`)
      .join(' / ')
  }

  function mostrarCostoItems(costoItems) {
    return Object.entries(costoItems)
      .map(([item, cantidad]) => `${cantidad} ${nombresItems[item]}`)
      .join(' / ')
  }

  return (
    <main className="game">
      <section className="hero">
        <p className="eyebrow">Prototipo inicial</p>
        <h1>{reino.nombre}</h1>
        <p>
          Construí tu reino, atacá fortalezas, recuperá los restos de la guerra
          y forjá tu imperio.
        </p>
      </section>

      <section className="panel">
        <h2>Aldea</h2>
        <p>Ayuntamiento nivel {reino.ayuntamiento}</p>
      </section>

      <section className="grid">
        <div className="card">
          <h3>Recursos</h3>
          <ul>
            <li>Madera: {reino.recursos.madera}</li>
            <li>Piedra: {reino.recursos.piedra}</li>
            <li>Hierro: {reino.recursos.hierro}</li>
            <li>Comida: {reino.recursos.comida}</li>
            <li>Oro: {reino.recursos.oro}</li>
          </ul>
        </div>

        <div className="card">
          <h3>Ejército</h3>
          <ul>
            <li>Espadachines: {reino.ejercito.espadachines}</li>
            <li>Arqueros: {reino.ejercito.arqueros}</li>
            <li>Jinetes: {reino.ejercito.jinetes}</li>
          </ul>
          <p>Poder de ataque: {calcularPoderAtaque()}</p>
        </div>

        <div className="card">
          <h3>Héroes</h3>
          <ul>
            <li>{reino.heroes.rey.nombre} — Nivel {reino.heroes.rey.nivel}</li>
            <li>{reino.heroes.reina.nombre} — Nivel {reino.heroes.reina.nivel}</li>
          </ul>
        </div>

        <div className="card">
          <h3>Mejoras activas</h3>
          <ul>
            <li>Espadachines nivel {reino.mejoras.espadachines}</li>
            <li>Arqueros nivel {reino.mejoras.arqueros}</li>
            <li>Muralla nivel {reino.mejoras.muralla}</li>
          </ul>
        </div>

        <div className="card">
          <h3>Inventario de guerra</h3>
          <ul>
            {Object.entries(reino.inventario).map(([item, cantidad]) => (
              <li key={item}>
                {nombresItems[item]}: {cantidad}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="actions">
        <button onClick={() => setMostrarEntrenamiento(!mostrarEntrenamiento)}>
          Entrenar tropas
        </button>

        <button
          onClick={() => {
            setMostrarAtaques(!mostrarAtaques)
            setMostrarCampos(false)
            setMostrarMejoras(false)
          }}
        >
          Buscar aldea enemiga
        </button>

        <button
          onClick={() => {
            setMostrarCampos(!mostrarCampos)
            setMostrarAtaques(false)
            setMostrarMejoras(false)
          }}
        >
          Ver Campos de Ceniza ({camposCeniza.length})
        </button>

        <button
          onClick={() => {
            setMostrarMejoras(!mostrarMejoras)
            setMostrarAtaques(false)
            setMostrarCampos(false)
          }}
        >
          Herrería y Tecnología
        </button>
      </section>

      {mensaje && <p className="message global-message">{mensaje}</p>}

      {mostrarEntrenamiento && (
        <section className="panel training-panel">
          <h2>Cuartel</h2>
          <p>Elegí qué tropa querés entrenar.</p>

          <div className="train-buttons">
            <button onClick={() => entrenarTropa('espadachines')}>
              Espadachín — 50 comida / 25 hierro
            </button>

            <button onClick={() => entrenarTropa('arqueros')}>
              Arquero — 30 madera / 40 comida / 10 oro
            </button>

            <button onClick={() => entrenarTropa('jinetes')}>
              Jinete — 120 comida / 80 hierro / 40 oro
            </button>
          </div>
        </section>
      )}

      {mostrarAtaques && (
  <section className="panel training-panel">
    <h2>Aldeas enemigas detectadas</h2>
    <p>Poder de ataque actual: {calcularPoderAtaque()}</p>

    <div className="enemy-grid">
      {aldeasEnemigas.map((aldea) => (
        <div className="enemy-card" key={aldea.id}>
          <h3>{aldea.nombre}</h3>
          <p>Dificultad: {aldea.dificultad}</p>
          <p>Defensa base: {aldea.defensa}</p>
          <p>Muralla nivel {aldea.muralla}</p>
          <p>Torres: {aldea.torres}</p>
          <p>Riesgo del Campo de Ceniza: {aldea.riesgo}%</p>

          <div className="field-actions">
            <button onClick={() => prepararAtaque(aldea)}>
              Preparar ataque
            </button>

            <button onClick={() => atacarAldea(aldea)}>
              Atacar con todo
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
)}
      
      {aldeaSeleccionada && (
  <section className="escort-panel">
    <h2>Preparar ataque</h2>
    <h3>{aldeaSeleccionada.nombre}</h3>

    <p>Dificultad: {aldeaSeleccionada.dificultad}</p>
    <p>Defensa estimada enemiga: {aldeaSeleccionada.defensa}</p>
    <p>Muralla nivel {aldeaSeleccionada.muralla}</p>
    <p>Torres: {aldeaSeleccionada.torres}</p>

    <h4>Elegir tropas para atacar</h4>

    <div className="escort-grid">
      <label>
        Espadachines
        <input
          type="number"
          min="0"
          max={reino.ejercito.espadachines}
          value={tropasAtaque.espadachines}
          onChange={(event) =>
            cambiarTropasAtaque('espadachines', event.target.value)
          }
        />
        <small>Disponibles: {reino.ejercito.espadachines}</small>
      </label>

      <label>
        Arqueros
        <input
          type="number"
          min="0"
          max={reino.ejercito.arqueros}
          value={tropasAtaque.arqueros}
          onChange={(event) =>
            cambiarTropasAtaque('arqueros', event.target.value)
          }
        />
        <small>Disponibles: {reino.ejercito.arqueros}</small>
      </label>

      <label>
        Jinetes
        <input
          type="number"
          min="0"
          max={reino.ejercito.jinetes}
          value={tropasAtaque.jinetes}
          onChange={(event) =>
            cambiarTropasAtaque('jinetes', event.target.value)
          }
        />
        <small>Disponibles: {reino.ejercito.jinetes}</small>
      </label>
    </div>

    <div className="preview-box">
      <p>Poder de ataque enviado: {calcularPoderAtaqueSeleccionado()}</p>
      <p>Capacidad de carga: {calcularCargaAtaqueSeleccionado()}</p>
      <p>Defensa que queda en la aldea: {calcularDefensaAldeaDespuesAtaque()}</p>
    </div>

    <button disabled>
      Enviar ataque seleccionado — próximo paso
    </button>
  </section>
)}

      {campoSeleccionado && (
  <section className="escort-panel">
    <h2>Preparar caravana</h2>
    <h3>{campoSeleccionado.origen}</h3>

    <p>
      Este campo fue seleccionado para preparar una recolección con escolta.
    </p>

    <p>Riesgo base: {campoSeleccionado.riesgo}%</p>

    <h4>Recursos disponibles en el campo</h4>
    <ul>
      <li>Madera: {campoSeleccionado.recursos.madera}</li>
      <li>Piedra: {campoSeleccionado.recursos.piedra}</li>
      <li>Hierro: {campoSeleccionado.recursos.hierro}</li>
      <li>Comida: {campoSeleccionado.recursos.comida}</li>
      <li>Oro: {campoSeleccionado.recursos.oro}</li>
    </ul>

    <h4>Restos posibles</h4>
    <p>
      {campoSeleccionado.restos
        .map((item) => nombresItems[item])
        .join(', ')}
    </p>
    <h4>Elegir escolta</h4>

<div className="escort-grid">
  <label>
    Espadachines
    <input
      type="number"
      min="0"
      max={reino.ejercito.espadachines}
      value={escoltaSeleccionada.espadachines}
      onChange={(event) =>
        cambiarEscolta('espadachines', event.target.value)
      }
    />
    <small>Disponibles: {reino.ejercito.espadachines}</small>
  </label>

  <label>
    Arqueros
    <input
      type="number"
      min="0"
      max={reino.ejercito.arqueros}
      value={escoltaSeleccionada.arqueros}
      onChange={(event) =>
        cambiarEscolta('arqueros', event.target.value)
      }
    />
    <small>Disponibles: {reino.ejercito.arqueros}</small>
  </label>

  <label>
    Jinetes
    <input
      type="number"
      min="0"
      max={reino.ejercito.jinetes}
      value={escoltaSeleccionada.jinetes}
      onChange={(event) =>
        cambiarEscolta('jinetes', event.target.value)
      }
    />
    <small>Disponibles: {reino.ejercito.jinetes}</small>
  </label>
</div>

<div className="preview-box">
  <p>Poder de escolta: {calcularPoderEscolta()}</p>
  <p>Riesgo final estimado: {calcularRiesgoFinalConEscolta()}%</p>
  <p>Defensa que queda en la aldea: {calcularDefensaAldeaConEscolta()}</p>
</div>
<div className="field-actions">
  <button
    onClick={() =>
      recolectarCampo(campoSeleccionado, 'rapida', escoltaSeleccionada)
    }
  >
    Enviar rápida
  </button>

  <button
    onClick={() =>
      recolectarCampo(campoSeleccionado, 'profunda', escoltaSeleccionada)
    }
  >
    Enviar profunda
  </button>
</div>
  </section>
)}

      {mostrarCampos && (
        <section className="panel training-panel">
          <h2>Campos de Ceniza</h2>

          {camposCeniza.length === 0 && (
            <p>No hay Campos de Ceniza disponibles. Atacá una aldea para generar uno.</p>
          )}

          <div className="enemy-grid">
            {camposCeniza.map((campo) => (
              <div className="enemy-card" key={campo.id}>
                <h3>{campo.origen}</h3>
                <p>Duración: {campo.duracion}</p>
                <p>Riesgo base de interceptación: {campo.riesgo}%</p>

                <h4>Recursos en el campo</h4>
                <ul>
                  <li>Madera: {campo.recursos.madera}</li>
                  <li>Piedra: {campo.recursos.piedra}</li>
                  <li>Hierro: {campo.recursos.hierro}</li>
                  <li>Comida: {campo.recursos.comida}</li>
                  <li>Oro: {campo.recursos.oro}</li>
                </ul>

                <h4>Restos posibles</h4>
                <p>{campo.restos.map((item) => nombresItems[item]).join(', ')}</p>

                <button onClick={() => prepararRecoleccion(campo)}>
  Preparar recolección
</button>

                
              </div>
            ))}
          </div>
        </section>
      )}

      {mostrarMejoras && (
        <section className="panel training-panel">
          <h2>Herrería y Tecnología</h2>
          <p>
            Usá los restos de guerra para desbloquear mejoras permanentes para
            tu reino.
          </p>

          <div className="enemy-grid">
            {Object.entries(mejorasDisponibles).map(([id, mejora]) => {
              const desbloqueada =
                reino.mejoras[mejora.tipo] >= mejora.nuevoNivel

              return (
                <div className="enemy-card" key={id}>
                  <h3>{mejora.nombre}</h3>
                  <p>{mejora.descripcion}</p>

                  <p>
                    Estado:{' '}
                    {desbloqueada ? 'Desbloqueada' : 'Pendiente'}
                  </p>

                  <h4>Costo recursos</h4>
                  <p>{mostrarCostoRecursos(mejora.costoRecursos)}</p>

                  <h4>Costo restos</h4>
                  <p>{mostrarCostoItems(mejora.costoItems)}</p>

                  <button
                    disabled={desbloqueada}
                    onClick={() => comprarMejora(id)}
                  >
                    {desbloqueada ? 'Ya desbloqueada' : 'Desbloquear'}
                  </button>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {resultadoBatalla && (
        <section className="panel result-panel">
          <h2>Resultado de batalla</h2>
          <h3>
            {resultadoBatalla.tipoResultado} contra {resultadoBatalla.aldea}
          </h3>

          <p>Poder base: {resultadoBatalla.poderBase}</p>
          <p>Poder final con azar: {resultadoBatalla.poderFinal}</p>
          <p>Defensa enemiga: {resultadoBatalla.defensaTotal}</p>
          <p>Destrucción causada: {resultadoBatalla.destruccion}%</p>

          <h3>Botín inicial</h3>
          <ul>
            <li>Madera: {resultadoBatalla.botinGanado.madera}</li>
            <li>Piedra: {resultadoBatalla.botinGanado.piedra}</li>
            <li>Hierro: {resultadoBatalla.botinGanado.hierro}</li>
            <li>Comida: {resultadoBatalla.botinGanado.comida}</li>
            <li>Oro: {resultadoBatalla.botinGanado.oro}</li>
          </ul>

          <h3>Tropas perdidas</h3>
          <ul>
            <li>Espadachines: {resultadoBatalla.perdidas.espadachines}</li>
            <li>Arqueros: {resultadoBatalla.perdidas.arqueros}</li>
            <li>Jinetes: {resultadoBatalla.perdidas.jinetes}</li>
          </ul>

          <h3>Campo de Ceniza generado</h3>
          <p>Origen: {resultadoBatalla.campo.origen}</p>
          <p>Duración: {resultadoBatalla.campo.duracion}</p>
          <p>Riesgo de interceptación: {resultadoBatalla.campo.riesgo}%</p>
          <p>
            Restos posibles:{' '}
            {resultadoBatalla.campo.restos
              .map((item) => nombresItems[item])
              .join(', ')}
          </p>
        </section>
      )}

      {resultadoRecoleccion && (
        <section className="panel result-panel">
          <h2>Resultado de recolección</h2>
          <h3>{resultadoRecoleccion.tipo}</h3>

          <p>Campo: {resultadoRecoleccion.origen}</p>
          <p>Riesgo final: {resultadoRecoleccion.riesgoFinal}%</p>

          {resultadoRecoleccion.fueInterceptado ? (
            <p className="danger">La caravana fue interceptada. Trajo menos botín.</p>
          ) : (
            <p className="message">La caravana llegó segura al reino.</p>
          )}
          {resultadoRecoleccion.mensajeIntercepcion && (
  <>
    <h3>Intercepción</h3>
    <p>{resultadoRecoleccion.mensajeIntercepcion}</p>
    <p>Poder de escolta: {resultadoRecoleccion.poderEscolta}</p>
  </>
)}

{resultadoRecoleccion.escoltaEnviada && (
  <>
    <h3>Escolta enviada</h3>
    <ul>
      <li>Espadachines: {resultadoRecoleccion.escoltaEnviada.espadachines}</li>
      <li>Arqueros: {resultadoRecoleccion.escoltaEnviada.arqueros}</li>
      <li>Jinetes: {resultadoRecoleccion.escoltaEnviada.jinetes}</li>
    </ul>
  </>
)}

          <h3>Recursos recuperados</h3>
          <ul>
            <li>Madera: {resultadoRecoleccion.recursosRecuperados.madera}</li>
            <li>Piedra: {resultadoRecoleccion.recursosRecuperados.piedra}</li>
            <li>Hierro: {resultadoRecoleccion.recursosRecuperados.hierro}</li>
            <li>Comida: {resultadoRecoleccion.recursosRecuperados.comida}</li>
            <li>Oro: {resultadoRecoleccion.recursosRecuperados.oro}</li>
          </ul>

          <h3>Objetos recuperados</h3>
          {resultadoRecoleccion.itemsRecuperados.length > 0 ? (
            <ul>
              {resultadoRecoleccion.itemsRecuperados.map((item, index) => (
                <li key={`${item}-${index}`}>{nombresItems[item]}</li>
              ))}
            </ul>
          ) : (
            <p>No se recuperaron objetos especiales.</p>
          )}

          {(resultadoRecoleccion.perdidasEscolta.espadachines > 0 ||
            resultadoRecoleccion.perdidasEscolta.arqueros > 0) && (
            <>
              <h3>Pérdidas de escolta</h3>
              <ul>
                <li>Espadachines: {resultadoRecoleccion.perdidasEscolta.espadachines}</li>
                <li>Arqueros: {resultadoRecoleccion.perdidasEscolta.arqueros}</li>
              </ul>
            </>
          )}
        </section>
      )}
    </main>
  )
}

export default App