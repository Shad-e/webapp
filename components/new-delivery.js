import deliveriesModel from "../models/deliveries.js";
import productsModel from "../models/products.js";


export default class newDelivery extends HTMLElement {
    constructor() {
        super();

        this.delivery = {};
        this.products = [];
    }

    async createDelivery() {
        const addedDelivery = {
            "product_id": this.delivery.product_id,
            "amount": this.delivery.amount,
            "delivery_date": this.delivery.delivery_date,
            "comment": this.delivery.comment,
        };
        const result = await deliveriesModel.addDeliveries(addedDelivery);

        if (result !== null && result.status < 300) {
            console.log("Delivery added successfully");

            const updatedProduct = {
                "id": this.delivery.product_id,
                "stock": this.delivery.current_stock + this.delivery.amount,
                "name": this.delivery.product_name,
            };

            const productUpdateResult = await productsModel.updateProduct(updatedProduct);

            if (productUpdateResult.status < 300) {
                console.log("Product stock updated successfully.");
            } else {
                console.error("Failed to update product stock.");
            }

            location.hash = "deliveries";
        }   else {
            console.error("Failed to add delivery.");
        }
    }

    async connectedCallback() {
        this.products = await productsModel.getProducts();
        this.render();
    }

    render() {
        let form = document.createElement("form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            if (this.delivery.product_id > 0 &&
                this.delivery.amount > 0 &&
                this.delivery.delivery_date
            ) {
                this.createDelivery();
            }
        });

        let productLabel = document.createElement("label");

        productLabel.textContent = "Produkt:";
        productLabel.classList.add("label");
        productLabel.setAttribute("for", "productSelect");

        let productSelect = document.createElement("select");

        productSelect.setAttribute("required", "required");
        productSelect.classList.add("input", "product");

        let productOption = document.createElement("option");

        productOption.setAttribute("value", -99);
        productOption.textContent = "Välj en produkt";
        productSelect.appendChild(productOption);

        this.products.forEach((item) => {
            let productOption = document.createElement("option");

            productOption.setAttribute("value", item.id);
            productOption.dataset.stock = item.stock;
            productOption.textContent = item.name;
            productSelect.appendChild(productOption);
        });

        productSelect.addEventListener("change", (event) => {
            this.delivery = {
                ...this.delivery,
                product_id: parseInt(event.target.value),
                current_stock: parseInt(event.target.selectedOptions[0].dataset.stock),
            };
        });


        let amountLabel = document.createElement("label");

        amountLabel.textContent = "Antal:";
        amountLabel.classList.add("label");
        amountLabel.setAttribute("for", "amountSelect");

        let amountInput = document.createElement("input");

        amountInput.setAttribute("type", "number");
        amountInput.setAttribute("required", "required");
        amountInput.classList.add("input", "amount");
        amountInput.addEventListener("input", (event) => {
            this.delivery = {
                ...this.delivery,
                amount: parseInt(event.target.value),
            };
        });


        let dateLabel = document.createElement("label");

        dateLabel.textContent = "Datum:";
        dateLabel.classList.add("label");
        dateLabel.setAttribute("for", "dateSelect");

        let dateInput = document.createElement("input");

        dateInput.setAttribute("type", "date");
        dateInput.setAttribute("required", "required");
        dateInput.classList.add("input", "date");
        dateInput.addEventListener("change", (event) => {
            this.delivery = {
                ...this.delivery,
                delivery_date: event.target.value,
            };
        });

        let commentLabel = document.createElement("label");

        commentLabel.textContent = "Kommentar:";
        commentLabel.classList.add("label");
        commentLabel.setAttribute("for", "commentSelect");

        let commentInput = document.createElement("textarea");

        commentInput.setAttribute("required", "required");
        commentInput.classList.add("input", "comment");
        commentInput.addEventListener("input", (event) => {
            this.delivery = {
                ...this.delivery,
                comment: event.target.value,
            };
        });


        let submitButton = document.createElement("input");

        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("value", "Skapa inleverans");
        submitButton.classList.add("button", "green-button");

        form.appendChild(productLabel);
        form.appendChild(document.createElement("br"));
        form.appendChild(productSelect);
        form.appendChild(document.createElement("br"));

        form.appendChild(amountLabel);
        form.appendChild(document.createElement("br"));
        form.appendChild(amountInput);
        form.appendChild(document.createElement("br"));

        form.appendChild(dateLabel);
        form.appendChild(document.createElement("br"));
        form.appendChild(dateInput);
        form.appendChild(document.createElement("br"));

        form.appendChild(commentLabel);
        form.appendChild(document.createElement("br"));
        form.appendChild(commentInput);
        form.appendChild(document.createElement("br"));

        form.appendChild(submitButton);

        this.appendChild(form);
    }
}
