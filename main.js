import Router from "./router.js";

import LagerTitle from "./components/lager-title.js";
import ProductList from "./components/product-list.js";
import SingleProduct from "./components/single-product.js";
import OrderList from "./components/order-list.js";
import SingleOrder from "./components/single-order.js";
import DeliveriesList from "./components/deliveries-list.js";
import NewDelivery from "./components/new-delivery.js";
import SingleDelivery from "./components/single-delivery.js";




import Packlist from "./views/packlist.js";
import Products from "./views/products.js";
import Deliveries from "./views/deliveries.js";


import Navigation from "./navigation.js";


customElements.define("router-outlet", Router);
customElements.define("navigation-outlet", Navigation);

customElements.define("lager-title", LagerTitle);
customElements.define("product-list", ProductList);
customElements.define("single-product", SingleProduct);
customElements.define("order-list", OrderList);
customElements.define("single-order", SingleOrder);
customElements.define("single-delivery", SingleDelivery);
customElements.define("deliveries-list", DeliveriesList);



customElements.define("packlist-view", Packlist);
customElements.define("products-view", Products);
customElements.define("deliveries-view", Deliveries);
customElements.define("new-delivery", NewDelivery);








