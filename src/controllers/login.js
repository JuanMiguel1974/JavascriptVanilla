import view from '../views/login.html'

export default () => {
    const loginPage = document.createElement('div');
    loginPage.innerHTML = view;
    return loginPage;
}