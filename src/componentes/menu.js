import view from '../views/menu.html'
export { menu };

function menu() {
    let navMenu = document.createElement("header");
    navMenu.innerHTML = view;
    return navMenu;
}