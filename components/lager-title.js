export default class LagerTitle extends HTMLElement {
    constructor() {
        super();

        this.name = "Linus";
    }

    static get observedAttributes() {
        return ["name"];
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this[property] = newValue;
    }

    connectedCallback() {
        this.innerHTML = `<h1 class="siteheader">${this.name}'s lager-app</h1>`;
    }
}
