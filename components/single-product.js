export default class SingleProduct extends HTMLElement {
    static get observedAttributes() {
        return ["product"];
    }

    get product() {
        return JSON.parse(this.getAttribute("product"));
    }



    connectedCallback() {
        this.innerHTML =
        `
        <h1 class="productname">${this.product.name}</h1>
        <p class="stocklocation">Lagersaldo: ${this.product.stock}</p>
        <p class="stocklocation">Plats: ${this.product.location}</p>
        `;
    }
}
