import BASE_URL from "../../../config"

export const register = async (email, name, password) => {
    
    const response = await fetch(`${BASE_URL}/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, name, password})
    });

    return await response.json();
}