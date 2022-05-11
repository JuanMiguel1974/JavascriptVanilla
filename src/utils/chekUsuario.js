export { isInLE, checkUsuario };
import router from "../router/routes";

const isInLE = (item) => (localStorage.getItem(item) ? true : false);

const checkUsuario = () => {
    return isInLE("user");
};