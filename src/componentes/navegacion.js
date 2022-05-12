import view from '../views/navegacion.html'

export default () => {
    const navPage = document.createElement('div');
    navPage.innerHTML = view;
    return navPage;
}