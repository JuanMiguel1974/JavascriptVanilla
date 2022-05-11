import loginpag from "../componentes/login";
import home from "../componentes/home";
import estadiosPage from "../views/estadios";
let content = document.getElementById('container')
const router = (route) => {
    content.innerHTML = '';

    switch (route) {

        case '#/':
            return content.appendChild(home());

        case '#/login':

            return content.appendChild(loginpag());

        case '#/estadios':
            return content.appendChild(estadiosPage());
    }
};
export { router };