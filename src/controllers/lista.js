class estadio {
    constructor(nombre, ciudad, imagen, aforo, pais) {
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.imagen = imagen;
        this.aforo = aforo;
        this.pais = pais;
    }
}

export default () => {
    const estadiosPage = ` 
    <div id="estadios"></div>
    <form method="post" enctype=multipart/form-data>
      <label for="nombre">Nombre</label> <input type="text" id="nombre" name="nombre" />
      <label for="ciudad">Ciudad</label><input type="text" id="ciudad" name="ciudad" />
      <label for="imagen">Imagen</label><input type="file" id="imagen" name="imagen" /><br><br>
      <label for="aforo">Aforo</label><input type="number" id="aforo" name="aforo" /><br><br>
      <label for="pais">Pais</label><input type="text" id="pais" name="pais" /><br><br>
      <button id="crear">Crear</button>
    </form>
    
    `;
    const divElement = document.createElement('div');
    divElement.innerHTML = estadiosPage;
    (() => {
        document.addEventListener("DOMContentLoaded", () => {
            document
                .querySelector("#estadios")
                .addEventListener("click", botonEstadios);

            function botonEstadios() {
                let estadios = [];
                fetch("https://futbol-7727b-default-rtdb.firebaseio.com/estadios.json")
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        let contenedor = document.querySelector("#home");
                        contenedor.innerHTML = "";
                        let listaEstadios = document.createElement("div");
                        listaEstadios.classList.add(
                            "row",
                            "row-cols-1",
                            "row-cols-md-3",
                            "g-4"
                        );

                        contenedor.append(listaEstadios);
                        console.log(contenedor);
                        for (let idEstadio in data) {
                            let mostrarEstadios = document.createElement("div");
                            listaEstadios.append(mostrarEstadios);
                            mostrarEstadios.classList.add("col");
                            let descripcionEstadio = document.createElement("div");
                            descripcionEstadio.classList.add("card", "h-100");
                            let contenido = `                                                             <img src = "${data[idEstadio].imagen}"> </img>
  
                                                           <div class="card-body">
                                                               <h5 class="card-title">${data[idEstadio].nombre}</h5>
                                                               <p class="card-text">${data[idEstadio].ciudad}</p>
                                                               <p class="card-text">${data[idEstadio].aforo}</p>
                                                               <p class="card-text">${data[idEstadio].pais}</p>
                                                              <button type="button" class="btn btn-danger borrar_producto">Elimimnar producto</button>
  
                          </div>
                          </div>`;
                            descripcionEstadio.innerHTML = contenido;
                            mostrarEstadios.append(descripcionEstadio);
                            descripcionEstadio
                                .querySelector(".borrar_estadio")
                                .addEventListener("click", function() {
                                    let id = this.parentNode.id;

                                    fetch(
                                        `https://futbol-7727b-default-rtdb.firebaseio.com/estadios/${id}.json`, {
                                            method: "delete",
                                            headers: {
                                                "Content-type": "application/json; charset=UTF-8",
                                            },
                                            body: "{}",
                                        }
                                    ).then((datos) => console.log(datos));
                                });
                        }
                        let formulario = ` <form class="row g-3">
                      <div class="col-xl-6">
                        <label for="inputNombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="inputNombre">
                      </div>
                      <div class="col-md-6">
                        <label for="inputCiudad" class="form-label">Ciudad</label>
                        <input type="text" class="form-control" id="inputCiudad">
                      </div>
                      <div class="col-6">
                        <label for="inputAforo" class="form-label">Aforo</label>
                        <input type="text" class="form-control" id="inputAforo" >
                      </div>
                      <div class="col-6">
                        <label for="inputPais" class="form-label">País</label>
                        <input type="text" class="form-control" id="inputPais" >
                      </div>
                      <div class="col-md-6">
                           <label for="formFoto" class="form-label">Imagen producto</label>
                           <input type="file" id="formFoto" class="form-control" >
                      </div>
  
                        <button type="button" class="btn btn-success" id="formSubmit">Inserta estadio</button>
                      </div>
                      
                    </form>
                  `;

                        let formularioEstadios = document.createElement("div");
                        formularioEstadios.innerHTML = formulario;
                        contenedor.append(formularioEstadios);

                        document
                            .querySelector("#formFoto")
                            .addEventListener("change", encodeImageFileAsURL);
                        document
                            .querySelector("#formSubmit")
                            .addEventListener("click", enviarFormulario);
                    });
            }

            function enviarFormulario() {
                console.log("enviarFormulario");

                let nombre = document.querySelector("#inputNombre").value;
                let ciudad = document.querySelector("#inputCiudad").value;
                let aforo = document.querySelector(
                    "#inputAforo"
                ).value;
                let pais = document.querySelector("#inputPais").value;
                let foto = document.querySelector("#formFoto").foto;

                fetch(`https://futbol-7727b-default-rtdb.firebaseio.com/estadios.json`, {
                        method: "post",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        },
                        body: `{ 
                          "nombre": "${nombre}", 
                          "descripcion":  "${ciudad}",
                          "cantidad": "${aforo}",
                          "pvp_unidad": "${pais}",
                          "imagen": "${foto}",
                      }`,
                    })
                    .then((response) => response.json())
                    .then((data) => console.log(data));
            }

            /*  function cargar() {
                 fetch("https://dwec-daw-default-rtdb.firebaseio.com/listas.json")
                     .then((response) => response.json())
                     .then((datos) => {
                         let container = document.querySelector("#home");
                         container.innerHTML = "";
                         console.log(datos);
                         for (let lista in datos) {
                             let divLista = document.createElement("div");
                             divLista.innerHTML = `<h2>${lista}</h2>`;
                             let datosLista = datos[lista].productos;
                             for (let producto of datosLista) {
                                 let divProducto = document.createElement("div");
                                 divProducto.innerHTML = `<h3>${producto}</h3>
                                   <p>Marca</p>
                                       <p>Referencia</p>
                                       <p>Precio</p>
                                   `;
                                 divLista.append(divProducto);
                                 fetch(
                                         `https://dwec-daw-default-rtdb.firebaseio.com/productos/${producto}.json`
                                     )
                                     .then((response) => response.json())
                                     .then((datosProducto) => {
                                         divProducto.innerHTML = `<h3>${producto}</h3>
                                       <img src="data:image/png;base64, ${datosProducto.foto}"/>
                                       <p>${datosProducto.marca}</p>
                                       <p>${datosProducto.referencia}</p>
                                       <p>${datosProducto.precio}</p>
                                       `;
                                     });
                             }
                             container.append(divLista);
                         }
                     });
             }*/
        });
    })();

    function encodeImageFileAsURL() {
        var file = this.files[0];
        var reader = new FileReader();

        reader.onloadend = () => {
            // console.log('RESULT', reader.result)
            this.foto = reader.result;
            //  console.log(this.foto);
            document.querySelector("#formFoto").src = reader.result;
        };
        reader.readAsDataURL(file);
    }
    return divElement;
}