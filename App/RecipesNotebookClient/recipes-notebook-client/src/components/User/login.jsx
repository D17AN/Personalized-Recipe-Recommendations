import BASE_URL from "../../../config"

export const login = async (email, password) => {

    const response =  await fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });

    return await response.json();
}