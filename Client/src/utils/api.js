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

const addCustomer = async ({ name, email, phone, address, token }) => {
    const body = { name, email, phone, address };
    console.log(body);

    const response = await fetch(`${BASE_URL}/customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(body),
    })
    const data = await response.json();
    console.log(data);

    return data;
}

const deleteCustomer = async ({ id, token }) => {
    const response = await fetch(`${BASE_URL}/customer/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
    })
    const data = await response.json();
    return data;
}

const getAllCustomers = async ({ token }) => {
    const response = await fetch(`${BASE_URL}/customer`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
    })
    const data = await response.json();
    return data;
}

const getCustomer = async ({ id, token }) => {
    const response = await fetch(`${BASE_URL}/customer/${id}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
    })
    const data = await response.json();
    return data;
}

const updateCustomer = async ({ id, name, email, phone, address, token }) => {
    const body = { name, email, phone, address };
    const response = await fetch(`${BASE_URL}/customer/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(body),
    })
    const data = await response.json();
    return data;
}

export {
    register,
    login,
    addCustomer,
    deleteCustomer,
    getAllCustomers,
    getCustomer,
    updateCustomer
};