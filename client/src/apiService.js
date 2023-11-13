const url = 'http://127.0.0.1:3001';

async function getAllTeas() {
    try {
        const response = await fetch(`${url}/tea`);
        return await response.json();
    } catch (error) {
        throw new Error(error);
    }
}

async function getAllFunfacts() {
    try {
        const response = await fetch(`${url}/funfact`);
        return await response.json();
    } catch (error) {
        throw new Error(error);
    }
}

async function validatePassword(username, password) {
    try {
        const response = await fetch(`${url}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        return await response.json();
    } catch (error) {
        throw new Error(error);
    }
}

async function registerUser(name, username, password) {
    try {
        const response = await fetch(`${url}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, username, password })
        });
        return await response.json();
    } catch (error) {
        throw new Error(error);
    }
}

async function getUser(token) {
    try {
        const response = await fetch(`${url}/user`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            },
        });
        return await response.json();
    } catch (error) {
        throw new Error(error);
    }
}

async function counter(direction) {
    const token = localStorage.getItem('accessToken');
    try {
        const response = await fetch(`${url}/user/tea/counter/${direction}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
        });
        if(response.ok) return await response.json();
    } catch (error) {
        throw new Error(error);
    }
}

async function brewTea(tea, token) {
    try {
        const response = await fetch(`${url}/user/tea/brew`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({ name: tea.name })
        });
        if(response.ok) return await response.json();
    } catch (error) {
        throw new Error(error);
    }
}

async function brewTime(time, token) {
    try {
        const response = await fetch(`${url}/user/tea/time/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({ time })
        });
        if(response.ok) return await response.json();
    } catch (error) {
        throw new Error(error);
    }
}

async function markAsFavourite(name, token) {
    try {
        const response = await fetch(`${url}/user/tea/favourite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({ name })
        });
        if(response.ok) return await response.json();
    } catch (error) {
        throw new Error(error);
    }
}

async function rateTea(name, rating, token) {
    try {
        const response = await fetch(`${url}/user/tea/rate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({ name, rating })
        });
        if(response.ok) return await response.json();
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { getAllTeas, getAllFunfacts, validatePassword, registerUser, getUser, counter, brewTea, brewTime, markAsFavourite, rateTea };