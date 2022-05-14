export { isInLE, checkUsuario };

const isInLE = (item) => (localStorage.getItem(item) ? true : false);

const checkUsuario = () => {
    return isInLE("email");
};