import view from '../views/navegacion.html'
import { componentes } from "../componentes/index.componentes";



export default () => {
    const navPage = document.createElement('div');
    navPage.innerHTML = view;
    navPage.querySelector('#logout').addEventListener("click", function(event) {
        event.preventDefault;
        localStorage.clear();
        window.location.reload();
        window.location.hash = '/#/'
    });

    return navPage;
}