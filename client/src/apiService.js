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

module.exports = { getAllTeas, getAllFunfacts };