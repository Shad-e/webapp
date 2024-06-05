import { apiKey } from "../utils.js";
import productsModel from "../models/products.js";
import ordersModel from "../models/orders.js";



export default class SingleOrder extends HTMLElement {
    static get observedAttributes() {
        return ["order"];
    }

    get order() {
        return JSON.parse(this.getAttribute("order"));
    }

    async packOrder(order) {
        console.log(order);

        let failedUpdate = false;

        for (let i = 0; i < order.order_items.length; i++) {
            let item = order.order_items[i];
            const updatedProduct = {
                "id": item.product_id,
                "name": item.name,
                "stock": item.stock - item.amount,
            };
            const result = await productsModel.updateProduct(updatedProduct);

            if (result.status > 299) {
                failedUpdate = true;
            }
        }

        if (!failedUpdate) {
            const updatedStock = {
                "id": order.id,
                "name": order.name,
                "status_id": 200,
                "api_key": apiKey,
            };

            await ordersModel.updateStock(updatedStock);

            this.remove();
        }
    }


    connectedCallback() {
        let container = document.createElement("div");

        container.className = "container";

        const orderItems = this.order.order_items.map((item) => {
            return `
                <div class="orderlista">
                    <span class="stocklocation">Produkt: ${item.name}</span>
                    <span class="stocklocation">Antal: ${item.amount}</span>
                    <span class="stocklocation">Plats: ${item.location}</span>
                </div>
            `;
        }).join("");

        container.innerHTML = `<h3 class="productname">${this.order.name}</h3>${orderItems}`;

        this.appendChild(container);

        console.log(this.order);

        let canPackOrder = true;

        this.order.order_items.forEach((item) => {
            if (item.stock < item.amount) {
                canPackOrder = false;
            }
        });

        if (canPackOrder) {
            let button = document.createElement("button");

            button.textContent = "Packa order";
            button.classList.add("button");
            button.addEventListener("click", () => {
                this.packOrder(this.order);
            });
            container.appendChild(button);
        }
    }
}
