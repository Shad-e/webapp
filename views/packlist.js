export default class PacklistView extends HTMLElement {
    // connect component
    connectedCallback() {
        this.innerHTML =    `<header class="header">
                                <lager-title title="Plocklista"></lager-title>
                                </header>
                                <main class="main">
                                <order-list></order-list>
                                </main>
                                `;
    }
}
