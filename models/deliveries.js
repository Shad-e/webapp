import { apiKey, baseURL } from "../utils.js";


const deliveries = {
    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${baseURL}/deliveries?api_key=${apiKey}`);

        const result = await response.json();

        return result.data;
    },

    addDeliveries: async function addDeliveries(deliveryObject) {
        const addedDelivery = {
            ...deliveryObject,
            api_key: apiKey,
        };

        console.log("Added Delivery:", addedDelivery);

        try {
            const result = await fetch(`${baseURL}/deliveries`, {
                body: JSON.stringify(addedDelivery),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST'
            });

            if (!result.ok) {
                throw new Error(`Failed to add delivery: ${result.status} - ${result.statusText}`);
            }

            console.log("Delivery added successfully");
            return result;
        } catch (error) {
            console.error("Error adding delivery:", error);
            return null;
        }
    }
};

export default deliveries;
