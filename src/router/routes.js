import { pages } from "../controllers/index.controller";
import { componentes } from "../componentes/index.componentes";

let content = document.getElementById('container')
const router = (route) => {
    content.innerHTML = '';

    switch (route) {

        case '#/':
            return content.appendChild(componentes.home());

        case '#/login':

            return content.appendChild(pages.login());

        case '#/registro':

            return content.appendChild(pages.registro());

        case '#/estadios':
            return content.appendChild(pages.estadios());

        case '#/navegacion':
            return content.appendChild(componentes.navegacion());
    }
};
export { router };