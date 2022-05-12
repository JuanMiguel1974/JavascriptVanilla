import view from '../views/registro.html'

export default () => {
    const registroPage = document.createElement('div');
    registroPage.innerHTML = view;

    return registroPage;
}