import '../css/home.css'
import Home from '../imagenes/home/home4.jpg'
export default () => {

    const element = document.createElement('div');
    const myIcon = new Image();
    myIcon.src = Home;
    element.appendChild(myIcon);
    return element;
}