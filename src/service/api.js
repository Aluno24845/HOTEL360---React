//lista de apis

export function getQuartos() {
    return fetch('https://localhost:7130/api/quartos')
}
export function getQuartoComId(id) {
    return fetch(`https://localhost:7130/api/quartos/${id}`)
}
export function getReservas() {
    return fetch('https://localhost:7130/api/reservas')
}
export function getReservaComId(id) {
    return fetch(`https://localhost:7130/api/reservas/${id}`)
}

export function criarQuarto(data) {
    return fetch('https://localhost:7130/api/quartos', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
}
export function editarQuarto(id, data) {
    return fetch(`https://localhost:7130/api/quartos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
}
export function apagaQuarto(id) {
    return fetch(`https://localhost:7130/api/quartos/${id}`, {
        method: "DELETE"
    })
}

export function getServicos() {
    return fetch('https://localhost:7130/api/servicos')
}

export function criarReserva(data) {
    debugger
    return fetch('https://localhost:7130/api/reservas', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
}

export function editarReserva(id, data) {
    return fetch(`https://localhost:7130/api/reservas/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
}

export function apagaReserva(id) {
    return fetch(`https://localhost:7130/api/reservas/${id}`, {
        method: "DELETE"
    })
}
