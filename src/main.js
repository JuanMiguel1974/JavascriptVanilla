import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import { router } from '../src/router/routes';
import { checkUsuario } from "./utils/chekUsuario";
import { menu } from "./componentes/menu.js";

window.app = {};

(function autoinvocada() {
    document.addEventListener("DOMContentLoaded", function domLoad() {

        if (checkUsuario()) {
            window.location.hash = '#/estadios'
            document.querySelector("body").prepend(navegacion());
        } else {
            document.querySelector("body").prepend(menu());
            window.location.hash = '#/';
        }

        router(window.location.hash);
    });

    window.addEventListener("hashchange", () => {
        router(window.location.hash);
    });
})();