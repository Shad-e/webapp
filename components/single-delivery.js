export default class SingleDelivery extends HTMLElement {
    static get observedAttributes() {
        return ["delivery"];
    }

    get delivery() {
        return JSON.parse(this.getAttribute("delivery"));
    }



    connectedCallback() {
        this.innerHTML =
        `
        <h3 class="deliveryname">${this.delivery.product_name}</h1>
        <p class="deliveryamount">Antal: ${this.delivery.amount}</p>
        <p class="deliverydate">Leveransdatum: ${this.delivery.delivery_date}</p>
        <p class="deliverycomment">Kommentar: ${this.delivery.comment}</p>
        `;
    }
}
