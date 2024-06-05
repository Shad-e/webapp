import deliveriesModel from "../models/deliveries.js";

export default class DeliveriesList extends HTMLElement {
    constructor() {
        super();

        this.deliveries = [];
    }

    async connectedCallback() {
        this.deliveries = await deliveriesModel.getDeliveries();
        console.log(this.deliveries);
        this.render();
    }

    render() {
        const list = this.deliveries
            .map(delivery =>
                `<single-delivery delivery='${JSON.stringify(delivery)}'></single-delivery>`)
            .join("");

        const deliveriesHTML = list ? list : "Inga nya leveranser";

        this.innerHTML = `<h2 class="deliveryheader">Inleveranser</h2>
                          <a href='#deliveries-form' class="button">Ny inleverans</a>
                          <h2 class="deliverylist">Nya inleveranser</h2>${deliveriesHTML}`;
    }
}
