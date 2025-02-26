const BASE_URL = 'http://localhost:3000';

const register = async ({ name, email, password }) => {
    const body = { name, email, password };
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    })

    const data = await response.json();
    return data;
}

const login = async ({ email, password }) => {
    const body = { email, password };
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    })

    const data = await response.json();
    return data;
}

export { register, login };