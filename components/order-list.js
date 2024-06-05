import ordersModel from "../models/orders.js";


export default class OrderList extends HTMLElement {
    constructor() {
        super();

        this.orders = [];
    }

    async connectedCallback() {
        this.orders = await ordersModel.getOrders();

        this.render();
    }

    render() {
        const filteredOrders = this.orders.filter(order => order.status_id === 100);

        const list = filteredOrders
            .map(order => `<single-order order='${JSON.stringify(order)}'></single-order>`)
            .join("");

        this.innerHTML = `<h2 class="productlist">Packlista</h2>${list}`;
    }
}


