//lista de apis
export function autenticar(data) {
    return fetch('https://hotel360dweb.azurewebsites.net/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export function getQuartoDisponivel(de, ate) {
    return fetch(`https://hotel360dweb.azurewebsites.net/api/quartos/disponivel?de=${de}&ate=${ate}`, {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }
    })
}

export function getMyself() {
    return fetch('https://hotel360dweb.azurewebsites.net/api/utilizadores/myself', {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }
    })
}
export function getUtilizadores() {
    return fetch('https://hotel360dweb.azurewebsites.net/api/utilizadores', {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }
    })
}
export function getUtilizador(id) {
    return fetch('https://hotel360dweb.azurewebsites.net/api/utilizadores/' + id, {
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
    return fetch('https://hotel360dweb.azurewebsites.net/api/utilizadores', {
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
    return fetch('https://hotel360dweb.azurewebsites.net/api/utilizadores/' + id, {
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
    return fetch('https://hotel360dweb.azurewebsites.net/api/utilizadores', {
        method: "POST",
        body: data,
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            // 'Content-Type': 'application/json',
        }
    })
}

export function apagarUtilizador(id) {
    return fetch('https://hotel360dweb.azurewebsites.net/api/utilizadores/' + id, {
        method: "DELETE",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }
    })
}

export function getQuartos() {
    return fetch('https://hotel360dweb.azurewebsites.net/api/quartos')
}
export function getQuartoComId(id) {
    return fetch(`https://hotel360dweb.azurewebsites.net/api/quartos/${id}`)
}
export function getReservas() {
    return fetch('https://hotel360dweb.azurewebsites.net/api/reservas', {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }
    })
}
export function getReservaComId(id) {
    return fetch(`https://hotel360dweb.azurewebsites.net/api/reservas/${id}`, {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }
    })
}


export function getHospedes() {
    return fetch('https://hotel360dweb.azurewebsites.net/api/utilizadores/hospedes', {
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
    return fetch('https://hotel360dweb.azurewebsites.net/api/quartos', {
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
    return fetch(`https://hotel360dweb.azurewebsites.net/api/quartos/${id}`, {
        method: 'PUT',
        body: data,
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
        }
    })
}
export function apagaQuarto(id) {
    return fetch(`https://hotel360dweb.azurewebsites.net/api/quartos/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}

export function getServicos() {
    return fetch('https://hotel360dweb.azurewebsites.net/api/servicos')
}

export function getServicoComId(id) {
    return fetch(`https://hotel360dweb.azurewebsites.net/api/servicos/${id}`)
}

export function criarServico(data) {
    return fetch('https://hotel360dweb.azurewebsites.net/api/servicos', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
export function editarServico(id, data) {
    return fetch(`https://hotel360dweb.azurewebsites.net/api/servicos/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}


export function apagarServico(id) {
    return fetch(`https://hotel360dweb.azurewebsites.net/api/servicos/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
        }
    })
}


export function criarReserva(data) {
    return fetch('https://hotel360dweb.azurewebsites.net/api/reservas', {
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
    return fetch(`https://hotel360dweb.azurewebsites.net/api/reservas/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}

export function apagaReserva(id) {
    return fetch(`https://hotel360dweb.azurewebsites.net/api/reservas/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
        }
    })
}
