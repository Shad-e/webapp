import { apiKey, baseURL } from "../utils.js";


const orders = {
    getOrders: async function getOrders() {
        const response = await fetch(`${baseURL}/orders?api_key=${apiKey}`);

        const result = await response.json();

        return result.data;
    },

    updateStock: async function updateStock(stockObject) {
        const updatedStock = {
            ...stockObject,
            api_key: apiKey
        };

        await fetch(`${baseURL}/orders`, {
            body: JSON.stringify(updatedStock),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        });
    }
};

export default orders;
