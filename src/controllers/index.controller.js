import Login from '../controllers/login'
import Registro from '../controllers/registro'
import Estadios from '../controllers/nuevo_estadio'
import ListaEstadios from '../controllers/lista_estadios'

const pages = {

    login: Login,
    registro: Registro,
    nuevo_estadio: Estadios,
    lista_estadios: ListaEstadios
};
export { pages };