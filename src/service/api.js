//lista de apis
export function autenticar(data) {
    return fetch('https://localhost:7130/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export function getQuartoDisponivel(de, ate) {
    return fetch(`https://localhost:7130/api/quartos/disponivel?de=${de}&ate=${ate}`, {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }
    })
}

export function getMyself() {
    return fetch('https://localhost:7130/api/utilizadores/myself', {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }
    })
}
export function getUtilizadores() {
    return fetch('https://localhost:7130/api/utilizadores', {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }
    })
}
export function getUtilizador(id) {
    return fetch('https://localhost:7130/api/utilizadores/' + id, {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }
    })
}
export function criarHospede(d) {
    let data = new FormData();
    for (const key of Object.keys(d)) {
        data.append(key, d[key]);
    }
    return fetch('https://localhost:7130/api/utilizadores', {
        method: "POST",
        body: data,
        headers: {
            // 'Content-Type': 'application/json',
        }
    })
}

export function editarUtilizador(id, d) {
    let data = new FormData();
    for (const key of Object.keys(d)) {
        data.append(key, d[key]);
    }
    return fetch('https://localhost:7130/api/utilizadores/' + id, {
        method: "PUT",
        body: data,
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            // 'Content-Type': 'application/json',
        }
    })
}

export function criarUtilizador(d) {
    let data = new FormData();
    for (const key of Object.keys(d)) {
        data.append(key, d[key]);
    }
    return fetch('https://localhost:7130/api/utilizadores', {
        method: "POST",
        body: data,
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            // 'Content-Type': 'application/json',
        }
    })
}

export function apagarUtilizador(id) {
    return fetch('https://localhost:7130/api/utilizadores/' + id, {
        method: "DELETE",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }
    })
}

export function getQuartos() {
    return fetch('https://localhost:7130/api/quartos')
}
export function getQuartoComId(id) {
    return fetch(`https://localhost:7130/api/quartos/${id}`)
}
export function getReservas() {
    return fetch('https://localhost:7130/api/reservas', {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }
    })
}
export function getReservaComId(id) {
    return fetch(`https://localhost:7130/api/reservas/${id}`, {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }
    })
}


export function getHospedes() {
    return fetch('https://localhost:7130/api/utilizadores/hospedes', {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }
    })
}

export function criarQuarto(d) {
    let data = new FormData();
    for (const key of Object.keys(d)) {
        data.append(key, d[key]);
    }
    return fetch('https://localhost:7130/api/quartos', {
        method: 'POST',
        body: data,
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token')
        }
    })
}
export function editarQuarto(id, d) {
    let data = new FormData();
    for (const key of Object.keys(d)) {
        if (d === 'Descricao' || d === 'PrecoAux') {
            data.append(key, d[key].toString());
        } else {
            data.append(key, d[key]);
        }
    }
    return fetch(`https://localhost:7130/api/quartos/${id}`, {
        method: 'PUT',
        body: data,
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
        }
    })
}
export function apagaQuarto(id) {
    return fetch(`https://localhost:7130/api/quartos/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}

export function getServicos() {
    return fetch('https://localhost:7130/api/servicos')
}

export function getServicoComId(id) {
    return fetch(`https://localhost:7130/api/servicos/${id}`)
}

export function criarServico(data) {
    return fetch('https://localhost:7130/api/servicos', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
export function editarServico(id, data) {
    return fetch(`https://localhost:7130/api/servicos/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}


export function apagarServico(id) {
    return fetch(`https://localhost:7130/api/servicos/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
        }
    })
}


export function criarReserva(data) {
    return fetch('https://localhost:7130/api/reservas', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }

    })
}

export function editarReserva(id, data) {
    data.HospedeId = 5;
    return fetch(`https://localhost:7130/api/reservas/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}

export function apagaReserva(id) {
    return fetch(`https://localhost:7130/api/reservas/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
        }
    })
}
