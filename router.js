export default class Router extends HTMLElement {
    constructor() {
        super();

        this.currentRoute = "";

        this.allRoutes = {
            "": {
                view: "<products-view></products-view>",
                name: "Lagerlista"
            },
            "packlist": {
                view: "<packlist-view></packlist-view>",
                name: "Plocklista"
            },
            "deliveries": {
                view: "<deliveries-view></deliveries-view>",
                name: "Inlevereranser"
            },
            "deliveries-form": {
                view: "<new-delivery></new-delivery>",
                name: "Ny inlevererans",
                hidden: true
            }
        };
    }

    get routes() {
        return this.allRoutes;
    }

    // connect component
    connectedCallback() {
        window.addEventListener('hashchange', () => {
            this.resolveRoute();
        });

        this.resolveRoute();
    }

    resolveRoute() {
        this.currentRoute = location.hash.replace("#", "");

        this.render();
    }

    render() {
        this.innerHTML = this.routes[this.currentRoute].view || "<not-found></not-found>";
    }
}
