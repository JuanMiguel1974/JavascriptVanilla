import view from '../views/lista_estadios.html'
export default () => {

    const listaEstadiosPage = document.createElement('div');
    listaEstadiosPage.innerHTML = view;

    return listaEstadiosPage;
}